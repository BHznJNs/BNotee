<template>
    <list-block
        v-if="nodeObj.NT == 'list'"
        :isOrdered="nodeObj.OL"
        :selected="nodeObj.SL"
        :children="nodeObj.CTS"
        :location="location.concat([index])"
    />
    <table-block
        v-else-if="nodeObj.NT == 'table'"
        :selected="nodeObj.SL"
        :children="nodeObj.CTS"
        :location="location.concat([index])"
    />
    <!--                           如果为标题节点                   | 其它节点 -->
    <basic-node
        v-else
        :tagName="nodeObj.NT == 'h' ? nodeObj.NT + level : nodeObj.NT"
        :content="nodeObj.CT"
        :color="nodeObj.CL"
        :selected="nodeObj.SL"
        :location="location.concat([index])"
    />
</template>
<script>
import BasicNode from "./basicNode"
import ListBlock from "./listBlock"
import TableBlock from "./tableBlock"

export default {
    components: {
        BasicNode,
        ListBlock, TableBlock
    },
    props: [
        "nodeObj", "index",
        "location", "level"
    ]
}
</script>