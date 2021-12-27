<template>
  <div class="d-flex justify-content-center align-items-center data-loader">
    <div class="spinner-border" v-bind:class="className" role="status"></div>
  </div>
</template>

<script>
  export default {
    props: {
      className: String
    }
  }
</script>
