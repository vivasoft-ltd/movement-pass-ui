import { maxLength, minLength, numeric, required, sameAs } from 'vuelidate/lib/validators';

export default {
  login() {
    return {
      phone: { required },
      password: { required }
    }
  },
  registration() {
    return {
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      user: {
        name: {
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
        retypePassword: {
          required,
          sameAs: sameAs('password')
        },
        birthdate: { required },
        gender: { required },
        district: { required },
        upaZilla: { required },
        cardType: { required },
        cardNumber: {
          required,
          numeric
        }
      }
    }
  },
  registrationVerify() {
    return {
      formData: {
        code: {
          required,
          numeric
        }
      }
    }
  },
  passApplyForm() {
    return {
      formData: {
        from: {required},
        destination: {required},
        district: {required},
        upazilla: {required},
        startDate: {required},
        startTime: {required},
        duration: {required},
        reason: {required},
        vehicleNumber: this.formData.vehicleEnabled ? { required } : '',
        driverName: this.formData.vehicleEnabled && !this.formData.selfDrive ? { required } : '',
        drivingLicence: this.formData.vehicleEnabled  && !this.formData.selfDrive ? { required } : '',
      }
    }
  }
}
