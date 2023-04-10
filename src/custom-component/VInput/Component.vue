<template>
    <div>
        <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
        <input
            v-model="propValue.content"
            type="text"
            class="v-input"
            :placeholder="propValue.placeholder"
        />
    </div>
</template>

<script>
import OnEvent from '../common/OnEvent.vue'

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
}
</script>

<style lang="scss" scoped>
.v-input {
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 14px;
    outline: none;
    padding: 0 15px;
    width: 100%;
    height: 100%;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);

    &:hover {
        border-color: #c0c4cc;
    }

    &:focus {
        outline: none;
        border-color: #409eff;
    }
}
</style>