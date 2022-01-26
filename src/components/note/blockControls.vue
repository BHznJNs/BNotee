<template>
    <div
        class="controls"
        :class="{
            'disabled': disabled && !isTouchMode,
            'touch-mode': isTouchMode
        }"
    >
        <div
            class="btn btn-normal adder-btn"
            @click="addNode"
            ref="addNodeBtn"
        >
            <i class="material-icons">add</i>
        </div>
        <label class="checkbox">
            <input
                type="checkbox"
                ref="checkbox"
                :checked="selected"
                @change="selectEvent"
            />
                <i class="checkbox-icon"></i>
        </label>
    </div>
</template>

<script>
import getNodeObj from "../mixin/getNodeObj"
import EventBus from "../../common/EventBus"

// 默认表格项
const defaultTD = {NT: "td",CT: "",SL: false,CL: null}

export default {
    props: [
        "isTouchMode",
        "disabled", "selected",
        "location", "parentType"
    ],
    inject: ["note", "selectedNode"],
    mixins: [getNodeObj],
    methods: {
        selectEvent() {
            // 返回对象是否 checked
            const checked = this.$refs.checkbox.checked
            this.getThisObj.SL = checked

            // 若被选择
            if (checked) {
                EventBus.on("add-node", () => {
                    this.$refs.addNodeBtn.click()
                })
                // 如果已有节点被选择
                if (this.selectedNode.location) {
                    // 选取已被选择节点并取消选择
                    this.getNodeObj({
                        location: this.selectedNode.location,
                        callback: (nodeArray, index) => {
                            nodeArray[index].SL = false
                        }
                    })
                }

                this.selectedNode.location = this.location
                this.selectedNode.type = this.parentType
            } else { // 若取消选择
                EventBus.off("add-node")
                this.selectedNode.location = null
                this.selectedNode.type = null
            }
        },
        // 方法：打开全局输入组
        addNode() {
            if (this.parentType == "table") {
                // 获取当前表格列数
                const colNum = this.getThisObj.CTS[0].CTS.length
                console.log(colNum)
                // 新行
                let newRow = { CTS: [] }
                for (let i = 0; i < colNum; i++) {
                    newRow.CTS.push(defaultTD)
                }
                // 插入新行
                this.getThisObj.CTS.push(newRow)
            } else {
                EventBus.emit("note-offset")
                EventBus.emit("textfield-open", this.parentType)
                // 添加事件监听
                EventBus.on("textfield-return-" + this.parentType, (obj) => {
                    // 向父元素添加节点
                    if (obj) {
                        this.getThisObj.CTS.push(obj)
                    }
                    // 移除事件监听
                    EventBus.off("textfield-return-" + this.parentType)
                })
            }
        }
    }
}
</script>

<style scoped>
    /* Adder Button */
    .adder-btn {
        width: 10%;
        min-width: 60px;
        height: 32px;
        line-height: 32px;
        margin: 0 2rem 0;
        background-color: #CFD8DC;
    }
    /* Controls */
    .controls {
        display: flex;
        height: 32px;
        -webkit-box-sizing: border-box;
            box-sizing: border-box;
        transition: height .3s;
    }
    .controls.disabled {
        height: 0 !important;
    }
    .controls.disabled * {
        opacity: 0;
        pointer-events: none;
    }

    /* Touch Mode */
    .touch-mode {
        position: absolute;
        top: 0;
        left: -44px;
    }
    .touch-mode .adder-btn {
        display: none;
    }
</style>