export default {
  transformPassFormData(data) {
    return {
      trip: data.trip,
      from: data.from,
      destination: {
        location: data.destination,
        district: data.district.name,
        upa_zilla: data.upazilla.name
      },
      pass: {
        start_date: data.startDate + ' ' + data.startTime + ' ' + data.period,
        duration: data.duration,
        reason: data.reason
      },
      vehicle_enabled: data.vehicleEnabled,
      vehicle: {
        self_drive: data.vehicleEnabled ? data.selfDrive : false,
        number: data.vehicleEnabled ? data.vehicleNumber : '',
        driver: {
          name: data.vehicleEnabled && !data.selfDrive ? data.driverName : '',
          licence: data.vehicleEnabled && !data.selfDrive ? data.drivingLicence : ''
        }
      }
    };
  }
}
