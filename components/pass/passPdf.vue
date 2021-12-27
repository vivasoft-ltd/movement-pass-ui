<template>
  <div class="row">
    <div class="col-md-12 d-flex">
      <button class="btn btn-info ml-auto" @click="downloadPdf()">
        <i class="la la-download"></i> Download
      </button>
    </div>

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :preview-modal="false"
      :enable-download="true"
      :paginate-elements-by-height="800"
      :filename="$auth.user.name"
      :pdf-quality="2"
      :pdf-format="'a4'"
      :manual-pagination="false"
      :pdf-orientation="'portrait'"
      ref="html2Pdf">
      <section slot="pdf-content">
        <div class="m-3 text-center">
          <Logo :width="100" />
        </div>
        <div class="m-5">
          <UserDetails :user="$auth.user" />

          <h3>Pass Details:</h3>
          <PassDetails :pass="pass" :user="$auth.user" />
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import PassDetails from './passDetails';
import UserDetails from './userDetails';
import Logo from '../../components/common/logo';

export default {
  components: {
    PassDetails,
    UserDetails,
    VueHtml2pdf,
    Logo
  },
  props: {
    pass: Object
  },
  methods: {
    async downloadPdf() {
      this.$refs.html2Pdf.generatePdf();
    }
  }
}
</script>
