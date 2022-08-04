export const enumToArray = (enumdata: any) => {
    let enumdataentries = Object.entries(enumdata).filter(
        (v) => !isNaN(Number(v[1]))
    );

    return enumdataentries.length > 0
        ? enumdataentries
        : Object.entries(enumdata);
};

export const enumToObject = (enumdata: any) =>
    Object.fromEntries(enumToArray(enumdata));



export declare enum ReportType {
    NONE = 0,
    RAWDATA = 1,
    PLANTKPI = 2,
    INVERTERKPI = 3,
    METERKPI = 4,
    CUSTOM = 3
}

const a = enumToArray(ReportType);
console.log(a)