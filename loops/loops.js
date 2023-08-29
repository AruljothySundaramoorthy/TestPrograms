/**
 * ForEach Loop (to iterate the loop and check the data)
 * Map Loop (to iteare the data and modify/transform it into a new data)
 * Filter Loop(to filter the data based on condition)
 *
 */
const { userdata } = require("../mockdata/userdata");

const runForEachLoop = () => {
  userdata.forEach((eachuserdata) => {
    console.log(eachuserdata);
  });
};
// runForEachLoop();

const runMapLoops = () => {
  const newUserdata = userdata.map((eachuserdata) => {
    return {
      ...eachuserdata,
      id: eachuserdata.id + 100,
    };
  });
  console.log(newUserdata);
};
// runMapLoops();

const runFilterLoop = () => {
  const newFilterUserData = userdata.filter(
    (eachuserdata) => eachuserdata.gender == "Female"
  );
  console.log(newFilterUserData);
};

runFilterLoop();
