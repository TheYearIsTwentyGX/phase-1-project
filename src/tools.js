const ignoreProps = ["apiCall", "generalData"];

function scopeChange(e) {
    if (e.target.value == "Single_State") {
        stateSelects[0].classList = '';
        stateSelects[1].classList = '';
    }
    else {
        stateSelects[0].classList = 'hidden';
        stateSelects[1].classList = 'hidden';
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