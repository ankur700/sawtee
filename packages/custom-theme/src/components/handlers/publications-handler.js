const PublicationHandler = {
  name: "publications",
  priority: 10,
  pattern: "/publications",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "publications",
      params: {
        _embed: true,
        orderBy: "menu-order",
        order: "asc",
        per_page: 100, // To make sure you get all of them
      },
    });

    // 2. get an array with each item in json format
    const items = await response.json();
    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      isReady: true,
      items,
    });
  },
};

export default PublicationHandler;
