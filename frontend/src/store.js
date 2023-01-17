import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  symbolCreateReducer,







  
  symbolUpdateReducer,
  symbolListReducer,
  symbolDeleteReducer,
  positionListReducer,
} from "./reducers/currencyReducers";


const reducer = combineReducers({
  symbolCreate: symbolCreateReducer,
  symbolUpdate: symbolUpdateReducer,
  symbolList: symbolListReducer,
  symbolDelete: symbolDeleteReducer,
  positionList: positionListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
