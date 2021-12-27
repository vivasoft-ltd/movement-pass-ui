<template>
  <body class="antialiased">
    <div class="page">
      <header class="navbar navbar-expand-md navbar-dark">
        <navbar />
      </header>

      <div class="content">
        <div class="container-xl">
          <Nuxt />
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
  import Footer from './footer';

  export default {
    components: {
      Navbar,
      Footer
    },
    head() {
      return {
        title: 'Movement Pass'
      }
    }
  }
</script>
