<template>
    <div class="colors fixed-component" :class="{ disabled }">
        <template v-for="(item) in colors" :key="item.id">
            <div
                class="color btn btn-shallow"
                :style="{ 'background-color': item }"
                @click="setColor(item)"
            ></div>
        </template>
        <div class="input-group">
            <div class="hint">#</div>
            <input
                class="inputter" placeholder="******"
                type="text" maxlength="8"
                v-model="colorValue"
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
import getNodeObj from "./mixin/getNodeObj"
import EventBus from "../common/EventBus"

export default {
    data() {
        return {
            disabled: true,
            colors: [
                "#D50000",
                "#FFD600",
                "#333"
            ],
            colorValue: "",
            timeout: null,
            targetNode: null
        }
    },
    inject: ["selectedNode", "note"],
    mixins: [getNodeObj],
    mounted() {
        // 当被唤起时
        EventBus.on("colors-open", () => {
            EventBus.emit("textfield-closes")
            EventBus.emit("tableSetter-close")

            this.disabled = false
            this.getNodeObj({
                location: this.selectedNode.location,
                callback: (nodeArray, index) => {
                    this.targetNode = nodeArray[index]
                }
            })
        })
        // 关闭时
        EventBus.on("colors-close", () => {
            this.disabled = true
            this.targetNode = null
        })
    },
    methods: {
        setColor(color) {
            this.targetNode.CL = color
        },
        close() {
            EventBus.emit("colors-close")
            EventBus.emit("note-offset-cancel")
        }
    },
    watch: {
        colorValue(newValue) {
            clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                this.setColor("#" + newValue)
            }, 600)
        }
    }
}
</script>

<style scoped>
    .colors {
        display: flex;
        align-items: center;
        width: calc(100% - 6rem);
    }

    .color {
        margin: auto;
    }
    .color:hover {
        filter: contrast(.6);
    }

    .inputter {
        width: 6em !important;
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