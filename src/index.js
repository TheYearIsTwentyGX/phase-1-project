document.addEventListener("DOMContentLoaded", () => { //Event listener type 1 (DOMContentLoaded)
    //Get necessary elements from DOM
    dataSets = Array.from(document.querySelectorAll('select[name="dataset"]')); 
    scope = document.querySelector('#scope');
    filters = Array.from(document.querySelectorAll('select[name="filter"]'));
    subfilters = Array.from(document.querySelectorAll('select[name="subfilter"]'));
    stateSelects = document.querySelectorAll('select[name="states"]');
    results = document.querySelector('#results');
    submit = document.querySelector('#submit');

    //Event Listeners
    submit.addEventListener('click', (e) => getData(e)); //Event listener type 2 (click)
    scope.addEventListener('change', scopeChange); //Event listener type 3 (change)
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
    //Hide the state dropdowns by default
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
            .then(d => { 
                //Since the API won't give us an error for an invalid URL, I check the lenghth of the data returned to see if it's valid
                if (d.data.length == 0)
                    throw currentIndex;
                //Parse the data down to the info we need
                return parseData(d.data, configs.Config); 
            }) 
            .catch(e => { console.log(e); dataGetError(); });
        //Based on the parsed data, output the results to the #results table on the DOM
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
    
    //This gets the current filters and subfilters and adds them to the URL based on the selection
    //It also passes on the way that I'd like to display the selected subject based on the subfilter (men/women instead of Male/Female)
    retObj.Config.display = subfilters[currentIndex].value;
    if (filters[currentIndex].classList != 'hidden') {
        switch (filters[currentIndex].value) {
            case "Occupations":
                retUrl += occupations.apiCall(subfilters[currentIndex].value);
                break;
            case "Gender":
                retUrl += genders.apiCall(subfilters[currentIndex].value, dataSets[currentIndex].value);
                retObj.Config.display = (subfilters[currentIndex].value == "Male") ? "men" : "women";
                break;
            //I don't like the way it refers to races, but as a white person myself, I thought it better to leave it as the API gave it to me.
            case "Race":
                retUrl += race.apiCall(subfilters[currentIndex].value, dataSets[currentIndex].value);
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
    //Remove the trailing comma
    if (drillString.endsWith(','))
        drillString = drillString.substring(0, drillString.length - 1);
    //I have to specifically check if Year has been added because Election Results won't accept latest. You have to specify the actual election year.
    if (!retUrl.includes('&Year='))
        retUrl += "&Year=latest";
    //Put all parts of the URL together
    retObj.URL = retUrl + ((drillString==`&drilldowns=`) ? '' : drillString);
    console.log(retObj.URL);
    return retObj;
}

function parseData(...data) {
    let retArr = [];
    //This is used to condense data that has multiple entries for the same state down to a single state.
    //One example is for Election Results, where it gives me the results for each party for each state as separate entries in the returned array.
    if (data[0].length >= 100) {
        let reducedArr = [];
        for (let i = 0; i < data[0].length/2; i += 1) {
            if (ignoreStates.includes(data[0][i].State))
                continue;
            reducedArr.push([data[0][i], data[0][i+(data[0].length/2)]]);
        }
        data[0] = reducedArr;
    }
    //Parse down the data to remove unnecessary information. 
    //I also format the data to be more universal, such as changing the specific name of the statistic to "value", which is necessary for the sort function located in tools.js
    for (let location of data[0]) {
        let obj = {};
        //Not every statistic has data for DC/Puerto Rico, so I always ignore those 2 locations to ensure that they don't misalign the displayed table.
        if (ignoreStates.includes(location.State))
            continue;
        obj.loc = (location.State == undefined) ? location[0].State : location.State;
        if (data[1].display != undefined)
            obj.display = data[1].display;
        //Do the portion of parsing that is specific to this dataPoint
        dataPoints[dataSets[currentIndex].value].specialParse(obj, location, data[1]);
        retArr.push(obj);
    }
    //Sort the array of parsed data, reversing it if specified by the filter or subfilter
    //I know it's wasteful to include the reverseSort variable with every single object,
        //but by the time I realized I would have to reverse the sort for certain stats, I had already rewritten large portions of the project too many times to do it again for this.
        //Realistically, the best way to do this would be to get a config object from each dataPoint/filter/subfilter dropdown that specifies how to sort the data.
        //Using that, I'd also have that object specify how to do the special parsing for each, making the code more DRY.
    let sortedArr = [...retArr].sort(sortResults);
    if (sortedArr[0].reverseSort == true) {
        sortedArr.reverse();
    }
    //Based on the sorted array, find where each location ranks in this stat, then color the stat based on that rank and the colorStyle specified by the dataPoint
    //I added a property to specify the rank which goes unused, this is for a cut feature that I didn't have the time to implement.
    //When I return to this project later, I will utilize this stat to show the correlation between the 2 sets of data.
    for (let location of retArr) {
        location.rank = sortedArr.indexOf(location);
        switch (dataPoints[dataSets[currentIndex].value].colorStyle) {
            case "Red-Green":
                location.color = `hsl(${((location.rank/sortedArr.length)*120).toString(10)},100%,50%)`;
                break;
        }
        if (sortedArr.length == 1)
            location.color = 'rgb(200,198,175)';
        //Do the final formatting of the text, replacing placeholder strings within the dataPoint's display string with the actual data.
        location.text = location.text
            .replace("$value", `<span style='width:49%; color:${location.color};'>${location.formattedValue}</span>`)
            .replace("$display", (location.display != undefined) ? ` of ${location.display}` : '')
            .replace("$loc", location.loc);
    }
    return retArr;
}