const criticaldata = (parameter1) => {
    const blockdata = parameter1;
  
        const devices = `037633fb-98ec-4b9c-89a3-f25219547061`;
        let reportdata = {
            timestamp: new Date(),
            PQM_ACT_PWR: 0,
            PQM_RCT_PWR: 0
        }
        blockdata.filter((x) => x.devices.hasOwnProperty(devices)).forEach((x) => {

            if (x.devices[device].parameters.hasOwnProperty('PQM_ACT_PWR') && x.devices[device].parameters.hasOwnProperty('PQM_ACT_PWR') && !isNaN(x.devices[device].parameters['PQM_ACT_PWR']) && !isNaN(x.devices[device].parameters['PQM_ACT_PWR'])) {
                reportdata.PQM_ACT_PWR += eachdata.values.PQM_ACT_PWR


            }
            if (x.devices[device].parameters.hasOwnProperty('PQM_RCT_PWR') && x.devices[device].parameters.hasOwnProperty('PQM_RCT_PWR') && !isNaN(x.devices[device].parameters['PQM_RCT_PWR']) && !isNaN(x.devices[device].parameters['PQM_RCT_PWR'])) {
                reportdata.PQM_RCT_PWR += eachdata.values.PQM_RCT_PWR
            }

        })



        reportdata.PQM_ACT_PWR = reportdata.PQM_ACT_PWR / blockdata.length
        reportdata.PQM_RCT_PWR = reportdata.PQM_RCT_PWR / blockdata.length
        reportdata.timestamp = blockdata[0].starttime
        return reportdata
    
}