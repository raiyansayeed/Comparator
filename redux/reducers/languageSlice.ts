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
        creators: ["Brendan Eich"],
        hello_world: 
        `
        var i;
        var fib = []; // Initialize array!
        
        fib[0] = 0;
        fib[1] = 1;
        for (i = 2; i <= 10; i++) {
          // Next fibonacci number = previous + one before previous
          // Translated to JavaScript:
          fib[i] = fib[i - 2] + fib[i - 1];
          console.log(fib[i]);
        }`
    },
    {
        name: "Rust",
        paradigms: ["Functional", "Imperative", "Structured"],
        types: ["Compiled"],
        website: "www.rust-lang.org",
        creators: ["Graydon Hoare"],
        hello_world: `println("Hello World!")`
    },
    {
        name: "Elixir",
        paradigms: ["Functional", "Concurrent", "Distributed", "Process-oriented"],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
        hello_world: `IO.puts("Hello World!")`
    },
    {
        name: "Elixir",
        paradigms: ["Functional", "Concurrent", "Distributed", "Process-oriented"],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
    },
    {
        name: "Elixir",
        paradigms: ["Functional", "Concurrent", "Distributed", "Process-oriented"],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
    },
    {
        name: "Elixir",
        paradigms: ["Functional", "Concurrent", "Distributed", "Process-oriented"],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
    },
    {
        name: "Elixir",
        paradigms: ["Functional", "Concurrent", "Distributed", "Process-oriented"],
        types: ["Compiled"],
        website: "www.elixir-lang.org",
        creators: ["Jose Valim"],
    },

]

var keywordList = [];
// create keywords for each lang
function createKeywords(l_list) {
    var newList = [];
    l_list.forEach(function (item, index) {
        var tmp = [];
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

                tmp.push(item[key].toLowerCase());
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

                    tmp.push(k_item.toLowerCase());
                });
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

export const languageSlice = createSlice({
    name: "languages",
    initialState: {
        list: createKeywords(origList),
    },
    reducers: {},
});

export const selectLanguages = (state) => state.languages.list;

export default languageSlice.reducer;
