<template>
  <div class="row">
    <div class="col-md-4 mt-4">
      <Logo :width="350" />
    </div>
    <div class="col-md-8">
      <div class="card mt-4">
        <div class="card-header">
          <h2 class="card-title">
            <i class="la la-user-plus la-lg mr-1"></i> {{pageTitle}}
          </h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="row">
              <div class="form-group col-md-6">
                <label class="form-label required">Name</label>
                <input type="text"
                       class="form-control"
                       v-model="user.name"
                       :class="{'is-invalid' : $v.user.name.$error}"
                       placeholder="Enter your name">
                <validation-error v-if="$v.user.name.$error" :model-name="$v.user.name" field-name="name" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Mobile Number</label>
                <div class="input-group">
                  <span class="input-group-text">+880</span>
                  <input type="text"
                         class="form-control"
                         name="phone"
                         v-model="phone"
                         @input="changeInput($event)"
                         :class="{'is-invalid' : $v.phone.$error || errors.hasOwnProperty('phone')}"
                         placeholder="1xxxxxxxxx">
                </div>
                <validation-error v-if="$v.phone.$error" :model-name="$v.phone" field-name="mobile number" />
                <div class="invalid-feedback" v-if="errors.hasOwnProperty('phone')">{{ errors.phone[0] }}</div>
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Password</label>
                <input type="password"
                       class="form-control"
                       v-model="user.password"
                       :class="{'is-invalid' : $v.user.password.$error}"
                       placeholder="Password">
                <validation-error v-if="$v.user.password.$error" :model-name="$v.user.password" field-name="password" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Retype Password</label>
                <input type="password"
                       class="form-control"
                       v-model="user.retypePassword"
                       :class="{'is-invalid' : $v.user.retypePassword.$error}"
                       placeholder="Retype Password">
                <validation-error v-if="$v.user.retypePassword.$error" :model-name="$v.user.retypePassword" field-name="retype password" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Date of Birth</label>
                <div class="input-icon">
                  <VueDatePicker class="form-control"
                                 v-model="user.birthdate"
                                 :class="{'is-invalid' : $v.user.birthdate.$error}"
                                 format="YYYY-MM-DD"
                                 placeholder="yyyy-mm-dd"
                                 ref="menu"
                                 :max-date="maxDate"
                                 :min-date="minDate"
                                 @onOpen="menu = true"
                                 @onClose="menu = false"
                                 no-header
                                 no-calendar-icon />
                  <span class="input-icon-addon">
                    <i class="la la-calendar la-lg"></i>
                  </span>
                </div>
                <validation-error v-if="$v.user.birthdate.$error" :model-name="$v.user.birthdate" field-name="date of birth" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Gender</label>
                <div class="mt-2">
                  <label class="form-check form-check-inline">
                    <input type="radio" class="form-check-input mt-1" v-model="user.gender" value="male">
                    <span class="form-check-label">Male</span>
                  </label>
                  <label class="form-check form-check-inline">
                    <input type="radio"class="form-check-input mt-1" v-model="user.gender" value="female">
                    <span class="form-check-label">Female</span>
                  </label>
                  <label class="form-check form-check-inline">
                    <input type="radio" class="form-check-input mt-1" v-model="user.gender" value="other">
                    <span class="form-check-label">Other</span>
                  </label>
                </div>
                <validation-error v-if="$v.user.gender.$error" :model-name="$v.user.gender" field-name="gender" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Card Type</label>
                <select class="form-select"
                        v-model="user.cardType"
                        :class="{'is-invalid' : $v.user.cardType.$error}">
                  <option value="">---- Select ----</option>
                  <option v-for="(value, key) in cardTypes" :value="key">{{ value }}</option>
                </select>
                <validation-error v-if="$v.user.cardType.$error" :model-name="$v.user.cardType" field-name="card type" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Card Number</label>
                <input type="text"
                       class="form-control"
                       :class="{'is-invalid' : $v.user.cardNumber.$error}"
                       v-model="user.cardNumber"
                       placeholder="Enter your card number">
                <validation-error v-if="$v.user.cardNumber.$error" :model-name="$v.user.cardNumber" field-name="card number" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">District</label>
                <v-select v-model="user.district"
                          :options="districts"
                          @input="selectDistrict"
                          :class="{'is-invalid' : $v.user.district.$error}"
                          label="name"
                          :clearable="false"
                          placeholder="Select District">
                </v-select>
                <validation-error v-if="$v.user.district.$error" :model-name="$v.user.district" field-name="district" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Upazilla</label>
                <v-select v-model="user.upaZilla"
                          :options="upazillas"
                          :class="{'is-invalid' : $v.user.upaZilla.$error}"
                          label="name"
                          :clearable="false"
                          placeholder="Select Upazilla">
                </v-select>
                <validation-error v-if="$v.user.upaZilla.$error" :model-name="$v.user.upaZilla" field-name="upaZilla" />
              </div>
              <div class="form-group col-md-6">
                <label class="form-label required">Image</label>
                <input type="file" ref="file" class="form-control" @change="selectImage()">
                <div class="invalid-feedback" v-if="errors.hasOwnProperty('image')">{{ errors.image[0] }}</div>
              </div>
            </div>
            <div class="text-right">
              <button class="btn btn-info" :class="[isCreating ? 'btn-loading' : '']" :disabled="isCreating">Registration</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { VueDatePicker } from '@mathieustan/vue-datepicker';
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
  import ValidationError from '../../components/common/validationError';
  import { CARD_TYPES, FORMAT_PHONE_NUMBER } from '../../utils';
  import { DISTRICTS, UPAZILLAS } from '../../utils/locations';
  import ValidationHelper from '../../helpers/ValidationHelper';
  import AuthService from '../../services/AuthService';
  import Logo from '../../components/common/logo';

  const GENDER = 'male';
  const MAX_DATE = '2005-12-31';
  const MIN_DATE = '1920-01-01';

  export default {
    middleware: 'guest',
    components: {
      VueDatePicker,
      ValidationError,
      Logo
    },
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: 'Registration',
        districts: DISTRICTS,
        upazillas: [],
        cardTypes: CARD_TYPES,
        maxDate: MAX_DATE,
        minDate: MIN_DATE,
        menu: false,
        isCreating: false,
        imageFile: '',
        phone: '',
        user: {
          cardType: '',
          gender: GENDER
        },
        errors: {}
      }
    },
    validations: ValidationHelper.registration,
    methods: {
      selectDistrict(district) {
        this.upazillas = UPAZILLAS.filter(upazilla => {
          return upazilla.district_id === district.id;
        });
      },
      changeInput(event) {
        if(this.errors.hasOwnProperty(event.target.name)) {
          delete this.errors[event.target.name];
        }
      },
      selectImage() {
        this.imageFile = this.$refs.file.files[0];
      },
      submit() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.isCreating = true;

          const userFormData = {
            ...this.user,
            phone: FORMAT_PHONE_NUMBER(this.phone),
            district: this.user.district.name,
            upaZilla: this.user.upaZilla.name,
            image: this.imageFile
          };

          let formData = new FormData();

          for (const [key, value] of Object.entries(userFormData)) {
            formData.append(key, value);
          }

          AuthService.registration(formData).then( response => {
            localStorage.setItem('userPhone', response.phone);
            this.$router.push('/registration/verify');
          }).catch(error => {
            this.isCreating = false;

            if (error.response.status === 422) {
              this.errors = error.response.data;
            }
          });
        }
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.menu.$refs.agenda.mode = 'year'));
      },
    }
  }
</script>
