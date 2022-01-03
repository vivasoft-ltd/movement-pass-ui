<template>
    <div>
      <div class="text-center">
        <Avatar size="xl" />
        <h3 class="mt-2">{{$auth.user.name}}</h3>
      </div>
      <div class="mt-3 menu sidebar">
        <nuxt-link class="btn btn-block btn-light"
                   v-bind:class="{active: isActiveMenu('profile')}"
                   to="/profile">
          <Icon icon-name="user" class="mr-1" />
          Profile
        </nuxt-link>
        <nuxt-link class="btn btn-block btn-light"
                   v-bind:class="{active: isActiveMenu('pass')}"
                   to="/pass">
          <Icon icon-name="card" class="mr-1" />
          Passes
        </nuxt-link>
        <button class="btn btn-block btn-light" @click="logout">
          <Icon icon-name="logout" class="mr-1" />
          Logout
        </button>
      </div>
    </div>
</template>

<script>
  import Avatar from '../components/common/Avatar';
  import Icon from '../components/common/Icon';

  export default {
    components: {
      Avatar,
      Icon
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
