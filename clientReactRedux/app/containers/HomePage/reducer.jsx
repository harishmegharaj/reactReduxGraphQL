import produce from 'immer';
import {
  FETCH_DATA_START,
  FETCH_DATA_ERROR,
  FETCH_DATA_SUCCESS,
  POST_CREATE_NUTRITION_START,
  POST_CREATE_NUTRITION_SUCCESS,
  POST_CREATE_NUTRITION_ERROR,
  DELETE_NUTRITION_START,
  DELETE_NUTRITION_ERROR,
  DELETE_NUTRITION_SUCCESS
} from './actions';

// The initial state of the App
export const initialState = {
  // username: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_DATA_START:
        return {
          ...state,
          loading: true,
          error: false
        }

      case FETCH_DATA_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
          loadError: action.err
        }

      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          loadData: action.data
        }

      case POST_CREATE_NUTRITION_START:
        return {
          ...state,
          loading: true,
          error: false
        }

      case POST_CREATE_NUTRITION_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        }

      case POST_CREATE_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          successData: action.data
        }

      case DELETE_NUTRITION_START:
        return {
          ...state,
          loading: true,
          error: false
        }

      case DELETE_NUTRITION_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        }

      case DELETE_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          resDeleteData: action.data
        }

    }
  });

export default homeReducer;
