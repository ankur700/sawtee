import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { connect, decode } from "frontity";
import moment from "moment/moment";
import React from "react";
import GlassBox from "../../atoms/glassBox";
import Link from "../../atoms/link";
import SubscriptionCard from "../../atoms/subscriptionCard";
import Title from "../../atoms/title";
import TwitterTimeline from "../../atoms/twitterTimeline";
import { formatCPTData } from "../../helpers";

export const Sidebar = ({
  showSawteeInMedia,
  showTwitterTimeline,
  showSubscriptionCard,
  state,
  actions,
  categories,
}) => {
  const newsData = state.source.get("/sawtee-in-media");
  const linkColor = state.theme.colors.linkColor;

  const formatedDate = (date) => moment(date, "YYYYMMDD").fromNow();

  const news = React.useMemo(() => {
    if (newsData.isReady) {
      let newsArray = [];
      newsData.items.forEach((item) => {
        const post = state.source[item.type][item.id];
        newsArray.push(formatCPTData(state, post, categories));
      });
      return [...newsArray];
    }
  }, [newsData]);

  React.useEffect(() => {
    actions.source.fetch("/sawtee-in-media");
  }, []);

  return (
    <Stack spacing={16}>
      {showSawteeInMedia && (
        <GlassBox py="4" px="8" rounded="2xl" height="max-content">
          <Title text={"Sawtee in Media"} textAlign="center" mb={8} />
          {news &&
            news.map((item, index) => {
              return (
                <Stack spacing={2} mt="6" key={item.id}>
                  <Heading
                    className="title"
                    fontSize={["sm", "md"]}
                    mb="2"
                    color={useColorModeValue("gray.700", "whiteAlpha.700")}
                    lineHeight={1.2}
                    fontWeight="bold"
                    _hover={{
                      color: linkColor ? linkColor : "primary.700",
                      textDecoration: "underline",
                    }}
                  >
                    <Link link={item.link}>{decode(item.title)}</Link>
                  </Heading>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    fontSize={"sm"}
                    fontWeight="semibold"
                  >
                    {item.acf.publishers &&
                      item.acf.publishers.map((publisher, idx) => {
                        return (
                          <Text
                            as="a"
                            key={idx}
                            href={publisher.publisher_website}
                            _hover={{ textDecor: "underline" }}
                            maxW="180px"
                            noOfLines={1}
                          >
                            {publisher.publisher}
                          </Text>
                        );
                      })}
                    <Box
                      as="time"
                      dateTime={new Date(item.publishDate).toLocaleDateString()}
                    >
                      {formatedDate(item.publishDate)}
                    </Box>
                  </Box>
                  <Divider
                    display={index === news.length - 1 ? "none" : "block"}
                  />
                </Stack>
              );
            })}
        </GlassBox>
      )}

      {showTwitterTimeline && (
        <GlassBox
          rounded="2xl"
          height="max-content"
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="twitter-wrapper"
        >
          <TwitterTimeline
            handle="sawteenp"
            width={"100%"}
            height="700px"
            maxH={"700px"}
            rounded="xl"
          />
        </GlassBox>
      )}

      {showSubscriptionCard && (
        <GlassBox
          py="4"
          px="8"
          rounded="2xl"
          height="max-content"
          position={"sticky"}
          top={"8.5rem"}
        >
          <SubscriptionCard />
        </GlassBox>
      )}
    </Stack>
  );
};

export default connect(Sidebar);
