let occ;
let loc;
let dPoints;
let submit;
let results;
let occResults;

document.addEventListener("DOMContentLoaded", () => {
    //Get necessary elements from DOM
    occ = document.querySelector('#occupations');
    loc = document.querySelector('#locations');
    dPoints = document.querySelector('#dataPoints');
    results = document.querySelector('#results');
    submit = document.querySelector('#submit');
    submit.addEventListener('click', (e) => getData2(e));

    //Populate the dropdowns
    populateSelect(occ, occupations);
    populateSelect(loc, states);
    populateSelect(dPoints, dataPoints);
})

async function getData2(e) {
    e.preventDefault();
    let dArgs = dataPoints.apiCall(dPoints.value);
    let url = dArgs[1].URL;
    url += dArgs[0];
    if (true) {
        url = url.replace("%TG_LOC%", "State");
        //url += "&Year=2020";
    }
    let data = await fetchData(url).then (d => d.data);
    appendNewChild(results, 'div', {html: dataPoints[dPoints.value].format(data), style: "white-space: pre-line"});
}

//This is called when submitting the form
async function getData(e) {
    e.preventDefault();
    results.innerHTML = '';
    
    // if (dPoints.value == "Presidential Elections") {
    //     let url = baseURL;
    //     url += `&${dataPoints.apiCall(dPoints.value)}&year=latest`;
    //     let elecResult = await fetchData(url).then(arr => arr.data);
    //     console.log(elecResult);
    //     resultText = "";
    //     for (const res of elecResult) {
    //         let totalVotes = res["Total Votes"];
    //         console.log(totalVotes);
    //         console.log(res["Candidate Votes"]);
    //         let winPercentInt = (res["Total Votes"])/(res["Candidate Votes"]);
    //         let winPercent = winPercentInt.toString();
    //         console.log(winPercent);
    //         let fs = winPercent.lastIndexOf('.');
    //         winPercent = winPercent.substring(0, fs + 3);
    //         resultText += `In ${res["State"]}, ${winPercent}% of votes were for Joe Biden\n\n`;
    //     }
    //     appendNewChild(results, 'span', {text: resultText, style: "white-space: pre-line"});
    // }

    //First we grab the location data
    let url = baseURL;
    url += states.apiCall(loc.value);
    url += `&${dataPoints.apiCall(dPoints.value)}&year=latest`;
    let locResult = await fetchData(url)
    .then(arr => arr.data[0][dPoints.value]);
    
    //Now we do the same for the occupation
    url += "&" + occupations.apiCall(occ.value)[0];
    let occResult = await fetchData(url)
    .then(arr => arr.data[0][dPoints.value]);
    
    //Append results to the DOM
    appendNewChild(results, 'span', {text: dataPoints[dPoints.value].format(occResult, loc.value, occ.value.toLowerCase()), style: "white-space: pre-line"});
    appendNewChild(results, 'span', {text: dataPoints[dPoints.value].format(locResult, loc.value), style: "white-space: pre-line"});
}

//Just used to simplify fetch requests
async function fetchData(url) {
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