<template>
    <div class="note-outer mdui-shadow-3" :class="{'is-inputting': isInputting }">
        <div class="note" @contextmenu.prevent="">
            <template
                v-for="(item, index) in note.contents"
                :key="item.id"
            >

                <floor
                    v-if="item[0] == 'floor'"
                    :children="item[1]"
                    :location="[index]"
                />
                <!--                           如果为标题节点                   | 其它节点 -->
                <note-node
                    v-else
                    :tagName="item[0] == 'h' ? item[0] + (note.level + 1) : item[0]"
                    :content="item[1]"
                    :location="[index]"
                />

            </template>

            <textfield-group
                :isAdding="isNodeAdding"
                @toParent="closeNodeAdder"
            />
            <!-- 新增节点 按键 -->
            <button
                class="adder-btn mdui-btn mdui-btn-raised"
                :class="{'disabled': isNodeAdding}"
                @click="openNodeAdder"
            >
                <i class="material-icons">add</i>
            </button>
        </div>
    </div>
</template>

<script>
import NoteNode from "./note/noteNode"
import Floor from "./note/floor"
import TextfieldGroup from "./textfieldGroup.vue"

export default {
    components: {
        NoteNode, Floor, TextfieldGroup
    },
    data() {
        return {
            isNodeAdding: false
        }
    },
    props: ["isInputting"],
    inject: ["note"],
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
    .note-outer.is-inputting {
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
        color: rgba(0, 0, 0, 0.87);
        background-color: #CFD8DC;
    }
    .adder-btn.disabled {
        opacity: 0;
        pointer-events: none;
    }
</style>