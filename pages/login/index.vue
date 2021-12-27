<template>
  <div class="row">
    <div class="col-md-8 text-center">
      <Logo :width="350" />
    </div>
    <div class="col-md-4">
      <div class="card mt-4">
        <div class="card-body">
          <h2 class="card-title">Login Your Account</h2>
          <LoginForm :logging="isLogging" @doLogin="doLogin" />
          <div class="text-muted mt-2">
            Don't have account yet? <nuxt-link to="/registration">Registration</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageHelper from '../../helpers/MessageHelper';
import { MESSAGE_TYPES } from '../../utils';
import LoginForm from '../../components/features/loginForm';
import Logo from '../../components/common/logo';

export default {
  middleware: 'guest',
  components: {
    LoginForm,
    Logo
  },
  data() {
    return {
      isLogging: false
    }
  },
  methods: {
    async doLogin(loginData) {
      this.isLogging = true;

      try {
        await this.$auth.loginWith('user', { data: loginData });
        this.$router.push('/profile');
      } catch (error) {
        this.isLogging = false;
        MessageHelper.toastMessage(MESSAGE_TYPES.error, error.response.data.message);
      }
    }
  }
}
</script>
