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
  SYMBOL_CREATE_RESET,
  SYMBOL_UPDATE_RESET,
  SYMBOL_DELETE_RESET,
} from "../constants/currencyConstants";
import axios from "axios";

export const createSymbol = (symbol) => async (dispatch, getState) => {
  try {
    dispatch({ type: SYMBOL_CREATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/create-symbol/`, symbol, config);
    dispatch({ type: SYMBOL_CREATE_SUCCESS, payload: data, success: true });
    dispatch({ type: SYMBOL_CREATE_RESET });
  } catch (error) {
    dispatch({
      type: SYMBOL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSymbol = (symbol) => async (dispatch, getState) => {
  try {
    dispatch({ type: SYMBOL_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/update-symbol/`, symbol, config);
    dispatch({ type: SYMBOL_UPDATE_SUCCESS, payload: data, success: true });
    dispatch({ type: SYMBOL_UPDATE_RESET });
  } catch (error) {
    dispatch({
      type: SYMBOL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSymbols = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SYMBOL_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/symbols/`, config);
    dispatch({ type: SYMBOL_LIST_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: SYMBOL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSymbol = (symbol) => async (dispatch, getState) => {
  try {
    dispatch({ type: SYMBOL_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/delete-symbol/${symbol}`);
    dispatch({ type: SYMBOL_DELETE_SUCCESS, payload: data });
    dispatch({ type: SYMBOL_DELETE_RESET });
  } catch (error) {
    dispatch({
      type: SYMBOL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPositions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POSITION_LIST_REQUEST });
    const { data } = await axios.get(`/api/positions/`);
    dispatch({ type: POSITION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POSITION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
