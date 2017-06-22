<template>
    <div class="g-content">
        <div class="classification-list">
            <v-nav :classType="classType" :dataList="dataList"></v-nav>
            <v-list :classType="classType" :dataList="dataList" :pageSize="16" :pageStart="pageStart" :listCompany="'本'"></v-list>
            <transition name="fade">
                <div class="details-page" v-show="showFlag" ref="detailsPage">
                    <div class="details-content">
                        <i class="icon_close" @click="showFlag=false"></i>
                        <div class="code-wrapper" v-if="selected.read_url">
                            <v-code :address="selected.read_url" :closeBtn="false" :codeText="'查看图书'"></v-code>
                        </div>
                        <div class="info">
                            <div class="left">
                                <img :src="selected.thumb_absolute" alt="">
                            </div>
                            <div class="right">
                                <h2 v-text="selected.title"></h2>
                                <p v-text="selected.author"></p>
                                <p>出版时间：<span v-if="selected.created">{{selected.created | formatDate}}</span></p>
                                <p>出版社：<span v-text="selected.publishing"></span></p>
                                <p>页数：<span v-text="selected.paginal"></span></p>
                            </div>
                        </div>
                        <div class="content-validity">
                            <h2>内容简介</h2>
                            <div class="content" v-html="selected.abstract"></div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import {urlStitching} from '../../common/js/util';
    import navigation from '../navigation/navigation';
    import list from '../list/list';
    import code from '../code/code';
    export default {
        data () {
            return {
                classType: '图书',
                dataList: {},
                selected: {},
                showFlag: false,
                pageStart: 1
            };
        },
        watch: {
            '$route': 'getData'
        },
        mounted () {
            this.getData();
        },
        created () {
            this.$root.eventHub.$on('图书.select', (info) => {
                this.showDetail(info)
            });
            this.$root.eventHub.$on('pinyin.select', (spell) => {
                this.getData(1, spell);
                this.pageStart = 1;
            });
            this.$root.eventHub.$on('calss.select', (i) => {
                this.pageStart = i;
            });
            this.$root.eventHub.$on('change.page', (type) => {
                if (type == 'left') {
                    ++this.pageStart
                } else {
                    --this.pageStart
                }
                this.getData(this.pageStart, '');
            });
        },
        methods: {
            showDetail (info) {
                this.selected = info;
                this.showFlag = true;
            },
            getData (page, spell) {
                this.pageStart = 1;
                this.$http.get(urlStitching(this.$route.params.cid, this.$route.params.id, page, 16, spell)).then((response) => {
                    if (response.status === 200) {
                        this.dataList = response.body;
                    }
                });
            }
        },
        components: {
            'v-nav': navigation,
            'v-list': list,
            'v-code': code
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
