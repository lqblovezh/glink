<template>
    <div class="g-content">
        <div class="classification-list">
            <v-nav :classType="classType" :dataList="dataList"></v-nav>
            <v-list :classType="classType" :dataList="dataList" :pageSize="9" :pageStart="pageStart" :listCompany="'本'"></v-list>
            <transition name="fade">
                <div class="details-page" v-show="showFlag" ref="detailsPage">
                    <div class="details-content">
                        <i class="icon_close" @click="showFlag=false"></i>
                        <div class="code-wrapper drift" v-show="showCode">
                            <v-code :address="selectedUri" :closeBtn="true" :codeText="'查看期刊'"></v-code>
                        </div>
                        <div class="info">
                            <div class="left">
                                <img :src="selected.thumb_absolute" alt="">
                            </div>
                            <div class="right">
                                <h2 v-text="selected.title"></h2>
                                <p>期数：<span v-text="selected.chapter_count"></span></p>
                                <p>最新刊号：<span v-if="selected.chapter_latest"
                                              v-text="selected.chapter_latest.title"></span></p>
                                <p>出版社：<span v-text="selected.publishing"></span></p>
                                <p>周期：<span v-text="selected.cycle"></span></p>
                            </div>
                        </div>
                        <div class="content-validity">
                            <h2>内容简介</h2>
                            <div class="content border-1px" v-html="selected.summary"></div>
                            <div class="magazine">
                                <ul>
                                    <li v-for="item in selected.chapters" @click="showCodeFn(item.read_url)">
                                        <img :src="item.thumb_absolute" alt="">
                                        <p v-text="item.title"></p>
                                    </li>
                                </ul>
                            </div>
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
    import code from '../code/code';
    import navigation from '../navigation/navigation';
    import list from '../list/list';
    export default {
        data () {
            return {
                classType: '期刊',
                dataList: {},
                selected: {},
                showFlag: false,
                showCode: false,
                selectedUri: '',
                pageStart: 1
            };
        },
        mounted () {
            this.getData();
        },
        watch: {
            '$route': 'getData'
        },
        created () {
            this.$root.eventHub.$on('期刊.select', (info) => {
                this.showDetail(info)
            });
            this.$root.eventHub.$on('closeCode.code', (type) => {
                this.showCode = type;
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
            showCodeFn (url) {
                this.selectedUri = url;
                this.showCode = true;
            },
            getData (page, spell) {
                this.$http.get(urlStitching(this.$route.params.cid, this.$route.params.id, page, 9, spell)).then((response) => {
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
