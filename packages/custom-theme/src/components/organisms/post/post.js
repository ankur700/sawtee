import { Box } from "@chakra-ui/react";
import { connect } from "frontity";
import { formatPostData, getPostData } from "../../helpers";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import FeaturedMedia from "./featured-media";
import PostHeader from "./post-header";
import PostProgressBar from "./post-progressbar";
import ProgramPost from "./ProgramPost";
import OpinionPost from "./OpinionPost";
import FeaturedEventPost from "./featuredEventPost";
import { PostLayout } from "../layouts/postLayout";
import Switch from "@frontity/components/switch";

const Post = ({ state, libraries }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  <PostLayout
    showPattern={state.theme.showBackgroundPattern}
    programPost={postData.type === "programme" ? true : false}
  >
    <Switch>
      <ProgramPost when={postData.type === "programme"} />
      <OpinionPost when={postData.type === "opinion"} />
      <FeaturedEventPost when={postData.type === "featured-events"} />
      <NewsletterPost when={postData.type === "newsletters"} />
      <Html2React html={post.content} />
    </Switch>
  </PostLayout>;
};

export default connect(Post);
