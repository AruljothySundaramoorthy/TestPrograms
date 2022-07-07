db.getCollection("devicerawdatas").aggregate([
    {
        $match: {
            $and: [
                { planttimestamp: { $gte: 1655769600000, $lte: 1655855999999 } },
                { plantid: new ObjectId("61f7d6a85d965045c2618041") },
            ],
        },
    },
    {
        $project: {
            data: "$data",
            planttimestamp: "$planttimestamp",
            _id: 0,
            tempdata: { $objectToArray: "$data" }
        },
    },
]);
