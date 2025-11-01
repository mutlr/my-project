import React, { useContext, useEffect, useRef } from "react";
import { MessageContext } from "../../context/messageContext";
import { authenticateSpotify } from "../../services/userService";
import "./AuthenticationButton.css";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/myprofile";
const SCOPE = "user-read-email";
const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

const AuthenticationButton = () => {
  const message = useContext(MessageContext);
  const user = useContext(UserContext);
  const codeRef = useRef<URLSearchParams>(
    new URLSearchParams(window.location.search)
  );
  const navigate = useNavigate();
  const code = codeRef.current.get("code");
  useEffect(() => {
    if (code) {
      authenticateSpotify(code)
        .then((r) => {
          console.log("Tulee r", r);
          user?.addUserToStorageAndSetUser(r.token, r.id, true, r.username);
          message?.success("Authentication successfull!");
        })
        .catch((error) => {
          console.log("Error during authentication: ", error);
          if (isAxiosError(error)) {
            message?.error(
              error.response?.data
                ? error.response?.data.error
                : "There was an error authenticating. Try again later!"
            );
          }
        })
        .finally(() => navigate("/myprofile"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <a id="auth" className="customButton" href={URL}>
      <p>Authenticate Spotify</p>
    </a>
  );
};

export default AuthenticationButton;
