myArrayObjects = page2data.sort(function (a, b) {
    return a.devicename.localeCompare(b.devicename, undefined, {
        numeric: true,
        sensitivity: 'base'
    });
});