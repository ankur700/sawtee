import { connect } from "frontity";
import Loading from "../../components/atoms/loading";
import useSWR from "swr";
import { getCPTData, fetcher } from "../../components/helpers";
import MediaArticles from "./MediaArticles";

const SawteeInMedia = ({ state, link }) => {
  const data = state.source.get(link);
  const posts = () => {
    let array = [];
    data.items.map(({ type, id }) => {
      array.push(state.source[type][id]);
    });
    if (array.length > 0) {
      return array;
    }
  };
  const news = getCPTData(posts(), state);
  const linkColor = state.theme.colors.linkColor;

  // Load the post, but only if the data is ready.
  if (!data.isReady) return null;

  return !news.length ? (
    <Loading />
  ) : (
    <MediaArticles news={news} linkColor={linkColor} />
  );
};

export default connect(SawteeInMedia);
