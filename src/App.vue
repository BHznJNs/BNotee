<template>
    <tool-bar type="default"/>
    <note/>
    <textfield-group id="main-textfield-group"/>
</template>

<script>
import ToolBar from "./components/toolBar"
import Note from "./components/note"
import textfieldGroup from "./components/textfieldGroup"

export default {
    name: 'App',
    components: {
        Note, ToolBar,
        textfieldGroup
    },
    created() {
        // console.log(JSON.stringify(this.note))
        // setInterval(() => {
        //     console.log(this.note)
        // }, 2000)
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
            }
        }
    },
    provide() {
        return {
            note: this.note,
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