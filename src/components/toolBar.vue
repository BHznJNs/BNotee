<template>
    <div id="toolbar" class="mdui-shadow-3">
        <img id="logo" class="mdui-shadow-2" src="../assets/note.svg" draggable="false">
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    #toolbar {
        width: 4rem;
        height: 100vh;
        background-color: white;
        overflow-x: hidden;
    }

    #logo {
        width: calc(100% - .8rem);
        padding: .4rem;
        background-color: #333;
    }
</style>
