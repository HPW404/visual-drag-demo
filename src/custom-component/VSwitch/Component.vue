<template>
    <div>
        <span ref="off" class="off" :class="{ active: !value }">{{ propValue.offText }}</span>
        <el-switch v-model="value"></el-switch>
        <span ref="on" class="on" :class="{ active: value }">{{ propValue.onText }}</span>
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
    data() {
        return {
            value: this.propValue.status,
        }
    },
}
</script>

<style lang="scss" scoped>
.off {
    margin-right: 10px;
}

.on {
    margin-left: 10px;
}

.active {
    color: #409eff;
}
</style>
