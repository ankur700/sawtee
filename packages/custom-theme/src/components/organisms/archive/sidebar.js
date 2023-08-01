import { Stack } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import SidebarWidget from "../../atoms/sidebarWidget.js";
import SubscriptionCard from "../../atoms/subscriptionCard";
import TwitterTimeline from "../../atoms/twitterTimeline";
import GlassBox from "../../atoms/glassBox";

export const Sidebar = ({
  posts,
  postType,
  news,
  postsLink,
  categories,
  newsLink,
  showTwitterTimeline,
  showSubscriptionBox,
  linkColor,
  children,
}) => {
  function EmptyArray(array) {
    return array.length === 0;
  }

  return (
    <Stack spacing={12} w="full" maxW={"xl"}>
      {posts && postType.items !== undefined && (
        <SidebarWidget
          array={posts.items}
          categories={categories}
          title={`Latest  ${postType}`}
          linkColor={linkColor}
          link={postsLink ? postsLink : "#"}
        />
      )}
      {news && news.items !== undefined && (
        <SidebarWidget
          array={news.items}
          categories={categories}
          title={"Sawtee in Media"}
          linkColor={linkColor}
          link={newsLink}
        />
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
      {showSubscriptionBox && (
        <GlassBox
          py="4"
          px="8"
          rounded="xl"
          height="max-content"
          position={"sticky"}
          top={"8.5rem"}
        >
          <SubscriptionCard />
        </GlassBox>
      )}
      {children}
    </Stack>
  );
};

export default connect(Sidebar);
