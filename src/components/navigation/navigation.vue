<template>
    <div class="navigation border-1px clearfix">
        <div class="home">
            <router-link to="/home">
                <i class="icon_home_page"></i>
                返回首页
            </router-link>
        </div>
        <div class="domain" v-if="!navRightClose">
            <div class="left">
                <div @click="classList = !classList;searchList=false" :class="{active:classList}">
                    <i class="icon_classification"></i>
                    <span v-text="classType+'分类'"></span>
                </div>
                <transition name="fade">
                    <ul v-show="classList" class="tabulation">
                        <li @click="classSelect">
                            <router-link :to="goPage(this.$route.params.cid,0)" v-text="'查看全部'">
                            </router-link>
                        </li>
                        <li v-for="item in dataList.categorys" @click="classSelect">
                            <router-link :to="goPage(item.column_id,item.id)" v-text="item.name">
                            </router-link>
                        </li>
                    </ul>
                </transition>
            </div>
            <div class="right">
                <div @click="searchList = !searchList;classList=false" :class="{active:searchList}">
                    <i class="icon_search"></i>
                    <span>首字母查找</span>
                </div>
                <transition name="fade">
                    <ul v-show="searchList" class="tabulation">
                        <li :class="{active:searchChecked==-1}" @click="select('',-1)">ALL</li>
                        <li :class="{active:searchChecked==index}" v-for="(item,index) in dataList.pinyin_index_arr" v-text="item" @click="select(item,index)"></li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            classType: String,
            dataList: Object,
            navRightClose: Boolean
        },
        data () {
            return {
                classList: false,
                searchList: false,
                searchChecked: -1
            };
        },
        mounted () {
        },
        methods: {
            goPage (cid, id) {
                switch (this.classType) {
                    case '图书':
                        return '../../book/' + cid + '/' + id;
                        break;
                    case '期刊':
                        return '../../Periodical/' + cid + '/' + id;
                        break;
                    case '数据库':
                        return '../../database/' + cid + '/' + id;
                        break;
                    case '资讯':
                        return '../../info/' + cid + '/' + id;
                        break;
                    case '课程':
                        return '../../curriculum/' + cid + '/' + id;
                        break;
                    default:
                }
            },
            select (key,index) {
                this.searchList = false;
                this.searchChecked = index;
                this.$root.eventHub.$emit('pinyin.select', key);
            },
            classSelect () {
                this.searchList = false;
                this.classList = false;
                this.searchChecked = -1;
                this.$root.eventHub.$emit('calss.select', 1);
            }
        },
        components: {}
    };
</script>
