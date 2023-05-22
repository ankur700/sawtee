const PublicationArchiveHandler = {
  pattern: "/publications/:slug",
  func: async ({ route, params, state, libraries }) => {
    // Get the page of the current route.
    const { page } = libraries.source.parse(route);

    const categoryidResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { slug: params.slug },
    });

    const [categoryID] = await libraries.source.populate({
      state,
      response: categoryidResponse,
    });

    // Get the posts from those categories.
    const postsResponse = await libraries.source.api.get({
      endpoint: "publications",
      params: { categories: categoryID.id, page, _embed: true, per_page: 6 },
    });
    const items = await libraries.source.populate({
      state,
      response: postsResponse,
    });

    // Populate state.source.data with the proper info about this URL.
    Object.assign(state.source.data[route], {
      id: categoryID.id,
      items,
    });
  },
};

export default PublicationArchiveHandler;
