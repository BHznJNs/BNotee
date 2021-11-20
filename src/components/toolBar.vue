<template>
    <div id="toolbar" class="mdui-shadow-3">
        <img id="logo" class="mdui-shadow-2" src="../assets/note.svg" draggable="false">
        <div class="tools">
            <!-- 插入节点 -->
            <div
                class="tool mdui-shadow-1"
                :class="{'disabled': !selectedEl.length}"
                @click="this.$emit('toParent', 'insert-node')"
            >
                <i class="material-icons">add</i>
            </div>
            <!-- 删除节点 -->
            <div
                class="tool mdui-shadow-1"
                :class="{'disabled': !selectedEl.length}"
                @click="deleteNode"
            >
                <i class="material-icons">remove</i>
            </div>
            <!-- 保存笔记 -->
            <div
                class="tool mdui-shadow-1"
                @click="saveNote"
            >
                <i class="material-icons">vertical_align_bottom</i>
            </div>
            <!-- 导入笔记 -->
            <div
                class="tool mdui-shadow-1"
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
import getNodeEl from "./mixin/getNodeEl"

export default {
    inject: ["note", "selectedEl"],
    mixins: [getNodeEl],
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
                this.note.contents = JSON.parse(result)
            }
        })
    },
    methods: {
        // 函数：插入节点
        insertNode(value) {
            // 如果无内容返回
            if (!value[1]) {
                return
            }

            const location = this.selectedEl[0]
            // 如果未选择节点
            if (!location) {
                return
            }
            this.getNodeEl({
                location: location,
                callback: (nodeArray, index) => {
                    // 如果插入节点为 层次
                    if (value[0] == "floor") {
                        value[1].level = location.length
                    }

                    nodeArray.splice(index + 1, 0, value)
                }
            })
        },
        // 函数：删除被选择节点
        deleteNode() {
            const location = this.selectedEl.pop()
            this.getNodeEl({
                location: location,
                callback: (nodeArray, index) => {
                    // 删除节点
                    nodeArray.splice(index, 1)
                }
            })
        },
        // 函数：保存笔记
        saveNote() {
            let blob = new Blob(
                [JSON.stringify(this.note.contents)],
                {type: "text/plain;charset=utf-8"}
            )
            saveAs(blob, "myNote.json")
        },
        // 函数：读取本地笔记
        readNote() {
            const fileUploader = document.querySelector("#file-uploader")
            fileUploader.click()
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

    #logo {
        width: calc(100% - .8rem);
        padding: .4rem;
        background-color: #333;
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