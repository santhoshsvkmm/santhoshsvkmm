import { combineReducers } from "redux";
import languageReducer from "./language";

const settingsReducer = combineReducers({
  language: languageReducer,
});

export default settingsReducer;
