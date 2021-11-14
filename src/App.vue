<template>
    <tool-bar/>
    <note/>
</template>

<script>
import ToolBar from "./components/toolBar"
import Note from "./components/note"

export default {
    name: 'App',
    components: {
        Note, ToolBar
    },
    data() {
        return {
            note: {
                level: 0,
                contents: [
                    ["h", "这是一个大标题"],
                    ["p", "这是一个段落"],
                    ["floor", {
                        level: 1,
                        contents: [
                            ["h", "这是层次中的大标题"],
                            ["p", "这是一个段落"],
                            ["floor", {
                                level: 2,
                                contents: [
                                    ["h", "这是层次中的大标题"],
                                    ["p", "这是一个段落"]
                                ]
                            }]
                        ]
                    }]
                ]
            },
            selectedEl: [],
            isNodeInserting: [false]
        }
    },
    provide() {
        return {
            note: this.note,
            selectedEl: this.selectedEl,
            isNodeInserting: this.isNodeInserting
        }
    }
}
</script>

<style>
    #app {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FAFAFA;
    }
    
    #main-textfield-group {
        position: fixed;
        right: 0;
        bottom: 0;
    }
</style>