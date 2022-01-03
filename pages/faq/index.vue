<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">{{pageTitle}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: `FAQ's`
      }
    }
  }
</script>
