<template>
  <body class="antialiased border-top-wide d-flex flex-column login-layout">
    <div class="flex-fill d-flex flex-column justify-content-center">
      <div class="container-tight py-4 login-box">
        <nuxt/>
      </div>
    </div>
  </body>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Movement Pass Admin'
      }
    }
  }
</script>
