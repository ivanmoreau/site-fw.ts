import Template from "../Template.tsx"
import useMarkdown, { type Metadata } from "../hooks/useMarkdown.ts"

interface MainProps {
  parsedFiles: { metadata: Metadata; body: string; path: string }[]
}

const Main = async ({ parsedFiles }: MainProps) => {
  const [metadata, body] = await useMarkdown("index.md")
  return (
    <Template
      title={metadata.title}
      emoji={metadata.emoji}
      photo={metadata.image}
    >
      <div
        class="prose prose-zinc prose-invert"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <br/>

      <div class="prose prose-zinc prose-invert">
        <h3>Posts</h3>
        <li>
          {parsedFiles.map((post) => {
            return <a href={"/blog/" + post.path}>{post.metadata.title}</a>
          })}
        </li>
      </div>
    </Template>
  )
}

export default Main
