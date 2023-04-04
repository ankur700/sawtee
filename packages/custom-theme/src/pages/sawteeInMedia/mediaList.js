import Loading from "../../components/atoms/loading";
import MediaArticle from "./MediaArticle";
import { VStack } from "@chakra-ui/react";

const SawteeInMedia = ({ news, linkColor }) => {
  return (
    <VStack spacing={8}>
      {news.map((newsItem) => (
        <MediaArticle
          key={newsItem.id}
          newsItem={newsItem}
          linkColor={linkColor}
        />
      ))}
    </VStack>
  );
};

export default SawteeInMedia;
