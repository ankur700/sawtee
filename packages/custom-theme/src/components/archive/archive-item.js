import { connect } from "frontity";
import React from "react";
import { formatPostData } from "../helpers";
import PostPreview from "./post-preview";

const ArchiveItem = ({ state, item, showImage, ...rest }) => {
  const data = formatPostData(state, item);

  return <PostPreview {...rest} data={data} showImage={showImage} />;
};

export default connect(ArchiveItem);
