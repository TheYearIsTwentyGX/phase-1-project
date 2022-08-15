const occupations = {
    apiCall: function(occ) {
        return [`PUMS Occupation=${this[occ].id}`, this.generalData.URL];
    },
    generalData: {
        URL: UrlStyles.Basic
    },
     "Police Officers": {
        category: "Detailed Occupation",
        id: 333050,
        workforceStatus: "true"
    }
}

const dataPoints = {
    apiCall: function(point) {
        let retURL = (Object.hasOwn(this[point], "URL")) ? this[point].URL : baseURL;
        return [this[point].arg, retURL];
    },
    "Average Wage": {
        arg: "measure=Average%20Wage",
        URL: UrlStyles.Basic,
        format: function(...args) {
            let val = String(args[0]);
            let fs = val.lastIndexOf('.');
            val = val.substring(0, fs + 3);
            let commaCounter = fs - 1;
            while (commaCounter > 1) {
                commaCounter -= 3;
                val = val.substring(0, commaCounter + 1) + `,` + val.substring(commaCounter + 1);
            }
            return `Average wage ${((args.length < 3) ? 'of civilians' : `of ${args[2]}`)} in\n${args[1]} is ~$${val}`;
        }
    },
    "Presidential Elections": {
        arg: "cube=Data_USA_President_election&drilldowns=%TG_LOC%,Candidate&measures=Candidate+Votes",
        URL: UrlStyles.Uranium,
        format: function(...args) {
            let retStr = "";
            if (args.length === 1) {
                for (let state of args[0]) {
                    
                }
                return retStr;
            }
        }
    },
}

const states = {
    apiCall: function(state) {
        let retURL = (Object.hasOwn(this[state], 'URL')) ? this[state].url : baseURL;
        return [`Geography=${this[state].id}`, retURL];
    },
    Alabama: {
        id: "04000US01"
    },
    Alaska: {
        id: "04000US02"
    },
    Arizona: {
        id: "04000US04"
    },
    Arkansas: {
        id: "04000US05"
    },
    California: {
        id: "04000US06"
    },
    Colorado: {
        id: "04000US08"
    },
    Connecticut: {
        id: "04000US09"
    },
    Delaware: {
        id: "04000US10"
    },
    Florida: {
        id: "04000US12"
    },
    Georgia: {
        id: "04000US13"
    },
    Hawaii: {
        id: "04000US15"
    },
    Idaho: {
        id: "04000US16"
    },
    Illinois: {
        id: "04000US17"
    },
    Indiana: {
        id: "04000US18"
    },
    Iowa: {
        id: "04000US19"
    },
    Kansas: {
        id: "04000US20"
    },
    Kentucky: {
        id: "04000US21"
    },
    Louisiana: {
        id: "04000US22"
    },
    Maine: {
        id: "04000US23"
    },
    Maryland: {
        id: "04000US24"
    },
    Massachusettes: {
        id: "04000US25"
    },
    Michigan: {
        id: "04000US26"
    },
    Minnesota: {
        id: "04000US27"
    },
    Mississippi: {
        id: "04000US28"
    },
    Missouri: {
        id: "04000US29"
    },
    Montana: {
        id: "04000US30"
    },
    Nebraska: {
        id: "04000US31"
    },
    Nevada: {
        id: "04000US32"
    },
    New_Hampshire: {
        id: "04000US33"
    }
}

