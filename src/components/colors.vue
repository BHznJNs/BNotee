<template>
    <div class="colors shadow-3" :class="{ diabled }">

    </div>
</template>

<script>
import EventBus from "../common/EventBus"

export default {
    data() {
        return {
            diabled: true
        }
    },
    mounted() {
        EventBus.on("colors-close")
    }
}
</script>

<style scoped>
    .colors {
        position: fixed;
        bottom: 0;
        right: 0;
        width: calc(100% - 6rem);
        height: 54px;
        border-radius: 8px 0 0 0;
        transition: .6s
    }
</style>