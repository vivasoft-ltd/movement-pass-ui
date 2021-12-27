<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex">
          <h3 class="card-title">
            <i class="las la-plus-circle la-lg mr-1"></i> {{pageTitle}}
          </h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createPass()">
          <div class="row">
            <div class="form-group col-md-6">
              <label class="form-label required">Location From</label>
              <input class="form-control"
                     v-model="formData.from"
                     :class="{'is-invalid' : $v.formData.from.$error}"
                     placeholder="Enter your location">
              <validation-error v-if="$v.formData.from.$error" :model-name="$v.formData.from" field-name="location from" />
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Where to go</label>
              <input class="form-control"
                     v-model="formData.destination"
                     :class="{'is-invalid' : $v.formData.destination.$error}"
                     placeholder="Enter your location">
              <validation-error v-if="$v.formData.destination.$error" :model-name="$v.formData.destination" field-name="location to" />
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Destination District</label>
              <v-select v-model="formData.district"
                        :options="districts"
                        @input="selectDistrict"
                        :class="{'is-invalid' : $v.formData.district.$error}"
                        label="name"
                        :clearable="false"
                        placeholder="Select District">
              </v-select>
              <validation-error v-if="$v.formData.district.$error" :model-name="$v.formData.district" field-name="district" />
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Destination Upazilla</label>
              <v-select v-model="formData.upazilla"
                        :options="upazillas"
                        :class="{'is-invalid' : $v.formData.upazilla.$error}"
                        label="name"
                        :clearable="false"
                        placeholder="Select Upazilla">
              </v-select>
              <validation-error v-if="$v.formData.upazilla.$error" :model-name="$v.formData.upazilla" field-name="upazilla" />
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Date for the pass</label>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-icon">
                    <VueDatePicker class="form-control"
                                   v-model="formData.startDate"
                                   :class="{'is-invalid' : $v.formData.startDate.$error}"
                                   format="YYYY-MM-DD"
                                   :min-date="minimumDate"
                                   placeholder="yyyy-mm-dd"
                                   no-header
                                   no-calendar-icon />
                    <span class="input-icon-addon">
                      <i class="la la-calendar la-lg"></i>
                    </span>
                  </div>
                </div>
                <div class="col-md-3">
                  <select class="form-select"
                          :class="{'is-invalid' : $v.formData.startTime.$error}"
                          v-model="formData.startTime">
                    <option value="">0:00</option>
                    <option v-for="time in times">{{ time }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <select class="form-select" v-model="formData.period">
                    <option selected>AM</option>
                    <option>PM</option>
                  </select>
                </div>
                <validation-error v-if="$v.formData.startDate.$error" :model-name="$v.formData.startDate" field-name="date" />
                <validation-error v-if="$v.formData.startTime.$error" :model-name="$v.formData.startTime" field-name="time" />
              </div>
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Set a time limit to stay out</label>
              <select class="form-select"
                      v-model="formData.duration"
                      :class="{'is-invalid' : $v.formData.duration.$error}">
                <option value="">---- Select ----</option>
                <option v-for="n in 12" :value="n">{{ n === 1 ? n + ' Hour' : n + ' Hours'}}</option>
              </select>
              <validation-error v-if="$v.formData.duration.$error" :model-name="$v.formData.duration" field-name="duration" />
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Movement Type</label>
              <div class="mt-2">
                <label v-for="(movementType, name) in movementTypes" class="form-check form-check-inline">
                  <input type="radio" class="form-check-input mt-1" v-model="formData.trip" :value="name">
                  <span class="form-check-label">{{ movementType }}</span>
                </label>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label class="form-label required">Reason for Movement</label>
              <select class="form-select"
                     v-model="formData.reason"
                     :class="{'is-invalid' : $v.formData.reason.$error}"
                      placeholder="Reason">
                <option value="">Select a reason</option>
                <option v-for="reason in reasons">{{ reason }}</option>
              </select>
              <validation-error v-if="$v.formData.reason.$error" :model-name="$v.formData.reason" field-name="reason" />
            </div>
            <div class="form-group col-md-6">
              <div class="mt-2">
                <label class="form-label">
                  Do you want to drive out?
                  <input type="checkbox" class="form-check-input mt-1 ml-4" v-model="formData.vehicleEnabled">
                </label>
              </div>
            </div>
            <template v-if="formData.vehicleEnabled">
              <div class="form-group col-md-6">
                <div class="mt-2">
                  <label class="form-label">
                    Will you drive yourself?
                    <input type="checkbox" class="form-check-input mt-1 ml-4" v-model="formData.selfDrive" >
                  </label>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Vehicle Number</label>
                <input type="text" class="form-control"
                       v-model="formData.vehicleNumber"
                       :class="{'is-invalid' : $v.formData.vehicleNumber.$error}"
                       placeholder="Enter vehicle number">
                <validation-error v-if="$v.formData.vehicleNumber.$error" :model-name="$v.formData.vehicleNumber" field-name="vehicle number" />
              </div>
              <template v-if="!formData.selfDrive">
                <div class="form-group col-md-6">
                  <label class="form-label required">Driver Name</label>
                  <input type="text" class="form-control"
                         v-model="formData.driverName"
                         :class="{'is-invalid' : $v.formData.driverName.$error}"
                         placeholder="Enter driver name">
                  <validation-error v-if="$v.formData.driverName.$error" :model-name="$v.formData.driverName" field-name="driver name" />
                </div>
                <div class="form-group col-md-6">
                  <label class="form-label required">Driver Licence Number</label>
                  <input type="text" class="form-control"
                         v-model="formData.drivingLicence"
                         :class="{'is-invalid' : $v.formData.drivingLicence.$error}"
                         placeholder="Enter driver licence number">
                  <validation-error v-if="$v.formData.drivingLicence.$error" :model-name="$v.formData.drivingLicence" field-name="driving licence" />
                </div>
              </template>
            </template>
          </div>
          <div class="text-right">
            <button class="btn btn-info" :class="[isCreating ? 'btn-loading' : '']" :disabled="isCreating">Apply</button>
          </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ValidationError from '../../components/common/validationError';
  import { VueDatePicker } from '@mathieustan/vue-datepicker';
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
  import { DISTRICTS, UPAZILLAS } from '../../utils/locations';
  import { MOVEMENT_REASONS, START_TIMES, MOVEMENT_TYPES, MESSAGE_TYPES, MESSAGES } from '../../utils';
  import ValidationHelper from '../../helpers/ValidationHelper';
  import DataTransformHelper from '../../helpers/DataTransformHelper';
  import PassService from '../../services/PassService';
  import MessageHelper from '../../helpers/MessageHelper';

  const DEFAULT_TRIP = 'round';
  const DEFAULT_PERIOD = 'AM';

  export default {
    layout: 'private',
    components: {
      VueDatePicker,
      ValidationError
    },
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: 'Apply New Pass',
        districts: DISTRICTS,
        upazillas: [],
        reasons: MOVEMENT_REASONS,
        times: START_TIMES,
        movementTypes: MOVEMENT_TYPES,
        minimumDate: this.$moment(new Date).format('YYYY-MM-DD'),
        isCreating: false,
        formData : {
          trip: DEFAULT_TRIP,
          duration: '',
          startTime: '',
          period: DEFAULT_PERIOD,
          reason: '',
          startDate: null,
          vehicleEnabled: false,
          selfDrive: false
        }
      }
    },
    validations: ValidationHelper.passApplyForm,
    methods: {
      selectDistrict(district) {
        this.upazillas = UPAZILLAS.filter(upazilla => {
          return upazilla.district_id === district.id;
        });
      },
      createPass() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.isCreating = true;
          const requestData = DataTransformHelper.transformPassFormData(this.formData);

          PassService.create(requestData).then(response => {
            MessageHelper.toastMessage(MESSAGE_TYPES.success, MESSAGES.passCreateSuccess);
            this.$router.push('/pass');
          }).catch(error => {
            this.isCreating = false;
            MessageHelper.toastMessage(MESSAGE_TYPES.error, error.message);
          });
        }
      }
    }
  }
</script>
