<template>
  <form @submit.prevent="userLogin">
    <div class="form-group">
      <label class="form-label">Mobile Number</label>
      <div class="input-group">
        <span class="input-group-text">+880</span>
        <input type="text" class="form-control" v-model="phone" placeholder="1xxxxxxxxx">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <div class="input-group">
              <span class="input-group-text">
                <i class="la la-key la-lg ml-2 mr-1"></i>
              </span>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>
    </div>
    <div class="mb-3">
      <button class="btn btn-info btn-block"
              :class="[isLogging ? 'btn-loading' : '']"
              :disabled="isLogging">
        Login
      </button>
    </div>
  </form>
</template>

<script>
  import MessageHelper from '../../helpers/MessageHelper';
  import { MESSAGES, MESSAGE_TYPES } from '../../utils';
  import ValidationHelper from '../../helpers/ValidationHelper';

  export default {
    props: {
      logging: Boolean
    },
    data() {
      return {
        pageTitle: 'Login to your account',
        isLogging: false,
        phone: '',
        password: ''
      }
    },
    validations: ValidationHelper.login,
    methods: {
      async userLogin() {
        this.isLogging = true;

        if (!this.$v.$invalid) {
          const loginData = {
            phone: '0' + this.phone,
            password: this.password
          };

          this.$emit('doLogin', loginData);

        } else {
          this.isLogging = false;
          MessageHelper.toastMessage(MESSAGE_TYPES.error, MESSAGES.loginError);
        }
      }
    },
    watch: {
      logging: function(newVal, oldVal) {
        this.isLogging = newVal;
      }
    }
  }
</script>
