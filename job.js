const lodash = require("lodash");

const a = [
  {
    title: "JOB21",
    jobcode: "AGM-WSD21W",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB22",
    jobcode: "AGM-IJK21W",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB23",
    jobcode: "AGM-IKOJH",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JB24",
    jobcode: "AGM-HJHG224",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB25",
    jobcode: "AGM-HJHG225",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB26",
    jobcode: "AGM-HJHG226",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB27",
    jobcode: "AGM-HJHG227",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB28",
    jobcode: "AGM-HJHG228",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB29",
    jobcode: "AGM-HJHG229",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB30",
    jobcode: "AGM-HJHG230",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB31",
    jobcode: "AGM-HJHG231",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB32",
    jobcode: "AGM-HJHG232",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB33",
    jobcode: "AGM-HJHG433",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB33",
    jobcode: "AGM-HJHG233",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB34",
    jobcode: "AGM-HJHG234",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB35",
    jobcode: "AGM-HJHG235",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB36",
    jobcode: "AGM-HJHG236",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB38",
    jobcode: "AGM-HJHG228",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB39",
    jobcode: "AGM-HJHG239",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB40",
    jobcode: "AGM-HJHG240",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB41",
    jobcode: "AGM-HJHG241",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB42",
    jobcode: "AGM-HJHG242",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB43",
    jobcode: "AGM-HJHG228",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB45",
    jobcode: "AGM-HJHG245",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB46",
    jobcode: "AGM-HJHG246",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB47",
    jobcode: "AGM-HJHG247",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB48",
    jobcode: "AGM-HJHG248",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB49",
    jobcode: "AGM-HJHG249",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB50",
    jobcode: "AGM-HJHG250",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB51",
    jobcode: "AGM-HJHG251",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB52",
    jobcode: "AGM-HJHG252",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB53",
    jobcode: "AGM-HJHG253",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB54",
    jobcode: "AGM-HJHG254",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB55",
    jobcode: "AGM-HJHG255",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB56",
    jobcode: "AGM-HJHG256",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB57",
    jobcode: "AGM-HJHG257",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB58",
    jobcode: "AGM-HJHG258",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB59",
    jobcode: "AGM-HJHG259",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB60",
    jobcode: "AGM-HJHG260",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB60",
    jobcode: "AGM-HJHG260",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB61",
    jobcode: "AGM-HJHG261",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB62",
    jobcode: "AGM-HJHG262",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB63",
    jobcode: "AGM-HJHG263",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
  {
    title: "JOB64",
    jobcode: "AGM-HJHG264",
    ispremiumjob: false,
    description: "asdasd",
    startdate: 1681725241146,
    enddate: 1682675641866,
    gender: [2],
    jobtype: [1],
    experience: 0,
    onlyforfreshers: true,
    minsalary: 12222,
    maxsalary: 2111111,
    venue: "adasdasd",
    contactnumber: 8526411327,
    contactemail: "arul@gmail.com",
    incentiveavailable: true,
    iswhatsappcontactable: false,
    whatsappnumber: null,
    state: {
      $oid: "6420e9031ee13343e7416d34",
    },
    district: {
      $oid: "6420e9321ee13343e7416d3e",
    },
    town: {
      $oid: "6420e9471ee13343e7416d88",
    },
    jobbenefits: [
      {
        $oid: "642133bc41afe18a42e83619",
      },
      {
        $oid: "642279fc3749492ca7159ab8",
      },
    ],
    jobcategory: {
      $oid: "641feb7792d6e318beeedd2f",
    },
    preferredjob: {
      $oid: "641fef89947997d680db8b2a",
    },
    jobskill: ["accuracy", "accounting_knowledge"],
    workingdays: 6,
    createdat: 1682070884779,
    createdby: {
      $oid: "6424440b73abac6230558bc4",
    },
    updatedat: 1682070884779,
    updatedby: {
      $oid: "6424440b73abac6230558bc4",
    },
    status: "WAITING FOR APPROVAL",
    filepath: [
      {
        $oid: "643df81c1f7e153d2c5c4d5d",
      },
    ],
    qualificationcategory: [
      {
        $oid: "6426ae654d180b56363ec6a1",
      },
    ],
    qualification: [
      {
        $oid: "6428799854172e93d06e4b9f",
      },
      {
        $oid: "6428799854172e93d06e4b9e",
      },
    ],
    totaljobcount: 12,
    totalappliedjobcount: 0,
    totalcontactedcount: 0,
    reportcount: 0,
    appliedcandidates: [],
    reportcomment: [],
  },
];

const  b = lodash.groupBy(a,'jobcode');
console.log(b)