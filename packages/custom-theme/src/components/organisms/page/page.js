import { connect } from "frontity";
import { formatPostData, getPostData } from "../../helpers";
import KnowUs from "./KnowUs";
import OurWork from "./OurWork";
import Switch from "@frontity/components/switch";
import DefaultPage from "./defaultPage";
import { PageLayout } from "../layouts/pageLayout";
import Home from "./home/home";
import Contact from "./contact/contact";

const Page = ({ state, categories }) => {
  const data = getPostData(state);
  const post = formatPostData(state, data);

  if (data.route === "/") {
    return <Home categories={categories} />;
  }

  return (
    <PageLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      title={post.title}
      featured_media={post.featured_media}
      isPage={data.isPage}
    >
      <Switch>
        <OurWork when={data.route === "/our-work/"} data={data} />
        <KnowUs when={data.route === "/about/"} data={data} />
        <Contact when={data.route === "/contact/"} data={data} />
        <DefaultPage data={data} />
      </Switch>
    </PageLayout>
  );
};

export default connect(Page);
