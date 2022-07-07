startdate = "01-07-2022";
enddate = "31-07-2022";
plantid = undefined;

const f = {
    startdate: "01-07-2022",
    enddate: "31-07-2022",
    plantid: undefined,
};

const urlparser = (args) => {
    var queryparser = "";
    let entries = Object.entries(args);

    for (let [index, [key, value]] of entries.entries()) {

        if (value !== undefined) {
            const temppkey = index == 0 ? `?${key}=${value}` : `&${key}=${value}`
            queryparser += temppkey
        }
    }

    return queryparser
};

urlparser(f);
