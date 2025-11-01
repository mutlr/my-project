const router = require("express").Router();
const axios = require("axios");
const {
  apiTokenExtractor,
  tokenExtractor,
  refreshUserToken,
} = require("../util/middleware");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = require("../util/config");
const { User, Auth } = require("../models");

const getUserTokens = async (code) => {
  const options = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "authorization_code",
      code,
      redirect_uri: `${REDIRECT_URL}/myprofile`,
    },
  };
  const result = await axios(options);
  return result.data;
};
const createPlaylist = async (auth) => {
  const playlistResult = await axios.post(
    `https://api.spotify.com/v1/users/${auth.spotifyId}/playlists`,
    {
      name: "Project playlist",
      public: true,
      description: "Playlist for my cool project",
    },
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    }
  );
  auth.playlist = playlistResult.data.id;
  await auth.save();
};
router.post("/spotifyauthentication", tokenExtractor, async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code missing!" });
  }
  const { id, username } = req.decodedToken;
  const token = req.headers["authorization"].split(" ")[1];
  const { access_token, refresh_token } = await getUserTokens(code);
  const spotifyData = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log("Resp from spotify data ", spotifyData);
  const auth = await Auth.create({
    userId: id,
    accessToken: access_token,
    refreshToken: refresh_token,
    spotifyId: spotifyData.data.id,
  });
  await createPlaylist(auth);

  res.status(200).json({ token, username, id, authenticated: true });
});

router.get("/songs/:name", apiTokenExtractor, async (req, res) => {
  const { name } = req.params;
  const result = await axios.get(
    `https://api.spotify.com/v1/search?q=${name}&type=track&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${req.api_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  res.status(200).json({ data: result.data.tracks.items });
});

router.get("/audio/:songid", apiTokenExtractor, async (req, res) => {
  const { songid } = req.params;
  const result = await axios.get(
    `https://api.spotify.com/v1/tracks/${songid}`,
    {
      headers: {
        Authorization: `Bearer ${req.api_token}`,
      },
    }
  );
  res.status(200).json({ data: result.data.preview_url });
});

router.get("/info/:id", refreshUserToken, async (req, res) => {
  if (req.userNotAuthenticated === true) {
    return res
      .status(200)
      .json({ player: null, userInfo: null, username: req.username });
  }
  const token = req.userSpotifyToken;
  const username = req.username;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const info = await axios.get("https://api.spotify.com/v1/me", { headers });
  const currentlyPlaying = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers }
  );

  const userInfo = {
    display_name: info.data.display_name,
    uri: info.data.href,
    country: info.data.country,
  };
  const playerData = {
    preview_url: currentlyPlaying.data.item.preview_url,
    name: currentlyPlaying.data.item.name,
    artist: currentlyPlaying.data.item.album.artists[0].name,
  };
  const player = currentlyPlaying.data === "" ? null : playerData;

  res.status(200).json({ userInfo, player, username });
});
const getPlaylists = async (token, spotifyID) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const result = await axios.get(
    `https://api.spotify.com/v1/users/${spotifyID}/playlists`,
    { headers }
  );
  const URLS = [];
  for (const v of result.data.items) {
    URLS.push(v.href);
  }
  return Promise.all(
    URLS.map((url) => {
      return axios.get(url, { headers }).then((result) => {
        return result.data;
      });
    })
  );
};
const extractPlaylistData = (data) => {
  const lists = [];
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(data)) {
    const tracks = value.tracks.items;
    if (tracks.length === 0) continue;
    const playlist = {
      name: value.name,
      items: [],
    };

    for (const v of tracks) {
      const data = v.track;
      const item = {
        song_name: data.name,
        artist: data.artists[0].name,
        preview_url: data.preview_url,
        id: data.id,
        image_url: data.album.images[2].url,
      };
      playlist.items.push(item);
    }
    lists.push(playlist);
  }
  return lists;
};
router.get("/playlists/:id", refreshUserToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    include: {
      model: Auth,
    },
  });

  if (!user.auth) return res.status(200).json({ data: null });

  const { accessToken, spotifyId } = user.auth;
  const playlist = await getPlaylists(accessToken, spotifyId);
  const data = extractPlaylistData(playlist);

  res.status(200).json({ data });
});

router.post(
  "/addtoplaylist",
  tokenExtractor,
  refreshUserToken,
  async (req, res) => {
    const { songId } = req.body;
    const user = await User.findByPk(req.decodedToken.id, {
      include: {
        model: Auth,
        attributes: ["accessToken", "id", "playlist", "spotifyId"],
      },
    });
    const { playlist, accessToken } = user.auth;
    if (!playlist) return res.status(404).json({ error: "No playlist" });
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
      { uris: ["spotify:track:" + songId] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).end();
  }
);
module.exports = router;
