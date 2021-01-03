import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguages } from "./languageSlice";
import { querySlice, selectQueries } from "./querySlice";

export const hitsSlice = createSlice({
    name: "hits",
    initialState: {
        list: [],
    },
    reducers: {
        updateHits: (state, action) => {
            var queries: string[] = action.payload[0];
            var languages = action.payload[1];
            var tmp = [];
            // check if any language matches ALL words in queries
            if (Array.isArray(queries) && queries.length) {
                languages.forEach(function (item, index) {
                    if (queries.every((val) => item["keywords"].includes(val))) {
                        tmp.push(item);
                    }
                });
                state.list = tmp;
            } else {
                state.list = [];
            }
        },
    },
});

export const { updateHits } = hitsSlice.actions;

export const selectHits = (state) => state.hits.list;
export const selectInList = (state) => state.hits.inList;

export default hitsSlice.reducer;
