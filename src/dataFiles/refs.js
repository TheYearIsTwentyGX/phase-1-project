//I'm going to apologize in advance that I'm not consistent with my casing for the first letter of my variables. I program in C# at work, so I'm used to PascalCasing, and frequently slip up and use it here instead of camelCasing.

//The majority of the variables specified here are needed to be defined early, some with a placeholder value such as 'subfilters'.
//I treated this similar to a C++ header file. Some of them didn't *need* to be defined here, but I did it for consistency so that I knew where to look for them.
let currentIndex = 0;
let dataPoints;
let dataSets;
let filters;
let results;
let scope;
let stateSelects;
let subfilters = [ {value: undefined} ];
let submit;

//These are the specific filters to be shown in the dropdown for each dataSet.
const averageWageFilters = ["No Filter", "Gender", "Occupations", "Race"];
const povertyFilters = ["No Filter", "Gender", "Race"];

//These are values to ignore for certain loops. 'ignoreProps' is used in the 'populateSelect' function, and 'ignoreStates' is used in the 'parseData' function.
const ignoreProps = ["apiCall", "generalData", "scopes"];
const ignoreStates = ["District of Columbia", "Puerto Rico"];

//As specified in a comment from dataPoints.js, I created this variable with an assumption I was going to come across more than 2 URL styles with the API, as I ran across these 2 URLs very early in the project, and assumed it would happen again.
//Even though I didn't end up coming across more, I decided to leave it in for expandability.
const UrlStyles = {
    Basic: "https://datausa.io/api/data?",
    Uranium: "https://api-ts-uranium.datausa.io/tesseract/data?"
}

//I couldn't find a good way to have a function as an objects property while having it still be dynamic, so this is a workaround.
//The values grabbed after 'measure=' would always return what their value was when the health object was defined.
//I *think* this could have been fixed with classes, but I have significant experience with classes from C#, so I had a personal challenge to avoid OOP for this project.
function reloadArgs() {
    if (dataSets[currentIndex].value === "Health")
        dataPoints["Health"].arg = (function() { return `measure=${health[filters[currentIndex].value][subfilters[currentIndex].value].measure}`; })();
}