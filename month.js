var addMonths = require("date-fns/addMonths");
var format = require("date-fns/format");

const result = addMonths(new Date(), 5);
function addmonthfunction(data, month) {
    return addMonths(data, month);
}
// console.log(format(result, 'MM/dd/yyyy'));
const date = addMonths(new Date(), 1);
// const date = addMonths(new Date('2021-05-13T16:23:31.228Z'), 1);
// const limit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const limit = 12
// console.log(limit)
function checkfunction() {
    for (let i = 0; i <= limit; i++) {
        const date1 = addmonthfunction(date, i);
        console.log(date1);
        console.log({
            isdeliveried: null,
            deleviried_on: new Date(),
            deliviried_by: null,
            accepted_by: null,
            referenceid: null,
            month: date1,
        });
    }
    // limit.forEach((m) => {
    //     const date1 = addmonthfunction(date, m);
    //     console.log({
    //         isdeliveried: null,
    //         deleviried_on: new Date(),
    //         deliviried_by: null,
    //         accepted_by: null,
    //         referenceid: null,
    //         month: date1,
    //     });
    // });
}

checkfunction();
