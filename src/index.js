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
    submit.addEventListener('click', (e) => getData2(e));
    scope.addEventListener('change', scopeChange);

    //Populate the dropdowns
    populateSelect(dataSet1, dataPoints);
    populateSelect(dataSet2, dataPoints);
    populateSelect(stateSelects[0], states);
    populateSelect(stateSelects[1], states);
})

async function getData2(e) {
    e.preventDefault();
    let url = "";
    let drilldowns = "&drilldowns=";
    //dataSet1
    url = buildURL(dataSet1.value);
    console.log(url);
    await fetchData(url).then(d => console.log(dataPoints[dataSet1.value].parse(d.data)));

    //appendNewChild(results, 'div', {html: dataPoints[dPoints.value].format(data, "All"), style: "white-space: pre-line; color: white;"});
}

function buildURL(datapoint) {
    drilldowns = dataPoints[datapoint].drilldowns;
    if (drilldowns == undefined)
        drilldowns = [];
    let retUrl = dataPoints.apiCall(datapoint);
    switch (scope.value) {
        case "Single_State":
            retUrl += `&${states.apiCall("Alabama")}`;
            break;
        case "National":
            console.log("not implemented");
            break;
        case "All_States":
            drilldowns.push("State");
            break;
    }
    console.log(drilldowns);
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

