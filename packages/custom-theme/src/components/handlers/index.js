export const GetAllCategoriesHandler = {
  name: "allCategories",
  priority: 10,
  pattern: "get-all-categories",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "categories",
      params: {
        per_page: 100, // To make sure you get all of them
      },
    });

    // 2. get an array with each item in json format
    const results = await response.json();
    const items = results.sort((a, b) => a.id - b.id);
    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      items,
    });
  },
};


export const MenuHandler = {
  name: "menus",
  priority: 10,
  pattern: "/menu/:slug",
  func: async ({ link, params, state, libraries }) => {
    const { slug } = params;

    // Fetch the menu data from the endpoint
    const response = await libraries.source.api.get({
      endpoint: `/menus/v1/menus/${slug}`,
    });

    // Parse the JSON to get the object
    const menuData = await response.json();

    // Add the menu items to source.data
    const menu = state.source.data[link];
    Object.assign(menu, {
      items: menuData.items,
      experts: menuData.acf?.experts,
      introText: menuData.acf?.intro_text,
      introImage: menuData.acf?.intro_image,
      isMenu: true,
    });
  },
};


export const EventsHandler = {
  pattern: "/events",
  func: async ({ route, params, state, libraries }) => {
    // Get the posts from those categories.
    const postsResponse = await libraries.source.api.get({
      endpoint: "featured-events",
      params: { _embed: true, per_page: 6 },
    });
    const items = await libraries.source.populate({
      state,
      response: postsResponse,
    });

    // Populate state.source.data with the proper info about this URL.
    Object.assign(state.source.data[route], {
      items,
    });
  },
};


// export const PublicationArchiveHandler = {
//   pattern: "/publications/:slug",
//   func: async ({ route, params, state, libraries }) => {
//     // Get the page of the current route.
//     const { page } = libraries.source.parse(route);

//     const categoryidResponse = await libraries.source.api.get({
//       endpoint: "categories",
//       params: { slug: params.slug },
//     });

//     const [categoryID] = await libraries.source.populate({
//       state,
//       response: categoryidResponse,
//     });

//     // Get the posts from those categories.
//     const postsResponse = await libraries.source.api.get({
//       endpoint: "publications",
//       params: { categories: categoryID.id, page, _embed: true, per_page: 6 },
//     });
//     const items = await libraries.source.populate({
//       state,
//       response: postsResponse,
//     });

//     // Populate state.source.data with the proper info about this URL.
//     Object.assign(state.source.data[route], {
//       id: categoryID.id,
//       items,
//     });
//   },
// };

export const PublicationsHandler = {
  priority: 10,
  pattern: "get-publications-categories-posts",
  func: async ({ route, params, state, libraries }) => {
    // Get the page of the current route.
    const { page } = libraries.source.parse(route);

    // Get the id of the parent category.
    const parentCatResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { slug: "publications" },
    });
    const [parentCat] = await libraries.source.populate({
      state,
      response: parentCatResponse,
    });
    const childCatsResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { parent: parentCat.id, per_page: 20 },
    });
    const childCats = await libraries.source.populate({
      state,
      response: childCatsResponse,
    });
    const ids = childCats.map((cat) => cat.id);
    let items = [];

    for (const id of ids) {
      let posts = [];
      try {
        const postRes = await libraries.source.api.get({
          endpoint: "publications",
          params: { categories: id, page, _embed: true, per_page: 6 },
        });

        posts = await libraries.source.populate({
          state,
          response: postRes,
        });
      } catch (error) {
        console.error({ name: error.name, mesg: error.message });
      }

      posts.length > 0 && items.push({ id: id, posts: posts });
    }

    // Populate state.source.data with the proper info about this URL.

    const newitems = items.sort((a, b) => a.id - b.id);
    Object.assign(state.source.data[route], {
      isReady: true,
      newitems,
    });
  },
};

export const CategoriesWithParentHandler = {
  pattern: "/category/:category/:slug",
  func: async ({ route, params, state, libraries }) => {
    // Get the page of the current route.
    const { page } = libraries.source.parse(route);

    // Get the id of the parent category.
    const parentCatResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { slug: params.slug },
    });
    const [parentCat] = await libraries.source.populate({
      state,
      response: parentCatResponse,
    });

    console.log(parentCat);

    // Get the ids of all the child categories.
    const childCatsResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { parent: parentCat.id },
    });
    const childCats = await libraries.source.populate({
      state,
      response: childCatsResponse,
    });
    const ids = childCats.map((cat) => cat.id);
    ids.push(parentCat.id);

    // Get the posts from those categories.
    const postsResponse = await libraries.source.api.get({
      endpoint: "posts",
      params: { categories: ids.join(","), page, _embed: true },
    });
    const items = await libraries.source.populate({
      state,
      response: postsResponse,
    });
    const total = libraries.source.getTotal(postsResponse);
    const totalPages = libraries.source.getTotalPages(postsResponse);

    // Populate state.source.data with the proper info about this URL.
    Object.assign(state.source.data[route], {
      id: parentCat.id,
      taxonomy: "category",
      items,
      total,
      totalPages,
      isArchive: true,
      isTaxonomy: true,
      isCategory: true,
    });
  },
};



export const CategoriesHandler = {
  pattern: "/category/:slug",
  func: async ({ route, params, state, libraries }) => {
    // Get the page of the current route.
    const { page } = libraries.source.parse(route);

    // Get the id of the parent category.
    const CatResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { slug: params.slug },
    });
    const [Cat] = await libraries.source.populate({
      state,
      response: CatResponse,
    });

    // Get the posts from those categories.
    const postsResponse = await libraries.source.api.get({
      endpoint: "posts",
      params: { categories: Cat.id, page, _embed: true },
    });
    const items = await libraries.source.populate({
      state,
      response: postsResponse,
    });
    const total = libraries.source.getTotal(postsResponse);
    const totalPages = libraries.source.getTotalPages(postsResponse);

    // Populate state.source.data with the proper info about this URL.
    Object.assign(state.source.data[route], {
      id: Cat.id,
      taxonomy: "category",
      items,
      total,
      totalPages,
      isArchive: true,
      isTaxonomy: true,
      isCategory: true,
    });
  },
};