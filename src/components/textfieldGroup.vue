<template>
    <div
        class="textfield-group"
        :class="{
            'disabled': !isAdding,
            'fixed': type == 'fixed',
            'mdui-shadow-3': type == 'fixed'
        }"
        tabindex="999">
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
        // 关闭文本框，并将值返回给父元素
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
    props: ["isAdding", "type"]
}
</script>
<style scoped>
    .textfield-group {
        display: flex;
        contain: content;
    }
    .textfield-group, .textfield-group * {
        outline: none;
    }
    .textfield-group *:hover,
    .textfield-group *:focus {
        border-color: #616161;
    }
    
    /* Fixed */
    .fixed {
        width: calc(100% - 6rem);
        height: 54px;
        transition: .6s
    }
    .fixed.disabled {
        height: 0;
    }
    .fixed * {
        margin-bottom: 0 !important;
    }
    /* Fixed End */

    /* Selector */
    .selector {
        color: #424242;
        font-size: 16px;
        line-height: 20px;
        padding: 6px 4px;
        margin-bottom: 1rem;
        border: 0;
        border-radius: 8px 0 0 0;
        border-bottom: solid 2px #bdbdbd;
        appearance: none;
        transition: .3s;
    }
    .disabled:not(.fixed) .selector {
        height: 0;
        padding: 0;
        margin: 0;
        border-width: 0;
    }
    /* Selector End */

    /* Textfield */
    .textfield {
        width: 100%;
        color: #424242;
        font-size: 16px;
        line-height: 20px;
        padding: 6px 4px;
        margin-bottom: 1rem;
        background-color: #F5F5F5;
        border-left: solid 2px #bdbdbd;
        border-bottom: solid 2px #bdbdbd;
        transition: .3s;
    }
    .disabled:not(.fixed) .textfield {
        height: 0;
        padding: 0;
        margin: 0;
        color: white;
        border-width: 0;
    }
    .fixed .textfield {
        overflow-y: auto;
    }
    /* Textfield End */

    /* Textfield Closer Button */
    .textfield-closer {
        margin-bottom: 1rem;
        padding: 0;
        line-height: inherit;
        border: none;
        border-bottom: solid 2px #bdbdbd;
        cursor: pointer;
        transition: .3s;
        user-select: none;
    }
    .disabled:not(.fixed) .textfield-closer {
        margin: 0;
        padding: 0;
        border-width: 0;
    }
    .textfield-closer i {
        display: block;
        width: 4rem;
        pointer-events: none;
    }
    .disabled .textfield-closer i {
        height: 0;
        opacity: 0;
    }
    /* Textfield Closer Button End */
</style>