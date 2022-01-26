<script>
export default {
    methods: {
        returnObj(tagName, content) {
            //  '/' 为取消符
            if (content == "/") {
                return null
            }

            // 定义初始对象
            let obj = {
                NT: tagName,
                SL: false
            }
            switch (tagName) {
                case "h":
                case "p":
                case "li":
                    obj.CT = content
                    obj.CL = null
                    break
                case "hr":
                    break
                case "floor":
                    obj.CTS = []
                    if (content) {
                        obj.CTS.push({
                            NT: "h",
                            CT: content,
                            CL: null,
                            SL: false
                        })
                    }
                    break
                case "ol":
                    obj.NT = "list"
                    obj.CTS = []
                    obj.OL = true
                    break
                case "ul":
                    obj.NT = "list"
                    obj.CTS = []
                    obj.OL = false
                    break
                case "table":
                    obj.CO = 4
                    obj.CTS = [{
                        CTS: [{NT: "td",CT: "",SL: false,CL: null},{NT: "td",CT: "",SL: false,CL: null},{NT: "td",CT: "",SL: false,CL: null},{NT: "td",CT: "",SL: false,CL: null}]
                    }]
                break
            }

            return obj
        }
    }
}
</script>