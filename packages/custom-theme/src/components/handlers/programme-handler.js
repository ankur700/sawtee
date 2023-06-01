const ProgramsHandler = {
  name: "events",
  priority: 10,
  pattern: "/programmes",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "featured-events",
      params: {
        _embed: true,
        orderBy: "id",
        order: "desc",
        // offset: 1,
        per_page: 10, // To make sure you get all of them
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

export default ProgramsHandler;
