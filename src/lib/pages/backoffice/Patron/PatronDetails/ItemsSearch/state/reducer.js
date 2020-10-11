import { IS_LOADING, SUCCESS, HAS_ERROR, CLEAR_SEARCH } from './actions';

export const initialState = {
  isLoading: true,
  hasError: false,
  data: {},
  error: {},
  executedSearch: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true, executedSearch: true };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        executedSearch: true,
        error: {},
        hasError: false,
      };
    case HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        executedSearch: true,
        error: action.payload,
        hasError: true,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        data: {},
        error: {},
        hasError: false,
        executedSearch: false,
      };
    default:
      return state;
  }
};
