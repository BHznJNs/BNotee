<template>
    <tool-bar
        ref="toolBar"
        @toParent="fromToolBar"
    />
    <note
        :isInputting="isTextfieldInputting"
    />
    <textfield-group-fixed
        :isInputting="isTextfieldInputting"
        @toParent="closeTextfieldGroup"
    />
</template>

<script>
import ToolBar from "./components/toolBar"
import Note from "./components/note"
import TextfieldGroupFixed from "./components/textfieldGroupFixed"
import defaultContent from "./assets/defaultContent"

export default {
    name: 'App',
    components: {
        Note, ToolBar,
        TextfieldGroupFixed
    },
    data() {
        return {
            note: defaultContent,
            command: "",
            selectedEl: [],
            isTextfieldInputting: false
        }
    },
    provide() {
        return {
            note: this.note,
            selectedEl: this.selectedEl,
        }
    },
    methods: {
        fromToolBar(value) {
            this.command = value
            this.isTextfieldInputting = true
        },
        closeTextfieldGroup(value) {
            switch (this.command) {
                case "insert-node":
                    this.isTextfieldInputting = false
                    this.$refs.toolBar.insertNode(value)
                    break
            }
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