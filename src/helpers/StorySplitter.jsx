export default function storySplitter(storyText) {
    const result = {
        title: null,
        content: null
    }

    const text = storyText
    const rgx = /\*\*(.*?)\*\*/

    const matches = text.match(rgx)
    if (matches) {
        result.title = matches[1]
    }

    result.content = text.slice(matches[0].length)

    return result
}