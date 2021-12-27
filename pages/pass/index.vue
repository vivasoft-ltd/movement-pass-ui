<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex">
          <h3 class="card-title">
            <i class="las la-id-card la-lg mr-1"></i> {{pageTitle}}
          </h3>
          <nuxt-link to="/pass/apply" class="btn btn-info ml-auto">
            <i class="la la-plus-circle la-lg mr-2"></i> Apply New Pass
          </nuxt-link>
        </div>
        <div class="table-responsive">
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
            <tr v-for="pass in passes">
              <td>{{ pass.from }}</td>
              <td>
                <PassDestination :destination="pass.destination" />
              </td>
              <td>
                {{ DATE_FORMAT(pass.pass?.start_date, true) }}
              </td>
              <td>{{ movementTypes[pass.trip] }}</td>
              <td>
                <PassDuration :duration="pass.pass?.duration" />
              </td>
              <td>
                <Status :approved="pass.approved" />
              </td>
              <td class="text-right">
                <button class="btn btn-light btn-pill" @click="viewPass(pass)">
                  <i class="la la-file-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="totalNumberOfPasses === 0">
              <td colspan="7" class="text-center">No records found.</td>
            </tr>
            </tbody>
          </table>

          <Pagination :total-rows="totalNumberOfPasses" @changePage="onChangePage" />
        </div>
      </div>
    </div>
    <modal :modal-config="modal">
      <template>
        <PassDetails :pass="pass" />
        <PassPdf v-if="pass.approved" :pass="pass" />
      </template>
    </modal>
  </div>
</template>

<script>
  import Loader from '../../components/common/loader';
  import Modal from '../../components/common/modal';
  import PassDetails from '../../components/pass/passDetails';
  import Status from '../../components/common/status';
  import PassPdf from '../../components/pass/passPdf';
  import { MOVEMENT_TYPES, DATE_FORMAT } from '../../utils';
  import Pagination from '../../components/common/pagination';
  import PassDuration from '../../components/pass/passDuration';
  import PassDestination from '../../components/pass/passDestination';
  import PassService from '../../services/PassService';

  export default {
    layout: 'private',
    middleware: 'auth',
    components: {
      PassDestination,
      PassDuration,
      Loader,
      Modal,
      PassDetails,
      Status,
      PassPdf,
      Pagination
    },
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: 'Passes',
        movementTypes: MOVEMENT_TYPES,
        DATE_FORMAT: DATE_FORMAT,
        isLoading: false,
        modalShow: false,
        passes: [],
        totalNumberOfPasses: 0,
        pass: {},
        modal: {
          size: 'lg',
          title: 'Pass Details',
          show: false
        },
        pageNo: 1
      }
    },
    methods: {
      loadPasses() {
        this.isLoading = true;

        PassService.loadAll({
          page: this.pageNo
        }).then(response => {
          this.passes = response.data;
          this.totalNumberOfPasses = response.total;
          this.isLoading = false;
        }).catch(error => {
          this.isLoading = false;
          console.log('error:', error);
        });
      },
      onChangePage(pageNo) {
        this.pageNo = pageNo;
        this.loadPasses();
      },
      viewPass(pass) {
        this.pass = pass;
        this.modal = {
          ... this.modal,
          show: true
        };
      }
    },
    created() {
      this.loadPasses();
    }
  }
</script>
