<template>
    <div>
        <el-switch v-model="modelValue"></el-switch>
    </div>
</template>

<script>
import OnEvent from '../common/OnEvent.vue'

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: Boolean,
            default: true,
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            value: this.propValue,
        }
    },
    computed: {
        modelValue: {
            get() {
                return this.propValue
            },
            set(val) {
                this.value = val
            },
        },
    },
}
</script>

<style lang="scss" scoped></style>
