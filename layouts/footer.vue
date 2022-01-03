<template>
  <div class="container">
    <div class="row text-center align-items-center">
      <div class="col-12 col-lg-auto mt-3 mt-lg-0">
        Developed by
        <a :href="copyrightLink" target="_blank">
          <img class="mt-0" src="~/static/favicon.png" height="18">
          Vivasoft Limited
        </a>
      </div>
      <div class="col-lg-auto ml-lg-auto">
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <a :href="socialLink.facebook"
               class="link-secondary"
               target="_blank">
              <Icon class="text-primary" icon-name="facebook" size="lg" />
            </a>
          </li>
          <li class="list-inline-item">
            <a :href="socialLink.linkedin"
               class="link-secondary"
               target="_blank">
              <Icon class="text-azure" icon-name="linkedin" size="lg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../components/common/Icon';

  export default {
    components: {
      Icon
    },
    data() {
      return {
        copyrightLink: 'https://vivasoftltd.com',
        socialLink: {
          facebook: 'https://www.facebook.com/Vivasoft-Limited-256260524900071',
          linkedin: 'https://www.linkedin.com/company/vivasoftlimited'
        }
      };
    }
  }
</script>
