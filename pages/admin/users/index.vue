<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header d-flex">
          <h3 class="card-title">
            <i class="las la-users la-lg mr-1"></i> {{pageTitle}}
          </h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mb-0 form-group">
              <label class="form-label">Name</label>
              <input class="form-control" v-model="searchForm.name" placeholder="Name" />
            </div>
            <div class="col-md-3 mb-0 form-group">
              <label class="form-label">Phone</label>
              <input class="form-control" v-model="searchForm.phone" placeholder="Phone" />
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
              <th></th>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Card Type</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users">
              <td>
                <Avatar :image="user.image" size="md" avatar-style="circle" />
              </td>
              <td>
                {{user.name}}
                <div class="text-muted text-h5">{{user.phone}}</div>
              </td>
              <td>{{DATE_FORMAT(user.birthdate)}}</td>
              <td>{{user.gender.toUpperCase()}}</td>
              <td>
                {{CARD_TYPES[user.cardType]}}
                <div class="text-muted text-h5">{{user.cardNumber}}</div>
              </td>
              <td>
                {{user.upaZilla}}
                <div class="text-muted text-h5">{{user.district}}</div>
              </td>
              <td>
                <UserStatus :active="user.active" />
              </td>
            </tr>
            <tr v-if="!isLoading && totalNumberOfUsers === 0">
              <td colspan="7" class="text-center">No records found.</td>
            </tr>
            </tbody>
          </table>
          <Pagination :total-rows="totalNumberOfUsers" @changePage="onChangePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loader from '../../../components/common/loader';
  import { VueDatePicker } from '@mathieustan/vue-datepicker';
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
  import { DATE_FORMAT, CARD_TYPES } from '../../../utils';
  import Pagination from '../../../components/common/pagination';
  import UserService from '../../../services/UserService';
  import Avatar from '../../../components/common/avatar';
  import UserStatus from '../../../components/common/userStatus';

  export default {
    middleware: 'authAdmin',
    layout: 'admin/default',
    components: {
      VueDatePicker,
      Loader,
      Pagination,
      Avatar,
      UserStatus
    },
    head() {
      return {
        title: this.pageTitle
      }
    },
    data() {
      return {
        pageTitle: 'Users',
        DATE_FORMAT: DATE_FORMAT,
        CARD_TYPES: CARD_TYPES,
        isLoading: true,
        users: [],
        totalNumberOfUsers: 0,
        pageNo: 1,
        searchForm: {
          name: '',
          phone: ''
        },
        queryParams: {}
      }
    },
    methods: {
      loadUsers() {
        this.isLoading = true;

        UserService.loadAll({
          ...this.queryParams,
          page: this.pageNo
        }).then(response => {
          this.users = response.data;
          this.totalNumberOfUsers = response.total;
          this.isLoading = false;
        }).catch(error => {
          this.isLoading = false;
          console.log('error:', error);
        });
      },
      onChangePage(pageNo) {
        this.pageNo = pageNo;
        this.loadUsers();
      },
      onSearch() {
        this.queryParams = {};

        if (this.searchForm.name) {
          this.queryParams.name = this.searchForm.name;
        }

        if (this.searchForm.phone) {
          this.queryParams.phone = this.searchForm.phone;
        }

        this.loadUsers();
      },
      onReset() {
        this.queryParams = {};
        this.searchForm = {
          name: '',
          phone: ''
        };
        this.loadUsers();
      }
    },
    created() {
      this.loadUsers();
    }
  }
</script>
