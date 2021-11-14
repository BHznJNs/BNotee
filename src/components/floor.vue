<template>
    <div class="floor mdui-shadow-2">
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <template
            v-for="(item, index) in children.contents"
            :key="item.id"
        >

            <note-node
                v-if="item[0] == 'h'"
                :tagName="item[0] + (children.level + 1)"
                :content="item[1]"
                :location="location.concat([index])"
            />
            <floor
                v-else-if="item[0] == 'floor'"
                :children="item[1]"
                :location="location.concat([index])"
            />
            <note-node
                v-else
                :tagName="item[0]"
                :content="item[1]"
                :location="location.concat([index])"
            />

        </template>
    </div>
</template>

<script>
import NoteNode from "./noteNode"

export default {
    name: "floor",
    components: {
        NoteNode
    },
    props: ["children", "location"],
    inject: ["note"]
}
</script>

<style scoped>
    .floor {
        position: relative;
        margin-left: 1rem;
        margin-right: -1rem;
        padding: .4rem 0 .4rem .8rem;
        border-radius: 8px 0 0 8px;
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
</style>