 <template>
  <div></div>
</template>

 <script>
export default {
  async created() {
    let data = await this.$axios.$get(
      `http://marcelle-mobi-api.herokuapp.com/vehicules/car`
    )
    console.log(data)
  }
}
</script>

 <style>
</style>
