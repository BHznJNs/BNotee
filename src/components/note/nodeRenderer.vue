<template>
    <heading
        v-if="nodeObj.NT == 'h'"
        :level="level"
        :content="nodeObj.CT"
        :color="nodeObj.CL"
        :selected="nodeObj.SL"
        :location="location.concat([index])"
    />
    <list-block
        v-else-if="nodeObj.NT == 'list'"
        :isTouchMode="isTouchMode"
        :isOrdered="nodeObj.OL"
        :selected="nodeObj.SL"
        :children="nodeObj.CTS"
        :location="location.concat([index])"
    />
    <table-block
        v-else-if="nodeObj.NT == 'table'"
        :isTouchMode="isTouchMode"
        :selected="nodeObj.SL"
        :children="nodeObj.CTS"
        :location="location.concat([index])"
    />
    <!--                           如果为标题节点                   | 其它节点 -->
    <basic-node
        v-else
        :tagName="nodeObj.NT"
        :content="nodeObj.CT"
        :color="nodeObj.CL"
        :selected="nodeObj.SL"
        :location="location.concat([index])"
    />
</template>
<script>
import Heading from "./heading"
import BasicNode from "./basicNode"
import ListBlock from "./listBlock"
import TableBlock from "./tableBlock"

export default {
    components: {
        Heading, BasicNode,
        ListBlock, TableBlock
    },
    props: [
        "isTouchMode",
        "nodeObj", "index",
        "location", "level"
    ]
}
</script>