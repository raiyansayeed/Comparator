import { createSlice } from "@reduxjs/toolkit";

var origList = [
    {
        name: "Javascript",
        paradigms: [
            "Procedural",
            "Structured",
            "Object-Oriented",
            "Functional",
            "Event-Driven",
        ],
        types: ["Compiled", "Interpreted"],
        website: "N/A",
        authors: ["Brendan Eich"],
    },
    {
        name: "Rust",
        paradigms: ["Functional", "Imperative", "Structured"],
        types: ["Compiled"],
        website: "www.rust-lang.org",
        authors: ["Graydon Hoare"],
    },
]

var keywordList = [];
// create keywords for each lang
function createKeywords(l_list) {
    console.log("effect");
    console.log(l_list);
    var newList = [];
    l_list.forEach(function (item, index) {
        var tmp = [];
        // console.log(item)
        Object.keys(item).forEach(function (key, index) {
            var k = item[key];

            // handle single str
            if (typeof k === "string" || k instanceof String) {
                // handle N/A case
                if (k == "N/A") return;

                // handle duplicates
                if (
                    item.hasOwnProperty("keywords") &&
                    item["keywords"].includes(k)
                )
                    return;

                tmp.push(item[key]);
            }

            // handle array
            if (k instanceof Array) {
                k.forEach(function (k_item, index) {
                    // handle duplicates
                    if (
                        item.hasOwnProperty("keywords") &&
                        item["keywords"].includes(k_item)
                    )
                        return;

                    tmp.push(k_item);
                });
            }
        });
        var newLang = item;
        if (newLang.hasOwnProperty("keywords"))
            newLang["keywords"] = newLang["keywords"].concat(tmp);
        else newLang["keywords"] = tmp;
        newList.push(newLang);
    });
    console.log("New list");
    console.log(newList);
    return newList;
}

export const languageSlice = createSlice({
    name: "languages",
    initialState: {
        list: createKeywords(origList),
    },
    reducers: {},
});

export const selectLanguages = (state) => state.languages.list;

export default languageSlice.reducer;
