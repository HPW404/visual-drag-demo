<template>
    <div>
        <div class="toolbar">
            <el-button
                type="info"
                plain
                class="iconfont icon-json"
                @click="handleAceEditorChange"
            >
                JSON
            </el-button>
            <el-button
                type="warning"
                plain
                class="iconfont icon-chexiao"
                @click="undo"
            >
                撤消
            </el-button>
            <el-button
                type="warning"
                plain
                class="iconfont icon-chongzuo"
                @click="redo"
            >
                重做
            </el-button>
            <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                :disabled="!curComponent"
                @click="deleteComp"
            >
                删除
            </el-button>
            <label for="input" class="insert">
                <span class="iconfont icon-tupian"></span>
                插入图片
                <input
                    id="input"
                    type="file"
                    hidden
                    @change="handleFileChange"
                />
            </label>

            <el-button
                type="primary"
                plain
                icon="el-icon-view"
                style="margin-left: 10px;"
                @click="preview(false)"
            >
                预览
            </el-button>
            <el-button
                type="success"
                plain
                icon="el-icon-finished"
                @click="save"
            >
                保存
            </el-button>
            <el-button
                type="primary"
                plain
                :disabled="!areaData.components.length"
                @click="compose"
            >
                组合
            </el-button>
            <el-button
                type="warning"
                plain
                :disabled="!curComponent || curComponent.isLock || curComponent.component != 'Group'"
                @click="decompose"
            >
                拆分
            </el-button>

            <el-button
                type="primary"
                plain
                :disabled="!curComponent || curComponent.isLock"
                @click="lock"
            >
                锁定
            </el-button>
            <el-button
                type="warning"
                plain
                :disabled="!curComponent || !curComponent.isLock"
                @click="unlock"
            >
                解锁
            </el-button>
            <el-button type="info" plain @click="preview(true)">截图</el-button>
            <el-button type="info" plain @click="handleExport">导出</el-button>

            <div class="canvas-config">
                <span>画布大小</span>
                <input v-model="canvasStyleData.width">
                <span>*</span>
                <input v-model="canvasStyleData.height">
            </div>
            <div class="canvas-config">
                <span>画布比例</span>
                <input v-model="scale" @input="handleScaleChange"> %
            </div>
        </div>

        <!-- 预览 -->
        <Preview v-if="isShowPreview" :is-screenshot="isScreenshot" @close="handlePreviewChange" />
        <AceEditor v-if="isShowAceEditor" @closeEditor="closeEditor" />
    </div>
</template>

<script>
import axios from 'axios'
import generateID from '@/utils/generateID'
import toast from '@/utils/toast'
import { mapState } from 'vuex'
import Preview from '@/components/Editor/Preview'
import AceEditor from '@/components/Editor/AceEditor.vue'
import { commonStyle, commonAttr } from '@/custom-component/component-list'
import eventBus from '@/utils/eventBus'
import { $ } from '@/utils/utils'
import changeComponentsSizeWithScale, { changeComponentSizeWithScale } from '@/utils/changeComponentsSizeWithScale'
import { getFileCodeTree } from '@/schema'

export default {
    components: { Preview, AceEditor },
    data() {
        return {
            isShowPreview: false,
            isShowAceEditor: false,
            timer: null,
            isScreenshot: false,
            scale: 100,
            imgFile: {
                img: null,
            },
            fileId: '',
            canvasDatas: {
                canvasStyle: '',
                canvasData: '',
                code: '',
            },
        }
    },
    computed: mapState([
        'componentData',
        'canvasStyleData',
        'areaData',
        'curComponent',
        'curComponentIndex',
    ]),
    created() {
        eventBus.$on('preview', this.preview)
        eventBus.$on('save', this.save)
        eventBus.$on('clearCanvas', this.clearCanvas)

        this.scale = this.canvasStyleData.scale
    },
    methods: {
        handleScaleChange() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                // 画布比例设一个最小值，不能为 0
                // eslint-disable-next-line no-bitwise
                this.scale = (~~this.scale) || 1
                changeComponentsSizeWithScale(this.scale)
            }, 1000)
        },

        handleAceEditorChange() {
            this.isShowAceEditor = !this.isShowAceEditor
        },
        
        closeEditor() {
            this.handleAceEditorChange()
        },

        lock() {
            this.$store.commit('lock')
        },

        unlock() {
            this.$store.commit('unlock')
        },

        compose() {
            this.$store.commit('compose')
            this.$store.commit('recordSnapshot')
        },

        decompose() {
            this.$store.commit('decompose')
            this.$store.commit('recordSnapshot')
        },

        undo() {
            this.$store.commit('undo')
        },

        redo() {
            this.$store.commit('redo')
        },

        deleteComp() {
            this.$store.commit('deleteComponent')
            this.$store.commit('recordSnapshot')
        },

        handleFileChange(e) {
            const file = e.target.files[0]
            if (!file.type.includes('image')) {
                toast('只能插入图片')
                return
            }

            this.imgFile.img = file
            axios({
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                method: 'post',
                url: '/upload',
                data: this.imgFile,
            }).then(res => {
                this.fileId = res.data.fileId
                const reader = new FileReader()
                reader.onload = () => {
                    const fileResult = 'http://localhost:3001/uploads/' + this.fileId + '.jpg'
                    const img = new Image()
                    img.onload = () => {
                        const component = {
                            ...commonAttr,
                            id: generateID(),
                            component: 'Picture',
                            label: '图片',
                            icon: 'tupian',
                            propValue: {
                                url: fileResult,
                                flip: {
                                    horizontal: false,
                                    vertical: false,
                                },
                            },
                            style: {
                                ...commonStyle,
                                top: 0,
                                left: 0,
                                width: img.width,
                                height: img.height,
                            },
                        }

                        // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
                        changeComponentSizeWithScale(component)

                        this.$store.commit('addComponent', { component })
                        this.$store.commit('recordSnapshot')

                        // 修复重复上传同一文件，@change 不触发的问题
                        $('#input').setAttribute('type', 'text')
                        $('#input').setAttribute('type', 'file')
                    }

                    img.src = fileResult
                }

                reader.readAsDataURL(file)
            }).catch(err => {
                console.log(err)
            })
        },

        preview(isScreenshot) {
            this.isScreenshot = isScreenshot
            this.isShowPreview = true
            this.$store.commit('setEditMode', 'preview')
        },

        save() {
            this.canvasDatas.canvasData = JSON.stringify(this.componentData)
            this.canvasDatas.canvasStyle = JSON.stringify(this.canvasStyleData)
            this.canvasDatas.code = getFileCodeTree(this.componentData, { lang: 'vue' })
            axios({
                method: 'post',
                url: '/canvas',
                data: this.canvasDatas,
            }).then(res => {
                this.$message.success(res.data.msg)
            }).catch(err => {
                this.$message.error(err.message)
            })
        },

        clearCanvas() {
            this.$store.commit('setCurComponent', { component: null, index: null })
            this.$store.commit('setComponentData', [])
            this.$store.commit('recordSnapshot')
        },

        handlePreviewChange() {
            this.isShowPreview = false
            this.$store.commit('setEditMode', 'edit')
        },

        handleExport() {
            const a = document.createElement('a')
            a.setAttribute('download', 'App.vue')
            a.href = 'http://localhost:3001/App.vue'
            a.click()
        },
    },
}
</script>

<style lang="scss" scoped>
.toolbar {
    padding: 15px 10px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    border-bottom: 1px solid #ddd;

    .canvas-config {
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        color: #606266;

        input {
            width: 50px;
            margin-left: 4px;
            outline: none;
            padding: 0 5px;
            border: 1px solid #ddd;
            color: #606266;
        }

        span {
            margin-left: 10px;
        }
    }

    .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 10px;

        &:active {
            color: #3a8ee6;
            border-color: #3a8ee6;
            outline: 0;
        }

        &:hover {
            background-color: #ecf5ff;
            color: #3a8ee6;
        }
    }
}
</style>
