<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4 col-sm-12 col-md-12">
            <Logo :width="300" />
          </div>
          <div class="col-lg-8 col-sm-12 col-md-12 m-auto ">
            <strong>Greetings! Only in case of emergency, you can use this tool to get permission from the concerned police department by maintaining the hygiene rules in the lockdown.</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '../components/common/Logo';

  export default {
    components: {
      Logo
    }
  }
</script>
