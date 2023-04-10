<template>
    <div class="list-container">
        <div v-for="i in types" :key="i.key">
            <span class="title-label">{{ i.label }}</span>
            <div class="component-list" @dragstart="handleDragStart">
                <div
                    v-for="item in componentList.filter(component => component.type === i.key)"
                    :key="item.index"
                    class="list"
                    draggable
                    :data-index="item.index"
                >
                    <span class="label">{{ item.label }}</span>
                    <span v-if="item.icon.substring(0, 2) === 'el'" :class="item.icon"></span>
                    <span v-else class="iconfont" :class="'icon-' + item.icon"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { types, componentList } from '@/custom-component/component-list'

export default {
    data() {
        return {
            componentList,
            types,
        }
    },
    methods: {
        handleDragStart(e) {
            e.dataTransfer.setData('index', e.target.dataset.index)
        },
    },
}
</script>

<style lang="scss" scoped>
.list-container {
    margin-top: 10px;
    height: 65%;

    .title-label {
        padding: 10px;
    }
}

.component-list {
    height: 100%;
    padding: 10px;
    display: grid;
    grid-gap: 10px 16px;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 40px);

    .list {
        width: 80px;
        height: 40px;
        border: 1px solid #ddd;
        cursor: grab;
        text-align: center;
        color: #333;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .label {
            position: absolute;
            top: 0;
            left: 0;
            background-color: #60cde0;
            color: #fff;
            font-size: 12px;
            padding: 1px;
        }

        &:active {
            cursor: grabbing;
        }

        .iconfont {
            margin-right: 4px;
            font-size: 20px;
        }

        .icon-wenben,
        .icon-biaoge {
            font-size: 18px;
        }

        .icon-tupian {
            font-size: 16px;
        }
    }
}
</style>
