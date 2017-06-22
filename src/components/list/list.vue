<template>
    <div class="list">
        <h3 class="top">共 <span v-if="dataList.pager" v-text="dataList.pager.total"></span> {{listCompany}}{{classType}}</h3>
        <div class="swiper-content">
            <ul class="box" :class="currentIndex">
                <li @click="select(item)" v-for="(item,$index) in dataList.entitys">
                    <i v-if="classType==='期刊'"></i>
                    <img :src="item.thumb_absolute" alt="">
                    <p class="title" v-text="item.title"></p>
                    <p v-if="classType==='图书'" class="author" v-text="item.author"></p>
                    <p v-if="classType==='数据库'" class="author" v-text="item.publishing"></p>
                </li>
            </ul>
        </div>
        <ul class="swiper-pagination" v-if="dataList.pager">
            <li class="swiper-pagination-bullet" v-for="(item,$index) in currentPage"
                :class="{active:$index==(pageStart-1)}"></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            classType: String,
            dataList: Object,
            pageSize: Number,
            pageStart: Number,
            listCompany: String
        },
        data () {
            return {};
        },
        computed: {
            currentIndex () {
                switch (this.classType) {
                    case '图书':
                        return 'book';
                        break;
                    case '期刊':
                        return 'Periodical';
                        break;
                    case '数据库':
                        return 'data-base';
                        break;
                    case '资讯':
                        return 'info';
                        break;
                    case '课程':
                        return 'curriculum';
                        break;
                    default:
                }
            },
            currentPage () {
                if (this.dataList.pager.total == 0) {
                    return 0;
                } else if (this.dataList.pager.total <= this.pageSize) {
                    return 1;
                } else {
                    if (this.dataList.pager.total % this.pageSize == 0) {
                        return parseInt(this.dataList.pager.total / this.pageSize)
                    } else {
                        return parseInt(this.dataList.pager.total / this.pageSize) + 1
                    }
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                let ele = document.getElementsByClassName("swiper-content")[0];
                let beginX, beginY, endX, endY, swipeLeft, swipeRight, pagestarts = 1;
                ele.addEventListener('touchstart', function (event) {
                    beginX = event.targetTouches[0].screenX;
                    beginY = event.targetTouches[0].screenY;
                    swipeLeft = false, swipeRight = false;
                });

                ele.addEventListener('touchmove', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    endX = event.targetTouches[0].screenX;
                    endY = event.targetTouches[0].screenY;
                    // 左右滑动
                    if (Math.abs(endX - beginX) - Math.abs(endY - beginY) > 0) {
                        if (endX - beginX > 0) {/*向右滑动*/
                            swipeRight = true;
                            swipeLeft = false;
                        }else {                 /*向左滑动*/
                            swipeLeft = true;
                            swipeRight = false;
                        }
                        ele.getElementsByClassName('box')[0].style.left = (endX - beginX)+'px';
                    } else if (Math.abs(endX - beginX) - Math.abs(endY - beginY) < 0) {
                        // 上下滑动
                    }
                });
                ele.addEventListener('touchend', (event) => {
                    if (Math.abs(endX - beginX) - Math.abs(endY - beginY) > 0) {
                        if (swipeRight) {       /*console.log('向右滑动-->' + this.pageStart);*/
                            swipeRight = !swipeRight;
                            setTimeout(function () {
                                ele.getElementsByClassName('box')[0].style.left = 0;
                            },100);
                            if (this.pageStart <= 1) {
                                return;
                            }
                            this.$root.eventHub.$emit('change.page', 'right');
                        }
                        if (swipeLeft) {        /*console.log('向左滑动-->' + this.pageStart);*/
                            swipeLeft = !swipeLeft;
                            setTimeout(function () {
                                ele.getElementsByClassName('box')[0].style.left = 0;
                            },100);
                            if (this.pageStart >= this.dataList.pager.page_total) {
                                return;
                            }
                            this.$root.eventHub.$emit('change.page', 'left');
                        }
                    }
                });
            })
        },
        methods: {
            select (info) {
                this.$root.eventHub.$emit(this.classType + '.select', info);
            },
        },
        components: {}
    };
</script>
