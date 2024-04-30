import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types";
import "./PostLayout.css";
import Audiobar from "./Audiobar";
import SongDetails from "../SongDetails/SongDetails";
import ContentHeader from "./ContentHeader";
import PostInformation from "./PostInformation";
interface Props {
  post: Post;
  preview: boolean;
  authenticated: boolean;
}
export const PostComment = ({ post, preview, authenticated }: Props) => {
  return (
    <div className="content-container">
      <ContentHeader user={post.user} createdAt={post.createdAt} />
      <SongDetails
        name={post.song.songName}
        artist={post.artist.artistName}
        id={post.song.songId}
        imageURL={post.song.imageUrl}
        authenticated={authenticated}
      />
      <PostInformation
        title={post.title}
        description={post.description}
        preview={preview}
      />
      <Audiobar songId={post.song.songId} />
    </div>
  );
};
const PostContainer = ({ post, preview, authenticated }: Props) => {
  return (
    <div className="content-container">
      <ContentHeader user={post.user} createdAt={post.createdAt} />
      <Link
        className="box-link"
        to={`/post/${post.postIdInComment ? post.postIdInComment : post.id}`}
      >
        <SongDetails
          name={post.song.songName}
          artist={post.artist.artistName}
          imageURL={post.song.imageUrl}
          id={post.song.songId}
          authenticated={authenticated}
        />
        <PostInformation
          title={post.title}
          description={post.description}
          preview={preview}
        />
        <Audiobar songId={post.song.songId} />
      </Link>
    </div>
  );
};

export default PostContainer;
