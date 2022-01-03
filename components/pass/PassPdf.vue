<template>
  <div class="row">
    <div class="col-md-12 d-flex">
      <button class="btn btn-info ml-auto" @click="passPrint()">
        <Icon icon-name="printer" class="mr-1" /> Print
      </button>
    </div>

    <vue-easy-print ref="passDetails">
      <template>
        <div class="m-3 text-center">
          <Logo :width="100" />
        </div>
        <div class="m-5">
          <UserDetails :user="$auth.user" />

          <h3>Pass Details:</h3>
          <PassDetails :pass="pass" :user="$auth.user" />
        </div>
      </template>
    </vue-easy-print>
  </div>
</template>

<script>
  import PassDetails from './PassDetails';
  import UserDetails from './UserDetails';
  import Logo from '../common/Logo';
  import Icon from '../common/Icon';
  import vueEasyPrint from "vue-easy-print";

  export default {
    components: {
      PassDetails,
      UserDetails,
      Logo,
      Icon,
      vueEasyPrint
    },
    props: {
      pass: Object
    },
    methods: {
      passPrint() {
        this.$refs.passDetails.print();
      }
    }
  }
</script>
