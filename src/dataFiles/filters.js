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
    "Healthcare": {
        scopes: ["National","All_States", "Single_State"],
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
        scopes: ["All_States", "Single_State"],
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
        scopes: ["National","All_States", "Single_State"],
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
    },
    "Patient to Clinician Ratios": {
        scopes: ["All_States", "Single_State"],
        "Patient to Primary Care Physician": {
            measure: "Patient to Primary Care Physician Ratio",
            type: "ratio",
            specialFormat: "There are $1 patients for every Primary Care Physician in $2\n\n"
        },
        "Patient to Dentist":{
            measure: "Patient to Dentist Ratio",
            type: "ratio",
            specialFormat: "There are $1 patients for every Dentist in $2\n\n"
        },
        "Patient to Mental Health Provider":{
            measure: "Patient to Mental Health Provider Ratio",
            type: "ratio",
            specialFormat: "There are $1 patients for every Mental Health Provider in $2\n\n"
        },
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
    },
    New_Jersey: {
        id: "04000US34"
    },
    New_Mexico : {
        id: "04000US35"
    },
    New_York: {
        id: "04000US36"
    },
    North_Carolina: {
        id: "04000US37"
    },
    North_Dakota: {
        id: "04000US38"
    },
    Ohio: {
        id: "04000US39"
    },
    Oklahoma: {
        id: "04000US40"
    },
    Oregon: {
        id: "04000US41"
    },
    Pennsylvania: {
        id: "04000US42"
    },
    Rhode_Island: {
        id: "04000US44"
    },
    South_Carolina: {
        id: "04000US45"
    },
    South_Dakota: {
        id: "04000US46"
    },
    Tennessee: {
        id: "04000US47"
    },
    Texas: {
        id: "04000US48"
    },
    Utah: {
        id: "04000US49"
    },
    Vermont: {
        id: "04000US50"
    },
    Virginia: {
        id: "04000US51"
    },
    Washington: {
        id: "04000US53"
    },
    West_Virginia: {
        id: "04000US54"
    },
    Wisconsin: {
        id: "04000US55"
    },
    Wyoming: {
        id: "04000US56"
    },
}

