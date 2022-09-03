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
    populateSelect(filters[0], averageWageFilters);
    populateSelect(filters[1], averageWageFilters);
    populateSelect(subfilters[0], genders);
    populateSelect(subfilters[1], genders);
    for (let stateSelect of [...stateSelects, ...subfilters])
        stateSelect.classList = 'hidden';
    
})

async function getData(e) {
    e.preventDefault();
    results.innerHTML = '';
    let tableRows = [];
    //Loop once for each set of data
    for (let counter = 0; counter < 2; counter++) {
        let configs = undefined;
        //0 = left col, 1 = right col
        currentIndex = counter;
        //Get the URL to fetch along with the configuration
        configs = buildURL(dataSets[currentIndex].value);
        fetchResults = await fetchData(configs.URL)
            .then(d => { return parseData(d.data, configs.Config); return dataPoints[dataSets[currentIndex].value].parse(d.data, configs.Config)}); //Parse the data down to the info we need
        //Formatting mostly just gets the color based on their ranking
        for (let i = 0; i < fetchResults.length; i++) {
            if (ignoreStates.includes(fetchResults[i].loc))
                continue;
            let currentRow;
            currentRow = (currentIndex === 0) ? appendNewChild(results, 'tr') : tableRows[i];
            let valString = `<span>${fetchResults[i].text}</span>`;
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
    //Health ended up having some subfilters that were simply too long or not worded to my liking.
    //This sets a config property to what I want the property to actually be named, rather than the measure needed for the API
    if (dataSets[currentIndex].value === "Health") {
        retObj.Config.measure = health[filters[currentIndex].value][subfilters[currentIndex].value].measure;
        retObj.Config.display = health[filters[currentIndex].value][subfilters[currentIndex].value];
    }
    
    retObj.Config.display = subfilters[currentIndex].value;
    if (filters[currentIndex].classList != 'hidden') {
        switch (filters[currentIndex].value) {
            case "Occupations":
                retUrl += occupations.apiCall(subfilters[currentIndex].value);
                break;
            case "Gender":
                retUrl += genders.apiCall(subfilters[currentIndex].value);
                retObj.Config.display = (subfilters[currentIndex].value == "Male") ? "men" : "women";
                break;
            case "Race":
                retUrl += race.apiCall(subfilters[currentIndex].value);
                retObj.Config.display = subfilters[currentIndex].value + 's';
                break;
            case "No Filter":
                retObj.Config.display = undefined;
        }
    }
    //Add the needed drilldowns to the URL
    //This avoids having to always check if a drilldown is the first drilldown when adding it
    let drillString = '&drilldowns=';
    for (let drill of drilldowns) {
        if (!drillString.includes(drill))
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

function parseData(...data) {
    let retArr = [];
    if (data[0].length >= 100) {
        let reducedArr = [];
        for (let i = 0; i < data[0].length/2; i += 1) {
            if (ignoreStates.includes(data[0][i].State))
                continue;
            reducedArr.push([data[0][i], data[0][i+(data[0].length/2)]]);
        }
        data[0] = reducedArr;
    }
    for (let location of data[0]) {
        let obj = {};
        if (ignoreStates.includes(location.State))
            continue;
        obj.loc = (location.State == undefined) ? location[0].State : location.State;
        if (data[1].display != undefined)
            obj.display = data[1].display;
        dataPoints[dataSets[currentIndex].value].specialParse(obj, location, data[1]);
        retArr.push(obj);
    }
    let sortedArr = [...retArr].sort(sortResults);
    if (sortedArr[0].reverseSort == true)
        sortedArr.reverse();
    for (let location of retArr) {
        location.rank = sortedArr.indexOf(location);
        switch (dataPoints[dataSets[currentIndex].value].colorStyle) {
            case "Red-Green":
                location.color = `hsl(${((location.rank/sortedArr.length)*120).toString(10)},100%,50%)`;
                break;
        }
        if (sortedArr.length == 1)
            location.color = 'rgb(200,198,175)';
        location.text = location.text
            .replace("$value", `<span style='width:49%; color:${location.color};'>${location.formattedValue}</span>`)
            .replace("$display", (location.display != undefined) ? ` of ${location.display}` : '')
            .replace("$loc", location.loc);
    }
    return retArr;
}