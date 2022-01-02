<template>
  <div class="row">
    <div class="col-md-12 d-flex">
      <div v-if="isConfirmStatus" class="ml-auto">
        <h4>{{confirmationMsg}}</h4>
        <div class="d-flex">
          <div class="ml-auto">
            <button class="btn btn-success"
                    :class="[isUpdating ? 'btn-loading' : '']" :disabled="isUpdating"
                    @click="updateStatus(applicationId)">Yes
            </button>
            <button class="btn btn-danger" @click="isConfirmStatus = false">No</button>
          </div>
        </div>
      </div>
      <div v-else class="ml-auto">
        <button class="btn btn-success" @click="approveOrReject(actionTypes.approve)">
          Approve
        </button>
        <button class="btn btn-danger" @click="approveOrReject(actionTypes.reject)">
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { MESSAGES, MESSAGE_TYPES } from '../../utils';
  import ApplicationService from "../../services/ApplicationService";
  import MessageHelper from "../../helpers/MessageHelper";

  export default {
    props: {
      applicationId: String
    },
    data() {
      return {
        isConfirmStatus: false,
        confirmationMsg: '',
        actionTypes: {
          approve: 1,
          reject: 2
        },
        actionType: 1,
        isUpdating: false
      };
    },
    methods: {
      approveOrReject(type) {
        this.isConfirmStatus = true;
        this.actionType = type;
        this.confirmationMsg = type === this.actionTypes.approve ? MESSAGES.approveAlert : MESSAGES.rejectAlert;
      },
      updateStatus(applicationId) {
        this.isUpdating = true;
        const statusFlag = this.actionType === this.actionTypes.approve ? 'approve' : 'reject';

        ApplicationService.statusUpdate(applicationId, statusFlag).then(response => {
          this.isUpdating = false;
          this.$emit('onLoadApplications');

          MessageHelper.toastMessage(MESSAGE_TYPES.success, response.message);
        }).catch(error => {
          this.isUpdating = false;
          MessageHelper.toastMessage(MESSAGE_TYPES.success, error.response.data.message)
        });
      }
    }
  }
</script>
