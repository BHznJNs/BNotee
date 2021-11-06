<template>
    <div id="note" class="mdui-shadow-3" @contextmenu.prevent="">
        <template
            v-for="(item, index) in note.contents"
            :key="item.id"
        >
            <note-node
                v-if="item[0] != 'floor'"
                :tagName="item[0]"
                :content="item[1]"
                :level="note.level + 1"
                :location="[index]"
            />
            <floor
                v-else
                :children="item[1]"
                :location="[index]"
            />
        </template>

        <textfield-group :isAdding="isNodeAdding" @toParent="closeNodeAdder"/>
        <button
            class="adder-btn mdui-color-blue-grey-100 mdui-btn mdui-btn-raised"
            :class="{'disabled': isNodeAdding}"
            @click="openNodeAdder"
        >
            <i class="material-icons">add</i>
        </button>
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
            // 按下 alt + c 时触发
            } else if (altKey && keyName == "c") {
                event.preventDefault()
                this.closeNodeAdder()
            }
        })
    },
    methods: {
        // 打开插入文本框
        openNodeAdder() {
            const mainTextfield = document.querySelector("#note > .textfield-group > .textfield")
            this.isNodeAdding = true
            mainTextfield.focus()
        },
        // 关闭插入文本框
        closeNodeAdder(tagName) {
            const mainTextfield = document.querySelector("#note > .textfield-group > .textfield")
            if (mainTextfield.innerText) {
                this.note.contents.push([tagName, mainTextfield.innerText])
            }
            this.isNodeAdding = false
            mainTextfield.innerText = ""
            mainTextfield.blur()
        },
    }
}
</script>

<style scoped>
    * {
        color: #333
    }

    #note {
        width: 100%;
        height: 80vh;
        margin-left: 2rem;
        padding: 1rem 0 1rem 1.2rem;
        border-radius: 15px 0 0 15px;
        background-color: white;
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