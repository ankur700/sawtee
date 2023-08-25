import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { LightPatternBox } from "../../styles/pattern-box";
import PostHeader from "../post/post-header";
import PostProgressBar from "../post/post-progressbar";
import Section from "../../styles/section";
import FeaturedMedia from "../post/featured-media";
import { Content } from "../../atoms/content";
import useScrollProgress from "../../hooks/useScrollProgress";
import PostCategories from "../post/post-categories";
import { formatDateWithMoment } from "../../helpers";

export const PostLayout = ({
  children,
  showPattern,
  isProgramPost,
  post,
  isPage,
}) => {
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const postHeaderColor = useColorModeValue("gray.600", "whiteAlpha.600");
  const sectionBg = useColorModeValue("whiteAlpha.700", "gray.700");

  const [ref, scroll] = useScrollProgress();

  return (
    <LightPatternBox
      bg={patternBoxColor}
      showPattern={showPattern}
      ref={ref}
      pb={"40px"}
    >
      {isProgramPost ? (
        <Box pb={{ base: "2rem", lg: "50px" }} maxW="5xl" mx="auto">
          <Box
            mt={{ base: "20px", lg: "4rem" }}
            px={{ base: "32px", md: "3rem" }}
          >
            <PostCategories
              color="black"
              categories={post.categories}
              justifyContent="center"
            />

            <Heading
              fontWeight="bold"
              size={"2xl"}
              mt="30px"
              mb={{ base: "20px", lg: "32px" }}
              textTransform="uppercase"
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            {post.acf.program_partner && (
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={AccentTextColor}
                textAlign={"center"}
              >
                Partner: {decode(post.acf.program_partner)}
              </Text>
            )}

            {post.acf.program_starting_date && post.acf.program_ending_date && (
              <Text fontSize="md" mt="12px" textAlign={"center"}>
                {formatDateWithMoment(
                  post.acf.program_starting_date,
                  "MMMM D YYYY"
                ) +
                  " - " +
                  formatDateWithMoment(
                    post.acf.program_ending_date,
                    "MMMM D YYYY"
                  )}
              </Text>
            )}
          </Box>
        </Box>
      ) : (
        <Box pb={{ base: "2rem", lg: "50px" }} maxW="5xl" mx="auto">
          <PostHeader
            mt={{ base: "20px", lg: "4rem" }}
            px={{ base: "32px", md: "3rem" }}
            color={postHeaderColor}
            categories={post.categories}
            heading={post.title}
            author={post.author}
            date={post.publishDate}
            isPage={isPage}
          />
        </Box>
      )}

      {!isPage && <PostProgressBar value={scroll} />}

      {/* Look at the settings to see if we should include the featured image */}
      <Section bg={sectionBg} pb="80px" size="lg">
        {post.featured_media != null && (
          <FeaturedMedia id={post.featured_media.id} />
        )}
        <Content
          as={Section}
          px={{ base: "32px", md: "0" }}
          size="md"
          pt="50px"
        >
          {children}
        </Content>
      </Section>
    </LightPatternBox>
  );
};
