<template>
    <div class="colors shadow-3" :class="{ disabled }">
        <template v-for="(item) in colors" :key="item.id">
            <div
                class="color btn-shallow"
                :style="{ 'background-color': `var(${item})` }"
                @click="setColor(item)"
            ></div>
        </template>
        <div class="color-inputer">
            <div class="hint">#</div>
            <input
                class="inputer"
                placeholder="******"
                type="text"
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
                "--highlight-color",
                "--warning-color",
                "--default-text-color",
                "white"
            ],
            colorValue: "",
            timeout: null,
            targetNode: null
        }
    },
    inject: ["selectedNode", "note"],
    mixins: [getNodeObj],
    mounted() {
        EventBus.on("colors-open", () => {
            this.disabled = false
            this.getNodeObj({
                location: this.selectedNode.location,
                callback: (nodeArray, index) => {
                    this.targetNode = nodeArray[index]
                }
            })
        })
        EventBus.on("colors-close", () => {
            this.disabled = true
            this.targetNode = null
        })
        EventBus.on("textfield-open", () => {this.disabled = true})
    },
    methods: {
        setColor(color) {
            this.targetNode.CL = color
        },
        close() {
            EventBus.emit("colors-close")
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
        position: fixed;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        width: calc(100% - 6rem);
        height: 54px;
        border-radius: 8px 0 0 0;
        background-color: white;
        transition: .6s
    }
    .colors.disabled {
        bottom: -54px;
    }

    .color {
        margin: auto;
    }
    .color:hover {
        filter: contrast(.6);
    }
    
    .color-inputer {
        display: flex;
        margin: auto;
        border-radius: 2px;
        border: 1px solid #888;
        transition: .2s;
    }
    .color-inputer:focus-within {
        -webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
            box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
    }
    .color-inputer > .hint {
        box-sizing: border-box;
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        padding: 0 8px;
        border-right: 1px solid #888;
        user-select: none;
    }
    .color-inputer > .inputer {
        box-sizing: border-box;
        width: 8em;
        height: 32px;
        padding: 0 4px;
        overflow: hidden;
        color: #333;
        font-size: 16px;
        border: none;
        outline: none;
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