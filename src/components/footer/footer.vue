<template>
    <div class="g-footer">
        <span>
            {{footer.company_name}}
        </span>
        <span>
            <i class="icon_contact_number"></i>
            <span>{{footer.company_tel}}</span>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            footer: Object
        },
        data () {
            return {};
        },
        mounted () {
        },
        methods: {},
    };
</script>
