import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux'
import {
    selectLanguages
} from "./languageSlice";
import {
    querySlice,
    selectQueries,
    
} from "./querySlice";

export const hitsSlice = createSlice({
    name: "hits",
    initialState: {
        list: [],
    },
    reducers: {
        updateHits: (state, action) => {
            var queries = action.payload[0];
            var languages = action.payload[1];
            var tmp = [];
            queries.forEach(function (query, index) {
                languages.forEach(function (item, index) {
                    if (
                        item["keywords"].includes(query)
                    ) {
                        tmp.push(item);
                    }
                });
            });
            state.list = tmp;
        },
    },
});

export const { updateHits } = hitsSlice.actions;

export const selectHits = (state) => state.hits.list;

export default hitsSlice.reducer;
