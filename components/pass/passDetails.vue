<template>
  <div>
    <UserDetails v-if="pass?.user" :user="pass.user" />

    <div class="row">
      <div class="col-md-6">
        <dl class="row">
          <dt class="col-5">From</dt>
          <dd class="col-7">: {{pass.from}}</dd>
          <dt class="col-5">Date</dt>
          <dd class="col-7">: {{DATE_FORMAT(pass.pass?.start_date, true)}}</dd>
          <dt class="col-5">Duration</dt>
          <dd class="col-7">
            : <PassDuration :duration="pass.pass?.duration" />
          </dd>
          <dt class="col-5">Reason</dt>
          <dd class="col-7">: {{pass.pass?.reason}}</dd>
          <dt class="col-5">Movement Type</dt>
          <dd class="col-7">: {{MOVEMENT_TYPES[pass.trip]}}</dd>
          <dt class="col-5">Status</dt>
          <dd class="col-7">
            : <Status :approved="pass.approved" />
          </dd>
        </dl>
      </div>
      <div class="col-md-6">
        <dl class="row">
          <dt class="col-5">Destination</dt>
          <dd class="col-7">
            : <PassDestination :destination="pass.destination" />
          </dd>
          <template v-if="pass.vehicle_enabled" class="row">
            <dt class="col-12 text-azure mb-2">Vehicle Info</dt>
            <dt class="col-5">Vehicle No.</dt>
            <dd class="col-7">: {{pass.vehicle?.number}}</dd>
            <template v-if="!pass.vehicle.self_drive" class="row">
              <dt class="col-5">Driver</dt>
              <dd class="col-7">: {{pass.vehicle?.driver.name}}</dd>
              <dt class="col-5">Driver licence</dt>
              <dd class="col-7">: {{pass.vehicle?.driver.licence}}</dd>
            </template>
          </template>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
  import { MOVEMENT_TYPES, DATE_FORMAT } from '../../utils';
  import Status from '../common/status';
  import UserDetails from './userDetails';
  import PassDestination from './passDestination';
  import PassDuration from './passDuration';

  export default {
    components: {
      PassDuration,
      PassDestination,
      UserDetails,
      Status
    },
    props: {
      pass: Object
    },
    data() {
      return {
        DATE_FORMAT: DATE_FORMAT,
        MOVEMENT_TYPES: MOVEMENT_TYPES
      };
    }
  }
</script>
