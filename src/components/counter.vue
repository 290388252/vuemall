<template>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <span>{{number}}</span>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<script type="text/ecmascript-6">
  export default {
      props: [
          'number'
      ],
      methods: {
        increment () {
          this.$emit('to');
        },
        decrement() {
          this.$emit('do');
        }
      }
  };
</script>
