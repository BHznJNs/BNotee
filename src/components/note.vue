<template>
    <div
        class="note-outer shadow-3"
        :class="{
            'offset': offset,
            'fullscreen': isFullscreen
        }"
    >
        <div class="mask-outer">
            <div class="mask"></div>
        </div>

        <div class="note" ref="note" @contextmenu.prevent="">
            <template
                v-for="(item, index) in note.CTS"
                :key="item.id"
            >
                <floor-block
                    v-if="item.NT == 'floor'"
                    :isTouchMode="isTouchMode"
                    :selected="item.SL"
                    :children="item.CTS"
                    :level="2"
                    :location="[index]"
                />
                <node-renderer
                    v-else
                    :isTouchMode="isTouchMode"
                    :nodeObj="item"
                    :index="index"
                    :level="1"
                    :location="[]"
                />
            </template>

            <textfield-group
                ref="textfield"
                :isAdding="isNodeAdding"
                @toParent="closeNodeAdder"
            />
            <!-- 新增节点 按键 -->
            <div
                class="btn btn-normal adder-btn"
                :class="{ 'disabled': isNodeAdding }"
                @click="openNodeAdder"
            >
                <i class="material-icons">add</i>
            </div>
        </div>
    </div>
</template>

<script>
import FloorBlock from "./note/floorBlock"
import NodeRenderer from "./note/nodeRenderer"
import TextfieldGroup from "./textfieldGroup"
import EventBus from "../common/EventBus"

export default {
    components: {
        FloorBlock, NodeRenderer,
        TextfieldGroup
    },
    data() {
        return {
            isNodeAdding: false,
            offset: false
        }
    },
    props: ["isFullscreen", "isTouchMode"],
    inject: ["note"],
    created() {
        // 设置按键事件监听
        addEventListener("keydown", (e) => {
            const altKey = e.altKey
            const keyName = e.key
            // 按下 alt + a 时触发
            if (altKey && keyName == "a") {
                e.preventDefault()
                this.openNodeAdder()
            }
        })
    },
    mounted() {
        EventBus.on("note-offset", () => {this.offset = true})
        EventBus.on("note-offset-cancel", () => {this.offset = false})
    },
    methods: {
        // 方法：打开插入文本框
        openNodeAdder() {
            this.isNodeAdding = true
            this.$refs.textfield.focus()
        },
        // 方法：关闭插入文本框
        closeNodeAdder(obj) {
            this.isNodeAdding = false
            console.log(obj)
            if (obj) {
                this.note.CTS.push(obj)
            }
        }
    },
    watch: {
        // 监听：当切换全屏状态时，隐藏 note
        isFullscreen(newVal, oldVal) {
            if (newVal != oldVal) {
                this.$refs.note.style.display = "none"
                setTimeout(() => {
                    this.$refs.note.style.display = "block"
                }, 1200)
            }
        }
    }
}
</script>

<style scoped>
    .note-outer {
        position: absolute;
        right: 0;
        display: inline-block;
        width: calc(100vw - 108px);
        height: 84vh;
        margin-top: 56px;
        border-radius: 15px 0 0 15px;
        -webkit-border-radius: 15px 0 0 15px;
        background-color: white;
        -webkit-box-sizing: border-box;
            box-sizing: border-box;
        transition: height .6s, width 1s, margin-top 1s,
                    border-radius .3s 1s, -webkit-border-radius .3s 1s;
        overflow: hidden;
        contain: content;
    }
    .note-outer.offset {
        height: 76vh;
    }
    .note-outer.fullscreen {
        width: 100vw;
        height: 100vh;
        margin-top: 0;
        border-radius: 0;
        -webkit-border-radius: 0;
    }
    @media screen and (max-height: 500px) {
        .note-outer {
            margin-top: 48px;
        }
        @media screen and (max-height: 450px) {
            .note-outer {
                height: 72vh;
            }
            .note-outer.offset {
                height: 64vh;
            }
        }
    }

    .note {
        position: relative;
        height: 100%;
        padding: 1rem 0 1rem 1.2rem;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        overflow: auto;
        transition: padding-top 0s;
    }
    .fullscreen .note {
        padding-top: 64px;
    }

    /* ------ */

    .adder-btn {
        position: sticky;
        left: 30%;
        width: 40%;
        max-width: 160px;
        height: 36px;
        line-height: 36px;
        margin: 0 auto 1rem;
    }
    .adder-btn.disabled {
        opacity: 0;
    }

    /* Mask */
    .mask-outer {
        position: relative;
        width: 100%;
        height: 0;
        z-index: 1;
    }
    .mask {
        width: 100%;
        height: .6rem;
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0), white);
        pointer-events: none;
    }
</style>