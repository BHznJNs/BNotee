<script>
import { h } from "vue"

export default {
    data() {
        return {
            tagName_: "",
            initialContent: "",
            editing: false,
            selected: false
        }
    },
    inject: ["note"],
    props: ["tagName", "content", "level", "location"],
    created() {
        // console.log(this.location)
        // 若输入标签名为 ‘h’，则与输入 level 组为标签名
        if (this.tagName == "h") {
            if (this.level <= 6) {
                this.tagName_ = "h" + this.level
            } else {
                this.tagName_ = "h6"
            }
        } else {
            this.tagName_ = this.tagName
        }
    },
    methods: { //              default 0
        changeContent(resultContent, num, targetElement) {
            if (num == this.location.length - 1) {
                targetElement.contents[this.location[num]][1] = resultContent
            }
            else {
                let num_ = num + 1
                this.changeContent(resultContent, num_, targetElement.contents[this.location[num]][1])
            }
            // console.log(this.note)
        }
    },
    render() {
        return h(this.tagName_, {
            contentEditable: true,
            // onTouchstart: () => {
            //     console.log("touch")
            // }
            // onClick: () => {
            //     console.log(this.tagName_)
            // },
            class: {
                "selected": this.selected,
                "editing": this.editing
            },
            onContextmenu: (e) => {
                e.preventDefault()
                this.selected = true
            },
            onClick: (e) => {
                // 储存修改前元素内容
                this.initialContent = e.target.innerText
                this.editing = true
            },
            onBlur: (e) => {
                let resultContent = e.target.innerText
                // 若元素中文本发生改变
                if (resultContent != this.initialContent) {
                    this.changeContent(resultContent, 0, this.note)
                }
                this.editing = false
                this.selected = false
            }
        }, this.content)
    }
}
</script>