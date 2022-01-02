<template>
  <div class="card menu">
    <div class="card-body">
      <div class="text-center">
        <Avatar size="xl" />
        <h3 class="mt-2">{{$auth.user.name}}</h3>
      </div>
      <div class="mt-3 sidebar">
        <nuxt-link class="btn btn-block btn-light" :class="{active: isActiveMenu('admin/profile')}" to="/admin/profile">
          <Icon icon-name="user" class="mr-1" />
          Profile
        </nuxt-link>
        <nuxt-link class="btn btn-block btn-light" :class="{active: isActiveMenu('admin/users')}" to="/admin/users">
          <Icon icon-name="user" class="mr-1" />
          Users
        </nuxt-link>
        <nuxt-link class="btn btn-block btn-light" :class="{active: isActiveMenu('admin/applications')}" to="/admin/applications">
          <Icon icon-name="file" class="mr-1" />
          Applications
        </nuxt-link>
        <button class="btn btn-block btn-light" @click="logout">
          <Icon icon-name="logout" class="mr-1" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '../../components/common/Avatar';
  import Icon from '../../components/common/Icon';

  export default {
    components: {
      Avatar,
      Icon
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
