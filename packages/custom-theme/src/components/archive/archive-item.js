import { connect } from "frontity";
import React from "react";
import { formatPostData } from "../helpers";
import PostPreview from "./post-preview";

const ArchiveItem = ({ state, post, showImage, ...rest }) => {
  const data = formatPostData(state, post);

  return <PostPreview {...rest} data={data} showImage={showImage} />;
};

export default connect(ArchiveItem);
