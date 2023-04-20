<template>
    <div class="select-wrapper">
        <el-select v-model="propValue.value" clearable :placeholder="propValue.placeholder">
            <el-option
                v-for="item in propValue.data"
                :key="item"
                :label="item"
                :value="item"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
import OnEvent from '../common/OnEvent.vue'

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: Object,
            default: () => {},
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
}
</script>

<style lang="scss" scoped></style>