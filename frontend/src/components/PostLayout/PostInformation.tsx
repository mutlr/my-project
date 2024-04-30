import React from "react";

interface Props {
  title: string;
  description: string;
  preview: boolean;
}
const PostInformation = (props: Props) => {
  return (
    <div style={{ alignSelf: "center", textAlign: "center" }}>
      <p>{props.title}</p>
      {!props.preview && <p>{props.description}</p>}
    </div>
  );
};

export default PostInformation;
