const a = {
  _id: {
    $oid: "63f66021cb726eea23f77224",
  },
  title: "asdad",
  description: "asdasd",
  formid: "63f65f9acb726eea23f77150",
  form: {
    formname: "radiolist",
    layout: [
      [
        {
          label: "radiolist",
          fieldname: "radiolist",
          tooltip: "radiolist",
          fieldtype: 6,
          validations: {
            required: false,
            unique: false,
          },
          radiolistmeta: {
            values: [],
            datasource: 2,
          },
        },
      ],
    ],
    formtags: [],
  },
  assettype: 1,
  asset: {
    label: "CSBPL250MW",
    value: "62fa0fb49307357a4352194d",
    _id: {
      $oid: "62fa0fb49307357a4352194d",
    },
  },
  steps: [
    {
      title: "asdasd",
      description: "asd",
      formid: {
        $oid: "63f65f9acb726eea23f77150",
      },
      form: {
        formname: "radiolist",
        layout: [
          [
            {
              label: "radiolist",
              fieldname: "radiolist",
              tooltip: "radiolist",
              fieldtype: 6,
              validations: {
                required: false,
                unique: false,
              },
              radiolistmeta: {
                values: [],
                datasource: 2,
              },
            },
          ],
        ],
        formtags: [],
      },
      stepassignes: [
        {
          userid: {
            $oid: "62fb6bec9307357a43569565",
          },
          username: "Rajesh (rajesh@armaxindia.com)",
          useremail: "rajesh@armaxindia.com",
        },
      ],
      stepassigner: {
        userid: {
          $oid: "62fb6bec9307357a43569565",
        },
        username: "Rajesh (rajesh@armaxindia.com)",
        useremail: "rajesh@armaxindia.com",
      },
      stepapprovers: [
        {
          userid: {
            $oid: "62fb6bdd9307357a43569533",
          },
          username: "Sharfuddin (sharfuddin@fleximc.com)",
          useremail: "sharfuddin@fleximc.com",
        },
      ],
      documents: [],
      starttime: 1677090847535,
      formdata: {
        radiolist: {
          value: {
            value: "63d223792d6c9daf62190e99",
            label: "CSBPL300MW",
          },
          label: "CSBPL300MW",
          checked: false,
        },
      },
      stepstatus: "TODO",
      createdat: {
        userid: {
          $oid: "631187dd4c53b12d06b29d82",
        },
        username: "Sai Charan S(sai@armaxindia.com)",
        useremail: "sai@armaxindia.com",
        ipaddress: "::ffff:127.0.0.1",
        auditdate: 1677090849813,
      },
      _id: {
        $oid: "63f66021cb726eea23f77225",
      },
    },
  ],
  jobassigner: {
    userid: {
      $oid: "62fb6bec9307357a43569565",
    },
    username: "Rajesh (rajesh@armaxindia.com)",
    useremail: "rajesh@armaxindia.com",
  },
  jobtemplateid: {
    $oid: "63f65ff4cb726eea23f771b8",
  },
  jobtemplatecode: "4smsgxi7",
  starttime: 1677090827496,
  formdata: {
    radiolist: {
      value: {
        value: "62fa0fb49307357a4352194d",
        label: "CSBPL250MW",
      },
      label: "CSBPL250MW",
      checked: false,
    },
  },
  steplength: 1,
  currentstepstatus: "TODO",
  createdat: {
    userid: {
      $oid: "631187dd4c53b12d06b29d82",
    },
    username: "Sai Charan S(sai@armaxindia.com)",
    useremail: "sai@armaxindia.com",
    ipaddress: "::ffff:127.0.0.1",
    auditdate: 1677090849813,
  },
  jobtags: [],
  jobcode: "1323wead",
  jobstatus: "TODO",
  documents: [],
  comments: [],
};

console.log(a);
