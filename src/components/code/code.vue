<template>
    <div class="info-code">
        <i v-if="closeBtn" class="icon_close" @click="closeCode"></i>
        <div id="qrcodeCanvas"></div>
        <p>扫描二维码<span v-if="codeText">{{codeText}}</span></p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            address: String,
            codeText: String,
            closeBtn: Boolean
        },
        data () {
            return {};
        },
        mounted () {
            this.setQrcode();
        },
        watch: {
            'address' () {
                this.setQrcode();
            }
        },
        methods: {
            closeCode () {
                this.$root.eventHub.$emit('closeCode.code', false);
            },
            setQrcode () {
                let address = this.address;
                $('#qrcodeCanvas').empty();
                address.length == 0 ? '后台人员偷懒,未输入有效地址!' : address;
                $("#qrcodeCanvas").qrcode({
                    render: "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
                    text: encodeURI(address),    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
                    width: "130",               //二维码的宽度
                    height: "130",              //二维码的高度
                    background: "#fff",       //二维码的后景色
                    foreground: "#000"        //二维码的前景色
                });
            }
        }
    };
</script>