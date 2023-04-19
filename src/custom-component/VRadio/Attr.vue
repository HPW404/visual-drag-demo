<template>
    <div class="attr-list">
        <CommonAttr></CommonAttr>
        <el-form>
            <el-form-item label="选框id">
                <el-input v-model="curComponent.propValue.id" />
            </el-form-item>
            <el-form-item label="标签内容">
                <el-input v-model="curComponent.propValue.label" />
            </el-form-item>
            <el-form-item label="单选框值">
                <el-input v-model="curComponent.propValue.value" />
            </el-form-item>
            <el-form-item label="分组">
                <el-input v-model="curComponent.propValue.name" />
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
