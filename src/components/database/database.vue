<template>
    <div class="g-content">
        <div class="classification-list">
            <v-nav :classType="classType" :dataList="dataList"></v-nav>
            <v-list :classType="classType" :dataList="dataList" :pageSize="15" :pageStart="pageStart" :listCompany="'个'"></v-list>
            <transition name="fade">
                <div class="details-page" v-show="showFlag" ref="detailsPage">
                    <div class="details-content">
                        <i class="icon_close" @click="showFlag=false"></i>
                        <div class="code-wrapper" v-if="selected.uri">
                            <v-code :address="selected.uri" :closeBtn="false" :codeText="'申请试用'"></v-code>
                        </div>
                        <div class="info data-base">
                            <div class="left">
                                <img :src="selected.thumb_absolute" alt="">
                            </div>
                            <div class="right">
                                <h2 v-text="selected.title"></h2>
                                <p v-text="selected.publishing"></p>
                                <p>
                                    <span>
                                        收录年限：<span v-text="selected.record_start+'年'"></span>
                                    </span>
                                    <span style="float: right;">
                                        收录数量：<span v-text="selected.record_total"></span>
                                    </span>
                                </p>
                                <p>更新频率：<span v-text="selected.frequency"></span></p>
                                <p>产品形式：<span v-text="selected.formart"></span></p>
                            </div>
                        </div>
                        <div class="content-validity">
                            <h2>内容简介</h2>
                            <div class="content" v-html="selected.advantage"></div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import code from '../code/code';
    import {urlStitching} from '../../common/js/util';
    import navigation from '../navigation/navigation';
    import list from '../list/list';
    export default {
        data () {
            return {
                classType: '数据库',
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
            this.$root.eventHub.$off('数据库.select');
            this.$root.eventHub.$on('数据库.select', (info) => {
                this.showDetail(info);
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
                this.$http.get(urlStitching(this.$route.params.cid, this.$route.params.id, page, 15, spell)).then((response) => {
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
