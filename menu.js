const data = {
    roles: ["GtsH3XBM2y5L", "GxHCWYbG6WB2", "zwcjEnWSN4KT"],
    menu: [
        {
            name: "User",
            sortorder: 1,
            routepath: "base/user/list",
            icon: "user",
            children: [
                { name: "Create user", sortorder: 1, routepath: "base/user/create" },
                { name: "List user", sortorder: 2, routepath: "base/user/list" },
            ],
        },
        {
            name: "Dashboard",
            sortorder: 1,
            routepath: "base/user/dashboard",
            icon: "dashboard",
            children: [
                { name: "Welcome", sortorder: 1, routepath: "base/user/create" },
                { name: "Monitor", sortorder: 2, routepath: "base/user/list" },
                { name: "Workspace", sortorder: 3, routepath: "base/user/list" },
            ],
        },
    ],
};
