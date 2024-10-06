import { Marked, marked } from "marked"
import extractMetadataFromMarkdown from "../utils/extractMetadataFromMarkdown.ts"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"
import fs from "node:fs/promises"

export interface Metadata {
  title: string
  emoji: string
  image: string
}

let metadata = undefined as unknown as Metadata
const renderer = new marked.Renderer()
renderer.heading = ({ text, depth }) => {
  console.log(text, depth)
  return `<h${depth + 1}>${text}</h${depth + 1}>`
}

const hooks = {
  preprocess(markdown: string) {
    const attributes = extractMetadataFromMarkdown(markdown)
    metadata = attributes as unknown as Metadata

    return markdown
  },
}

const m = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  })
)

m.use({ hooks })

const useMarkdown = async (file: string): Promise<[Metadata, string]> => {
  const raw = await fs.readFile(file, "utf-8")
  const body = await m.parse(raw, { async: true, renderer })
  return [metadata, body]
}

export default useMarkdown
