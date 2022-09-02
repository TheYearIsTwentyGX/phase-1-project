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

    //Event Listeners
    submit.addEventListener('click', (e) => getData(e));
    scope.addEventListener('change', scopeChange);
    dataSets[0].addEventListener('change', dataPointChange);
    dataSets[1].addEventListener('change', dataPointChange);
    filters[0].addEventListener('change', filterChange);
    filters[1].addEventListener('change', filterChange);
    
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
    let configs = {};
    let tableRows = [];
    //Loop once for each set of data
    for (let counter = 0; counter < 2; counter++) {
        //0 = left col, 1 = right col
        currentIndex = counter;
        //Get the URL to fetch along with the configuration
        configs = buildURL(dataSets[currentIndex].value);
        fetchResults = await fetchData(configs.URL)
            .then(d => dataPoints[dataSets[currentIndex].value].parse(d.data, configs.Config)); //Parse the data down to the info we need
        //Formatting mostly just gets the color based on their ranking
        for (let i = 0; i < fetchResults.length; i++) {
            if (ignoreStates.includes(fetchResults[i].loc))
                continue;
            let currentRow;
            currentRow = (currentIndex === 0) ? appendNewChild(results, 'tr') : tableRows[i];
            let valString = `<span>${fetchResults[i].text.replace(fetchResults[i].formattedValue, `<span style='width:49%; color:${fetchResults[i].color}'>${fetchResults[i].formattedValue}</span>`)}</span>`;
            appendNewChild(currentRow, 'td', {html: valString, style: "white-space: pre-line;"});
            if (currentIndex === 0)
                tableRows.push(currentRow);
        }
    }
    submit.disabled = false;
}

function buildURL(datapoint) {
    reloadArgs();
    let retObj = {};
    retObj.Config = {};
    let drilldowns = undefined;

    //Get any drilldowns necessary for the primary dataPoint
    drilldowns = dataPoints[datapoint].drilldowns;
    if (drilldowns == undefined)
        drilldowns = [];
    //Get the base URL for the dataPoint (e.g.: https://datausa.io/api/data?measure=testMeasure)
    let retUrl = dataPoints.apiCall(datapoint);
    //Add a drilldown based on scope
    switch (scope.value) {
        case "Single_State":
            retUrl += `&${states.apiCall(stateSelects[currentIndex].value)}`;
            break;
        case "All_States":
            drilldowns.push("State");
            break;
    }
    //Add a drilldown if filter is Occupation
    //I know having a switch statement here is overkill, but this is for expandability
    switch (filters[currentIndex].value) {
        case "Occupations":
            retUrl += `${occupations.apiCall(subfilters[currentIndex].value)}`;
            break;
    }
    //Health ended up having some subfilters that were simply too long or not worded to my liking.
    //This sets a config property to what I want the property to actually be named, rather than the measure needed for the API
    if (dataSets[currentIndex].value === "Health") {
        retObj.Config.measure = health[filters[currentIndex].value][subfilters[currentIndex].value].measure;
        retObj.Config.display = health[filters[currentIndex].value][subfilters[currentIndex].value];
    }
    retObj.Config.Subject = subfilters[currentIndex].value;
    //Add the needed drilldowns to the URL
    //This avoids having to always check if a drilldown is the first drilldown when adding it
    let drillString = '&drilldowns=';
    for (let drill of drilldowns) {
        drillString += drill + ',';
    }
    if (drillString.endsWith(','))
        drillString = drillString.substring(0, drillString.length - 1);
    //I have to specifically check if Year has been added because Election Results won't accept latest. You have to specify the actual election year.
    if (!retUrl.includes('&Year='))
        retUrl += "&Year=latest";
    retObj.URL = retUrl + ((drillString==`&drilldowns=`) ? '' : drillString);
    console.log(retObj.URL);
    return retObj;
}

