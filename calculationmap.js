const { timeStamp } = require("console");
const { countBy } = require("lodash");
const { type } = require("os");

const a = {
  devietype: ["INV", "WMS"],
  devices: [inv1, inv2, inv3, wms1, wms2, wms3],
  parameters: [INV_ACT_PWR, WMS_POA, INV_RCT_PWR, WMS_GHI],
  duration: 5,
};


export const DATAPOINTLIMIT = 1000000;


Group devices by device type
group parameters by device type


match the parameter and devices based on the device type and initiate calculation
get the difference in minutes between the given time timeStamp
calculatio could be (devicestype x parameters x differnce of minutes number)
if calculated number greater than the provided contant throw error