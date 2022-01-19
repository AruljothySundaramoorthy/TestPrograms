function getCalculatedRoutes(routes) {
    return Promise.all(
        routes.map(async (route) => {
            const distance = await getDistance();
            route.distance = distance;
            route.cost = calculateCost(distance);
            return route;
        })
    );
}

function calculateCost(distance) {
    return (distance * 0.19).toFixed(2);
}

async function getDistance() {
    //simulating the API call
    return Math.floor(Math.random() * 10) + 1;
}

async function printResults() {
    const routes = await getCalculatedRoutes([{ destination: "Malaga" }, { destination: "Barcelona" }]);
    console.log(JSON.stringify(routes));
    // document.write(JSON.stringify(routes));
}

printResults();