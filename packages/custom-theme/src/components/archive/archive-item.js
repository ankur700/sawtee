import { connect } from "frontity";
import React from "react";
import { formatPostData } from "../helpers";
import PostPreviewCard from "./post-preview-card";

const ArchiveItem = ({ state, post, showImage, ...rest }) => {
  const data = formatPostData(state, post);
  const isProgramSubcategory = post.categories.map((cat) => {
    if (cat.parent === 22) {
      return true;
    } else {s
      return false;
    }
  });

  return (
    <PostPreviewCard
      {...rest}
      data={data}
      showImage={showImage}
      isProgramSubcategory={isProgramSubcategory}
    />
  );
};

export default connect(ArchiveItem);
