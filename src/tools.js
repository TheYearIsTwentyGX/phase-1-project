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

function dataPointChange(e) {
    currentIndex = dataSets.indexOf(e.target);
    switch (dataSets[currentIndex].value) {
        case "Average Wage":
            populateSelect(filters[currentIndex], ["Occupations"]);
            filterChange(filters[currentIndex].value);
            break;
        case "Health":
            populateSelect(filters[currentIndex], Object.keys(health));
            filterChange(dataSets[currentIndex].value);
    }
}
function filterChange(e) {
    let mainFilter = (e.target != undefined) ? e.target.value : e;
    switch (mainFilter) {
        case "Occupations":
            populateSelect(subfilters[currentIndex], occupations);
            subfilters[currentIndex].classList = '';
            break;
        case "Health":
        case "Healthcare":
        case "Health Risks":
        case "Mental Health":
        case "Patient to Clinician Ratios":
            populateSelect(subfilters[currentIndex], Object.keys(health[filters[currentIndex].value]));
    }
}

function sortResults(a, b) {
    if (a.value > b.value)
        return 1;
    if (a.value < b.value)
        return -1;
    return 0;
}

//Function to populate the dropdowns
function populateSelect(select, keys) {
    select.innerHTML = '';
    let options = (Array.isArray(keys)) ? keys : Object.keys(keys);
    for (const option of options) {
        if (ignoreProps.includes(option))
            continue;
        if (health[option] != undefined && health[option].scopes != undefined && (!health[option].scopes.includes(scope.value)))
                    continue;
        appendNewChild(select, 'option', {value: option, text: option.replace("_", " ")});
    }
}

function formatValue(value, type, includeSymbol = true) {
    let fs;
    let percent = "";
    switch (type) {
        case "money":
            value = value.toString();
            fs = value.lastIndexOf('.');
            if (fs > 0)
                value = value.substring(0, fs + 3);
            else
                fs = value.length;
            let commaCounter = fs - 1;
            if (includeSymbol) {
                while (commaCounter > 2) {
                    commaCounter -= 3;
                    value = value.substring(0, commaCounter + 1) + `,` + value.substring(commaCounter + 1);
                }
            }
            return (includeSymbol) ? `$${value}` : parseFloat(value);
        case "per100k":
            value = value.toString();
            fs = value.lastIndexOf('.');
            value = value.substring(0, fs);
            return value;
        case "preformattedPercentage":
            percent = value.toString();
            fs = percent.lastIndexOf('.');
            if (percent[fs + 2] === '0' && percent[fs + 1] === '0')
                fs -= 3;
            else if (percent[fs + 2] === '0')
                fs -= 1;
            percent = percent.substring(0, fs + 3);
            return (includeSymbol) ? `${percent}%` : parseFloat(percent);
        case "percentage":
            if (value[1] === undefined)
                percent = (value * 100).toString();
            else
                percent = (value[0]/value[1]*100).toString();
            fs = percent.lastIndexOf('.');
            if (percent[fs + 2] === '0' && percent[fs + 1] === '0')
                fs -= 3;
            else if (percent[fs + 2] === '0')
                fs -= 1;
            percent = percent.substring(0, fs + 3);
            return (includeSymbol) ? `${percent}%` : parseFloat(percent);
        default:
            return value;
    }
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