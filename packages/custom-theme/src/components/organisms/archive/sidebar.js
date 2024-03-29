import { Stack } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import SidebarWidget from "../../atoms/sidebarWidgets";
import SubscriptionCard from "../../atoms/subscriptionCard";
import TwitterTimeline from "../../atoms/twitterTimeline";
import GlassBox from "../../atoms/glassBox";

export const Sidebar = ({
  posts,
  news,
  postsLink,
  categories,
  newsLink,
  showTwitterTimeline,
  showSubscriptionBox,
  linkColor,
  children,
}) => {
  return (
    <Stack spacing={12} w="full" maxW={"xl"}>
      {showSubscriptionBox && (
        <GlassBox py="4" px="8" rounded="xl" height="max-content">
          <SubscriptionCard />
        </GlassBox>
      )}
      {news
        ? news.items !== undefined && (
            <SidebarWidget
              array={news.items.slice(0, 5)}
              categories={categories}
              title={news.type.replaceAll("-", " ").toLocaleUpperCase()}
              linkColor={linkColor}
              link={newsLink}
            />
          )
        : null}

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

      {posts
        ? posts.items !== undefined && (
            <SidebarWidget
              array={posts.items.slice(0, 5)}
              categories={categories}
              title={posts.type.replaceAll("-", " ").toLocaleUpperCase()}
              linkColor={linkColor}
              link={postsLink}
              position={children ? "relative" : "sticky"}
              top={"8.5rem"}
            />
          )
        : null}
      {children}
    </Stack>
  );
};

export default connect(Sidebar);
