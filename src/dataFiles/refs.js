let currentIndex = 0;
let dataPoints;
let dataSets;
let filters;
let results;
let scope;
let stateSelects;
let subfilters = [ {value: undefined} ];
let submit;

const ignoreProps = ["apiCall", "generalData", "scopes"];
const ignoreStates = ["District of Columbia", "Puerto Rico"];

const UrlStyles = {
    Basic: "https://datausa.io/api/data?",
    Uranium: "https://api-ts-uranium.datausa.io/tesseract/data?"
}

function reloadArgs() {
    if (dataSets[currentIndex].value === "Health")
        dataPoints["Health"].arg = (function() { return `measure=${health[filters[currentIndex].value][subfilters[currentIndex].value].measure}`; })();
}

/* PROPERTIES
loc
subject
value
formattedValue
text

rank
color
*/