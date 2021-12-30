<template>
  <div class="card menu">
    <div class="card-body">
      <div class="text-center">
        <Avatar size="xl" />
        <h3 class="mt-2">{{$auth.user.name}}</h3>
      </div>
      <div class="mt-3">
        <nuxt-link class="btn btn-block btn-light" v-bind:class="{active: isActiveMenu('admin/profile')}" to="/admin/profile">
          <i class="la la-user la-lg mr-2"></i> Profile
        </nuxt-link>
        <nuxt-link class="btn btn-block btn-light" v-bind:class="{active: isActiveMenu('admin/users')}" to="/admin/users">
          <i class="la la-user la-lg mr-2"></i> Users
        </nuxt-link>
        <nuxt-link class="btn btn-block btn-light" v-bind:class="{active: isActiveMenu('admin/applications')}" to="/admin/applications">
          <i class="la la-file-alt la-lg mr-2"></i> Applications
        </nuxt-link>
        <button class="btn btn-block btn-light" @click="logout">
          <i class="la la-sign-out la-lg mr-2"></i> Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '../../components/common/avatar';

  export default {
    components: {
      Avatar
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        this.$router.push('/admin/login');
      },
      isActiveMenu(routeName) {
        return this.$route.name === routeName;
      }
    }
  }
</script>
