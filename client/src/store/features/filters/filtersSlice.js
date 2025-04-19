import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryFilters: [],
    locationFilters: []
}




const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        addCategoryFilterOption(state, action) {
            state.categoryFilters.push(action.payload);
        },
        removeCategoryFilterOption(state, action) {
            state.categoryFilters = state.categoryFilters.filter((value) => value != action.payload);
        },
        addLocationFilterOption(state, action) {
            state.locationFilters.push(action.payload);
        },
        removeLocationFilterOption(state, action) {
            state.locationFilters = state.locationFilters.filter((value) => value != action.payload);
        }
    }
})


export const { addCategoryFilterOption, removeCategoryFilterOption, addLocationFilterOption, removeLocationFilterOption } = filtersSlice.actions;

export default filtersSlice.reducer;




