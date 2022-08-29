const a  = {
  "_id": {
    "$oid": "62fbc66ca38b482815509a96"
  },
  "plantid": {
    "$oid": "62fb73682b679ae1c70d34e9"
  },
  "devicename": "MFM",
  "devicetypeid": 25,
  "deviceprotocol": 5,
  "devicemake": "NA",
  "devicemodel": "NA",
  "deviceip": "10.2.101.126",
  "deviceport": 51310,
  "devicedatafetchcron": "*/1 * * * *",
  "devicedisplayname": "MFM",
  "devicecode": 55461091,
  "devicesortorder": 9999,
  "blockid": {
    "$oid": "62fb7d9ede99fa57cd8291a7"
  },
  "deviceparentid": null,
  "devicestatus": {
    "communicationalarmenabled": true,
    "communicationeventenabled": false,
    "disable": false,
    "hidden": false
  },
  "devicemeta": {
    "opcua": {
      "endpoint": "/CogentDataHub/DataAccess",
      "securitymode": 1,
      "securitypolicy": "http://opcfoundation.org/UA/SecurityPolicy#None"
    }
  }, 
  "devicevirtual": false,
  "devicecomments": [],
  "createdAt": {
    "$date": {
      "$numberLong": "1660667501732"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1661158883700"
    }
  }
}
console.log(a)