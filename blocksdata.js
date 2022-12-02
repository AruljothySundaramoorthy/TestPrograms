db.getCollection("alerts").aggregate(
  [
    {
      $match: { plantid: { $in: [new ObjectId("6308733a815ab852075c1b35")] } },
    },
    { $group: { _id: "$plantid", totalCount: { $sum: 1 } } },
  ],
  { allowDiskUse: true }
);
