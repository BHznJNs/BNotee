/**
 * @param {string} text 
 * @param {string} direction "start" | "end"
 */
function insertText(text, direction="end") {
    const range = window.getSelection()
    const position = range.getRangeAt(0)
    const textNode = document.createTextNode(text)
    position.insertNode(textNode)

    if (direction == "start") {
        range.collapseToStart()
    } else if (direction == "end") {
        range.collapseToEnd()
    } else {
        console.warn("Unknown direction type!")
    }
}

function tabInput(e) {
    e.preventDefault()
    insertText("    ")
}

const bracketsDist = {
    ")": "(", "]": "[",
    "}": "{", ">": "<",
}
/**
 * @description input types of pair of signals
 * @param {string} type ")" | "]" | "}"
 * @param {boolean} autoEnter
 */
function pairInput(type, autoEnter) {
    setTimeout(() => {
        if (autoEnter) {
            insertText(`${bracketsDist[type]}
    `)
            insertText(`
${type}`, "start")
        } else {
            insertText(type, "start")
        }
    }, 150)
}

function codeInput(e) {
    console.log(e.keyCode)
    switch (e.keyCode) {
        case 9: 
            tabInput(e)
            break
        case 57:
            if (e.shiftKey) {
                pairInput(")", e.altKey)
            }
            break
        case 219:
            if (e.shiftKey) {
                pairInput("}", e.altKey)
            } else {
                pairInput("]", e.altKey)
            }
            break
        case 188:
            if (e.shiftKey) {
                pairInput(">")
            }
            break
        case 222:
            if (e.shiftKey) {
                pairInput(`"`)
            } else {
                pairInput(`'`)
            }
            break
        case 192:
            pairInput("`", e.altKey)
            break
    }
}
export default codeInput