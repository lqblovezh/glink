<template>
    <div class="g-content">
        <div class="classification-list">
            <v-nav :classType="classType" :dataList="dataList" :navRightClose="true"></v-nav>
            <div class="info-page">
                <h2 class="title" v-text="dataList.title"></h2>
                <div class="content" v-html="dataList.content"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import navigation from '../navigation/navigation';
    export default {
        data () {
            return {
                classType: '资讯',
                dataList: {},
                selected: {}
            };
        },
        mounted () {
            if(this.$route.params.cid==0){
                this.$http.get(httpConfig + 'pages/detail?id=' + this.$route.params.id + '&_client=screen').then((response) => {
                    if (response.status === 200) {
                        this.dataList = response.body.entity;
                    }
                });
            }else{
                this.$http.get(httpConfig + 'contents/detail?column_id=' + this.$route.params.cid + '&id=' + this.$route.params.id + '&_client=screen').then((response) => {
                    if (response.status === 200) {
                        this.dataList = response.body.entity;
                    }
                });
            }
        },
        methods: {},
        components: {
            'v-nav': navigation
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
