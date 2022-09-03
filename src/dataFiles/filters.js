const occupations = {
    apiCall: function(occ) {
        return (occ == "All") ? '' : `&PUMS Occupation=${this[occ]}`;
    },
    generalData: {
        URL: UrlStyles.Basic
    },
    "Bartenders": 353011,
    "Biological Scientists": 191020,
    "Clergy": 212011,
    "Compliance Officers": 131041,
    "Computer Hardware Engineers": 172061,
    "Dentists": 291020,
    "Firefighters": 332011,
    "Healthcare Social Workers": 211022,
    "Mechaical Engineers": 172141,
    "Nursing Assistants": 311131,
    "Optometrists": 291041,
    "Paramedics": 292043,
    "Pharmacists": 291051,
    "Physicians": 291210,
    "Police Officers": 333050,
    "Software Developers": 151252,
    "Surgeons": 291240,
    "Tutors": 253041,
    "Veterinarians": 291131,
    "Waiters and Waitresses": 353031,
    "Web Developers": 151254
}

const genders = {
    apiCall: function(gender) {
        return "&Gender=" + this[gender];
    },
    Male: 1,
    Female: 2
}

const race = {
    apiCall: function(race) {
        return "&Race=" + this[race];
    },
    White: 1,
    Black: 2,
    American_Indian: 3,
    Asian: 6
}

health = {
    "Healthcare": {
        scopes: ["National","All_States", "Single_State"],
        "Adults Who Haven't Seen a Doctor in the Past 12 Months Due to Cost": {
            measure: "Adults Who Haven't Seen a Doctor in the Past 12 Months Due to Cost",
            type: "preformattedPercentage",
            specialFormat: "In $loc, $value of adults haven't seen a doctor in the past 12 months due to cost."
        },
        "Adults with Mental Illness Utilizing Mental Health Services": {
            measure: "Mental Health Service Use Among Adults With Mental Illness",
            type: "preformattedPercentage",
            specialFormat: "In $loc, $value of adults with mental illness utilize mental health services."
        },
        "30-Day Hospital Readmission Rate Among Medicare Patients": {
            measure: "30-Day Hospital Readmission Rate Among Medicare Patients",
            type: "noFormat",
            specialFormat: "Per 100k $loc residents on Medicare, $value are readmitted to the hospital within 30 days of discharge.",
            reverseSort: true
        }
    },
    "Health Risks": {
        scopes: ["All_States", "Single_State"],
        "Adult Obesity": {
			measure: "Adult Obesity",
			type: "percentage",
            specialFormat: "In $loc, $value of adults are obese.",
            reverseSort: true
		},
		"Adult Smoking": {
			measure: "Adult Smoking",
			type: "percentage",
            specialFormat: "In $loc, $value of adults smoke.",
            reverseSort: true
		},
		"Alcohol-Impaired Driving Fatalities": {
			measure: "Alcohol-Impaired Driving Deaths",
			type: "percentage",
            specialFormat: "In $loc, $value of all driving fatalities were caused by alcohol-impaired drivers.",
            reverseSort: true
		},
		"Diabetes": {
			measure: "Diabetes Prevalence",
			type: "percentage",
            specialFormat: "In $loc, $value of adults have diabetes.",
            reverseSort: true
		},
		"HIV": {
			measure: "Hiv Prevalence",
			type: "noFormat",
            specialFormat: "In $loc, $value of every 100k residents have HIV.",
            reverseSort: true
		},
		"Homicides": {
			measure: "Homicides",
			type: "noFormat",
            specialFormat: "In $loc, there were $value homicides per 100k residents.",
            reverseSort: true
		},
		"Car Crash Fatalities": {
			measure: "Motor Vehicle Crash Deaths",
			type: "noFormat",
            specialFormat: "In $loc, there were $value car crash fatalities per 100k residents.",
            reverseSort: true
		},
		"STI's": {
			measure: "Sexually Transmitted Infections",
			type: "noFormat",
            specialFormat: "In $loc, there were $value cases of sexually-transmitted infections per 100k residents.",
            reverseSort: true
		},
		"Violent Crime": {
			measure: "Violent Crime",
            type: "noFormat",
            specialFormat: "In $loc, there were $value violent crimes per 100k residents.",
            reverseSort: true
        }
    },
    "Mental Health": {
        scopes: ["National","All_States", "Single_State"],
        "Adults with Major Depression": {
			measure: "Adults With Major Depressive Episode",
			type: "preformattedPercentage",
            specialFormat: "In $loc, $value of adults have experienced a major depressive episode this year.",
            reverseSort: true
		},
		"Adults with Serious Mental Illness": {
			measure: "Adults With Serious Mental Illness",
			type: "preformattedPercentage",
            specialFormat: "In $loc, $value of adults suffer from a serious mental illness.",
            reverseSort: true
		},
		"Drug Overdose Fatalities": {
			measure: "Drug Overdose Death Rate Per 100,000 Age-Adjusted",
			type: "noFormat",
            specialFormat: "Per 100k residents, $loc had $value drug overdose deaths.",
            reverseSort: true
		},
		"Alcoholism": {
			measure: "Excessive Drinking",
			type: "percentage",
            specialFormat: "In $loc, $value of adults suffer from alcoholism.",
            reverseSort: true
		},
		"Opioid Fatalities": {
			measure: "Opioid Overdose Death Rate Per 100,000 Age-Adjusted",
			type: "noFormat",
            specialFormat: "Per 100k residents, $loc had $value opioid overdose deaths.",
            reverseSort: true
		}
    },
    "Patient to Clinician Ratios": {
        scopes: ["All_States", "Single_State"],
        "Patient to Primary Care Physician": {
            measure: "Patient to Primary Care Physician Ratio",
            type: "ratio",
            specialFormat: "In $loc, there is 1 Primary Care Physician per $value patients.",
            reverseSort: true
        },
        "Patient to Dentist":{
            measure: "Patient to Dentist Ratio",
            type: "ratio",
            specialFormat: "In $loc, there is 1 Dentist per $value patients.",
            reverseSort: true
        },
        "Patient to Mental Health Provider":{
            measure: "Patient to Mental Health Provider Ratio",
            type: "ratio",
            specialFormat: "In $loc, there is 1 Mental Health Provider per $value patients.",
            reverseSort: true
        },
    }
}

const states = {
    apiCall: function(state) {
        return `State=${this[state]}`;
    },
    Alabama: "04000US01",
    Alaska: "04000US02",
    Arizona: "04000US04",
    Arkansas: "04000US05",
    California: "04000US06",
    Colorado: "04000US08",
    Connecticut: "04000US09",
    Delaware: "04000US10",
    Florida: "04000US12",
    Georgia: "04000US13",
    Hawaii: "04000US15",
    Idaho: "04000US16",
    Illinois: "04000US17",
    Indiana: "04000US18",
    Iowa: "04000US19",
    Kansas: "04000US20",
    Kentucky: "04000US21",
    Louisiana: "04000US22",
    Maine: "04000US23",
    Maryland: "04000US24",
    Massachusettes: "04000US25",
    Michigan: "04000US26",
    Minnesota: "04000US27",
    Mississippi: "04000US28",
    Missouri: "04000US29",
    Montana: "04000US30",
    Nebraska: "04000US31",
    Nevada: "04000US32",
    New_Hampshire: "04000US33",
    New_Jersey: "04000US34",
    New_Mexico : "04000US35",
    New_York: "04000US36",
    North_Carolina: "04000US37",
    North_Dakota: "04000US38",
    Ohio: "04000US39",
    Oklahoma: "04000US40",
    Oregon: "04000US41",
    Pennsylvania: "04000US42",
    Rhode_Island: "04000US44",
    South_Carolina: "04000US45",
    South_Dakota: "04000US46",
    Tennessee: "04000US47",
    Texas: "04000US48",
    Utah: "04000US49",
    Vermont: "04000US50",
    Virginia: "04000US51",
    Washington: "04000US53",
    West_Virginia: "04000US54",
    Wisconsin: "04000US55",
    Wyoming: "04000US56"
}

