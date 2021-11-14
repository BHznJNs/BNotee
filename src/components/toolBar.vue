<template>
    <div id="toolbar" class="mdui-shadow-3">
        <img id="logo" class="mdui-shadow-2" src="../assets/note.svg" draggable="false">
        <div class="tools">
            <div
                class="tool mdui-shadow-1"
                :class="{'disabled': !selectedEl.length}"
                @click="openInserter"
            >
                <i class="material-icons">add</i>
            </div>

            <div
                class="tool mdui-shadow-1"
                :class="{'disabled': !selectedEl.length}"
                @click="deleteNode"
            >
                <i class="material-icons">remove</i>
            </div>
        </div>

        <textfield-group
            type="fixed"
            id="main-textfield-group"
            :isAdding="isNodeInserting[0]"
            @toParent="closeNodeInserter"
        />
    </div>
</template>

<script>
import textfieldGroup from "./textfieldGroup"

export default {
    components: {textfieldGroup},
    inject: ["note", "selectedEl", "isNodeInserting"],
    methods: {
        // 函数：获取 节点元素所在数组 并执行回调函数
        getNodeEl({
                nodeEl=this.note,
                location,
                num=0,
                callback
        }) {
            if (num == location.length - 1) {
                // 调用回调函数返回节点元素所在数组 及 index
                if (callback) {
                    callback(nodeEl.contents, location[num])
                }
            }
            else {
                let num_ = num + 1
                this.getNodeEl({
                    nodeEl: nodeEl.contents[location[num]][1],
                    location: location,
                    num: num_,
                    callback: callback
                })
            }
        },
        closeNodeInserter(value) {
            this.isNodeInserting[0] = false
            // 如果无内容返回
            if (!value[1]) {
                return
            }

            const location = this.selectedEl[0]
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
        // 函数：插入元素
        openInserter() {
            this.isNodeInserting[0] = true
        },
        // 函数：删除被选择元素
        deleteNode() {
            const location = this.selectedEl.pop()
            this.getNodeEl({
                location: location,
                callback: (nodeArray, index) => {
                    nodeArray.splice(index, 1)
                }
            })
            console.log(this.note)
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
</style>