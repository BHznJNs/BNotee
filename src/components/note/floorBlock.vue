<template>
    <div
        class="floor shadow-2"
        :class="{
            'shadow-6': selected,
            'touch-mode': isTouchMode
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <template
            v-for="(item, index) in children"
            :key="item.id"
        >
            <floor-block
                v-if="item.NT == 'floor'"
                :isTouchMode="isTouchMode"
                :children="item.CTS"
                :selected="item.SL"
                :level="level + 1"
                :location="location.concat([index])"
                @mouse-in-child="onMouseLeave"
            />
            <node-renderer
                v-else
                :isTouchMode="isTouchMode"
                :nodeObj="item"
                :index="index"
                :level="level"
                :location="location"
            />
        </template>

        <block-controls
            :disabled="!hover"
            :isTouchMode="isTouchMode"
            :selected="selected"
            :location="location"
            :parentType="'floor'"
        />
    </div>
</template>

<script>
import NodeRenderer from "./nodeRenderer"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"

export default {
    name: "floor-block",
    components: {
        BlockControls, NodeRenderer
    },
    props: [
        "isTouchMode",
        "level", "location",
        "children", "selected"
    ],
    mixins: [blockHoverEvent]
}
</script>