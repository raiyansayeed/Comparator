import { createSlice } from "@reduxjs/toolkit";

type Language = {
    name: string;
    paradigms: string[];
    types: string[];
    website: string;
    creators: string[];
    hello_world: string;
};

type LanguageWithKw = {
    name: string;
    paradigms: string[];
    types: string[];
    website: string;
    creators: string[];
    hello_world: string;
    keywords: string[];
};

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
        creators: ["Brendan Eich"],
        hello_world: `
        var i;
        var fib = []; // Initialize array!
        
        fib[0] = 0;
        fib[1] = 1;
        for (i = 2; i <= 10; i++) {
          // Next fibonacci number = previous + one before previous
          // Translated to JavaScript:
          fib[i] = fib[i - 2] + fib[i - 1];
          console.log(fib[i]);
        }`,
    },
    {
        name: "Rust",
        paradigms: ["Functional", "Imperative", "Structured"],
        types: ["Compiled"],
        website: "www.rust-lang.org",
        creators: ["Graydon Hoare"],
        hello_world: `println("Hello World!")`,
    },
    {
        name: "Elixir",
        paradigms: [
            "Functional",
            "Concurrent",
            "Distributed",
            "Process-oriented",
        ],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
        hello_world: `IO.puts("Hello World!")`,
    },
    {
        name: "Elixir",
        paradigms: [
            "Functional",
            "Concurrent",
            "Distributed",
            "Process-oriented",
        ],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
        hello_world: `IO.puts("Hello World!")`,
    },
    {
        name: "Elixir",
        paradigms: [
            "Functional",
            "Concurrent",
            "Distributed",
            "Process-oriented",
        ],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
        hello_world: `IO.puts("Hello World!")`,
    },
    {
        name: "Elixir",
        paradigms: [
            "Functional",
            "Concurrent",
            "Distributed",
            "Process-oriented",
        ],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
        hello_world: `IO.puts("Hello World!")`,
    },
    {
        name: "Elixir",
        paradigms: [
            "Functional",
            "Concurrent",
            "Distributed",
            "Process-oriented",
        ],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
        hello_world: `IO.puts("Hello World!")`,
    },
];

// create keywords for each lang
function createKeywords(l_list: Language[]) {
    var newList = [];
    l_list.forEach(function (item, index) {
        var tmp = [];
        // get values from each property of Language object
        Object.keys(item).forEach(function (key, index) {
            switch (key) {
                // list of unnecessary properties to tag like hello_world source code
                case "hello_world":
                    break;
                case "website":
                    break;
                default: {
                    var value = item[key];

                    // handle single str
                    if (typeof value === "string" || value instanceof String) {
                        // handle N/A case
                        if (value == "N/A") return;

                        // handle duplicates
                        if (
                            item.hasOwnProperty("keywords") &&
                            item["keywords"].includes(value)
                        )
                            return;

                        tmp.push(item[key].toLowerCase());
                    }

                    // handle array
                    if (value instanceof Array) {
                        value.forEach(function (k_item, index) {
                            // handle duplicates
                            if (
                                item.hasOwnProperty("keywords") &&
                                item["keywords"].includes(k_item)
                            )
                                return;

                            tmp.push(k_item.toLowerCase());
                        });
                    }
                }
            }
        });
        var newLang = item;
        if (newLang.hasOwnProperty("keywords"))
            newLang["keywords"] = newLang["keywords"].concat(tmp);
        else newLang["keywords"] = tmp;
        newList.push(newLang);
    });
    return newList;
}

function createAllKeyWords(l_list: LanguageWithKw[]) {
    let new_kw_list = [];

    // add all keywords from each lang
    l_list.forEach(function (item, index) {
        new_kw_list = new_kw_list.concat(item.keywords);
    });

    // remove duplicates
    new_kw_list = new_kw_list.filter((v, i, a) => a.indexOf(v) === i);
    console.log(new_kw_list);

    return new_kw_list;
}

export const languageSlice = createSlice({
    name: "languages",
    initialState: {
        list: createKeywords(origList),
        kw_list: createAllKeyWords(createKeywords(origList)),
    },
    reducers: {},
});

export const selectLanguages = (state) => state.languages.list;
export const selectKwList = (state) => state.languages.kw_list;

export default languageSlice.reducer;
