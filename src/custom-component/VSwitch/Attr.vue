<template>
    <div class="attr-list">
        <CommonAttr></CommonAttr>
        <el-form>
            <el-form-item label="关闭提示文字">
                <el-input v-model="curComponent.propValue.offText" />
            </el-form-item>
            <el-form-item label="开启提示文字">
                <el-input v-model="curComponent.propValue.onText" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import CommonAttr from '@/custom-component/common/CommonAttr.vue'

export default {
    components: { CommonAttr },
    computed: {
        curComponent() {
            return this.$store.state.curComponent
        },
    },
}
</script>
