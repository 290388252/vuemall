<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
              </dl>
            </div>
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="../../static/1.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">xxx</div>
                      <div class="price">xxx</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!--<div class="view-more-normal"-->
                   <!--v-infinite-scroll="loadMore"-->
                   <!--infinite-scroll-disabled="busy"-->
                   <!--infinite-scroll-distance="20">-->
                <!--<img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

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
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        this.$axios.get('api/goods').then((res) => {
          if (res.data.errno === 0) {
            let goodsLists = res.data.data.result;
            console.log(goodsLists);
          }
        });
      },
      sortFlag() {
        console.log('TODOsortFlag');
      },
      filterBy() {
        console.log('TODOfilterBy');
      },
      priceFilter() {
        console.log('TODOpriceFilter');
      },
      priceChecked() {
        console.log('TODOpriceChecked');
      },
      loadMore() {
        console.log('TODOloadMore');
      },
      loading() {
        console.log('TODOloading');
      }
    }
  };
</script>
