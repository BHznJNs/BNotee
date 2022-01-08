<template>
    <div
        class="table-setter fixed-component"
        :class="{ 'disabled': !show }"
    >
        <div class="input-group">
            <i class="hint material-icons">view_headline</i>
            <input
                class="inputer" type="text"
                placeholder=" > 0 "
                v-model="row"
            >
        </div>
        
        <div class="input-group">
            <i class="hint material-icons">view_column</i>
            <input
                class="inputer" type="text"
                placeholder=" > 0 "
                v-model="col"
            >
        </div>

        <div
            class="closer"
            @click="close"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
</template>
<script>
import EventBus from "../common/EventBus"

export default {
    props: ["show"],
    inject: ["selectedNode"],
    data() {
        return {
            row: 1,
            col: 1
        }
    },
    methods: {
        tableSet() {},
        close() {
            this.$emit("tableSetterClose")
            EventBus.emit("tableSetter-close")
        },
    }
}
</script>

<style scoped>
    /* Table Setter */
    .table-setter {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        height: 54px;
        padding-left: 8px;
        -webkit-border-radius: 8px 0 0 0;
                border-radius: 8px 0 0 0;
        background-color: white;
    }
    .input-group {
        margin-left: 8px;
        margin-right: 8px;
    }
    .hint {
        font-size: 24px;
    }
    .closer {
        width: auto;
        height: 100%;
        line-height: 54px;
        color: var(--default-text-color);
    }
    .closer:hover {
        color: black;
        background-color: #EEEEEE
    }
</style>