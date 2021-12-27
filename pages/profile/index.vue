<template>
  <div class="row">
    <div class="col-md-12">
      <Profile />
    </div>
  </div>
</template>

<script>
  import Profile from '../../components/features/profile';

  export default {
    layout: 'private',
    middleware: 'auth',
    components: {
      Profile
    }
  }
</script>
