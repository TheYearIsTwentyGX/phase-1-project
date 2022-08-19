const occupations = {
    apiCall: function(occ) {
        return (occ == "All") ? '' : `&PUMS Occupation=${this[occ]}`;
    },
    generalData: {
        URL: UrlStyles.Basic
    },
    "All": "",
    "Police Officers": 333050,
    "Software Developers": 151252
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

