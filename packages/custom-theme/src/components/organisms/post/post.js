import { connect } from "frontity";
import { formatPostData, getPostData } from "../../helpers";
import ProgramPost from "./ProgramPost";
import OpinionPost from "./OpinionPost";
import FeaturedEventPost from "./featuredEventPost";
import NewsletterPost from "./newsletterPost";
import { PostLayout } from "../layouts/postLayout";
import Switch from "@frontity/components/switch";

const Post = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <PostLayout
      showPattern={state.theme.showBackgroundPattern}
      isProgramPost={postData.type === "programme" ? true : false}
      post={post}
      isPage={postData.isPage}
    >
      <Switch>
        <ProgramPost when={postData.type === "programme"} content={post.content} />
        <OpinionPost when={postData.type === "opinion"} />
        <FeaturedEventPost when={postData.type === "featured-events"} />
        <NewsletterPost when={postData.type === "newsletters"} />
        <Html2React html={post.content} />
      </Switch>
    </PostLayout>
  );
};

export default connect(Post);
