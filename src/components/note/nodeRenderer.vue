<script>
import { h } from "vue"
import Heading from "./heading"
import BasicNode from "./basicNode"
import ListBlock from "./listBlock"
import TableBlock from "./tableBlock"
import DetailBlock from "./detailBlock"

export default {
    components: {
        Heading, BasicNode,
        ListBlock, TableBlock
    },
    props: [
        "nodeObj", "index",
        "location", "level"
    ],
    render() {
        let nodeProps = {
            location: this.location.concat([this.index]),
        }
        let nodeType
        switch (this.nodeObj.NT) {
            case "h":
                nodeType = Heading
                nodeProps.level = this.level
                nodeProps.content = this.nodeObj.CT
                nodeProps.color = this.nodeObj.CL
                break
            case "list":
                nodeType = ListBlock
                nodeProps.isOrdered= this.nodeObj.OL
                nodeProps.children= this.nodeObj.CTS
                break
            case "table":
                nodeType = TableBlock
                nodeProps.children= this.nodeObj.CTS
                break
            case "details":
                nodeType = DetailBlock
                nodeProps.summary = this.nodeObj.SUM
                nodeProps.children = this.nodeObj.CTS
                break
            default:
                nodeType = BasicNode
                nodeProps.tagName = this.nodeObj.NT
                nodeProps.content = this.nodeObj.CT
                nodeProps.color = this.nodeObj.CL
        }
        return h(
            nodeType,
            nodeProps
        )
    }
}
</script>