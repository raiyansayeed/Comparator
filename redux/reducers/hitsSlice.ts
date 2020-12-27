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
            console.log("payload");
            console.log(queries);
            console.log(languages);
            var tmp = [];
            queries.forEach(function (query, index) {
                languages.forEach(function (item, index) {
                    console.log("query");
                    console.log(query);
                    console.log(item);
                    if (
                        item["keywords"].includes(query)
                    ) {
                        tmp.push(item);
                    }
                });
            });
            console.log("createHits");
            // console.log(queryResults);
            // push lang object into query results
            state.list = tmp;
        },
    },
});

export const { updateHits } = hitsSlice.actions;

export const selectHits = (state) => state.hits.list;

export default hitsSlice.reducer;
