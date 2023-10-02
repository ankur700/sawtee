import { connect } from "frontity";
import { formatPostData, getPostData } from "../helpers";
import { PostLayout } from "../layouts/postLayout";

const Post = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;
  const isProgramPost =
    postData.route.replace("/category", "") === "/programme/";
  return (
    <PostLayout
      showPattern={state.theme.showBackgroundPattern}
      isProgramPost={isProgramPost}
      post={post}
      isPage={postData.isPage}
    >
      <Html2React html={post.content} />
    </PostLayout>
  );
};

export default connect(Post);
