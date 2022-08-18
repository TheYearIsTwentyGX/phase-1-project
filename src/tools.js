const ignoreProps = ["apiCall", "generalData"];

function scopeChange(e) {
    if (e.target.value == "Single_State") {
        document.querySelector('#states-div').classList = '';
    }
    else {
        document.querySelector('#states-div').classList = 'hidden';
    }
}

//Function to populate the dropdowns
function populateSelect(select, keys) {
    select.innerHTML = '';
    for (const option of Object.keys(keys)) {
        if (!ignoreProps.includes(option))
            appendNewChild(select, 'option', {value: option, text: option.replace("_", " ")});
    }
}

function formatValue(value, type, includeSymbol = true) {
    let fs;
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
            console.log(value);
            return (includeSymbol) ? `$${value}` : parseFloat(value);
        case "percentage":
            let percent = (value[0]/value[1]*100).toString();
            fs = percent.lastIndexOf('.');
            percent = percent.substring(0, fs + 3);
            return (includeSymbol) ? `${percent}%` : parseFloat(percent);
    }
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