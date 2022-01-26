<script>
import { h } from "vue"
import BasicNode from "./basicNode"

export default {
    props: [
        "level", "content",
        "location", "selected",
        "color"
    ],
    components: [BasicNode],
    render() {
        let tagName
        if (this.level < 6) {
            tagName = "h" + this.level
        } else {
            tagName = "h5"
        }
        return h(BasicNode, {
            tagName: tagName,
            content: this.content,
            color: this.color,
            selected: this.selected,
            location: this.location
        })
    }
}
</script>
