const isHuman = false;
const isAnimal = false;

const data = {

    ...(isHuman ? { name: 'Narayanan', lastname: 'Kuppusami' } : {}),
    ...(isAnimal ? { type: 'Cat', age: 7 } : {}),
};


console.log(data);


const datafunction = (req, res) => {
    data.forEach((e) => {
        Object.keys(inverterdevices).forEach((x) => {
            Object.keys(e.devices).forEach((ed) => {
                if (ed == x) {
                    if (
                        e.devices[ed].parameters.INV_DLY_ACT_EXP > inverterdevices[x].value
                    ) {
                        inverterdevices[x].value = e.devices[ed].parameters.INV_DLY_ACT_EXP;
                    }
                }
            });
        });
    });
    var page1data = {};
    var page2data = {};
    Object.values(inverterdevices).map((x) => {
        page2data = {
            ...page2data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(mfmdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;
        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(checkmeterdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;

        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(mainmeterdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;

        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    Object.values(pqmdevices).map((x) => {
        x.value = isNaN(x.maxvalue - x.minvalue) ? 0 : x.maxvalue - x.minvalue;

        page1data = {
            ...page1data,
            [`${x.devicemeta.blockname} ${x.devicemeta.devicedisplayname}`]: x.value,
        };
    });
    // return page2data;
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    const sheet = workbook.addWorksheet('sheet1');
    sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    ];
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=${`prreport${format(
            new Date(),
            'yyyyMMddHHmmss'
        )}.xlsx`}`
    );
    return workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
};