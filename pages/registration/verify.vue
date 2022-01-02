<template>
  <div class="row">
    <div class="col-md-4 mt-4">
      <Logo :width="350" />
    </div>
    <div class="col-md-8">
      <div class="card mt-4">
        <div class="card-header">
          <h2 class="card-title">
            {{pageTitle}}
          </h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="submit">
            <div class="row mb-4">
              <div class="form-group col-md-6">
                <label class="form-label required">Verification Code</label>
                <input type="text"
                       class="form-control"
                       v-model="$v.formData.code.$model"
                       :class="{'is-invalid' : $v.formData.code.$error}"
                       placeholder="Enter verification code">
                <validation-error v-if="$v.formData.code.$error" :model-name="$v.formData.code" field-name="code" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label">&nbsp;</label>
                <button type="submit"
                        class="btn btn-info"
                        :class="[isVerifying ? 'btn-loading' : '']"
                        :disabled="isVerifying">
                  Verify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ValidationHelper from '../../helpers/ValidationHelper';
  import ValidationError from '../../components/common/ValidationError';
  import AuthService from '../../services/AuthService';
  import MessageHelper from '../../helpers/MessageHelper';
  import { MESSAGE_TYPES, MESSAGES } from '../../utils';
  import Logo from '../../components/common/Logo';

  export default {
    middleware: 'guest',
    components: {
      ValidationError,
      Logo
    },
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: 'User Verification',
        isVerifying: false,
        formData: {
          phone: localStorage.getItem('userPhone'),
          code: ''
        }
      }
    },
    validations: ValidationHelper.registrationVerify,
    methods: {
      submit() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.isVerifying = true;

          AuthService.verify(this.formData).then(response => {
            localStorage.removeItem('userPhone');
            MessageHelper.toastMessage(MESSAGE_TYPES.success, MESSAGES.verifySuccess);

            this.$router.push('/login');
          }).catch(error => {
            this.isVerifying = false;
            MessageHelper.toastMessage(MESSAGE_TYPES.error, error.response.data.message);
          });
        }
      }
    }
  }
</script>
