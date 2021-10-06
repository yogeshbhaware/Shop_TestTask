
import { ADD_SHOP} from "../Actions/actionType";
import { GET_SHOP } from "../Actions/actionType";

export const TestReducer   = (state=[], action ) => {
    switch(action.type){
        case ADD_SHOP:
            return{
                shops:action.payload
            }
      
        default: return state;
    }
}


