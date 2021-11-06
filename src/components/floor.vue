<template>
    <div class="floor mdui-shadow-2">
        <template
            v-for="(item, index) in children.contents"
            :key="item.id"
        >
            <note-node
                v-if="item[0] != 'floor'"
                :tagName="item[0]"
                :content="item[1]"
                :level="children.level + 1"
                :location="location.concat([index])"
            />
            <floor
                v-else
                :children="item[1]"
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
        margin-left: 1rem;
        padding: .4rem 0 .4rem .8rem;
        border-radius: 8px 0 0 8px;
    }
    .floor:not(:last-child) {
        margin-bottom: 1rem;
    }

    #note > .floor {
        padding: .4rem 0 .8rem .8rem;
    }
</style>