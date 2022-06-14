
const lodash = require('lodash')
const data = [
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655058600000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655145000000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655231400000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655317800000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655404200000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655490600000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655577000000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655663400000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655749800000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655836200000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1655922600000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656009000000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656095400000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656181800000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656268200000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656354600000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656441000000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656527400000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656613800000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656700200000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656786600000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656873000000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1656959400000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657045800000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657132200000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657218600000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657305000000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657391400000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657477800000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    },
    {
        "plantid": "61f7d6a85d965045c2618041",
        "planttimestamp": 1657564200000,
        "data": {
            "activepower": 123,
            "peakpower": 123,
            "kwhExport": 123,
            "kwhImport": 123,
            "kwhNetExport": 123,
            "temperatureCorrectedPR": 123,
            "pr": 7,
            "pa": 76,
            "ga": 21,
            "accuf": 27,
            "dccuf": 123,
            "co2": 123,
            "gas": 123,
            "coal": 123,
            "poa": 123,
            "yield": 123,
            "inverters": {
                "6221cbac95c19c7003afd86d": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd8af": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8c5": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd883": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbac95c19c7003afd899": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                },
                "6221cbad95c19c7003afd8db": {
                    "capacity": 123,
                    "kwhExport": 123,
                    "downtime": 123,
                    "pr": 123,
                    "yield": 123,
                    "ia": 123,
                    "efficiency": 123
                }
            }
        }
    }
];

const processeddata = Object.values(data[data.length - 1].data.inverters);
const sum = processeddata.filter((x) => x.efficiency > 0).length;
console.log(processeddata)