const occupations = {
    apiCall: function(occ) {
        return [`PUMS Occupation=${this[occ].id}`, this[occ].id];
    },
     "Police Officers": {
        category: "Detailed Occupation",
        id: 333050,
        workforceStatus: "true"
    }
}

const states = {
    apiCall: function(state) {
        return [`Geography=${this[state].id}`];
    },
    "Missouri": {
        id: "04000US29"
    }
}

const dataPoints = {
    apiCall: function(point) {
        return `measure=${this[point].measure}`
    },
    "Average Wage": {
        measure: "Average%20Wage",
        format: function(value) {
            let val = String(value)
            let fs = val.lastIndexOf('.');
            val = val.substring(0, fs + 3);
            let commaCounter = fs - 1;
            while (commaCounter > 1) {
                commaCounter -= 3;
                val = val.substring(0, commaCounter + 1) + `,` + val.substring(commaCounter + 1);
            }
            return `~$${val}`;
        }
    }
}