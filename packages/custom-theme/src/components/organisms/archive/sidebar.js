import React from "react";
import {
  Box,
  useColorModeValue,
  Text,
  Stack,
  Divider,
  Heading,
} from "@chakra-ui/react";
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
  linkColor,
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
                    <Link link={event.link}>
                      {decode(event.title.rendered)}
                    </Link>
                  </Heading>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    fontSize={"sm"}
                    fontWeight="semibold"
                  >
                    {event.acf.publishers &&
                      event.acf.publishers.map((publisher) => {
                        return (
                          <Text
                            as="a"
                            href={publisher.publisher_website}
                            _hover={{ textDecor: "underline" }}
                            maxW="180px"
                          >
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
            height="700px"
            maxH={"700px"}
          />
        </GlassBox>
      )}
    </Stack>
  );
};

export default Sidebar;
