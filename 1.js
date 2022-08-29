db.getCollection("devices").update(
  {
    _id: ObjectId("62ee30bb9b1ba5499cbed933"),
    "parameters._id": ObjectId("62f38f8b72fc468e0f05e161"),
  },
  {
    $pull: {
      "parmeters.$.notifications": {
        _id: ObjectId("62f3ea51e855ee4079a11350"),
      },
    },
  }
);

db.getCollection("devices").update(
  {},
  {
    $pull: {
      "parameters.$.notifications": {
        _id: ObjectId("62f3ea51e855ee4079a11350"),
      },
    },
  }
);

db.getCollection("devices").update(
  {
    "parameters._id": ObjectId("62f38f8b72fc468e0f05e161"),
  },
  {
    $pull: {
      "parameters.$.notifications": {
        _id: mongoose.Types.ObjectId("62f3ecf8296313ffc5e6b682"),
      },
    },
  }
);
