<template>
  <body class="antialiased">
    <div class="page">
      <header class="navbar navbar-expand-md navbar-dark">
        <Navbar />
      </header>

      <div class="content">
        <div class="container-xl">
          <div class="row mt-3">
            <div class="col-md-3">
              <Sidebar />
            </div>
            <div class="col-md-9">
              <Nuxt />
            </div>
          </div>
        </div>
      </div>

      <footer class="footer footer-transparent">
        <Footer />
      </footer>
    </div>
  </body>
</template>

<script>
  import Navbar from './navbar';
  import Sidebar from './sidebar';
  import Footer from './../footer';

  export default {
    middleware: 'authAdmin',
    components: {
      Navbar,
      Sidebar,
      Footer
    },
    head() {
      return {
        title: 'Movement Pass Admin'
      }
    },
    data() {
      return {
        user: this.$auth.user
      }
    },
    methods: {
      async logout() {

        try {
          let response = await this.$auth.logout();
          console.log('re:', response);
          this.$toast.open({
            message: response.message,
            type: 'success',
            position:'top-right',
            duration: 5000,
            dismissible: true
          });

          this.$router.push('/admin');

        } catch (error) {
          console.log(error);
        }
      },
      isActiveMenu(routeName) {
        return this.$route.name === routeName;
      }
    }
  }
</script>
