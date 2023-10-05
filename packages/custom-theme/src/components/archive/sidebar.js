import { Box, Stack } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import SubscriptionCard from "../atoms/subscriptionCard";
import { TwitterTimeline, GlassBox } from "../atoms";

export const Sidebar = ({
  showTwitterTimeline,
  showSubscriptionBox,
  children,
}) => {
  return (
    <Box>
      <Stack spacing={12} maxW={"xl"}>
        {showSubscriptionBox && (
          <GlassBox py="4" px="8" rounded="xl" height="max-content">
            <SubscriptionCard />
          </GlassBox>
        )}

        {showTwitterTimeline && (
          <GlassBox rounded="xl" height="max-content">
            <TwitterTimeline
              handle="sawteenp"
              width={"100%"}
              height="500px"
              maxH={"700px"}
              rounded="xl"
            />
          </GlassBox>
        )}

        {children}
      </Stack>
    </Box>
  );
};

export default connect(Sidebar);
