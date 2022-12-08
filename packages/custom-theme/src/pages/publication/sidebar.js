import React from "react";
import { Box, useColorModeValue, Text, Stack, Divider } from "@chakra-ui/react";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import TwitterTimeline from "../../components/atoms/twitterTimeline";
import GlassBox from "../../components/atoms/glassBox";
import moment from "moment/moment";
import Link from "../../components/atoms/link";
import Title from "../../components/atoms/title";

export const Sidebar = ({
  data,
  title,
  sim,
  twittertimeline,
  subscription,
}) => {
  return (
    <Stack spacing={8}>
      {sim && (
        <GlassBox
          py="4"
          px="8"
          rounded="2xl"
          pos="sticky"
          top="7.5rem"
          height="max-content"
        >
          <Title text={title} textAlign="center" />
          <Stack spacing={8} mt="6">
            {data.map((event, index) => {
              const format = "MMMM Do YYYY";
              const formatedDate = moment(event.date).format(format);
              return (
                <Stack key={index}>
                  <Text className="title" lineHeight={"normal"}>
                    <Link
                      link={"#"}
                      color={useColorModeValue("primary.700", "primary.50")}
                    >
                      {event.title}
                    </Link>
                  </Text>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    fontSize={"sm"}
                    fontWeight="semibold"
                  >
                    <Text>{event.publisher}</Text>
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
          </Stack>
        </GlassBox>
      )}
      {twittertimeline && <TwitterTimeline />}
      {subscription && <SubscriptionCard />}
    </Stack>
  );
};

export default Sidebar;
