dataPoints = {
    apiCall: function(point) {
        let retPoint = this[point].URL + this[point].arg;
        return retPoint;
    },
    "Average Wage": {
        arg: "measure=Average%20Wage",
        drilldowns: [],
        URL: UrlStyles.Basic,
        colorStyle: "Red-Green",
        specialParse: function(obj, loc) {
            let value = formatValue(loc["Average Wage"], "money");
            obj.formattedValue = value[0];
            obj.value = value[1];
            obj.text = `Average wage$display in $loc is $value`;
        }
    },
    "Election Results": {
        arg: "cube=Data_USA_President_election&Year=2020&measures=Candidate+Votes&Party=Democratic,Republican",
        URL: UrlStyles.Uranium,
        drilldowns: ["Party"],
        colorStyle: "Blue-Red",
        specialParse: function(obj, loc) {
            const demVotes = loc.find(x => x.Party === "Democratic")[`Candidate Votes`];
            const repVotes = loc.find(x => x.Party === "Republican")[`Candidate Votes`];
            const demWinner = (demVotes > repVotes);
            let value;
            value = formatValue((demWinner) ? demVotes/(demVotes+repVotes)*100 : repVotes/(demVotes+repVotes)*100, "preformattedPercentage");
            obj.value = value[1];
            obj.formattedValue = value[0];
            switch (demWinner) {
                case true:
                    if (obj.value > 55) {
                        obj.text = '$loc voted BLUE ($value Democrat)';
                        obj.color = 'rgb(50,50,255)';
                    }
                    else {
                        obj.text = '$loc voted PURPLE ($value leaning Democrat)';
                        obj.color = 'rgb(150,77,255)';
                    }
                    break;
                case false:
                    if (obj.value > 55) {
                        obj.text = '$loc voted RED ($value Republican)';
                        obj.color = 'rgb(255,50,50)';
                    }
                    else {
                        obj.text = '$loc voted PURPLE ($value leaning Republican)';
                        obj.color = 'rgb(255,77,150)';
                    }
                    break;
            }
        }
    },
    "Health": {
        URL: UrlStyles.Basic,
        colorStyle: "Red-Green",
        specialParse(obj, loc, config) {
            let value = formatValue(loc[config.measure], health[filters[currentIndex].value][config.display].type);
            obj.formattedValue = value[0];
            obj.value = value[1];
            obj.reverseSort = health[filters[currentIndex].value][config.display].reverseSort;
            obj.text = health[filters[currentIndex].value][config.display].specialFormat;
        }
    },
    "Household Ownership": {
        arg: "measure=Household%20Ownership",
        drilldowns: ["Occupied By"],
        URL: UrlStyles.Basic,
        colorStyle: "Red-Green",
        specialParse: function(obj, loc) {
            let owned = loc.find(x => x["Occupied By"] === "Owner Occupied")["Household Ownership"];
            let rented = loc.find(x => x["Occupied By"] === "Renter Occupied")["Household Ownership"];
            let value = formatValue(rented/(owned+rented)*100, "preformattedPercentage");
            obj.formattedValue = value[0];
            obj.value = value[1];
            obj.text = `In $loc, $value of residents rent their home.`;
            obj.reverseSort = true;
        }
    },
    "Poverty Levels": {
        arg: "measure=Poverty%20Population",
        URL: UrlStyles.Basic,
        colorStyle: "Red-Green",
        specialParse: function(obj, loc) {
            let value = formatValue(loc["Poverty Population"], "largeNumber");
            obj.formattedValue = value[0];
            obj.value = value[1];
            obj.text = `In $loc, $value of $display are in poverty.`;
            obj.reverseSort = true;
        }
    }
}

