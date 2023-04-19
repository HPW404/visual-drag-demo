<template>
    <div class="radio-wrapper">
        <label :for="propValue.id">
            <span class="radio-label">{{ propValue.label }}</span>
            <input
                :id="propValue.id"
                class="radio-input"
                type="radio"
                :value="propValue.value"
                :name="propValue.name"
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
.radio-wrapper {
    display: flex;
    align-items: center;

    .radio-label {
        margin-right: 5px;
    }

    .radio-input {
        position: absolute;
        top: 20%;
    }
}
</style>