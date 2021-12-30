<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex">
          <h3 class="card-title">
            <i class="las la-file-alt la-lg mr-1"></i> {{pageTitle}}
          </h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mb-0 form-group">
              <label class="form-label">Date From</label>
              <div class="input-icon">
                <VueDatePicker class="form-control"
                               v-model="searchForm.dateFrom"
                               format="YYYY-MM-DD"
                               placeholder="yyyy-mm-dd"
                               no-header
                               no-calendar-icon />
                <span class="input-icon-addon">
                    <i class="la la-calendar la-lg"></i>
                  </span>
              </div>
            </div>
            <div class="col-md-3 mb-0 form-group">
              <label class="form-label">Date To</label>
              <div class="input-icon">
                <VueDatePicker class="form-control"
                               v-model="searchForm.dateTo"
                               format="YYYY-MM-DD"
                               placeholder="yyyy-mm-dd"
                               no-header
                               no-calendar-icon />
                <span class="input-icon-addon">
                    <i class="la la-calendar la-lg"></i>
                  </span>
              </div>
            </div>
            <div class="col-md-3 mb-0 form-group">
              <label class="form-label">Status</label>
              <select v-model="searchForm.approved" class="form-select">
                <option value="">All</option>
                <option v-for="(passStatus, key) in passStatuses" :value="key">{{passStatus}}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">&nbsp;</label>
              <button class="btn btn-info ml-auto" @click="onSearch">
                <i class="la la-search mr-1"></i> Search
              </button>
              <button class="btn btn-warning ml-auto" @click="onReset">
                <i class="la la-refresh mr-1"></i> Reset
              </button>
            </div>
          </div>
        </div>
        <div class="table-responsive border-top">
          <loader v-if="isLoading"></loader>
          <table class="table card-table table-vcenter">
            <thead>
            <tr>
              <th>Location From</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Movement Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="application in applications">
              <td>{{application.from}}</td>
              <td>
                <PassDestination :destination="application.destination" />
              </td>
              <td>
                {{DATE_FORMAT(application.pass?.start_date, true)}}
              </td>
              <td>{{ movementTypes[application.trip] }}</td>
              <td>
                <PassDuration :duration="application.pass?.duration" />
              </td>
              <td>
                <Status :approved="application.approved" />
              </td>
              <td class="text-right">
                <button class="btn btn-light btn-pill" @click="viewApplication(application)">
                  <i class="la la-file-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="!isLoading && totalNumberOfApplications === 0">
              <td colspan="7" class="text-center">No records found.</td>
            </tr>
            </tbody>
          </table>
          <Pagination :total-rows="totalNumberOfApplications" @changePage="onChangePage" />
        </div>
      </div>
    </div>
    <modal :modal-config="modal">
        <PassDetails :pass="application" />
        <PassStatusActions v-if="application.approved === null"
                           :application-id="application._id"
                           @onLoadApplications="onLoadApplications" />
    </modal>
  </div>
</template>

<script>
  import Loader from '../../../components/common/loader';
  import { VueDatePicker } from '@mathieustan/vue-datepicker';
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
  import Modal from '../../../components/common/modal';
  import PassDetails from '../../../components/pass/passDetails';
  import Status from '../../../components/common/status';
  import { MOVEMENT_TYPES, DATE_FORMAT, PASS_STATUSES } from '../../../utils';
  import Pagination from '../../../components/common/pagination';
  import PassStatusActions from '../../../components/pass/passStatusActions';
  import PassDestination from '../../../components/pass/passDestination';
  import PassDuration from "../../../components/pass/passDuration";
  import ApplicationService from "../../../services/ApplicationService";

  export default {
    middleware: 'authAdmin',
    layout: 'admin/default',
    components: {
      VueDatePicker,
      PassDuration,
      PassDestination,
      PassStatusActions,
      Loader,
      Modal,
      PassDetails,
      Status,
      Pagination
    },
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: 'Applications',
        movementTypes: MOVEMENT_TYPES,
        DATE_FORMAT: DATE_FORMAT,
        passStatuses: PASS_STATUSES,
        isLoading: true,
        modalShow: false,
        applications: [],
        totalNumberOfApplications: 0,
        application: {},
        modal: {
          size: 'lg',
          title: 'Application Details',
          show: false
        },
        pageNo: 1,
        searchForm: {
          approved: '',
          dateFrom: null,
          dateTo: null
        },
        queryParams: {}
      }
    },
    methods: {
      loadApplications() {
        this.isLoading = true;

        ApplicationService.loadAll({
          ...this.queryParams,
          page: this.pageNo
        }).then(response => {
          this.applications = response.data;
          this.totalNumberOfApplications = response.total;
          this.isLoading = false;
        }).catch(error => {
          this.isLoading = false;
          console.log('error:', error);
        });
      },
      onLoadApplications() {
        this.modal = {
          ... this.modal,
          show: false
        };
        this.loadApplications();
      },
      onChangePage(pageNo) {
        this.pageNo = pageNo;
        this.loadApplications();
      },
      onSearch() {
        this.queryParams = {};

        if (this.searchForm.dateFrom) {
          this.queryParams.date_from = this.searchForm.dateFrom;
        }
        if (this.searchForm.dateTo) {
          this.queryParams.date_to = this.searchForm.dateTo;
        }
        if (this.searchForm.approved) {
          this.queryParams.approved = this.searchForm.approved;
        }

        this.loadApplications();
      },
      onReset() {
        this.queryParams = {};
        this.searchForm = {
          approved: '',
          dateFrom: null,
          dateTo: null
        };
        this.loadApplications();
      },
      viewApplication(application) {
        this.application = application;
        this.modal = {
          ... this.modal,
          show: true
        };
      }
    },
    created() {
      this.loadApplications();
    }
  }
</script>
