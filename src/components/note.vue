<template>
    <div class="note-outer mdui-shadow-3" :class="{'inserting': isNodeInserting[0]}">
        <div class="note" @contextmenu.prevent="">
            <template
                v-for="(item, index) in note.contents"
                :key="item.id"
            >

                <note-node
                    v-if="item[0] == 'h'"
                    :tagName="item[0] + (note.level + 1)"
                    :content="item[1]"
                    :location="[index]"
                />
                <floor
                    v-else-if="item[0] == 'floor'"
                    :children="item[1]"
                    :location="[index]"
                />
                <note-node
                    v-else
                    :tagName="item[0]"
                    :content="item[1]"
                    :location="[index]"
                />

            </template>

            <textfield-group
                type="dafault"
                :isAdding="isNodeAdding"
                @toParent="closeNodeAdder"
            />
            <!-- 新增元素 按键 -->
            <button
                class="adder-btn mdui-color-blue-grey-100 mdui-btn mdui-btn-raised"
                :class="{'disabled': isNodeAdding}"
                @click="openNodeAdder"
            >
                <i class="material-icons">add</i>
            </button>
        </div>
    </div>
</template>

<script>
import NoteNode from "./noteNode"
import floor from "./floor"
import textfieldGroup from "./textfieldGroup.vue"

export default {
    components: {
        NoteNode, floor, textfieldGroup
    },
    data() {
        return {
            isNodeAdding: false,
        }
    },
    inject: ["note", "isNodeInserting"],
    created() {
        // 设置按键事件监听
        addEventListener("keydown", (event) => {
            const altKey = event.altKey
            const keyName = event.key
            // 按下 alt + a 时触发
            if (altKey && keyName == "a") {
                event.preventDefault()
                this.openNodeAdder()
            }
        })
    },
    methods: {
        // 打开插入文本框
        openNodeAdder() {
            const mainTextfield = document.querySelector(".note > .textfield-group > .textfield")
            this.isNodeAdding = true
            mainTextfield.focus()
        },
        // 关闭插入文本框
        closeNodeAdder(value) {
            if (value[1]) {
                // 如果插入节点为 层次
                if (value[0] == "floor") {
                    value[1].level = 1
                }
                this.note.contents.push(value)
            }
            this.isNodeAdding = false
            console.log(this.note)
        }
    }
}
</script>

<style scoped>
    * {
        color: #333
    }

    .note-outer {
        width: 100%;
        height: 80vh;
        margin-left: 2rem;
        border-radius: 15px 0 0 15px;
        transition: .3s;
        overflow: hidden;
        contain: content;
    }
    .note-outer.inserting {
        margin-bottom: 2rem
    }
    .note {
        height: 100%;
        padding: 1rem 0 1rem 1.2rem;
        background-color: white;
        box-sizing: border-box;
        overflow: auto;
    }

    /* ------ */

    .adder-btn {
        display: block;
        width: 40%;
        margin: 0 auto 1rem;
        transition: opacity .3s;
    }
    .adder-btn.disabled {
        opacity: 0;
        pointer-events: none;
    }
</style>