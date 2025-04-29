import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import filterReducer from "./features/filters/filtersSlice";
import { jobApi } from "./features/api/apiSlice";

const store = configureStore({
    reducer:
    {
        auth: authReducer,
        filters: filterReducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobApi.middleware),
})



export { store };