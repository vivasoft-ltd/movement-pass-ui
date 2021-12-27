export default {
  toastMessage(msgType, message) {
    $nuxt.$toast.open({
      message: message,
      type: msgType,
      position:'top-right',
      duration: 5000,
      dismissible: true
    });
  },
  validationMessage(fieldName, param= '') {
    return {
      required: 'The '+ fieldName +' field is required.',
      email: 'This field must contain a valid email address.',
      minLength: 'The '+ fieldName +' field must be at least ' + param + ' characters in length.',
      maxLength: 'The '+ fieldName +' field cannot exceed ' + param + ' characters in length.',
      numeric: 'The '+ fieldName +' field must contain only numbers.',
      integer: 'The '+ fieldName +' field must contain an integer.',
      sameAs: 'The '+ fieldName +' must be same as password.',
    }
  },
  getErrorMessage(modelName, fieldName) {
    if (modelName.hasOwnProperty('required') && !modelName.required) {
      return this.validationMessage(fieldName).required;
    } else if (modelName.hasOwnProperty('email') && !modelName.email) {
      return this.validationMessage(fieldName).email;
    } else if (modelName.hasOwnProperty('minLength') && !modelName.minLength) {
      return this.validationMessage(fieldName, modelName.$params.minLength.min).minLength;
    } else if (modelName.hasOwnProperty('maxLength') && !modelName.maxLength) {
      return this.validationMessage(fieldName, modelName.$params.maxLength.max).maxLength;
    } else if (modelName.hasOwnProperty('integer') && !modelName.integer) {
      return this.validationMessage(fieldName).integer;
    } else if (modelName.hasOwnProperty('numeric') && !modelName.numeric) {
      return this.validationMessage(fieldName).numeric;
    } else if (modelName.hasOwnProperty('sameAs') && !modelName.sameAs) {
      return this.validationMessage(fieldName).sameAs;
    } else {
      return 'You have to set you validation message.';
    }
  }
};
