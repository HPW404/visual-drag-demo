<template>
    <div class="attr-list">
        <CommonAttr></CommonAttr>
        <el-form>
            <el-form-item label="占位符">
                <el-input v-model="curComponent.propValue.placeholder" />
            </el-form-item>
            <el-form-item label="可选数据">
                <el-tag
                    v-for="tag in curComponent.propValue.data"
                    :key="tag.value"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                >
                    {{ tag }}
                </el-tag>
                <el-input
                    v-if="inputVisible"
                    ref="saveTagInput"
                    v-model="inputValue"
                    class="input-new-tag"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                >
                    + 创建标签
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import CommonAttr from '@/custom-component/common/CommonAttr.vue'
import eventBus from '@/utils/eventBus'

export default {
    components: { CommonAttr },
    data() {
        return {
            inputVisible: false,
            inputValue: '',
        }
    },
    computed: {
        curComponent() {
            return this.$store.state.curComponent
        },
    },
    methods: {
        handleClose(tag) {
            this.curComponent.propValue.data.splice(this.curComponent.propValue.data.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.curComponent.propValue.data.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
            eventBus.$emit('save')
        },
    },
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
