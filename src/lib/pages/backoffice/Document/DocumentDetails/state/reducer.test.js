import reducer, { initialState } from './reducer';
import {
  DELETE_IS_LOADING,
  DELETE_SUCCESS,
  DELETE_HAS_ERROR,
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
} from './actions';

describe('Fetch document details reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on loading action', () => {
    const action = {
      type: IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const document = { document_id: '1232423' };
    const action = {
      type: SUCCESS,
      payload: document,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: document,
      hasError: false,
    });
  });

  it('should change error state on error action', () => {
    const action = {
      type: HAS_ERROR,
      payload: 'Error',
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error',
      hasError: true,
    });
  });
});

describe('Delete document reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on document delete', () => {
    const action = {
      type: DELETE_IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should keep loading to re-fetch documents on deleted document success', () => {
    const action = {
      type: DELETE_SUCCESS,
      payload: { documentPid: 1 },
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change error state on delete document error', () => {
    const action = {
      type: DELETE_HAS_ERROR,
      payload: { response: { status: 404 } },
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
      error: { response: { status: 404 } },
    });
  });
});
