import { combineReducers } from "redux";
import { DataReducer, TestReducer } from "./reducer";

export const reducer = combineReducers({
    shopData:TestReducer
})