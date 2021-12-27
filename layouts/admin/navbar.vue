<template>
    <div class="container-xl">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <nuxt-link to="/" class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pr-0 pr-md-3">
        <h2 class="mb-0">Movement Pass</h2>
      </nuxt-link>
      <div class="navbar-nav">
        <ul class="navbar-nav">
          <template v-if="loggedIn">
            <li class="nav-item">
              <nuxt-link to="/admin/profile" class="nav-link">
                <span class="nav-link-title mr-2">{{ $auth.user.name }}</span>
                <Avatar />
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
</template>

<script>
  import Avatar from '../../components/common/avatar';

  export default {
    components: {
      Avatar
    },
    data() {
      return {
        loggedIn: this.$auth.loggedIn && this.$auth.getStrategy().name === 'admin'
      };
    }
  }
</script>
