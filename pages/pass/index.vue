<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex">
          <h3 class="card-title">
            <Icon icon-name="card" />
            {{pageTitle}}
          </h3>
          <nuxt-link to="/pass/apply" class="btn btn-info ml-auto">
            Apply New Pass
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
                <button class="btn btn-light btn-pill btn-action" @click="viewPass(pass)">
                  <Icon icon-name="file" />
                </button>
              </td>
            </tr>
            <tr v-if="!isLoading && totalNumberOfPasses === 0">
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
  import Loader from '../../components/common/Loader';
  import Modal from '../../components/common/Modal';
  import Icon from '../../components/common/Icon';
  import PassDetails from '../../components/pass/PassDetails';
  import Status from '../../components/common/Status';
  import PassPdf from '../../components/pass/PassPdf';
  import { MOVEMENT_TYPES, DATE_FORMAT } from '../../utils';
  import Pagination from '../../components/common/Pagination';
  import PassDuration from '../../components/pass/PassDuration';
  import PassDestination from '../../components/pass/PassDestination';
  import PassService from '../../services/PassService';

  export default {
    layout: 'private',
    middleware: 'auth',
    components: {
      PassDestination,
      PassDuration,
      Loader,
      Modal,
      Icon,
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
