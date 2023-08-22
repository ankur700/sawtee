import { Box, useColorModeValue } from "@chakra-ui/react";
import { LightPatternBox } from "../../styles/pattern-box";
import FeaturedMedia from "../post/featured-media";
import PostHeader from "../post/post-header";

export const PageLayout = ({
  showBackgroundPattern,
  title,
  isPage,
  featured_media,
  children,
}) => {
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={showBackgroundPattern}
      pt="0"
    >
      <Box pos="relative">
        {featured_media != null && (
          <FeaturedMedia
            mt="0"
            s
            height={"350px"}
            id={featured_media.id}
            _after={{
              display: "block",
              content: '""',
              width: "100%",
              height: "350px",
              background: "rgba(0,0,0,0.4)",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        )}
        <PostHeader
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          heading={title}
          isPage={isPage}
          position="absolute"
          bottom="15%"
          left="5%"
        />
      </Box>
      {children}
    </LightPatternBox>
  );
};
