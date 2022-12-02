const checkChildrenLength = (children) => {
  children.forEach((child) => {
    if (child?.children?.length > 4) {
      // checkChildrenLength(child.children)
      console.log("exceeded children length");
    }
    if (child?.children?.length > 0) {
      checkChildrenLength(child.children);
    }
  });
};

let users = [
  {
    name: "1",
    status: false,
    children: [
      {
        name: "5",
        status: true,
        children: null,
      },
    ],
  },
  {
    name: "2",
    status: true,
    children: [
      {
        name: "6",
        status: false,
        children: null,
      }, {
        name: "6",
        status: false,
        children: null,
      }, {
        name: "6",
        status: false,
        children: null,
      }, {
        name: "6",
        status: false,
        children: null,
      }, {
        name: "6",
        status: false,
        children: null,
      },
    ],
  },
  {
    name: "3",
    status: false,
    children: [
      {
        name: "7",
        status: true,
        children: [
          {
            name: "9",
            status: false,
            children: null,
          },
        ],
      },
    ],
  },
  {
    name: "4",
    status: false,
    children: [
      {
        name: "8",
        status: false,
        children: [
          {
            name: "10",
            status: true,
            children: null,
          },
        ],
      },
    ],
  },
];
// console.log(users);

// users.forEach((user) => {});


checkChildrenLength(users)