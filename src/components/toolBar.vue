<template>
    <div class="toolbar shadow-3">
        <i class="logo material-icons shadow-2">format_list_bulleted</i> 
        <div class="tools">
            <!-- 插入节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.loc }"
                @click="openTextfield"
            >
                <i class="material-icons">add</i>
            </div>
            <!-- 删除节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.loc }"
                @click="toDeleteNode"
            >
                <i class="material-icons">remove</i>
            </div>
            <!-- 取消节点选择 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.loc }"
                v-show="isTouchMode"
                @click="nodeCancelSelect"
            >
                <i class="material-icons">indeterminate_check_box</i>
            </div>
            <!-- 节点颜色修改 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !['basic-node', 'list-item'].includes(selectedNode.type) }"
                @click="openColors"
            >
                <i class="material-icons">color_lens</i>
            </div>
            <!-- 清空节点 -->
            <div
                class="tool btn btn-shallow"
                @click="clearNodes"
            >
                <i class="material-icons">clear_all</i>
            </div>
            <!-- 保存笔记 -->
            <div
                class="tool btn btn-shallow"
                @click="saveNote"
            >
                <i class="material-icons">vertical_align_bottom</i>
            </div>
            <!-- 导入笔记 -->
            <div
                class="tool btn btn-shallow"
                @click="readNote"
            >
                <i class="material-icons file">input
                    <input ref="fileUploader" type="file" accept="application/json">
                </i>
            </div>
        </div>
    </div>
</template>

<script>
import getNodeObj from "./mixin/getNodeObj"
import insertNode from "./mixin/insertNode.js"
import deleteNode from "./mixin/deleteNode.js"
import EventBus from "../common/EventBus"
import compiler from "../common/compiler"
import saveAs from "file-saver"

export default {
    props: ["isTouchMode"],
    inject: ["note", "selectedNode"],
    mixins: [getNodeObj, insertNode, deleteNode],
    mounted() {
        const fileUploader = this.$refs.fileUploader
        // 当选择文件
        fileUploader.addEventListener("change", () => {
            // 文件读取
            let reader = new FileReader()
            reader.readAsText(fileUploader.files[0], "uft8")
            // 文件读取完成后，覆盖笔记
            reader.onload = (e) => {
                let result = e.target.result
                this.note.CTS = JSON.parse(result)
                setTimeout(() => {
                    compiler.init()
                }, 2000)
            }
        })

        // 当 textfield 返回插入节点对象
        EventBus.on("textfield-return-toolBar", (nodeObj) => {
            this.toInsertNode(nodeObj)
        })
    },
    methods: {
        // 方法：打开全局输入组
        openTextfield() {
            EventBus.emit("textfield-open", "toolBar")
        },
        // 插入节点前
        toInsertNode(nodeObj) {
            const loc = this.selectedNode.loc
            this.insertNode(nodeObj, loc)
            // 加入历史编辑
            loc[loc.length - 1] += 1 // 数组最后一个元素值 + 1
            EventBus.emit("add-history", {
                loc,
                prop: "IST",
            })
        },
        // 删除节点前
        toDeleteNode() {
            const loc = this.selectedNode.loc
            const nodeObj = this.deleteNode(loc)
            // 加入历史编辑
            loc[loc.length - 1] -= 1 // 数组最后一个元素值 - 1
            EventBus.emit("add-history", {
                loc,
                prop: "DEL",
                nodeObj
            })
        },
        // 方法：触屏模式下，节点取消选择
        nodeCancelSelect() {
            this.selectedNode.vnode.selected = false

            this.selectedNode.loc = null
            this.selectedNode.obj = null
            this.selectedNode.type = null
        },
        // 方法：打开颜色选择器
        openColors() {
            EventBus.emit("fixedComponents-open", "colors")
        },
        // 方法：清空节点
        clearNodes() {
            this.note.CTS = []
            this.note.HT = []
            EventBus.emit("clear-history")
        },
        // 方法：保存笔记
        saveNote() {
            let blob = new Blob(
                [JSON.stringify(this.note.CTS)],
                {type: "text/plain;charset=utf-8"}
            )
            const name = this.note.NM || "MyNote"
            saveAs(blob, name + ".json")
        },
        // 方法：读取本地笔记
        readNote() {
            const fileUploader = this.$refs.fileUploader
            fileUploader.click()
        }
    }
}
</script>

<style scoped>
    .toolbar {
        display: inline-block;
        width: 72px;
        height: 100vh;
        background-color: white;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }

    i.logo {
        display: block;
        width: 100%;
        padding: 8px 0;
        margin-bottom: 8px;
        color: white;
        background-color: #333;
        font-size: 48px;
        text-align: center;
    }

    .tools {
        display: flex;
        flex-direction: column;
        height: calc(100% - 72px);
        padding-bottom: 1rem;
        overflow: -moz-scrollbars-none;
        overflow-y: auto;
    }
    .tools::-webkit-scrollbar {
        width: 0 !important
    }

    .tool {
        margin: .6rem auto;
    }
    /* File Uploader */
    i.file input {
        display: none;
    }
</style>