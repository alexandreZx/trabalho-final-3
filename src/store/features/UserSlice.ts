import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import User from '../../types/User'
import { Recado } from "../../types/Recados";

const users: User[] = []

interface AddRecadoPayload{
    email:string;
    recado: Recado;
}

export const UserSlice= createSlice({
    name: 'user',
    initialState:{
      users,
    },
    reducers: {
        cadastrarUser(state, action: PayloadAction<User>){
            state.users= [...state.users, action.payload];
        },
        deletarUser(state, action: PayloadAction<User>){
            const index = state.users.findIndex(
                (obj)=>obj.name === action.payload.name
            );
            state.users.splice(index, 1)
        },
        adicionarRecado(state, action: PayloadAction<AddRecadoPayload>){
            const {email, recado}= action.payload;
            const UserIndex = state.users.findIndex((user)=> user.email === email);

            if(UserIndex !== -1){
                state.users[UserIndex].recados?.push(recado)
            }
        },
    },
})
export const {cadastrarUser, deletarUser }= UserSlice.actions;
export default UserSlice.reducer