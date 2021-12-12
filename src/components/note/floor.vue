<template>
    <div
        class="floor shadow-2"
        :class="{ 'shadow-6': selected }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <template
            v-for="(item, index) in children"
            :key="item.id"
        >
            <floor
                v-if="item.NT == 'floor'"
                :children="item.CTS"
                :selected="item.SL"
                :level="level + 1"
                :location="location.concat([index])"
                @mouse-out="onMouseLeave"
            />
            <!--                           如果为标题节点                   | 其它节点 -->
            <basic-node
                v-else
                :tagName="item.NT == 'h' ? item.NT + (level + 1) : item.NT"
                :content="item.CT"
                :color="item.CL"
                :selected="item.SL"
                :location="location.concat([index])"
            />
        </template>

        <!-- 控件 -->
        <div
            class="controls"
            :class="{ disabled: !hover }"
        >
            <div
                class="btn adder-btn"
                @click="openTextfield"
            >
                <i class="material-icons">add</i>
            </div>
            <label class="checkbox">
                <input
                    type="checkbox"
                    :checked="selected"
                    @change="select($event)"
                />
                    <i class="checkbox-icon"></i>
            </label>
        </div>

    </div>
</template>

<script>
import basicNode from "./basicNode"
import getNodeObj from "../mixin/getNodeObj"
import EventBus from "../../common/EventBus"

export default {
    name: "floor",
    components: {
        basicNode
    },
    data() {
        return {
            nodeObj: null,
            hover: false,
            setTimeout: null,
        }
    },
    props: ["children", "level", "location", "selected"],
    inject: ["note", "selectedNode"],
    mixins: [getNodeObj],
    methods: {
        // 方法：选择此层次节点
        select(obj) {
            // 返回对象是否 checked
            const checked = obj.target.checked
            this.nodeObj.SL = checked
            // 若被选择
            if (checked) {
                // 如果已有节点被选择
                if (this.selectedNode.location) {
                    // 选取已被选择节点并取消选择
                    this.getNodeObj({
                        location: this.selectedNode.location,
                        callback: (nodeArray, index) => {
                            nodeArray[index].SL = false
                        }
                    })
                }

                this.selectedNode.location = this.location
                this.selectedNode.type = "floor"
            } else { // 若取消选择
                this.selectedNode.location = null
                this.selectedNode.type = null
            }
        },
        // 方法：打开全局输入组
        openTextfield() {
            EventBus.emit("textfield-open", "floor")
            // 添加事件监听
            EventBus.on("textfield-return-floor", (obj) => {
                // 向当前层次添加节点
                if (!obj) {
                    this.nodeObj.CTS.push(obj)
                }
                // 移除事件监听
                EventBus.off("textfield-return-floor")
            })
        },
        // 鼠标进入 悬停
        onMouseEnter() {
            // 鼠标悬停 .4s 后
            this.setTimeout = setTimeout(() => {
                this.hover = true
            }, 400)
            // 如果是 floor 节点子元素
            if (this.location.length > 1) {
                // 让父亲 floor 节点退出 hover 状态
                this.$emit("mouse-out")
            }
        },
        // 鼠标离开
        onMouseLeave() {
            // 重置鼠标悬停时间
            clearTimeout(this.setTimeout)
            if (!this.selected) {
                this.hover = false
            }
        }
    }
}
</script>

<style scoped>
    .floor {
        position: relative;
        margin-left: 1rem;
        margin-right: -1rem;
        padding: .4rem 0 .4rem .8rem;
        border-radius: 8px 0 0 8px;
        transition: .3s;
    }
    .floor:not(:last-child) {
        margin-bottom: 1rem;
    }
    .floor .mask {
        position: absolute;
        top: 0;
        right: 0;
        height: calc(100% + 10px);
        width: 2rem;
        margin: -5px -.2rem -5px 0;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0), white);
    }

    #note > .floor {
        padding: .4rem 0 .8rem .8rem;
    }

    /* Adder Button */
    .adder-btn {
        width: 10%;
        min-width: 60px;
        height: 32px;
        line-height: 32px;
        margin: 0 2rem 0;
        text-align: center;
        color: rgba(0, 0, 0, 0.87);
        background-color: #CFD8DC;
    }
    /* Adder Button End */

    /* Controls */
    .controls {
        display: flex;
        height: 32px;
        transition: height .3s;
    }
    .controls.disabled {
        height: 0 !important;
    }
    .controls.disabled * {
        opacity: 0;
        pointer-events: none;
    }
</style>