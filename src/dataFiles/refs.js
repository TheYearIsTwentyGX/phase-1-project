let currentIndex = 0;
let dataPoints;
let dataSets;
let filters;
let results;
let scope;
let stateSelects;
let subfilters = [ {value: undefined} ];
let submit;

const UrlStyles = {
    Basic: "https://datausa.io/api/data?",
    Uranium: "https://api-ts-uranium.datausa.io/tesseract/data?"
}