<template>
    <div class="g-content">
        <div class="classification-list">
            <v-nav :classType="classType" :dataList="dataList"></v-nav>
            <v-list :classType="classType" :dataList="dataList" :pageSize="15" :pageStart="pageStart" :listCompany="'个'"></v-list>
            <transition name="fade">
                <div class="details-page" v-show="showFlag">
                    <div class="details-content">
                        <i class="icon_close" @click="showFlag=false"></i>
                        <div class="code-wrapper drift" v-show="showCode">
                            <v-code :address="selectedUri" :closeBtn="true" :codeText="'查看课程'"></v-code>
                        </div>
                        <div class="info data-base">
                            <div class="left">
                                <img :src="selected.thumb_absolute" alt="">
                            </div>
                            <div class="right">
                                <h2 v-text="selected.title"></h2>
                                <p>共 <span v-text="selected.chapter_total" class="class-hour"></span> 个课时</p>
                                <p v-html="selected.summary"></p>
                            </div>
                        </div>
                        <div class="content-validity" v-if="selected.chapters" v-show="selected.chapters.length">
                            <div class="content" v-html="selected.advantage"></div>
                            <ul class="directory-list">
                                <li v-for="item in selected.chapters">
                                    <div class="title" v-text="item.title"></div>
                                    <div class="btn" v-if="item.uri_absolute">
                                        <input type="button" value="查看" @click="showCodeFn(item.uri_absolute)">
                                    </div>
                                </li>
                            </ul>
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
                classType: '课程',
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
            this.$root.eventHub.$on('课程.select', (info) => {
                this.showDetail(info);
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
