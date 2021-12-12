<template>
    <div
        class="textfield-group"
        :class="{ 'disabled': !isAdding }"
    >
        <select class="selector">
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="floor">层次</option>
        </select>
        <div class="textfield" contenteditable="true"></div>
        <div
            class="textfield-closer closer"
            @click="closeNodeAdder($event)"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
</template>

<script>
export default {
    props: ["isAdding"],
    methods: {
        // 方法：关闭文本框，并将值返回给父节点
        closeNodeAdder(e) {
            let el = e.target
            let selector = el.parentNode.children[0]
            let textfield = el.parentNode.children[1]

            let tagName = selector.value
            let content = textfield.innerText
            // 定义返回对象
            let returnObj = {
                NT: tagName,
                SL: false
            }
            if (["floor"].includes(tagName)) {
                returnObj.CTS = []
            } else if (!content) {
                returnObj = null
            } else {
                returnObj.CL = null
                returnObj.CT = content
            }

            // this.$emit("toParent", [tagName, content])
            this.$emit("toParent", returnObj)

            textfield.blur()
            textfield.innerText = ""
        }
    }
}
</script>
