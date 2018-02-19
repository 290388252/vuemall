<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <nav-footer></nav-footer>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<script type="text/ecmascript-6">
  import NavHeader from './../components/NavHeader';
  import NavFooter from './../components/NavFooter';
  import NavBread from './../components/NavBread';
  import '../assets/css/base.css';
  import '../assets/css/product.css';
  export default {
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  };
</script>
