let dataSet1;
let dataSet2;
let scope;
let submit;
let results;
let occResults;
let stateSelects;

document.addEventListener("DOMContentLoaded", () => {
    //Get necessary elements from DOM
    dataSet1 = document.querySelector('#data-set-1');
    dataSet2 = document.querySelector('#data-set-2');
    scope = document.querySelector('#scope');
    stateSelects = document.querySelectorAll('#states-div select');
    results = document.querySelector('#results');
    submit = document.querySelector('#submit');
    submit.addEventListener('click', (e) => getData(e));
    scope.addEventListener('change', scopeChange);

    //Populate the dropdowns
    populateSelect(dataSet1, dataPoints);
    populateSelect(dataSet2, dataPoints);
    populateSelect(stateSelects[0], states);
    populateSelect(stateSelects[1], states);
})

async function getData(e) {
    e.preventDefault();
    let url = "";
    //dataSet1
    url = buildURL(dataSet1.value, 0);
    let results1 = await fetchData(url).then(d => dataPoints[dataSet1.value].parse(d.data));
    if (dataSet1.value == "Election Results")
        appendNewChild(results, 'div', {html: dataPoints[dataSet1.value].format(results1), style: "white-space: pre-line;"});
    console.log(results1);
}

function buildURL(datapoint, index) {
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
    let drillString = '&drilldowns=';
    for (let drill of drilldowns) {
        drillString += drill + ',';
    }
    if (drillString.endsWith(','))
        drillString = drillString.substring(0, drillString.length - 1);
    if (!retUrl.includes('&Year='))
        retUrl += "&Year=latest";
    return retUrl + ((drillString==`&drilldowns=`) ? '' : drillString);
}

