<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':modalShow}">
    <div class="md-modal-inner">
      <div class="md-top">
        <button class="md-close" @click="closeModal">Close</button>
      </div>
      <div class="md-content">
        <div class="confirm-tips">
          <slot name="message"></slot>
        </div>
        <div class="btn-wrap">
          <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="md-overlay"></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/css/login.css';
</style>

<script type="text/ecmascript-6">
    export default{
      props: [
        'modalShow',
        'loginSuccess'
      ],
      mounted() {
          console.log(this.modalShow);
      },
      methods: {
        closeModal() {
            this.$emit('close');
        }
      }
    };
</script>
