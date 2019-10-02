<!-- pages/jsx.vue => localhost:3000/jsx -->
<script>
export default {
  data() {
    return {
      message: 'Hello, JSX!'
    }
  },

  render() {
    return <h1>{this.message}</h1>
  }
}
</script>
<style scoped>
h1 {
  color: red;
}
</style>
