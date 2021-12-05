<template>
    <div class="note-outer shadow-3" :class="{ 'is-inputting': isInputting }">
        <div class="note" @contextmenu.prevent="">
            <template
                v-for="(item, index) in note.CTS"
                :key="item.id"
            >

                <floor
                    v-if="item.NT == 'floor'"
                    :children="item.CTS"
                    :selected="item.SL"
                    :level="1"
                    :location="[index]"
                />
                <!--                           如果为标题节点                   | 其它节点 -->
                <basic-node
                    v-else
                    :tagName="item.NT == 'h' ? item.NT + 1 : item.NT"
                    :content="item.CT"
                    :selected="item.SL"
                    :location="[index]"
                />

            </template>

            <textfield-group
                :isAdding="isNodeAdding"
                @toParent="closeNodeAdder"
            />
            <!-- 新增节点 按键 -->
            <button
                class="btn adder-btn"
                :class="{ 'disabled': isNodeAdding }"
                @click="openNodeAdder"
            >
                <i class="material-icons">add</i>
            </button>
        </div>
    </div>
</template>

<script>
import basicNode from "./note/basicNode"
import Floor from "./note/floor"
import TextfieldGroup from "./textfieldGroup.vue"
import EventBus from "../common/EventBus"

export default {
    components: {
        basicNode, Floor, TextfieldGroup
    },
    data() {
        return {
            isNodeAdding: false,
            isInputting: false
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
            }
        })
    },
    mounted() {
        EventBus.on("open-textfield", () => {
            this.isInputting = true
        })
        EventBus.on("textfield-return", () => {
            this.isInputting = false
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
        closeNodeAdder(obj) {
            if (obj.CT) {
                // 如果插入节点为 层次
                if (obj.NT == "floor") {
                    obj.LV = 1
                }
                
                this.note.contents.push(obj)
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
        height: 36px;
        margin: 0 auto 1rem;
        color: rgba(0, 0, 0, 0.87);
        background-color: #CFD8DC;
    }
    .adder-btn.disabled {
        opacity: 0;
        pointer-events: none;
    }
</style>