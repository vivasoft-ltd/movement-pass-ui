<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex">
          <h3 class="card-title">
            <Icon icon-name="file" />
            {{pageTitle}}
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
                    <Icon icon-name="calendar" />
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
                    <Icon icon-name="calendar" />
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
              <FilterActions @search="onSearch()" @reset="onReset()" />
            </div>
          </div>
        </div>
        <div class="table-responsive border-top">
          <loader v-if="isLoading"></loader>
          <table class="table card-table table-vcenter">
            <thead>
            <tr>
              <th>User</th>
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
              <td>
                {{application.user.name}}
                <div class="text-muted text-h5">{{application.user.phone}}</div>
              </td>
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
                <button class="btn btn-light btn-pill btn-action" @click="viewApplication(application)">
                  <Icon icon-name="file" size="sm" />
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
  import Loader from '../../../components/common/Loader';
  import { VueDatePicker } from '@mathieustan/vue-datepicker';
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
  import Modal from '../../../components/common/Modal';
  import PassDetails from '../../../components/pass/PassDetails';
  import Status from '../../../components/common/Status';
  import { MOVEMENT_TYPES, DATE_FORMAT, PASS_STATUSES } from '../../../utils';
  import Pagination from '../../../components/common/Pagination';
  import PassStatusActions from '../../../components/pass/PassStatusActions';
  import PassDestination from '../../../components/pass/PassDestination';
  import PassDuration from "../../../components/pass/PassDuration";
  import ApplicationService from "../../../services/ApplicationService";
  import Icon from '../../../components/common/Icon';
  import FilterActions from '../../../components/common/FilterActions';

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
      Pagination,
      Icon,
      FilterActions
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
          page: this.pageNo,
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
