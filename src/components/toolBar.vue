<template>
    <div id="toolbar" class="shadow-3">
        <i class="logo material-icons shadow-2">format_list_bulleted</i> 
        <div class="tools">
            <!-- 插入节点 -->
            <div
                class="tool shadow-1"
                :class="{ 'disabled': !selectedNode.location }"
                @click="openTextfield"
            >
                <i class="material-icons">add</i>
            </div>
            <!-- 删除节点 -->
            <div
                class="tool shadow-1"
                :class="{ 'disabled': !selectedNode.location }"
                @click="deleteNode"
            >
                <i class="material-icons">remove</i>
            </div>
            <!-- 节点颜色修改 -->
            <div
                class="tool shadow-1"
                :class="{ 'disabled': !['basic-node', 'list-item'].includes(selectedNode.type) }"
                @click="colorNode"
            >
                <i class="material-icons">color_lens</i>
            </div>
            <!-- 保存笔记 -->
            <div
                class="tool shadow-1"
                @click="saveNote"
            >
                <i class="material-icons">vertical_align_bottom</i>
            </div>
            <!-- 导入笔记 -->
            <div
                class="tool shadow-1"
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
import saveAs from "file-saver"
import getNodeObj from "./mixin/getNodeObj"
import EventBus from "../common/EventBus"

export default {
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
        EventBus.on("textfield-return-toolBar", (value) => {
            this.insertNode(value)
        })
    },
    methods: {
        // 方法：插入节点
        insertNode(obj) {
            // 如果无内容返回
            if (!obj.CT) {
                return
            }

            const location = this.selectedNode.location
            // 如果未选择节点
            if (!location) {
                return
            }
            this.getNodeObj({
                location: location,
                callback: (nodeArray, index) => {
                    // 如果插入节点为 层次
                    if (obj.NT == "floor") {
                        obj.level = location.length
                    }

                    nodeArray.splice(index + 1, 0, obj)
                }
            })
        },
        // 方法：删除被选择节点
        deleteNode() {
            const location = this.selectedNode.location
            this.selectedNode.location = null
            this.selectedNode.type = null
            this.getNodeObj({
                location: location,
                callback: (nodeArray, index) => {
                    // 删除节点
                    nodeArray.splice(index, 1)
                }
            })
        },
        // 方法：节点染色
        colorNode() {
            EventBus.emit("colors-open")
        },
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
        },
        // 方法：打开全局输入组
        openTextfield() {
            EventBus.emit("textfield-open", "toolBar")
        }
    }
}
</script>

<style scoped>
    #toolbar {
        width: 4rem;
        height: 100vh;
        background-color: white;
        overflow-x: hidden;
    }

    img, i {
        user-select: none;
    }

    i.logo {
        display: block;
        width: 100%;
        padding: .2rem 0;
        margin-bottom: .4rem;
        color: white;
        background-color: #333;
        font-size: 2rem;
        text-align: center;
    }

    .tools {
        display: flex;
        flex-direction: column;
    }
    .tool {
        width: 2.6rem;
        height: 2rem;
        margin: .6rem auto;
        cursor: pointer;
        color: #333;
        background-color: #FAFAFA;
        transition: .3s
    }
    .tool:hover {
        color: black;
        background-color: #EEEEEE
    }
    .tool:active {
        color: #424242;
        background-color: white;
    }
    .tool.disabled {
        color: #BDBDBD;
        pointer-events: none;
    }
    .tool i {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 28px;
        text-align: center;
        line-height: 2rem;
        user-select: none;
    }
    /* File Uploader */
    i.file input {
        display: none;
    }
</style>