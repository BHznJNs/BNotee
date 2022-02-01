<template>
    <div class="toolbar shadow-3">
        <i class="logo material-icons shadow-2">format_list_bulleted</i> 
        <div class="tools">
            <!-- 插入节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.location || selectedNode.tagName == 'td' }"
                @click="openTextfield"
            >
                <i class="material-icons">add</i>
            </div>
            <!-- 删除节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.location || selectedNode.tagName == 'td' }"
                @click="deleteNode"
            >
                <i class="material-icons">remove</i>
            </div>
            <!-- 块节点内添加节点 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !['floor', 'list', 'table'].includes(selectedNode.type) }"
                v-show="isTouchMode"
                @click="blockNodeInsert"
            >
                <i class="material-icons">add_box</i>
            </div>
            <!-- 取消节点选择 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !selectedNode.location }"
                v-show="isTouchMode"
                @click="nodeCancelSelect"
            >
                <i class="material-icons">indeterminate_check_box</i>
            </div>
            <!-- 表格设置 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': selectedNode.type != 'table' }"
                @click="tableSetOpen"
            >
                <i class="material-icons">grid_on</i>
            </div>
            <!-- 节点颜色修改 -->
            <div
                class="tool btn btn-shallow"
                :class="{ 'disabled': !['basic-node', 'list-item'].includes(selectedNode.type) }"
                @click="colorsOpen"
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
                    <input id="file-uploader" type="file" accept="application/json">
                </i>
            </div>
        </div>
    </div>
</template>

<script>
import getNodeObj from "./mixin/getNodeObj"
import EventBus from "../common/EventBus"
import saveAs from "file-saver"

export default {
    props: ["isTouchMode"],
    inject: ["note", "selectedNode"],
    mixins: [getNodeObj],
    mounted() {
        const fileUploader = document.querySelector("#file-uploader")
        // 当选择文件
        fileUploader.addEventListener("change", () => {
            // 文件读取
            let reader = new FileReader()
            reader.readAsText(fileUploader.files[0], "uft8")
            // 文件读取完成后，覆盖笔记
            reader.onload = (e) => {
                let result = e.target.result
                this.note.CTS = JSON.parse(result)
            }
        })

        // 当 textfield 返回插入节点对象
        EventBus.on("textfield-return-toolBar", (obj) => {
            this.insertNode(obj)
        })
    },
    methods: {
        // 方法：打开全局输入组
        openTextfield() {
            EventBus.emit("note-offset")
            EventBus.emit("textfield-open", "toolBar")
        },
        // 方法：插入节点
        insertNode(obj) {
            const location = this.selectedNode.location
            // 如果未选择节点
            if (!location) {
                return
            }
            this.getNodeObj({
                location: location,
                callback: (nodeArray, index) => {
                    nodeArray.splice(index + 1, 0, obj)
                }
            })
        },
        // 方法：删除被选择节点
        deleteNode() {
            const location = this.selectedNode.location
            this.selectedNode.location = null
            this.selectedNode.type = null
            this.selectedNode.tagName = null
            this.getNodeObj({
                location: location,
                callback: (nodeArray, index) => {
                    // 删除节点
                    nodeArray.splice(index, 1)
                }
            })
        },
        // 方法：触屏模式下，块节点内添加节点
        blockNodeInsert() {
            EventBus.emit("add-node")
        },
        // 方法：触屏模式下，节点取消选择
        nodeCancelSelect() {
            this.getNodeObj({
                location: this.selectedNode.location,
                callback: (nodeArray, index) => {
                    nodeArray[index].SL = false
                }
            })
            EventBus.emit("remove-add-node")
            this.selectedNode.tagName = null
            this.selectedNode.location = null
            this.selectedNode.type = null
        },
        // 方法：切换表格设置器
        tableSetOpen() {
            this.tableSetter = true
            EventBus.emit("note-offset")
            EventBus.emit("tableSetter-open")
            EventBus.emit("colors-close")
            EventBus.emit("textfield-close")
        },
        // 方法：打开颜色选择器
        colorsOpen() {
            EventBus.emit("colors-open")
            EventBus.emit("note-offset")
        },
        // 方法：清空节点
        clearNodes() {
            this.note.CTS = []
        },
        // 方法：打开笔记上传
        openUploader() {},
        // 方法：保存笔记
        saveNote() {
            let blob = new Blob(
                [JSON.stringify(this.note.CTS)],
                {type: "text/plain;charset=utf-8"}
            )
            saveAs(blob, "myNote.json")
        },
        // 方法：读取本地笔记
        readNote() {
            const fileUploader = document.querySelector("#file-uploader")
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
        height: calc(100% - 72px - 2rem);
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

    .tool i {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 28px;
        line-height: 2rem;
    }
    /* File Uploader */
    i.file input {
        display: none;
    }
</style>