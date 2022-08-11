let occ;
let loc;
let dPoints;
let submit;
let results;
const baseURL = "https://datausa.io/api/data?";

document.addEventListener("DOMContentLoaded", () => {
    //Get necessary elements from DOM
    occ = document.querySelector('#occupations');
    loc = document.querySelector('#locations');
    dPoints = document.querySelector('#dataPoints');
    results = document.querySelector('#results');
    submit = document.querySelector('#submit');
    submit.addEventListener('click', (e) => getData(e));

    //Populate the dropdowns
    populateSelect(occ, occupations);
    populateSelect(loc, states);
    populateSelect(dPoints, dataPoints);
})

//This is called when submitting the form
async function getData(e) {
    e.preventDefault();
    //First we grab the location data
    let url = baseURL;
    url += states.apiCall(loc.value);
    url += `&${dataPoints.apiCall(dPoints.value)}&year=latest`;
    let locResult = await fetchData(url)
    .then(arr => arr.data[0][dPoints.value]);
    //Append location data to DOM
    appendNewChild(results, 'p', {text: `${dPoints.value} in ${loc.value}: ${dataPoints[dPoints.value].format(locResult)}`});
    
    //Now we do the same for the occupation
    url += "&" + occupations.apiCall(occ.value)[0];
    let occResult = await fetchData(url)
    .then(arr => arr.data[0][dPoints.value]);
    appendNewChild(results, 'p', {text: `${dPoints.value} of ${occ.value} in ${loc.value}: ${dataPoints[dPoints.value].format(occResult)}`});
}

//Just used to simplify fetch requests
async function fetchData(url) {
    return await fetch(url)
    .then(d => d.json());
}

//Function to populate the dropdowns
function populateSelect(select, keys) {
    for (const options of Object.keys(keys)) {
        if (options != "apiCall")
            appendNewChild(select, 'option', {value: options, text: options});
    }
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
            else if (k === "event")
                ne.addEventListener(attr[k]['type'], attr[k]['callback']);
            else
                ne.setAttribute(k, attr[k]);
        });
    return ne;
  }
}