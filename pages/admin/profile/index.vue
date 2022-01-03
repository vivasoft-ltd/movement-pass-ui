<template>
  <div class="row">
    <div class="col-md-12">
      <Profile />
    </div>
  </div>
</template>

<script>
  import Profile from '../../../components/features/Profile';

  export default {
    middleware: 'authAdmin',
    layout: 'admin/default',
    components: {
      Profile
    }
  }
</script>
