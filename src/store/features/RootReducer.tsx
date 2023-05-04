import { combineReducers } from "@reduxjs/toolkit";
import usuarios from "./UserSlice";
import recados from "./recadosSlice";


export default combineReducers({
    usuarios,
    recados,
});