
  updateNotification = async (
    deviceid: string,
    parameterid: string,
    notificationid: string,
    notification: INotification,
  ) =>
    DeviceModel(await this.tenentDatabaseService.connection()).updateOne(
      {
        _id: new ObjectId(deviceid),
        parameters: {
          $elemMatch: {
            _id: new ObjectId(parameterid),
            'notifications._id': new ObjectId(notificationid),
          },
        },
      },
      {
        $set: {
          'parameters.$[outer].notifications.$[inner].notificationname':
            notification.notificationname,
          'parameters.$[outer].notifications.$[inner].notificationtype':
            notification.notificationtype,
          'parameters.$[outer].notifications.$[inner].notificationcomparisiontype':
            notification.notificationcomparisiontype,
          'parameters.$[outer].notifications.$[inner].notificationseverity':
            notification.notificationseverity,
          'parameters.$[outer].notifications.$[inner].notificationvalue':
            notification.notificationvalue,
          'parameters.$[outer].notifications.$[inner].notificationconvert':
            notification.notificationconvert,
          'parameters.$[outer].notifications.$[inner].notificationbitposition':
            notification.notificationbitposition,
          'parameters.$[outer].notifications.$[inner].notificationdefaultvalue':
            notification.notificationdefaultvalue,

          'parameters.$[outer].notifications.$[inner].notificationdisplayname':
            notification.notificationdisplayname,
          'parameters.$[outer].notifications.$[inner].notificationvirtual':
            notification.notificationvirtual,
          'parameters.$[outer].notifications.$[inner].notificationvirtualfunction':
            notification.notificationvirtualfunction,
          'parameters.$[outer].notifications.$[inner].notificationstatus':
            notification.notificationstatus,
        },
      },
      {
        arrayFilters: [
          { 'outer._id': new ObjectId(parameterid) },
          { 'inner._id': new ObjectId(notificationid) },
        ],
      },
    );
}
