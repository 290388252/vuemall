<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ number }}</h1>
    <Counter :number="number" v-on:to="increment" v-on:do="decrement"></Counter>
    <router-link to="/goods">goods</router-link>
    <button @click="please">pls</button>
    <router-view></router-view>
  </div>
</template>

<script>
  import Counter from './counter.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      number: 10,
      msg: 'Welcome to Your Vue.js App'
    };
  },
  components: {
    Counter
  },
  methods: {
    increment () {
      this.number++;
    },
    decrement () {
      this.number--;
    },
    please () {
      this.$axios.get('api/pack', {
        params: {
          userId: '101'
        },
        headers: {
          token: '9527'
        }
      }).then((res) => {
        console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
