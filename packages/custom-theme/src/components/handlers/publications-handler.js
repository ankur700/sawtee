const PublicationsHandler = {
  priority: 10,
  pattern: "get-publications",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "publications",
      params: {
        _embed: true,
        orderBy: "menu_order",
        order: "desc",
        per_page: 60, // To make sure you get all of them
      },
    });

    // 2. get an array with each item in json format
    const items = await response.json();

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      items,
    });
  },
};

export default PublicationsHandler;