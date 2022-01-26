<!-- 列表块组件，其中仅允许加入 标题、列表块、列表项节点、割线 -->
<template>
    <div
        class="list"
        :class="{ 
            'shadow-6': selected,
            'hover': hover && !selected,
            'empty': !children.length,
            'touch-mode': isTouchMode
         }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <list-child :ordered="isOrdered">
            <template
                v-for="(item, index) in children"
                :key="item.id"
            >
                <list-block
                    v-if="item.NT == 'list'"
                    :isTouchMode="isTouchMode"
                    :isOrdered="item.OL"
                    :selected="item.SL"
                    :children="item.CTS"
                    :location="location.concat([index])"
                    @mouse-in-child="onMouseLeave"
                />
                <basic-node
                    v-else
                    :tagName="item.NT == 'h' ? 'h4' : item.NT"
                    :content="item.CT"
                    :color="item.CL"
                    :selected="item.SL"
                    :location="location.concat([index])"
                />
            </template>
        </list-child>

        <block-controls
            :disabled="!hover"
            :isTouchMode="isTouchMode"
            :selected="selected"
            :location="location"
            :parentType="'list'"
        />
    </div>
</template>

<script>
import BasicNode from "./basicNode"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"
import { h } from "vue"

export default {
    name: "list-block",
    components: {
        BasicNode, BlockControls,
        listChild: {
            props: ["ordered"],
            render() {
                return h(
                    this.ordered ? "ol" : "ul",
                    this.$slots.default()
                )
            }
        }
    },
    props: [
        "isTouchMode",
        "children", "isOrdered",
        "location", "selected"
    ],
    mixins: [blockHoverEvent]
}
</script>