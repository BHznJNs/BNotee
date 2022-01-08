<!-- 表格组件，不得包含其他组件 -->
<template>
    <div
        class="table shadow-2"
        :class="{ 'shadow-6': selected, hover }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <table>
            <tbody>
                <table-row
                    v-for="(item, index) in children"
                    :key="item.id"
                    :children="item.CTS"
                    :location="location.concat([index])"
                />
            </tbody>
        </table>
        <block-controls
            :class="{ 'controls-margin': hover }"
            :disabled="!hover"
            :selected="selected"
            :location="location"
            :parentType="'table'"
        />
    </div>
</template>
<script>
import BasicNode from "./basicNode"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"
import { h } from "vue"

export default {
    props: [
        "selected",
        "children", "location"
    ],
    mixins: [blockHoverEvent],
    components: {
        BlockControls,
        tableRow: { // 表格行组件
            components: {BasicNode},
            props: ["children", "location"],
            render() {
                let childObjList = []
                for (let index in this.children) {
                    // 行组件子节点
                    const child = this.children[index]
                    childObjList.push(h(
                        BasicNode, {
                            tagName: "td",
                            content: child.CT,
                            color: child.CL,
                            selected: child.SL,
                            location: this.location.concat([index])
                        }
                    ))
                }
                return h("tr", childObjList)
            }
        }
    }
}
</script>
<style scoped>
    .controls-margin {
        margin: .6rem 0 0;
    }
</style>