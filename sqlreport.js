// var subDays = require('date-fns/subDays')
// var format = require('date-fns/format')
var { endOfDay, startOfDay, format, subDays } = require('date-fns')
const _ = require("lodash");
//Need to get teh BTM data from BTM table
btmdata1 = [{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4402.3
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21210.12,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4301.9
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.85,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4201.0
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.59,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4100.1
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.35,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4003.6
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.09,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3902.6
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.83,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3801.4
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.59,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3705.1
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.33,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3603.9
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.07,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3502.8
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.81,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3402.5
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.55,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3302.1
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.29,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3201.3
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.03,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3100.3
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21206.79,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3003.7
}
],
    btmdata2 = [{
        COMM_STS: 1,
        ACTIVE_EXPORT: 21210.37,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4402.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21210.12,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4301.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.85,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4201.0
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.59,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4100.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.35,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4003.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.09,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3902.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.83,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3801.4
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.59,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3705.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.33,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3603.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.07,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3502.8
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.81,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3402.5
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.55,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3302.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.29,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3201.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.03,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3100.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21206.79,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3003.7
    }
    ],
    btmdata3 = [{
        COMM_STS: 1,
        ACTIVE_EXPORT: 21210.37,
        ACTIVE_IMPORT: 1099,
        ACTIVE_POWER: 108.597,
        localcol: 4402.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22309.37,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4301.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22417.967,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4201.0
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22526.564,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4100.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22635.161,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4003.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22743.758,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3902.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22852.355,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3801.4
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22960.952,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3705.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23069.549,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3603.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23178.146,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3502.8
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23286.743,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3402.5
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23395.34,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3302.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23503.937,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3201.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23612.534,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3100.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23721.131,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3003.7
    }
    ]

//Need to get the MTM data from MTM table
mtmdata1 = [{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4402.3
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21210.12,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4301.9
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.85,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4201.0
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.59,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4100.1
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.35,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 4003.6
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21209.09,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3902.6
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.83,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3801.4
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.59,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3705.1
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.33,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3603.9
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21208.07,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3502.8
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.81,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3402.5
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.55,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3302.1
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.29,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3201.3
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21207.03,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3100.3
},
{
    COMM_STS: 1,
    ACTIVE_EXPORT: 21206.79,
    ACTIVE_IMPORT: 108.597,
    ACTIVE_POWER: 108.597,
    localcol: 3003.7
}
],
    mtmdata2 = [{
        COMM_STS: 1,
        ACTIVE_EXPORT: 21210.37,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4402.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21210.12,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4301.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.85,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4201.0
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.59,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4100.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.35,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4003.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21209.09,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3902.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.83,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3801.4
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.59,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3705.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.33,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3603.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21208.07,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3502.8
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.81,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3402.5
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.55,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3302.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.29,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3201.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21207.03,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3100.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 21206.79,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3003.7
    }
    ],
    mtmdata3 = [{
        COMM_STS: 1,
        ACTIVE_EXPORT: 21210.37,
        ACTIVE_IMPORT: 1099,
        ACTIVE_POWER: 108.597,
        localcol: 4402.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22309.37,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4301.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22417.967,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4201.0
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22526.564,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4100.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22635.161,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 4003.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22743.758,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3902.6
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22852.355,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3801.4
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 22960.952,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3705.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23069.549,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3603.9
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23178.146,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3502.8
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23286.743,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3402.5
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23395.34,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3302.1
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23503.937,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3201.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23612.534,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3100.3
    },
    {
        COMM_STS: 1,
        ACTIVE_EXPORT: 23721.131,
        ACTIVE_IMPORT: 108.597,
        ACTIVE_POWER: 108.597,
        localcol: 3003.7
    }
    ]


const previousdate = subDays(new Date(), 1)
const previousdateend = endOfDay(previousdate)
const previousdatestart = startOfDay(previousdate)
const formattedlastdateend = format(previousdateend, "yyyy-MM-dd HH:mm:ss")
const formattedlastdatestart = format(previousdatestart, "yyyy-MM-dd HH:mm:ss")

// Need to get the last  3 BTM AND MTM DATA from table 
yesterdaybtm1 = {
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597
}
yesterdaybtm2 = {
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597
}
yesterdaybtm2 = {
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597
}
yesterdaymtm1 = {
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597
}
yesterdaymtm2 = {
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597
}
yesterdaymtm3 = {
    ACTIVE_EXPORT: 21210.37,
    ACTIVE_IMPORT: 108.597
}

const consolidatedata = () => {
    // return 'hello';
    let mtm1data = { ACTIVE_EXPORT: 0, ACTIVE_IMPORT: 0, ACTIVE_POWER: 0, COMM_STS: false }
    let mtm2data = { ACTIVE_EXPORT: 0, ACTIVE_IMPORT: 0, ACTIVE_POWER: 0, COMM_STS: false }
    let mtm3data = { ACTIVE_EXPORT: 0, ACTIVE_IMPORT: 0, ACTIVE_POWER: 0, COMM_STS: false }
    mtmdata1.map((data) => {

        mtm1data.ACTIVE_EXPORT += data.ACTIVE_EXPORT;
        mtm1data.ACTIVE_IMPORT += data.ACTIVE_IMPORT;
    })
    mtmdata1.map((data) => {
        mtm2data.ACTIVE_EXPORT += data.ACTIVE_EXPORT;
        mtm2data.ACTIVE_IMPORT += data.ACTIVE_IMPORT;
    })
    mtmdata1.map((data) => {
        mtm3data.ACTIVE_EXPORT += data.ACTIVE_EXPORT;
        mtm3data.ACTIVE_IMPORT += data.ACTIVE_IMPORT;
    })

    mtm1data.ACTIVE_POWER = _.meanBy(mtmdata1, 'ACTIVE_POWER');
    mtm2data.ACTIVE_POWER = _.meanBy(mtmdata2, 'ACTIVE_POWER');
    mtm3data.ACTIVE_POWER = _.meanBy(mtmdata3, 'ACTIVE_POWER');
    mtm1data.COMM_STS = mtmdata1[mtmdata1.length - 1].COMM_STS
    mtm2data.COMM_STS = mtmdata2[mtmdata2.length - 1].COMM_STS
    mtm3data.COMM_STS = mtmdata3[mtmdata3.length - 1].COMM_STS

    // Calculation to ge the difference
    mtm1data.ACTIVE_EXPORT = (yesterdaymtm1.ACTIVE_EXPORT - mtm1data.ACTIVE_EXPORT)
    mtm2data.ACTIVE_EXPORT = (yesterdaymtm2.ACTIVE_EXPORT - mtm2data.ACTIVE_EXPORT)
    mtm3data.ACTIVE_EXPORT = (yesterdaymtm3.ACTIVE_EXPORT - mtm3data.ACTIVE_EXPORT)
    const data = {
        'mtm1': mtm1data,
        'mtm2': mtm2data,
        'mtm3': mtm3data
    }
    return data
}
let a = consolidatedata()
console.log(a)




