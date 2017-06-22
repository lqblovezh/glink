<template>
    <div>
        <div class="main-content">
            <v-header :banner="banner" :footer="footer"></v-header>
            <!--<keep-alive>-->
            <router-view :indexData="indexData"></router-view>
            <!--</keep-alive>-->
        </div>
        <v-footer :footer="footer"></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import header from './components/header/header';
    import footer from './components/footer/footer';

    export default {
        data () {
            return {
                banner: {},
                footer: {},
                indexData: {},
            };
        },
        mounted () {
            this.$http.get(httpConfig + 'index/index?_client=screen').then((response) => {
                if (response.status === 200) {
                    this.banner = response.body.banners;
                    this.footer = response.body.sys_config;
                    this.indexData = response.body;
                }
            });
        },
        methods: {},
        components: {
            'v-header': header,
            'v-footer': footer
        }
    };
    Vue.filter('formatDate', function (time) {
        let date = time.substr(0, 10);
        return date;
    });
    Vue.filter('format', function (time) {
        let date = new Date(time);
        var fmt = 'yyyy.MM.dd';
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    });
    Vue.filter('filterhtml', function (html) {
        if (!html) return;
        return html.replace(/<(.[^(br|p)][^>]*)>/g, '');
    });
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
