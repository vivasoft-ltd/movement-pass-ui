<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        <i class="las la-user la-lg mr-1"></i> {{pageTitle}}
      </h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="form-group col-md-6">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" :value="user.name" :disabled="true">
        </div>
        <div class="form-group col-md-6">
          <label class="form-label">Mobile Number</label>
          <input type="text" class="form-control" :value="user.phone" :disabled="true">
        </div>
        <template v-if="!isAdminUser">
          <div class="form-group col-md-6">
            <label class="form-label">Date of Birth</label>
            <input type="text" class="form-control" :value="DATE_FORMAT(user.birthdate)" :disabled="true">
          </div>
          <div class="form-group col-md-6">
            <label class="form-label">Gender</label>
            <input type="text" class="form-control" :value="user.gender.toUpperCase()" :disabled="true">
          </div>
          <div class="form-group col-md-6">
            <label class="form-label">Card Type</label>
            <input type="text" class="form-control" :value="cardTypes[user.cardType]" :disabled="true">
          </div>
          <div class="form-group col-md-6">
            <label class="form-label">Card Number</label>
            <input type="text" class="form-control" :value="user.cardNumber" :disabled="true">
          </div>
          <div class="form-group col-md-6">
            <label class="form-label">District</label>
            <input type="text" class="form-control" :value="user.district" :disabled="true">
          </div>
          <div class="form-group col-md-6">
            <label class="form-label">Upazilla</label>
            <input type="text" class="form-control" :value="user.upaZilla" :disabled="true">
          </div>
        </template>
        <template v-if="isAdminUser">
          <div class="form-group col-md-6">
            <label class="form-label">Role</label>
            <input type="text" class="form-control" :value="(user.role).toUpperCase()" :disabled="true">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { CARD_TYPES, DATE_FORMAT } from '../../utils';

export default {
  head() {
    return {
     title: this.pageTitle
    }
  },
  data() {
    return {
      pageTitle: 'Profile',
      cardTypes: CARD_TYPES,
      DATE_FORMAT: DATE_FORMAT,
      user: this.$auth.user,
      isAdminUser: this.$auth.getStrategy().name === 'admin'
    }
  }
}
</script>
