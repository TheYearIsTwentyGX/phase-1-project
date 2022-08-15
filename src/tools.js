const ignoreProps = ["apiCall", "generalData"];

//Function to populate the dropdowns
function populateSelect(select, keys) {
    for (const option of Object.keys(keys)) {
        if (!ignoreProps.includes(option))
            appendNewChild(select, 'option', {value: option, text: option.replace("_", " ")});
    }
}