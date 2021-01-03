import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: "queries",
    initialState: {
        list: [],
        inList: false,
    },
    reducers: {
        deleteTag: (state, action) => {
            // you can write mutable code since immer library will make it immutable
            return {
                ...state,
                list: state.list.filter((x) => x != action.payload),
            };
        },
        addTag: (state, action) => {
            state.list.push(action.payload);
        },
    },
});

export const { deleteTag, addTag } = querySlice.actions;

export const selectQueries = (state) => state.queries.list;

export default querySlice.reducer;
