import React from "react";
import { Box, useColorModeValue, Text, Stack, Divider } from "@chakra-ui/react";
import SubscriptionCard from "../../atoms/subscriptionCard";
import TwitterTimeline from "../../atoms/twitterTimeline";
import GlassBox from "../../atoms/glassBox";
import moment from "moment/moment";
import Link from "../../atoms/link";
import Title from "../../atoms/title";
import { decode } from "frontity";

export const Sidebar = ({
  data,
  title,
  showSawteeInMedia,
  showTwitterTimeline,
  showSubscriptionCard,
}) => {
  return (
    <Stack spacing={16}>
      {showSawteeInMedia && (
        <GlassBox py="4" px="8" rounded="2xl" height="max-content">
          <Title text={title} textAlign="center" mb={8} />
          {data &&
            data.map((event, index) => {
              const formatedDate = moment(event.date, "YYYYMMDD").fromNow();
              return (
                <Stack spacing={2} mt="6" key={event.id}>
                  <Link className="primary-link" link={event.link}>
                    <Text className="title" fontSize={["sm", "md"]} mb="2">
                      {decode(event.title.rendered)}
                    </Text>
                  </Link>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    fontSize={"sm"}
                    fontWeight="semibold"
                  >
                    {event.acf.publishers &&
                      event.acf.publishers.map((publisher) => {
                        return (
                          <Text as="a" href={publisher.publisher_website}>
                            {publisher.publisher_name}
                          </Text>
                        );
                      })}
                    <Box
                      as="time"
                      dateTime={new Date(event.date).toLocaleDateString()}
                    >
                      {formatedDate}
                    </Box>
                  </Box>
                  <Divider
                    display={index === data.length - 1 ? "none" : "block"}
                  />
                </Stack>
              );
            })}
        </GlassBox>
      )}

      {showSubscriptionCard && (
        <GlassBox py="4" px="8" rounded="2xl" height="max-content">
          <SubscriptionCard />
        </GlassBox>
      )}

      {showTwitterTimeline && (
        <GlassBox
          rounded="2xl"
          height="max-content"
          position={"sticky"}
          top={"8.5rem"}
        >
          <TwitterTimeline
            handle="sawteenp"
            width={"100%"}
            height="auto"
            maxH={"700px"}
          />
        </GlassBox>
      )}
    </Stack>
  );
};

export default Sidebar;
