import { useSafeLayoutEffect } from "@chakra-ui/react";
import { connect } from "frontity";
import Publications from "./publication";
import Events from "./events";
import Newsletters from "./newsletters";
import Research from "./research";
import Switch from "@frontity/components/switch";
import CoverImage from "../../../assets/COVID-19-South-Asia-and-LDCs.jpeg";
import PublicationImage from "../../../assets/publications-1-resized.jpg";
import { ArchiveLayout } from "../layouts/archiveLayout";
import DefaultArchive from "./defaultArchive";

const Archive = ({ state, actions, categories }) => {
  const data = state.source.get(state.router.link);
  const newsData = state.source.get("/sawtee-in-media/");
  const inFocus = state.source.get("/in-focus/");
  const linkColor = state.theme.colors.linkColor;

  useSafeLayoutEffect(() => {
    actions.source.fetch("/sawtee-in-media/");
    actions.source.fetch("/in-focus/");
  }, []);

  console.log(data);

  return (
    <ArchiveLayout
      showBackgroundPattern={state.theme.showBackgroundPattern}
      category={data.type}
      image={data.route !== "covid" ? PublicationImage : CoverImage}
    >
      <Switch>
        <Events
          when={data.isFeaturedEventsArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          postData={data}
          linkColor={linkColor}
        />
        <Publications
          when={data.isPublicationsArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          linkColor={linkColor}
        />
        <Newsletters
          when={data.isNewslettersArchive}
          news={newsData}
          inFocus={inFocus}
          postData={data}
          linkColor={linkColor}
        />
        <Research
          when={data.isResearchArchive}
          categories={categories}
          news={newsData}
          inFocus={inFocus}
          linkColor={linkColor}
        />

        <DefaultArchive data={data} />
      </Switch>
    </ArchiveLayout>
  );
};

export default connect(Archive);
