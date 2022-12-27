import moment from "moment/moment";

function getSrcSet(media) {
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

// Fetch all categories
export const fetchCategories = async (url, setState) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    let array = [];
    results.forEach((result) => {
      array.push(result);
    });
    setState([...array]);
  } catch (error) {
    console.log("error", error.message);
  }
};

// Fetch all post from a specific post type
export const fetchData = async (url, setState, state, categories) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    let array = [];
    results.forEach((result) => {
      array.push(formatCPTData(state, result, categories));
    });
    setState([...array]);
  } catch (error) {
    console.log("error", error.message);
  }
};

// Fetch media for a single post with postid
export const fetchMedia = async (id, setState) => {
  const url = `https://sawtee.ankursingh.com.np/wp-json/wp/v2/media/${id}`;

  try {
    const response = await fetch(url);
    const responseData = await response.json();
    const srcSet = getSrcSet(responseData);

    if (setState) {
      setState({
        id,
        alt: responseData.alt_text,
        src: responseData.source_url,
        srcSet,
      });
    } else {
      return {
        id,
        alt: responseData.alt_text,
        src: responseData.source_url,
        srcSet,
      };
    }
  } catch (error) {
    console.error("Error fetching media", error.message);
  }
};

export function formatDateWithMoment(date, format) {
  const f = format ? format : "MMMM Do YYYY";
  const formatedDate = moment(date).format(f);
  return formatedDate;
}

export function getPostCategories(state, post, categoriesPool) {
  if (categoriesPool) {
    const categories =
      post.categories &&
      categoriesPool.filter((item) => post.categories.includes(item.id));
    return categories ? categories.filter(Boolean) : [];
  }

  const allCategories = state.source.category;
  const categories =
    post.categories && post.categories.map((catId) => allCategories[catId]);
  return categories ? categories.filter(Boolean) : [];
}

export function getPostAuthor(state, post) {
  return state.source.author[post.author];
}

export function getPostTags(state, post) {
  const allTags = state.source.tag;
  const tags = post.tags && post.tags.map((tagId) => allTags[tagId]);
  return tags ? tags.filter(Boolean) : [];
}

export function getPostData(state) {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  return { ...post, isReady: data.isReady, isPage: data.isPage };
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
    featured_media: post.featured_media,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
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
    sections: post.acf.sections,
    memberInstitutions: post.acf.memberInstitutions,
    sectors: post.acf.sectors,
    intro: post.acf.intro,
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
  const month = jsDate.getMonth() + 1;
  const year = jsDate.getFullYear();

  return `${formatDay(day)} ${monthNames[month]}, ${year}`;
}

export function isUrl(str) {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-/]))?/;
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
