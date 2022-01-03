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
              <div class="card">
                <div class="card-body">
                  <Sidebar />
                </div>
              </div>
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
  import Footer from './footer';
  import Sidebar from './sidebar';

  export default {
    layout: 'private',
    middleware: 'auth',
    components: {
      Navbar,
      Footer,
      Sidebar
    }
  }
</script>
