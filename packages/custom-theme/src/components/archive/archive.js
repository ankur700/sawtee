import { connect } from "frontity";
import DefaultArchive from "./default-archive";
import PublicationsArchive from "./publications-archive";
import NewsletterArchive from "./newsletter-archive";
import ProgrammesArchive from "./programmes-archive";
import HomeArchive from "./home-archive";
import Switch from "@frontity/components/switch";

const Archive = ({ state, categories }) => {
  const postData = state.source.get(state.router.link);
  const news = state.source.get("/category/sawtee-in-media/");
  const infocus = state.source.get("/category/infocus/");
  return (
    <Switch>
      <HomeArchive when={postData.route === "/blog/"} />
      <PublicationsArchive
        when={postData.isPublicationsArchive}
        categories={categories}
        news={news}
        inFocus={infocus}
      />
      <NewsletterArchive
        when={postData.isNewslettersArchive}
        news={news}
        inFocus={infocus}
        postData={postData}
        categories={categories}
      />
      <ProgrammesArchive
        when={postData.route.replace("/category", "") === "/programme/"}
        news={news}
        inFocus={infocus}
      />
      <ProgrammesArchive
        when={postData.route.replace("/category", "") === "/covid/"}
        news={news}
        inFocus={infocus}
      />
      <ProgrammesArchive
        when={postData.route.replace("/category", "") === "/events/"}
        news={news}
        inFocus={infocus}
      />
      <ProgrammesArchive
        when={postData.route.replace("/category", "") === "/research/"}
        news={news}
        inFocus={infocus}
      />
      <ProgrammesArchive
        when={postData.route.replace("/category", "") === "/sawtee-in-media/"}
        news={news}
        inFocus={infocus}
      />
      <DefaultArchive when={postData.isCategory} />
    </Switch>
  );
};

export default connect(Archive);
