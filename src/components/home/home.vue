<template>
    <div class="g-content" style="width: 100%">
        <div class="home-index">
            <div class="info">
                <h2 class="clearfix">
                    <div class="name">平台资讯</div>
                    <!--<div class="more">-->
                        <!--更多-->
                        <!--<i class="icon_more"></i>-->
                    <!--</div>-->
                </h2>
                <div class="content">
                    <div class="left" v-if="indexData.articles_latest">
                        <router-link :to="'/info/'+indexData.articles_latest[0].column_id+'/'+indexData.articles_latest[0].id">
                            <img :src="indexData.articles_latest[0].thumb_absolute" alt="">
                            <div class="present">
                                <p class="title" v-text="indexData.articles_latest[0].title"></p>
                                <span>{{indexData.articles_latest[0].created | format}}</span>
                            </div>
                        </router-link>
                    </div>
                    <ul class="right" v-if="indexData.article_entitys">
                        <li v-for="item in indexData.article_entitys.slice(1,9)">
                            <router-link :to="'/info/'+item.column_id+'/'+item.id">
                                <span class="title">{{item.title}}</span>
                                <span class="time">{{item.created | format}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="column">
                <ul class="content" v-if="indexData.column_pages">
                    <li v-for="item in indexData.column_pages.slice(0,6)">
                        <router-link :to="'/info/0/'+item.id">
                            <h2 class="title">{{item.title}}</h2>
                            <p class="text" v-html="item.content">{{item.content|filterhtml}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <ul class="nav" v-if="indexData.columns">
                <li v-for="(item,$index) in className" class="top clearfix" :class="currentIndex($index)" @click="showTable=$index">
                    <h2 class="class" :class="{'active':$index==showTable}"><span>{{item.name}}</span></h2>
                    <ul v-show="$index==showTable" class="bottom">
                        <li>
                            <router-link :to="goPage(item.entity_type,item.id,0)" v-text="'查看全部'">
                            </router-link>
                        </li>
                        <li v-for="items in item.categorys.slice(0,24)">
                            <router-link :to="goPage(item.entity_type,item.id,items.id)" v-text="items.name">
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            indexData: Object
        },
        data () {
            return {
                showTable: 0
            };
        },
        mounted () {
        },
        computed: {
            className () {
                let NameData = [];
                let classNameData = this.indexData.columns;
                classNameData.forEach(function (item) {
                    if (item.entity_type == "Articles") {
                        return;
                    }
                    NameData.push(item);
                });
                return NameData.slice(0,4);
            }
        },
        methods: {
            goPage (type, cid, id) {
                switch (type) {
                    case 'Books':
                        return 'book/' + cid + '/' + id;
                        break;
                    case 'Magazines':
                        return 'Periodical/' + cid + '/' + id;
                        break;
                    case 'Librarys':
                        return 'database/' + cid + '/' + id;
                        break;
                    case 'Articles':
                        return 'info/' + cid + '/' + id;
                        break;
                    case 'Courses':
                        return 'curriculum/' + cid + '/' + id;
                        break;
                    default:
                }
            },
            currentIndex (index) {
                switch(index)
                {
                    case 0:
                        return 'one';
                        break;
                    case 1:
                        return 'two';
                        break;
                    case 2:
                        return 'three';
                        break;
                    case 3:
                        return 'four';
                        break;
                    default:
                }
            }
        },
        components: {}
    };
</script>