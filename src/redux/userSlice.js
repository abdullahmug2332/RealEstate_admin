// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit"; // ✅ correct


const initialState = {
  name: "",
  email: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email, token } = action.payload;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    clearUser(state) {
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
