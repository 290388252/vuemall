<template>
    <div>
      <nav-header :openLogin="openLogin" v-on:headlogout="headlogout" v-on:loginSuccess="loginSuccess"></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':!filterSort}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                      <a href="#"><img v-lazy="'../../static/'+ item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice + '￥'}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="30">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <Modal v-show="modalShow" v-on:close="closeModal" :modalShow="modalShow" v-on:open="open">
        <p slot="message">
          請先登錄在加入購物車
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn-login" @click="closeModalAndOpenLogin">Go To Login</a>
        </div>
      </Modal>
      <Modal v-show="loginSuccess" :modalShow="loginSuccess">
        <p slot="message">
          很高興被您加入購物車
        </p>
        <div slot="btnGroup">
            <a href="javascript:;" class="btn-login-double" @click="closeModal">繼續購物</a>
            <a href="javascript:;" class="btn-login-double" @click="closeModal">查看我的購物車</a>
        </div>
      </Modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script type="text/ecmascript-6">
  import NavHeader from './../components/NavHeader';
  import NavFooter from './../components/NavFooter';
  import NavBread from './../components/NavBread';
  import Modal from './../components/Modal.vue';
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
        busy: true,
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        filterSort: true,
        loading: false,
        page: 1,
        pageSize: 8,
        modalShow: false,
        openLogin: false,
        loginSuccess: false
      };
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList(flag) {
        var param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.filterSort ? 1 : -1,
          priceLevel: this.priceChecked
        };
        this.loading = true;
        this.$axios.get('/goods/list', {
          params: param
        }).then((res) => {
          // console.log(res);
          this.loading = false;
          if (res.data.status === 0) {
            if (flag) {
              this.goodsLists = this.goodsLists.concat(res.data.result.list);
              if (res.data.result.count === 0) {
                  this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsLists = res.data.result.list;
              this.busy = false;
            }
            // console.log(this.goodsLists);
          } else {
            console.log('请求失败了！');
          }
        });
      },
      showFilterPop() {
        this.filterBy = true;
        this.overLayFlag = true;
      },
      sortGoods() {
        this.filterSort = !this.filterSort;
        this.getGoodsList();
        this.page = 1;
      },
      closePop() {
        this.filterBy = false;
        this.overLayFlag = false;
      },
      setPriceFilter(index) {
        this.priceChecked = index;
        console.log(index + '-' + this.priceChecked);
        this.page = 1;
        this.getGoodsList();
        this.closePop();
      },
      loadMore() {
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },
      addCart(productId) {
        this.$axios.post('goods/addCart', {productId: productId}).then((res) => {
          console.log(res.data);
          if (res.data.status === 0) {
            this.loginSuccess = true;
          } else if (res.data.status === 1) {
              this.modalShow = true;
          }
        });
      },
      closeModal() {
        this.modalShow = false;
        this.loginSuccess = false;
      },
      open() {
          this.openLogin = true;
      },
      headlogout() {
        this.openLogin = false;
      },
      closeModalAndOpenLogin() {
        this.openLogin = true;
        this.modalShow = false;
      }
    }
  };
</script>
