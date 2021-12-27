<template>
    <div>
      <div class="text-center">
        <Avatar size="xl" />
        <h3 class="mt-2">{{$auth.user.name}}</h3>
      </div>
      <div class="mt-3 menu">
        <nuxt-link class="btn btn-block btn-light"
                   v-bind:class="{active: isActiveMenu('profile')}"
                   to="/profile">
          <i class="la la-user la-lg mr-2"></i> Profile
        </nuxt-link>
        <nuxt-link class="btn btn-block btn-light"
                   v-bind:class="{active: isActiveMenu('pass')}"
                   to="/pass">
          <i class="la la-id-card la-lg mr-2"></i> Passes
        </nuxt-link>
        <button class="btn btn-block btn-light" @click="logout">
          <i class="la la-sign-out la-lg mr-2"></i> Logout
        </button>
      </div>
    </div>
</template>

<script>
  import Avatar from '../components/common/avatar';

  export default {
    components: {
      Avatar
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        this.$router.push('/login');
      },
      isActiveMenu(routeName) {
        return this.$route.name === routeName;
      }
    }
  }
</script>
