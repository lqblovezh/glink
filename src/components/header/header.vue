<template>
    <div class="g-header swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="item in banner"
                :style="{ background: 'url(\''+item.uri_absolute+'\') no-repeat',backgroundSize:'cover'}"
                style="background-size: cover;">
                <a v-if="item.link" :href="item.link"></a>
            </li>
        </ul>
        <div class="swiper-pagination"></div>
        <div class="g-logo" :style="{ backgroundImage: 'url(\''+footer.logo_screen+'\')'}" style="background-size: cover;"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['banner','footer'],
        data () {
            return {};
        },
        created () {
        },
        watch: {
            'banner' (){
                this._initBanner();
            }
        },
        mounted () {
//            this._initBanner();
        },
        methods: {
            _initBanner () {
                this.$nextTick(() => {
                    this.swiper = null;
                    this.swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        slidesPerView: 1,
                        autoplay: 4000,
                        autoplayDisableOnInteraction: false,
                        loop: true
                    });
                })
            }
        }
    };
</script>
