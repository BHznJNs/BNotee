/*
    NT --> Node Type
    CT --> content
    CTS --> contents
    CL --> color
    LV --> level
    SL --> selected
    OL --> isOrdered
    CO --> column
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
            NT: "hr",
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
        },
        {
            NT: "list",
            OL: true,
            SL: false,
            CTS: [
                {
                    NT: "li",
                    CT: "这是一个列表项",
                    CL: null,
                    SL: false
                }
            ]
        },

        {
            NT: "table",
            SL: false,
            CTS: [
                {
                    CTS: [
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        },
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        },
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        },
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        }
                    ]
                },
                {
                    CTS: [
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        },
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        },
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        },
                        {
                            CT: "表格项",
                            SL: false,
                            CL: null
                        }
                    ]
                }
            ]
        }

    ]
}