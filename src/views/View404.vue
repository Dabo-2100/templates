<template>
    <div class="col-12" id="View404">
        <h1 class="col-12">This is 404 View</h1>
    </div>
</template>
  
<script>
// @ is an alias to /src

export default {
    name: 'View404',
    components: {},
    data() {
        return {
            Api_Url: this.$store.state['Api_Url'],
        };
    },
    created() { },
    mounted() { },
    computed() { },
    watch: {}
}
</script>
  
<style lang="scss" scoped>
#View404 {
    display: flex;
    width: 100%;
}
</style>
  