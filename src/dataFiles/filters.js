const occupations = {
    apiCall: function(occ) {
        return (occ == "All") ? '' : `&PUMS Occupation=${this[occ].id}`;
    },
    generalData: {
        URL: UrlStyles.Basic
    },
    "All": "",
    "Police Officers": {
        id: 333050,
    },
    "Software Developers": 151252
}

health = {
    getFilters: function() { 
        let keys = Object.keys(health);
        keys = keys.filter(x => {
            if (this[x].scopes != undefined)
                if (this[x].scopes.includes(scope.value))
                    return true;
            return false;
        });
        return keys;
    },
    "Healthcare": {
        scopes: ["National","All States", "Single State"],
        "Adults Who Haven't Seen a Doctor in the Past 12 Months Due to Cost": {
            measure: "Adults Who Haven't Seen a Doctor in the Past 12 Months Due to Cost",
            type: "preformattedPercentage",
            specialFormat: "$1 of adults in $2 haven't seen a doctor in the past 12 months due to cost.\n\n"
        },
        "Adults with Mental Illness Utilizing Mental Health Services": {
            measure: "Mental Health Service Use Among Adults With Mental Illness",
            type: "preformattedPercentage",
            specialFormat: "$1 of adults in $2 with mental illness utilize mental health services.\n\n"
        },
        "30-Day Hospital Readmission Rate Among Medicare Patients": {
            measure: "30-Day Hospital Readmission Rate Among Medicare Patients",
            type: "per100k",
        }
    },
    "Health Risks": {
        scopes: ["All States", "Single State"],
        "Adult Obesity": {
			measure: "Adult Obesity",
			type: "percentage"
		},
		"Adult Smoking": {
			measure: "Adult Smoking",
			type: "percentage"
		},
		"Alcohol-Impaired Driving Fatalities": {
			measure: "Alcohol-Impaired Driving Deaths",
			type: "percentage"
		},
		"Diabetes": {
			measure: "Diabetes Prevalence",
			type: "percentage"
		},
		"HIV": {
			measure: "Hiv Prevalence",
			type: "per100k"
		},
		"Homicides": {
			measure: "Homicides",
			type: "preformattedPercentage"
		},
		"Car Crash Fatalities": {
			measure: "Motor Vehicle Crash Deaths",
			type: "preformattedPercentage"
		},
		"STI's": {
			measure: "Sexually Transmitted Infections",
			type: "per100k"
		},
		"Violent Crime": {
			measure: "Violent Crime",
            type: "per100k"
        }
    },
    "Mental Health": {
        scopes: ["National","All States", "Single State"],
        "Adults with Major Depression": {
			measure: "Adults With Major Depressive Episode",
			type: "preformattedPercentage"
		},
		"Adults with Serious Mental Illness": {
			measure: "Adults With Serious Mental Illness",
			type: "preformattedPercentage"
		},
		"Drug Overdose Fatalities": {
			measure: "Drug Overdose Death Rate Per 100,000 Age-Adjusted",
			type: "preformattedPercentage"
		},
		"Alcoholism": {
			measure: "Excessive Drinking",
			type: "percentage"
		},
		"Opioid Fatalities": {
			measure: "Opioid Overdose Death Rate Per 100,000 Age-Adjusted",
			type: "percentage"
		}
    }
}

const states = {
    apiCall: function(state) {
        return `State=${this[state].id}`;
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

