<template>
    <div class="textfield-group" :class="{'disabled': !isAdding}" tabindex="999">
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
        closeNodeAdder(e) {
            let el = e.target
            let selector = el.parentNode.children[0]
            let tagName = selector.value
            this.$emit("toParent", tagName)
        }
    },
    props: ["isAdding", "type"]
}
</script>
<style scoped>
    .textfield-group {
        display: flex;
    }
    .textfield-group, .textfield-group * {
        outline: none;
    }
    .textfield-group *:hover,
    .textfield-group *:focus {
        border-color: #616161;
    }
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
    .disabled .selector {
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
    .disabled .textfield {
        height: 0;
        padding: 0;
        margin: 0;
        color: white;
        border-width: 0;
    }

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
    .disabled .textfield-closer {
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
    /* Textfield End */
</style>