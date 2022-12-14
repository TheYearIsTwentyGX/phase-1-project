//Shows or hides the individual State dropdowns based on the scope
function scopeChange(e) {
    if (e.target.value == "Single_State") {
        document.querySelector("#states-1").classList = '';
        document.querySelector("#states-2").classList = '';
    }
    else {
        document.querySelector("#states-1").classList = 'hidden';
        document.querySelector("#states-2").classList = 'hidden';
    }
}
//When the Data Point is changed, this function updates the filters dropdowns
function dataPointChange(e) {
    currentIndex = dataSets.indexOf(e.target);
    switch (dataSets[currentIndex].value) {
        case "Average Wage":
            populateSelect(filters[currentIndex], averageWageFilters);
            filterChange(filters[currentIndex].value);
            break;
        case "Health":
            populateSelect(filters[currentIndex], Object.keys(health));
            filterChange(dataSets[currentIndex].value);
            break;
        case "Poverty Levels":
            populateSelect(filters[currentIndex], povertyFilters);
            filterChange(filters[currentIndex].value);
            break;
        default:
            populateSelect(filters[currentIndex], "Empty");
            filterChange(dataSets[currentIndex].value);
            break;
    }
}
//When the Main Filter is changed, this function updates the subfilter dropdowns
function filterChange(e) {
    let mainFilter = e;
    if (e.target != undefined) {
        mainFilter = e.target.value
        currentIndex = filters.indexOf(e.target);
    }
    let keyList = undefined;
    switch (mainFilter) {
        case "Occupations":
            keyList = occupations;
            break;
        case "Election Results":
            keyList = "Empty";
            break;
        case "Gender":
            keyList = genders;
            break;
        case "Race":
            keyList = race;
            break;
        case "Health":
        case "Healthcare":
        case "Health Risks":
        case "Mental Health":
        case "Patient to Clinician Ratios":
            keyList = Object.keys(health[filters[currentIndex].value]);
            break;
        default:
            keyList = "Empty";
            break;
    }
    populateSelect(subfilters[currentIndex], keyList);
}

//Custom sorter for data from the fetch request
function sortResults(a, b) {
    if (a.value.toString().lastIndexOf('.') != -1 || (b.value.toString().lastIndexOf('.') != -1)) {
        a.value = parseFloat(a.value);
        b.value = parseFloat(b.value);
    }
    else {
        a.value = parseInt(a.value);
        b.value = parseInt(b.value);
    }
    if (a.value > b.value)
        return 1;
    if (a.value < b.value)
        return -1;
    return 0;
}

//Error handler for fetch requests
function dataGetError() {
    submit.disabled = false;
    alert("There was an error with the data request. Please try again.");
}

//Function to populate the dropdowns
function populateSelect(select, keys) {
    select.innerHTML = '';
    if (keys == "Empty") {
        select.classList = "hidden";
        return;
    }
    else
        select.classList = '';
    let options = (Array.isArray(keys)) ? keys : Object.keys(keys);
    for (const option of options) {
        if (ignoreProps.includes(option))
            continue;
        if (health[option] != undefined && health[option].scopes != undefined && (!health[option].scopes.includes(scope.value)))
                    continue;
        appendNewChild(select, 'option', {value: option, text: option.replace("_", " ")});
    }
}

//Format data for the table to a displayable value (eg, 15231.01251 -> $15,231.01)
function formatValue(value, type, includeSymbol = true) {
    let fs;
    let percent = "";
    value = toHundredths(value);
    switch (type) {
        //Just for large numbers. Useful for populations or stats shown in X per 100,000
        case "largeNumber": 
            let fVal = addCommas(value);
            return [fVal, value];
        break;
        //Format as a dollar amount
        case "money":
            fs = value.lastIndexOf('.');
            if (fs == -1)
                fs = value.length;
            let commaCounter = fs - 1;
            let formattedValue = value;
                while (commaCounter > 2) {
                    commaCounter -= 3;
                    formattedValue = formattedValue.substring(0, commaCounter + 1) + `,` + formattedValue.substring(commaCounter + 1);
                }
            return [`$${formattedValue}`, parseFloat(value)];
        //Generic output for stats that are shown in X per 100,000
        case "per100k":
            return [`${value} of every 100k`, parseFloat(value)];
        //This really just adds a percentage sign to the end of the value
        case "preformattedPercentage":
            return [`${value}%`, parseFloat(value)];
        //This is for percentages that are given as a fraction of 1 (eg, 0.5 -> 50%)
        case "percentage":
            //Multiply by 100 to get a percentage
            percent = (value * 100).toString();
            //Get the index of the decimal point (I called this fs for 'full stop')
            fs = percent.lastIndexOf('.');
            //This cuts off ending zeroes
            if (percent[fs + 2] === '0' && percent[fs + 1] === '0')
                fs -= 3;
            else if (percent[fs + 2] === '0')
                fs -= 1;
            percent = percent.substring(0, fs + 3);
            return [`${percent}%`, parseFloat(percent)];
        default:
            return [value, value];
    }
}

//Cuts down decimals to 2 places
function toHundredths(value) {
    value = value.toString();
    let fs = value.lastIndexOf('.');
    if (value.length > fs + 2 && fs != -1) {
        value = value.substring(0, fs + 3);
        if (value[fs + 3] === '0' && value[fs + 2] === '0')
            value = value.substring(0, fs);
        else if (value[fs + 3] === '0')
            value = value.substring(0, fs + 2);
    }
    return value;
}

//Formats numbers with commas
function addCommas(value) {
    let fs = value.lastIndexOf('.');
    if (fs == -1)
        fs = value.length;
    let commaCounter = fs - 1;
    let formattedValue = value;
        while (commaCounter > 2) {
            commaCounter -= 3;
            formattedValue = formattedValue.substring(0, commaCounter + 1) + `,` + formattedValue.substring(commaCounter + 1);
        }
    return formattedValue;
}

//Just used to simplify fetch requests
async function fetchData(url) {
    submit.disabled = true;
    return await fetch(url)
    .then(d => d.json());
}

//Helper functions to make adding new elements to the DOM a bit easier
function appendNewChild(parent, tag, attr) {
    const ne = newElement(tag, attr);
    parent.appendChild(ne);
    return ne;

  function newElement(tag, attr) {
    let ne = document.createElement(tag);
    if (attr != null)
        Object.keys(attr).forEach(k => {
            if (k === "text")
                ne.textContent = attr[k];
            else if (k === "html")
                ne.innerHTML = attr[k];
            else if (k === "event")
                ne.addEventListener(attr[k]['type'], attr[k]['callback']);
            else
                ne.setAttribute(k, attr[k]);
        });
    return ne;
  }
}