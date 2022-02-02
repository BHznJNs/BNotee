<!-- 表格组件，不得包含其他组件 -->
<template>
    <div
        class="table shadow-1"
        :class="{
            'shadow-3': selected,
            'touch-mode': isTouchMode,
            'hover': hover && !isTouchMode
        }"
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
                    :children="item"
                    :location="location.concat(index)"
                />
            </tbody>
        </table>
        <block-controls
            :isTouchMode="isTouchMode"
            :disabled="!hover"
            :selected="selected"
            :location="location"
            :parentType="'table'"
        />
    </div>
</template>
<script>
import TableRow from "./tableRow"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"

export default {
    props: [
        "isTouchMode", "selected",
        "children", "location"
    ],
    mixins: [blockHoverEvent],
    components: {
        TableRow, BlockControls
    }
}
</script>