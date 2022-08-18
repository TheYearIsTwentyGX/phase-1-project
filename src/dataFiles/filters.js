const occupations = {
    apiCall: function(occ) {
        return (occ == "All") ? '' : `PUMS Occupation=${this[occ].id}`;
    },
    generalData: {
        URL: UrlStyles.Basic
    },
    "All": {},
     "Police Officers": {
        category: "Detailed Occupation",
        id: 333050,
        workforceStatus: "true"
    }
}

const dataPoints = {
    apiCall: function(point) {
        return this[point].URL + this[point].arg;
    },
    "Average Wage": {
        arg: "measure=Average%20Wage",
        drilldowns: [],
        URL: UrlStyles.Basic,
        parse: function(...args) {
            console.log(args[0]);
        },
        format: function(...args) {
            console.log(args);
            let val = String(args[0]);
            formatValue(val, "money", true);
            return `Average wage ${((args.length < 3) ? 'of civilians' : `of ${args[2]}`)} in\n${args[1]} is ~$${val}`;
        }
    },
    "Election Results": {
        arg: "cube=Data_USA_President_election&Year=2020&measures=Candidate+Votes&Party=Democratic,Republican",
        URL: UrlStyles.Uranium,
        drilldowns: ["Party"],
        parse: function(...args) {
            retObj = [];
            let demVotes = args[0].filter(x => x.Party === "Democratic");
            let totalDemVotes = demVotes.reduce((prev, curr) => prev + curr["Candidate Votes"], 0);
            let repVotes = args[0].filter(x => x.Party === "Republican");
            let totalRepVotes = repVotes.reduce((prev, curr) => prev + curr["Candidate Votes"], 0);
            const demWinner = (totalDemVotes > totalRepVotes);
            for (let i = 0; i < demVotes.length; i++) {
                let obj = {};
                obj.State = demVotes[i].State;
                obj.Results = formatValue([demVotes[i]["Candidate Votes"], demVotes[i]["Candidate Votes"] + repVotes[i]["Candidate Votes"]], "percentage", false);
                retObj.push(obj);
            }    
            return retObj;
        },
        format: function(results) {
            let retStr = '';
            for (let state of results) {
                let color = 'purple';
                let rgb = 'rgb(190,40,190)';
                if (state.Results > 60) {
                    color = 'blue';
                    rgb = 'lightblue';
                }
                else if (state.Results < 40){
                    color = 'red';
                    rgb = 'rgb(160,50,50)';
                }
                retStr += `<span>${state.State} voted</span><span style="color: ${rgb};">${color} (${state.Results}%)</span>\n\n`
            }
            return retStr;
        }
    },
    "Household Income": {
        arg: "measure=Household%20Income",
        URL: UrlStyles.Basic,
        parse: function(...args) {
            console.log(args[0]);
        },
        format: function(...args) {
            console.log(args);
        }
    }
}

const states = {
    apiCall: function(state) {
        return `State=${this[state].id}`;
    },
    All: {},
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

