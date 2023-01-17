import {
  SYMBOL_CREATE_SUCCESS,
  SYMBOL_CREATE_REQUEST,
  SYMBOL_CREATE_FAIL,
  SYMBOL_UPDATE_SUCCESS,
  SYMBOL_UPDATE_REQUEST,
  SYMBOL_UPDATE_FAIL,
  SYMBOL_LIST_SUCCESS,
  SYMBOL_LIST_REQUEST,
  SYMBOL_LIST_FAIL,
  SYMBOL_DELETE_SUCCESS,
  SYMBOL_DELETE_REQUEST,
  SYMBOL_DELETE_FAIL,
  POSITION_LIST_SUCCESS,
  POSITION_LIST_REQUEST,
  POSITION_LIST_FAIL,
} from "../constants/currencyConstants";

export const symbolCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SYMBOL_CREATE_REQUEST:
      return { loading: true };
    case SYMBOL_CREATE_SUCCESS:
      return { loading: false, success: true, symbol: action.payload };
    case SYMBOL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const symbolUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SYMBOL_UPDATE_REQUEST:
      return { loading: true };
    case SYMBOL_UPDATE_SUCCESS:
      return { loading: false, success: true, symbol: action.payload };
    case SYMBOL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const symbolListReducer = (state = { symbols: [] }, action) => {
  switch (action.type) {
    case SYMBOL_LIST_REQUEST:
      return { loading: true };
    case SYMBOL_LIST_SUCCESS:
      return { loading: false, symbols: action.payload };
    case SYMBOL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const symbolDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SYMBOL_DELETE_REQUEST:
      return { loading: true };
    case SYMBOL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SYMBOL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const positionListReducer = (state = { positions: [] }, action) => {
  switch (action.type) {
    case POSITION_LIST_REQUEST:
      return { loading: true };
    case POSITION_LIST_SUCCESS:
      return { loading: false, positions: action.payload };
    case POSITION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
