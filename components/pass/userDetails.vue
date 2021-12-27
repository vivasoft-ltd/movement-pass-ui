<template>
  <div class="row">
    <div class="col-md-6">
      <dl class="row">
        <dt class="col-5">Name</dt>
        <dd class="col-7">: {{user.name}}</dd>
        <dt class="col-5">Mobile No.</dt>
        <dd class="col-7">: {{user.phone}}</dd>
        <dt class="col-5">Date Of Birth</dt>
        <dd class="col-7">: {{DATE_FORMAT(user.birthdate)}}</dd>
        <dt class="col-5">Gender</dt>
        <dd class="col-7">: {{user.gender.toUpperCase()}}</dd>
        <dt class="col-5">Card Type</dt>
        <dd class="col-7">: {{CARD_TYPES[user.cardType]}}</dd>
        <dt class="col-5">Card Number</dt>
        <dd class="col-7">: {{user.cardNumber}}</dd>
      </dl>
    </div>
    <div class="col-md-6 text-right">
      <Avatar size="xl" avatar-style="rounded"/>
    </div>
    <hr>
  </div>
</template>

<script>
  import { CARD_TYPES, DATE_FORMAT } from '../../utils';
  import Avatar from '../common/avatar';

  export default {
    components: {
      Avatar
    },
    props: {
      user: Object
    },
    data() {
      return {
        CARD_TYPES: CARD_TYPES,
        DATE_FORMAT: DATE_FORMAT
      };
    }
  }
</script>
