dataPoints = {
    apiCall: function(point) {
        let retPoint = this[point].URL + this[point].arg;
        return retPoint;
    },
    "Average Wage": {
        arg: "measure=Average%20Wage",
        drilldowns: [],
        URL: UrlStyles.Basic,
        parse: function(...args) {
            retObj = [];
            for (let state of args[0]) {
                let obj = {};
                obj.State = state.State;
                if (args[1].Subject != undefined)
                    obj.Subject = args[1].Subject;
                obj.Wage = formatValue(state["Average Wage"], "money", false);
                retObj.push(obj);
            }
            return retObj;
        },
        format: function(results) {
            let retStr = '';
            for (let state of results) {
                retStr += `Average wage ${(state.Subject != "All") ? `of ${state.Subject}` : ''} in ${(state.State == undefined) ? 'the United States' : state.State } is ${formatValue(state.Wage, "money", true)}\n\n`;
            }
            return retStr;
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
                if (args[1].Subject != undefined)
                    obj.Subject = args[1].Subject;
                console.log([demVotes[i]["Candidate Votes"], demVotes[i]["Candidate Votes"] + repVotes[i]["Candidate Votes"]]);
                obj.Results = formatValue([demVotes[i]["Candidate Votes"], demVotes[i]["Candidate Votes"] + repVotes[i]["Candidate Votes"]], "percentage", false);
                retObj.push(obj);
            }
            console.log(retObj);
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
                let prefix = (state.Subject != undefined) ? `${state.Subject} in ` : '';
                if (state.State == undefined) state.State = "the United States";
                retStr += `<span>${prefix}${state.State} voted</span><span style="color: ${rgb};">${color.toUpperCase()} (${state.Results}%)</span>\n\n`
            }
            return retStr;
        }
    },
    "Health": {
        URL: UrlStyles.Basic,
        parse: function(...args) {
            let retObj = [];
            console.log
            for (let state of args[0]) {
                let obj = {};
                obj.State = state.State;
                obj[args[1].Subject] = state[args[1].measure];
                obj.arg = args[1].display;
                obj.arg.name = subfilters[currentIndex].value;
                retObj.push(obj);
            }
            return retObj;
        },
        format: function(results) {
            // console.log(results);
            let retStr = '';
            for (let state of results) {
                switch (state.arg.type) {
                    case "per100k":
                        retStr += `${state.State} had ${formatValue(state[state.arg.name], "per100k")} cases of ${state.arg.name.replace('Rate', '')} per 100,000 citizens.\n\n`
                        break;
                    default:
                        if (state.arg.specialFormat === undefined)
                            retStr += `The rate of ${state.arg.name} in ${state.State} is ${formatValue(state[state.arg.name], state.arg.type, true)}\n\n`;
                        else
                            retStr += state.arg.specialFormat.replace('$1', formatValue(state[state.arg.name], state.arg.type, true)).replace('$2', state.State);
                        break;
                }
            }
            return retStr;
        }
    },
    "Household Income": {
        arg: "measure=Household%20Income",
        URL: UrlStyles.Basic,
        parse: function(...args) {
            let retObj = [];
            for (let state of args[0]) {
                let obj = {};
                obj.State = state.State;
                obj["Household Income"] = formatValue(state["Household Income"], "percentage", false);
                retObj.push(obj);
            }
            return retObj;
        },
        format: function(results) {
            let retStr = '';
            for (let state of results) {
                retStr += `The average Household Income of ${state.State} is ${formatValue(state["Household Income"], "money", true)}.\n\n`;
            }
            return retStr;
        }
    },
    "Wage Distribution": {
        arg: "Workforce Status=true&measure=Total Population,Record Count",
        drilldowns: ["Wage Bin"],
        URL: UrlStyles.Basic,
        parse: function(...args) {
            console.log(args);
        }
    }
}