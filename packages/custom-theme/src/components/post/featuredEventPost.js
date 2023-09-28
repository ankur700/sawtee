import { connect } from "frontity";
import { formatPostData, getPostData } from "../helpers";

const FeaturedEventPost = ({ state, libraries }) => {
  const post = formatPostData(state, getPostData(state));
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return <Html2React html={post.content} />;
};

export default connect(FeaturedEventPost);
