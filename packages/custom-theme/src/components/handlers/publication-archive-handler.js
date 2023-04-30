const PublicationArchiveHandler = {
  name: "publications",
  priority: 10,
  pattern: "/publications/:slug",
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

    // Get the ids of all the child categories.
    const childCatsResponse = await libraries.source.api.get({
      endpoint: "categories",
      params: { parent: parentCat.id },
    });
    const childCats = await libraries.msource.populate({
      state,
      response: childCatsResponse,
    });
    const ids = childCats.map((cat) => cat.id);
    ids.push(parentCat.id);

    // Get the posts from those categories.
    const postsResponse = await libraries.source.api.get({
      endpoint: "publications",
      params: { categories: ids.join(","), page, _embed: true, per_page: 100 },
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

export default PublicationArchiveHandler;
