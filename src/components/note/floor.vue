<template>
    <div class="floor mdui-shadow-2">
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <template
            v-for="(item, index) in children.contents"
            :key="item.id"
        >

            
            <floor
                v-if="item[0] == 'floor'"
                :children="item[1]"
                :location="location.concat([index])"
            />
            <!--                           如果为标题节点                   | 其它节点 -->
            <note-node
                v-else
                :tagName="item[0] == 'h' ? item[0] + (children.level + 1) : item[0]"
                :content="item[1]"
                :location="location.concat([index])"
            />
            <!-- <button
                class="adder-btn mdui-color-blue-grey-100 mdui-btn mdui-btn-raised"
            >
                <i class="material-icons">add</i>
            </button> -->

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