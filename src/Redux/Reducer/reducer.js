import { ADD_SHOP } from "../Actions/actionType";

export const TestReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SHOP:
      return {
          
   shops: action.payload,
      };
    case "GET_SHOP":
      return {
        shops: action.payload,
      };

    default:
      return state;
  }
};
