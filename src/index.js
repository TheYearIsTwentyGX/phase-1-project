let dataSet1;
let dataSet2;
let scope;
let filters;
let subfilters;
let submit;
let results;
let occResults;
let stateSelects;

document.addEventListener("DOMContentLoaded", () => {
    //Get necessary elements from DOM
    dataSet1 = document.querySelector('#data-set-1');
    dataSet2 = document.querySelector('#data-set-2');
    scope = document.querySelector('#scope');
    filters = Array.from(document.querySelectorAll('#filter-div select'));
    subfilters = Array.from(document.querySelectorAll('#sub-filter-div select'));
    stateSelects = document.querySelectorAll('#states-div select');
    results = document.querySelector('#results');
    submit = document.querySelector('#submit');
    submit.addEventListener('click', (e) => getData(e));
    scope.addEventListener('change', scopeChange);
    dataSet1.addEventListener('change', dataPointChange);
    dataSet2.addEventListener('change', dataPointChange);
    filters[0].addEventListener('change', subFilterChange);
    filters[1].addEventListener('change', subFilterChange);

    //Populate the dropdowns
    populateSelect(dataSet1, dataPoints);
    populateSelect(dataSet2, dataPoints);
    populateSelect(stateSelects[0], states);
    populateSelect(stateSelects[1], states);
    populateSelect(filters[0], ["Occupations", "States"]);
    populateSelect(filters[1], ["Occupations", "States"]);
    populateSelect(subfilters[0], occupations);
    populateSelect(subfilters[1], occupations);
})

async function getData(e) {
    e.preventDefault();
    let configs;
    //dataSet1
    configs = buildURL(dataSet1.value, 0);
    let fetchResults = await fetchData(configs.URL).then(d => dataPoints[dataSet1.value].parse(d.data, configs.Config));
    console.log(fetchResults);
    appendNewChild(results, 'span', {html: dataPoints[dataSet1.value].format(fetchResults), style: "white-space: pre-line;"});
    configs = buildURL(dataSet2.value, 0);
    fetchResults = await fetchData(configs.URL).then(d => dataPoints[dataSet2.value].parse(d.data, configs.Confg));
    appendNewChild(results, 'span', {html: dataPoints[dataSet2.value].format(fetchResults), style: "white-space: pre-line;"});
}

function buildURL(datapoint, index) {
    let retObj = {};
    retObj.Config = {};
    let drilldowns = [];
    drilldowns = undefined;
    drilldowns = dataPoints[datapoint].drilldowns;
    if (drilldowns == undefined)
        drilldowns = [];
    let retUrl = dataPoints.apiCall(datapoint);
    switch (scope.value) {
        case "Single_State":
            retUrl += `&${states.apiCall(stateSelects[index].value)}`;
            break;
        case "National":
            console.log("not implemented");
            break;
        case "All_States":
            drilldowns.push("State");
            break;
    }
    switch (filters[index].value) {
        case "Occupations":
            retUrl += `${occupations.apiCall(subfilters[index].value)}`;
            retObj.Config.Occ = subfilters[index].value;
    }
    let drillString = '&drilldowns=';
    for (let drill of drilldowns) {
        drillString += drill + ',';
    }
    if (drillString.endsWith(','))
        drillString = drillString.substring(0, drillString.length - 1);
    if (!retUrl.includes('&Year='))
        retUrl += "&Year=latest";
    retObj.URL = retUrl + ((drillString==`&drilldowns=`) ? '' : drillString);
    return retObj;
}

