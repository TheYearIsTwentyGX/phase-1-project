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
            retArr = [];
            for (let location of args[0]) {
                if (ignoreStates.includes(location.State))
                    continue;
                let obj = {};
                obj.loc = (location.State != undefined) ? location.State : "the United States";
                if (args[1].Subject != undefined)
                    obj.subject = args[1].Subject;
                obj.value = formatValue(location["Average Wage"], "money", false);
                obj.formattedValue = formatValue(location["Average Wage"], "money", true);
                obj.text = `The average wage ${(obj.subject != "All") ? `of ${obj.subject} ` : ''}in ${obj.loc} is ${obj.formattedValue}`;
                retArr.push(obj);
            }
            let sortedResults = [...retArr];
            sortedResults.sort(sortResults);
            for (let location of retArr) {
                location.rank = sortedResults.indexOf(location)/retArr.length;
                let hue = (location.rank*120).toString(10);
                location.color = `hsl(${hue},100%,50%)`;
            }
            return retArr;
        },
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
                if (ignoreStates.includes(demVotes[i].State))
                    continue;
                let obj = {};
                obj.loc = demVotes[i].State;
                if (args[1].Subject != undefined)
                    obj.subject = args[1].Subject;
                obj.value = formatValue([demVotes[i]["Candidate Votes"], demVotes[i]["Candidate Votes"] + repVotes[i]["Candidate Votes"]], "percentage", false);
                let color = 'purple';
                if (obj.value > 60) {
                    color = 'blue';
                    obj.color = 'rgb(50,50,255)';
                }
                else if (obj.value < 40) {
                    color = 'red';
                    obj.color = 'rgb(255,50,50)';
                }
                else {
                    if (obj.value > 50)
                        obj.color = `rgb(150,77,255)`;
                    else
                        obj.color = `rgb(255,77,150)`;
                }
                obj.formattedValue = `${color.toUpperCase()} (${formatValue(obj.value, "preformattedPercentage", true)})`;
                obj.text = `${obj.subject != "All" ? `${obj.subject} in `: ''}${obj.loc} voted ${obj.formattedValue}`;
                retObj.push(obj);
            }
            let sortedArr = [...retObj].sort(sortResults);
            for (let loc of retObj) {
                loc.rank = sortedArr.indexOf(loc);
            }
            console.log(retObj);
            return retObj;
        },
        format: function(results) {
            let retStr = '';
            for (let location of results) {
                let color = 'purple';
                let rgb = 'rgb(190,40,190)';
                if (location.Results > 60) {
                    color = 'blue';
                    rgb = 'lightblue';
                }
                else if (location.Results < 40){
                    color = 'red';
                    rgb = 'rgb(160,50,50)';
                }
                let prefix = (location.Subject != undefined) ? `${location.Subject} in ` : '';
                if (location.State == undefined) location.State = "the United States";
                    retStr += `<span>${prefix}${location.State} voted</span><span style="color: ${rgb};">${color.toUpperCase()} (${location.Results}%)</span>\n\n`
            }
            return retStr;
        }
    },
    "Health": {
        URL: UrlStyles.Basic,
        parse: function(...args) {
            let retObj = [];
            for (let location of args[0]) {
                let obj = {};
                obj.State = location.State;
                obj[args[1].Subject] = location[args[1].measure];
                obj.arg = args[1].display;
                obj.arg.name = subfilters[currentIndex].value;
                retObj.push(obj);
            }
            return retObj;
        },
        format: function(results) {
            let retStr = '';
            for (let location of results) {
                switch (location.arg.type) {
                    case "per100k":
                    retStr += `${location.State} had ${formatValue(location[location.arg.name], "per100k")} cases of ${location.arg.name.replace('Rate', '')} per 100,000 citizens.\n\n`
                    break;
                    default:
                    if (location.arg.specialFormat === undefined)
                    retStr += `The rate of ${location.arg.name} in ${location.State} is ${formatValue(location[location.arg.name], location.arg.type, true)}\n\n`;
                    else
                    retStr += location.arg.specialFormat.replace('$1', formatValue(location[location.arg.name], location.arg.type, true)).replace('$2', location.State);
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
            for (let location of args[0]) {
                let obj = {};
                obj.State = location.State;
                obj["Household Income"] = formatValue(location["Household Income"], "percentage", false);
                retObj.push(obj);
            }
            return retObj;
        },
        format: function(results) {
            let retStr = '';
            for (let location of results) {
                retStr += `The average Household Income of ${location.State} is ${formatValue(location["Household Income"], "money", true)}.\n\n`;
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