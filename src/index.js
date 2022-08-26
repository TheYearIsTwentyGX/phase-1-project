document.addEventListener("DOMContentLoaded", () => {
    //Get necessary elements from DOM
    dataSets = Array.from(document.querySelectorAll('select[name="dataset"]')); 
    dataSet1 = document.querySelector('#data-set-1');
    dataSet2 = document.querySelector('#data-set-2');
    scope = document.querySelector('#scope');
    filters = Array.from(document.querySelectorAll('select[name="filter"]'));
    subfilters = Array.from(document.querySelectorAll('select[name="subfilter"]'));
    stateSelects = document.querySelectorAll('select[name="states"]');
    results = document.querySelector('#results');
    submit = document.querySelector('#submit');
    submit.addEventListener('click', (e) => getData(e));
    scope.addEventListener('change', scopeChange);
    dataSets[0].addEventListener('change', dataPointChange);
    dataSets[1].addEventListener('change', dataPointChange);
    filters[0].addEventListener('change', subFilterChange);
    filters[1].addEventListener('change', subFilterChange);
    //Populate the dropdowns
    
    populateSelect(dataSets[0], dataPoints);
    populateSelect(dataSets[1], dataPoints);
    populateSelect(stateSelects[0], states);
    populateSelect(stateSelects[1], states);
    populateSelect(filters[0], ["Occupations", "States"]);
    populateSelect(filters[1], ["Occupations", "States"]);
    populateSelect(subfilters[0], occupations);
    populateSelect(subfilters[1], occupations);
})

async function getData(e) {
    e.preventDefault();
    results.innerHTML = '';
    let configs;
    //dataSet1
    currentIndex = 0;
    configs = buildURL(dataSets[0].value);
    let fetchResults = await fetchData(configs.URL).then(d => {console.log(d); return dataPoints[dataSet1.value].parse(d.data, configs.Config)});
    appendNewChild(results, 'span', {html: dataPoints[dataSet1.value].format(fetchResults), style: "white-space: pre-line;"});
    currentIndex = 1;
    configs = buildURL(dataSets[1].value);
    fetchResults = await fetchData(configs.URL).then(d => dataPoints[dataSet2.value].parse(d.data, configs.Config));
    appendNewChild(results, 'span', {html: dataPoints[dataSet2.value].format(fetchResults), style: "white-space: pre-line;"});
}

function buildURL(datapoint) {
    reloadArgs();
    let retObj = {};
    retObj.Config = {};
    let drilldowns = undefined;
    drilldowns = dataPoints[datapoint].drilldowns;
    if (drilldowns == undefined)
        drilldowns = [];
    let retUrl = dataPoints.apiCall(datapoint);
    switch (scope.value) {
        case "Single_State":
            retUrl += `&${states.apiCall(stateSelects[currentIndex].value)}`;
            break;
        case "National":
            break;
        case "All_States":
            drilldowns.push("State");
            break;
    }
    switch (filters[currentIndex].value) {
        case "Occupations":
            retUrl += `${occupations.apiCall(subfilters[currentIndex].value)}`;
            break;
            //retObj.Config.Occ = subfilters[currentIndex].value;
        }
    if (dataSets[currentIndex].value === "Health") {
        retObj.Config.measure = health[filters[currentIndex].value][subfilters[currentIndex].value].measure;
        retObj.Config.display = health[filters[currentIndex].value][subfilters[currentIndex].value];
    }
    retObj.Config.Subject = subfilters[currentIndex].value;
    let drillString = '&drilldowns=';
    for (let drill of drilldowns) {
        drillString += drill + ',';
    }
    if (drillString.endsWith(','))
        drillString = drillString.substring(0, drillString.length - 1);
    if (!retUrl.includes('&Year='))
        retUrl += "&Year=latest";
    retObj.URL = retUrl + ((drillString==`&drilldowns=`) ? '' : drillString);
    console.log(retObj.URL);
    return retObj;
}

