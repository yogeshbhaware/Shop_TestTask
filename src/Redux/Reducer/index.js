import { combineReducers } from "redux";
import { DataReducer, GetSHopReducer, TestReducer } from "./reducer";

 export const reducer = combineReducers({
   
    shopData:TestReducer,
})