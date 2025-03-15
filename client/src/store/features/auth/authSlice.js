import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    role: "",
    userInfo: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.userInfo = action.payload;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.role = ""
            state.userInfo = null;
        }
    }
})



export const { login, logout } = authSlice.actions;

export default authSlice.reducer;