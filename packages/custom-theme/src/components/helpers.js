import * as dayjs from "dayjs";
import { categoriesWidgetsHome } from "./config";
import { useBreakpointValue } from "@chakra-ui/react";

const MAXIMUM_POSTS = 5;
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const slugToCamelCase = (string, type, separators) => {
  if (!separators || typeof separators != "string") {
    separators = "-_.";
  }
  let result = string.replace(
    new RegExp("[" + separators + "][a-z]", "ig"),
    function (s) {
      return s.substr(1, 1).toUpperCase();
    }
  );
  return result;
};

export const getBreakpointValue = (value, fallback, ssr) =>
  useBreakpointValue(
    value,
    { fallback: fallback },
    {
      ssr: ssr,
    }
  );

export const getPostsFromCategory = ({ post }, categoryId) => {
  return Object.keys(post)
    .map((postID) => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)));
};

export const getPostsGroupedByCategory = (source) => {
  return Object.values(categoriesWidgetsHome).reduce((acc, categoryId) => {
    const posts = getPostsFromCategory(source, categoryId).slice(
      0,
      MAXIMUM_POSTS
    );
    const category = source.category[categoryId];
    return [...acc, { posts, category }];
  }, []);
};

export const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function getSrcSet(media) {
  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;
  return srcset;
}

export function getMediaAttributes(state, id) {
  const media = state.source.attachment[id];
  if (!media) return {};

  const srcSet = getSrcSet(media);

  return {
    id,
    alt: media.alt_text,
    src: media.source_url,
    srcSet,
  };
}

export function getCPTData(posts, state) {
  let array = [];
  posts.forEach((post) => {
    array.push(formatPostData(state, post));
  });
  if (array.length > 0) {
    return [...array];
  }
  return {};
}

export function getPublicationSliders(state, post, categories) {
  return {
    id: post.id,
    title: post.title.rendered,
    categories: getPostCategories(state, post, categories),
    featured_media: getMediaAttributes(state, post.featured_media),
    acf: post.acf,
  };
}

export function getPostCategories(state, post, categoriesPool) {
  if (categoriesPool) {
    const categories =
      post.categories &&
      categoriesPool.filter((item) => post.categories.includes(item.id));
    return categories ? categories.filter(Boolean) : [];
  }

  const allCategories = state.source.category;
  const categories = post.categories?.map((catId) => allCategories[catId]);
  return categories ? categories.filter(Boolean) : [];
}

export function getPostAuthor(state, post) {
  if (state.source.author[post.author] !== undefined) {
    return state.source.author[post.author];
  }
  return {};
}

export function getPostTags(state, post) {
  const allTags = state.source.tag;
  const tags = post.tags?.map((tagId) => allTags[tagId]);
  return tags ? tags.filter(Boolean) : [];
}

export function getPostData(state) {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  return { ...post, isReady: data.isReady, isPage: data.isPage };
}

export function truthy(value) {
  return value !== undefined && value !== null && value.length > 0;
}

export function formatCPTData(state, post, categories) {
  return {
    id: post.id,
    author: getPostAuthor(state, post),
    publishDate: post.date,
    title: post.title.rendered,
    categories: getPostCategories(state, post, categories),
    tags: getPostTags(state, post),
    link: post.link,
    featured_media: getMediaAttributes(state, post.featured_media),
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    acf: post.acf,
  };
}

export function formatPostData(state, post) {
  return {
    id: post.id,
    author: getPostAuthor(state, post),
    publishDate: post.date,
    title: post.title.rendered,
    categories: getPostCategories(state, post),
    tags: getPostTags(state, post),
    link: post.link,
    featured_media: getMediaAttributes(state, post.featured_media),
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    acf: post.acf,
  };
}

export function splitPosts(state, routeData) {
  const firstThreePosts = [];
  const otherPosts = [];

  routeData.forEach((item, idx) => {
    const itemData = state.source[item.type][item.id];
    if (idx < 3) firstThreePosts.push(itemData);
    else otherPosts.push(itemData);
  });

  return [firstThreePosts, otherPosts];
}

export function omitConnectProps(props) {
  const out = {};
  const propsToOmit = [
    "state",
    "actions",
    "roots",
    "fills",
    "libraries",
    "getSnapshot",
  ];
  const isGetSnapshot = (prop) =>
    typeof prop === "function" && prop.name === "getSnapshot";

  for (const prop in props) {
    if (propsToOmit.includes(prop) || isGetSnapshot(prop)) continue;
    out[prop] = props[prop];
  }

  return out;
}

export const formatedDate = (date) => dayjs(date).fromNow();

export function formatDateWithMoment(date, format) {
  return dayjs(date).format(format ? format : "MMM DD, YYYY");
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "December",
];

const formatDay = (day) => {
  const lastLetter = day[day.length - 1];
  if (lastLetter) return `${day}nd`;
  if (lastLetter) return `${day}st`;
  if (lastLetter) return `${day}rd`;
  return `${day}th`;
};

export function formatDate(date) {
  const jsDate = new Date(date);
  const day = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return `${formatDay(day)} ${monthNames[month]}, ${year}`;
}

export function isUrl(str) {
  // let regexp =
  //   /(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-/]))?/;
  let regexp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]+)*\/?$/;
  return regexp.test(str);
}

export function debounce(fn) {
  let queued = null;
  return [
    (...args) => {
      if (queued) cancelAnimationFrame(queued);
      queued = requestAnimationFrame(fn.bind(fn, ...args));
    },
    () => {
      cancelAnimationFrame(queued);
    },
  ];
}
