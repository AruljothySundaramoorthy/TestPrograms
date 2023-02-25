const enumval = {
  TODO: "TODO",
  INPROGRESS: "IN PROGRESS",
  NEEDATTENTION: "NEED ATTENTION",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
};

const CurrentStatus = enumval.REJECTED;//Declared Current status
let PercentWeight = 0;//Assigning percentage weight

function splitEqually(statuslength) {
  const weightageOfEachStatus = 100 / statuslength;
  return weightageOfEachStatus;
}

const numPeople = Object.entries(enumval).length;
PercentWeight = splitEqually(numPeople);//Assigning calcualted percentage weight


const ProgressValue =
  Object.entries(enumval).findIndex((x) => x[1] == CurrentStatus) + 1;
console.log(ProgressValue * PercentWeight);
