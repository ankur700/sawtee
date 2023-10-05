import { connect } from "frontity";
import DefaultArchive from "./default-archive";
import PublicationsArchive from "./publications-archive";
import NewsletterArchive from "./newsletter-archive";
import HomeArchive from "./home-archive";
import Switch from "@frontity/components/switch";

const Archive = ({ state }) => {
  const postData = state.source.get(state.router.link);
  const news = state.source.get("/category/sawtee-in-media/");
  const infocus = state.source.get("/category/infocus/");
  const categories = state.source.data["get-all-categories/"].items;


  return (
    <Switch>
      <HomeArchive when={postData.route === "/blog/"} />
      <PublicationsArchive
        when={postData.isPublicationsArchive}
        categories={categories}
        news={news}
        infocus={infocus}
      />
      <NewsletterArchive
        when={postData.isNewslettersArchive}
        news={news}
        infocus={infocus}
        postData={postData}
        categories={categories}
      />
      <DefaultArchive
        when={postData.isCategory}
        news={news}
        infocus={infocus}
        categories={categories}
      />
    </Switch>
  );
};

export default connect(Archive);
