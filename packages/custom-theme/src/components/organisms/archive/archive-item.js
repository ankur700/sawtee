import { connect } from "frontity";
import React from "react";
import { formatPostData } from "../../helpers";
import PostPreview from "./post-preview";

const ArchiveItem = ({ state, item, ...rest }) => {
  const data = formatPostData(state, item);

  return <PostPreview {...rest} data={data} />;
};

export default connect(ArchiveItem);
