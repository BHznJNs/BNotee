<template>
    <div
        class="table-setter fixed-component"
        :class="{ 'disabled': !show }"
    >
        <div class="input-group">
            <i class="hint material-icons">view_headline</i>
            <input
                class="inputter" type="text"
                placeholder=" > 0 "
                v-model="row"
            >
        </div>
        
        <div class="input-group">
            <i class="hint material-icons">view_column</i>
            <input
                class="inputter" type="text"
                placeholder=" > 0 " maxlength="3"
                v-model="col"
            >
        </div>

        <div
            class="closer"
            @click="tableSet"
        >
            <i class="material-icons">check</i>
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
import getNodeObj from "./mixin/getNodeObj"

// 默认表格项
const defaultTD = {NT: "td",CT: "",SL: false,CL: null}

export default {
    inject: ["note", "selectedNode"],
    mixins: [getNodeObj],
    data() {
        return {
            row: 1,
            col: 1,
            show: false,
            targetNode: null,
            timeout: null
        }
    },
    mounted() {
        EventBus.on("tableSetter-open", () => {this.show = true})
        EventBus.on("tableSetter-close", () => {
            this.show = false
        })
        addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                this.tableSet()
            }
        })
    },
    methods: {
        tableSet() {
            //     目标节点行数、列数
            const initialRow = this.targetNode.CTS.length
            const initialCol = this.targetNode.CTS[0].CTS.length
            // 计算差值
            const rowPoor = Math.abs(this.row - initialRow)
            const colPoor = Math.abs(this.col - initialCol)
            // 若列数增加
            if (this.col > initialCol) {
                for (let row of this.targetNode.CTS) {
                    
                    for (let i = 0; i < colPoor; i++) {
                        row.CTS.push(defaultTD)
                    }
                }
            } else { // 若列数减少
                for (let row of this.targetNode.CTS) {
                    // 计算差值
                    for (let i = 0; i < colPoor; i++) {
                        row.CTS.pop()
                    }
                }
            }
            // 若行数增加
            if (this.row > initialRow) {
                // 单独表格行
                const singleRow = {CTS:[]}
                for (let i = 0; i < this.col; i++) {
                    singleRow.CTS.push(defaultTD)
                }
                for (let i = 0; i < rowPoor; i++) {
                    this.targetNode.CTS.push(singleRow)
                }
            } else { // 若行数减少
                for (let i = 0; i < rowPoor; i++) {
                    this.targetNode.CTS.pop()
                }
            }
        },
        close() {
            EventBus.emit("note-offset-cancel")
            this.show = false
        }
    },
    watch: {
        show(newVal) {
            if (newVal) {
                // 获取目标表格节点
                this.getNodeObj({
                    location: this.selectedNode.location,
                    callback: (nodeArray, index) => {
                        this.targetNode = nodeArray[index]
                    }
                })
                // 获取目标行数、列数
                this.row = this.targetNode.CTS.length
                this.col = this.targetNode.CTS[0].CTS.length
            } else {
                this.targetNode = null
            }
        },
        row(newVal) {
            if (newVal < 1) {
                this.timeout = setTimeout(() => {
                    this.row = 1
                }, 1000)
            } else {
                clearTimeout(this.timeout)
            }
        },
        col(newVal) {
            if (newVal < 1) {
                this.timeout = setTimeout(() => {
                    this.col = 1
                }, 1000)
            } else {
                clearTimeout(this.timeout)
            }
        }
    }
}
</script>

<style scoped>
    /* Table Setter */
    .table-setter {
        display: flex;
        padding-left: 8px;
        background-color: white;
    }
    .input-group {
        margin-left: 8px;
        margin-right: 8px;
    }
    .inputter {
        width: 3em !important;
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