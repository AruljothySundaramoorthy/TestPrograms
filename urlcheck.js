function checkurl(...params) {
    var query = '';
    if (params[0].user) {
        query += `user:${params[0].user}`
    }
    return `http://localhost:3001/api/customers/?${query}`
}


var data = {
    user: 'arul',
    name: 'aaron'
};

console.log(checkurl(data));