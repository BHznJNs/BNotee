<template>
    <div
        class="textfield-group fixed mdui-shadow-3"
        :class="{'disabled': !isInputting}"
        tabindex="999"
    >
        <select class="selector">
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="floor">层次</option>
        </select>
        <div class="textfield" contenteditable="true"></div>
        <button
            class="textfield-closer"
            @click="closeNodeAdder($event)"
        >
            <i class="material-icons">close</i>
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        // 关闭文本框，并将值返回给父节点
        closeNodeAdder(e) {
            let el = e.target
            let selector = el.parentNode.children[0]
            let textfield = el.parentNode.children[1]
            // 获取返回值
            let tagName = selector.value
            let content = textfield.innerText
            if (tagName == "floor") {
                content = {level: null, contents: []}
            }

            this.$emit("toParent", [tagName, content])

            textfield.blur()
            textfield.innerText = ""
        }
    },
    props: ["isInputting"]
}
</script>
