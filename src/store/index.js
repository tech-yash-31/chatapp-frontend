import { createStore, combineReducers } from "redux";
import groupReducer from "../store/reducer/groupReducer";
import userReducer from "../store/reducer/userReducer";

const rootReducer = combineReducers({
  groups: groupReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
