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
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked === 'all'}">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked === index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsLists">
                    <div class="pic">
                      <a href="#"><img v-lazy="'../../static/'+ item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice + '￥'}}</div>
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
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
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
    data() {
      return {
        goodsLists: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false
      };
    },
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
        let date = new Date();
        let timer = date.getTime().toString();
        this.$axios.get('api/goods?time=' + timer).then((res) => {
          if (res.data.errno === 0) {
            this.goodsLists = res.data.data.result;
            console.log(this.goodsLists);
          }
        });
      },
      sortFlag() {
        console.log('TODOsortFlag');
      },
      showFilterPop() {
        this.filterBy = true;
        this.overLayFlag = true;
      },
      closePop() {
        this.filterBy = false;
        this.overLayFlag = false;
      },
      setPriceFilter(index) {
        this.priceChecked = index;
        this.closePop();
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
