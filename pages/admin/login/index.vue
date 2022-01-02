<template>
  <div class="container-tight py-4 login-box">
    <div class="text-center mb-4">
      <Logo :width="100" />
    </div>
    <div class="card card-md">
      <div class="card-body">
        <h2 class="mb-3 text-center">Login to your account</h2>
        <LoginForm :logging="isLogging" @doLogin="doLogin" />
      </div>
    </div>
  </div>
</template>

<script>
  import MessageHelper from '../../../helpers/MessageHelper';
  import { MESSAGE_TYPES } from '../../../utils';
  import LoginForm from '../../../components/features/LoginForm';
  import Logo from '../../../components/common/Logo';

  export default {
    layout: 'admin/login',
    components: {
      LoginForm,
      Logo
    },
    head() {
      return {
        title: 'Admin Login'
      }
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
          await this.$auth.loginWith('admin', { data: loginData });
          this.$router.push('/admin/applications');
        } catch (error) {
          this.isLogging = false;
          MessageHelper.toastMessage(MESSAGE_TYPES.error, error.response.data.message);
        }
      }
    },
    created() {
      if (this.$auth.user && this.$auth.getStrategy().name === 'admin') {
        this.$router.push('/admin/applications');
      }
    }
  }
</script>
