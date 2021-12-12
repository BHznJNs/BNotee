<template>
    <tool-bar/>
    <note/>
    <textfield-group-fixed/>
    <colors/>
</template>

<script>
import ToolBar from "./components/toolBar"
import Note from "./components/note"
import TextfieldGroupFixed from "./components/textfieldGroupFixed"
import Colors from "./components/colors"

import defaultContent from "./assets/defaultContent"

export default {
    name: 'App',
    components: {
        Note, ToolBar, Colors,
        TextfieldGroupFixed
    },
    data() {
        return {
            note: defaultContent,
            selectedNode: {
                location: null,
                type: null
            }
        }
    },
    provide() {
        return {
            note: this.note,
            selectedNode: this.selectedNode
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