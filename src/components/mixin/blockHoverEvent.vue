<script>
export default {
    data() {
        return {
            hover: false,
            setTimeout: null,
        }
    },
    methods: {
        // 鼠标进入 悬停
        onMouseEnter() {
            // 鼠标悬停 .4s 后
            this.setTimeout = setTimeout(() => {
                this.hover = true
            }, 400)
            // 如果是节点子元素
            if (this.location.length > 1) {
                // 让父亲节点退出 hover 状态
                this.$emit("mouse-in-child")
            }
        },
        // 鼠标离开
        onMouseLeave() {
            // 重置鼠标悬停时间
            clearTimeout(this.setTimeout)
            if (!this.selected) {
                this.hover = false
            }
        }
    }
}
</script>