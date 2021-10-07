import { ADD_SHOP } from "./actionType";
import { GET_SHOP } from "./actionType";

export const addshop = (data) => {
  let localData = JSON.parse(localStorage.getItem("shops"));
  localData = localData ? localData : [];
  localData.push(data);
  localStorage.setItem("shops", JSON.stringify(localData));
  console.log(localData);

  return {
    type: ADD_SHOP,
    payload: localData,
  };
};

export const getShop = () => {
  let localData = JSON.parse(localStorage.getItem("shops"));
  localData = localData ? localData : [];
  console.log("action payload get shop", localData)
  return{
    type:GET_SHOP,
    payload:localData
  };
}
