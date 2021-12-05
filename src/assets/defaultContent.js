/* 
    NT --> Node Type
    CT --> content
    CTS --> contents
    CL --> color
    LV --> level
    SL --> selected
*/
export default {
    CTS: [
    
        {
            NT: "h",
            CT: "这是一个大标题",
            CL: null,
            SL: false
        },
        {
            NT: "p",
            CT: "这是一个段落",
            CL: null,
            SL: false
        },
        {
            NT: "floor",
            SL: false,
            CTS: [
                {
                    NT: "h",
                    CT: "这是层次中的大标题",
                    CL: null,
                    SL: false
                },
                {
                    NT: "p",
                    CT: "这是一个段落",
                    CL: null,
                    SL: false
                },
                {
                    NT: "floor",
                    SL: false,
                    CTS: [
                        {
                            NT: "h",
                            CT: "这是层次中的大标题",
                            CL: null,
                            SL: false
                        },
                        {
                            NT: "p",
                            CT: "这是一个段落",
                            CL: null,
                            SL: false
                        }
                    ]
                }
            ]
        }

    ]
}