<!-- 表格组件，不得包含其他组件 -->
<template>
    <div
        class="table shadow-2"
        :class="{
            'shadow-6': selected,
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
                <tr v-for="(item, index) in children" :key="item.id">
                    <template
                        v-for="(item_, index_) in item.CTS"
                        :key="item_.id"
                    >
                    <!-- 单个表格项 -->
                        <basic-node
                            :tagName="'td'"
                            :content="item_.CT"
                            :color="item_.CL"
                            :selected="item_.SL"
                            :location="location.concat([index, index_])"
                        />
                    </template>
                </tr>
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
import BasicNode from "./basicNode"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"

export default {
    props: [
        "isTouchMode", "selected",
        "children", "location"
    ],
    mixins: [blockHoverEvent],
    components: {
        BasicNode, BlockControls
    }
}
</script>