import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../pages/models/user";

const initial: User = {
  _id : "",
  name : "",
  password : "",
  username : "",
  wishList : [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    "currente" : initial
  },
  reducers: {
    addLogin: (state, action: PayloadAction<User>) => {
      state.currente = action.payload;
    }
  }
})

export const {addLogin} = loginSlice.actions

export const selectCount = (state: RootState) => state.login.currente

export default loginSlice.reducer