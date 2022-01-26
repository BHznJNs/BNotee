<template>
    <div
        class="dark-filter"
        :class="{ 'darken': isDarkMode }"
    ></div>
    <tool-bar :isTouchMode="isTouchMode"/>
    <control-balls
        :isDarkMode="isDarkMode"
        :isTouchMode="isTouchMode"
        :isFullscreen="isFullscreen"
        @toggleDarkMode="toggleDarkMode"
        @toggleTouchMode="toggleTouchMode"
        @toggleFullscreen="toggleFullscreen"
    />
    <note
        :isFullscreen="isFullscreen"
        :isTouchMode="isTouchMode"
    />
    <textfield-group-fixed/>
    <colors/>
    <table-setter/>
</template>

<script>
import ToolBar from "./components/toolBar"
import ControlBalls from "./components/controlBalls"
import Note from "./components/note"
import TextfieldGroupFixed from "./components/textfieldGroupFixed"
import Colors from "./components/colors"
import TableSetter from "./components/tableSetter"
import defaultContent from "./assets/defaultContent"


export default {
    name: 'App',
    components: {
        Note, ControlBalls,
        ToolBar, TableSetter,
        Colors, TextfieldGroupFixed
    },
    data() {
        return {
            note: defaultContent,
            selectedNode: {
                location: null,
                type: null,
                tagName: null
            },
            isDarkMode: false,
            isTouchMode: false,
            isFullscreen: false
        }
    },
    provide() {
        return {
            note: this.note,
            selectedNode: this.selectedNode
        }
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode
        },
        toggleTouchMode() {
            this.isTouchMode = !this.isTouchMode
        },
        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen
        }
    }
}
</script>

<style>
    #app {
        background-color: #F5F5F5;
    }

    .dark-filter {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; 
        z-index: 9999;
        mix-blend-mode: difference;
        background-color: #e0e0e000;
        pointer-events: none;
        transition: background-color 1.2s;
    }
    .dark-filter.darken {
        background-color: #e0e0e0;
    }
</style>