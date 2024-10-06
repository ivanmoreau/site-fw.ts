import Template, { type NavbarButtonProps } from "../Template.tsx"
import { marked } from "marked"
import type { Metadata } from "../hooks/useMarkdown.ts"
import * as path from "node:path"

interface ArticleProps {
  metadata: Metadata
  markdownBody: string
  path: Array<NavbarButtonProps>
}

const Article = ({ metadata, markdownBody, path }: ArticleProps) => {
  return (
    <Template
      title={metadata.title}
      emoji={metadata.emoji}
      photo={metadata.image}
      pagePath={path}
    >
      <div
        class="prose prose-zinc prose-invert"
        dangerouslySetInnerHTML={{ __html: markdownBody }}
      />
    </Template>
  )
}

export default Article
