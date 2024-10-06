import { buildSite, type Context, subroute, page, sub } from "static"
import Main from "./pages/Main.tsx"
import Template from "./Template.tsx"
import fs from "node:fs/promises"
import _ from "lodash/fp"
import useMarkdown from "./hooks/useMarkdown.ts"
import slug from "slug"
import Article from "./pages/Article.tsx"

const files = await fs.readdir("blog/")
const parsedFilesPromise = files.map((file) =>
  (async () => {
    const [metadata, body] = await useMarkdown("blog/" + file)
    const path = slug(metadata.title)
    return {
      metadata,
      body,
      path,
    }
  })()
)
const parsedFiles = await Promise.all(parsedFilesPromise)

const r = await _.reduce(
  (acc, file) =>
    (async () => {
      return {
        ...(await acc),
        [file.path]: page((ctx: Context) => (
          <Article
            metadata={file.metadata}
            markdownBody={file.body}
            path={[
              {
                title: "Home",
                url: "/",
              },
            ]}
          />
        )),
      }
    })(),
  Promise.resolve({}),
  parsedFiles
)

await buildSite({
  blog: sub(r),
  index: page((ctx: Context) => <Main parsedFiles={parsedFiles} />),
})
