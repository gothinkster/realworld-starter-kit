export default (
  state = {
    tags: [],
    tab: 'global',
    articles: { loading: true, list: [], page: 0, pageAmount: 1 },
  },
  action,
) => {
  return action.type === 'LOAD_HOME'
    ? {
        ...state,
        tags: action.tags,
        articles: {
          ...state.articles,
          loading: true,
          list: [],
        },
      }
    : action.type === 'START_LOAD_PAGE'
    ? {
        ...state,
        articles: {
          ...state.articles,
          page: action.page,
          loading: true,
        },
      }
    : action.type === 'LOAD_PAGE'
    ? {
        ...state,
        articles: {
          ...state.articles,
          loading: false,
          list: action.articles,
          pageAmount: action.pageAmount,
        },
      }
    : action.type === 'CHANGE_TAB'
    ? {
        ...state,
        tab: action.tab,
        articles: {
          loading: true,
          list: [],
          pageAmount: 0,
        },
      }
    : state;
};
