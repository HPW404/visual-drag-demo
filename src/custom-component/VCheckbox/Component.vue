<template>
    <div class="checkbox-wrapper">
        <label :for="propValue.id">
            <span class="checkbox-label">{{ propValue.label }}</span>
            <input
                :id="propValue.id"
                class="checkbox-input"
                type="checkbox"
                :name="propValue.name"
                :value="propValue.value"
            />
        </label>
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

<style lang="scss" scoped>
.checkbox-wrapper {
    display: flex;
    align-items: center;

    .checkbox-label {
        margin-right: 5px;
    }

    .checkbox-input {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>