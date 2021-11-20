export default {
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