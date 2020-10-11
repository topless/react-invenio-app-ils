import { itemApi } from '@api/items';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'itemsSearchBarcode/IS_LOADING';
export const SUCCESS = 'itemsSearchBarcode/SUCCESS';
export const HAS_ERROR = 'itemsSearchBarcode/HAS_ERROR';
export const CLEAR_SEARCH = 'itemsSearchBarcode/CLEAR_SEARCH';

export const fetchItems = barcode => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await itemApi.list(
        itemApi
          .query()
          .withBarcode(barcode)
          .qs()
      );

      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const clearResults = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SEARCH,
    });
  };
};
