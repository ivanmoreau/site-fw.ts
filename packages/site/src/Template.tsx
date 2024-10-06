import type { ComponentChildren } from "preact"

const imgURL =
  "https://ivmoreau.com/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F93f7a901-7981-44a6-b871-c0acfdb5dcdc%2Fff7f0177-9a11-4940-ba4e-745313a4635c%2Fd7w6ilk-034dfa8d-3e74-4889-83cd-715b8eea8a3c.jpeg?table=block&id=0df96f8d-216a-4a32-bca2-87855e27ebcb&spaceId=93f7a901-7981-44a6-b871-c0acfdb5dcdc&width=1100&userId=&cache=v2"

interface TemplateProps {
  children: ComponentChildren

  title: string
  emoji?: string
  photo?: string

  pagePath?: PagePath
}

export interface NavbarButtonProps {
  title: string
  emoji?: string
  url?: string
}

type PagePath = NavbarButtonProps[]

const NavbarButtonProps = ({ title, emoji, url }: NavbarButtonProps) => {
  const emojiEl = emoji ? <span className="text-lg">{emoji}</span> : null
  return url !== undefined ? (
    <a
      className="hover:bg-zinc-800 active:bg-zinc-800/75 px-1.5 rounded-md flex items-center gap-x-1.5"
      href={url}
    >
      {emojiEl} {title}
    </a>
  ) : (
    <div className="hover:bg-zinc-800 active:bg-zinc-800/75 px-1.5 rounded-md flex items-center gap-x-1.5">
      {emojiEl} {title}
    </div>
  )
}

interface NavbarProps extends NavbarButtonProps {
  path?: PagePath
}

const Navbar = ({ title, emoji, url, path }: NavbarProps) => {
  const newPath = path
    ? [...path, { title, emoji, url }]
    : [{ title, emoji, url }]
  return (
    <>
      {newPath
        .map(({ title, emoji, url }) => (
          <NavbarButtonProps title={title} emoji={emoji} url={url} />
        ))
        .flatMap((e) => [<span class="text-zinc-600">/</span>, e])
        .slice(1)}
    </>
  )
}

const Template = ({
  title,
  emoji,
  photo,
  children,
  pagePath,
}: TemplateProps) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/main.css" rel="stylesheet" />
      </head>
      <body class="bg-zinc-900 text-zinc-300 h-screen overflow-y-hidden">
        <header class="text-sm">
          <div className="relative top-0">
            <div className="flex flex-row h-11 items-center px-4">
              <Navbar title={title} emoji={emoji} url={""} path={pagePath} />
            </div>
          </div>
        </header>
        <main class="h-screen overflow-y-auto">
          <div className="grid md:grid-cols-[1fr_720px_1fr] grid-cols-[1em_1fr_1em]">
            {photo ? (
              <div className="h-[30vh] col-span-3 row-start-1">
                <img
                  src={imgURL}
                  class="object-center h-[30vh] w-[100%] object-cover"
                  alt="Page main photo"
                />
              </div>
            ) : (
              <div className="h-[10vh] col-span-3 row-start-1" />
            )}
            <div className="flex flex-col col-start-2 row-start-2 text-[2.4em] font-bold bg-zinc-900">
              {emoji ? (
                <div className="relative mt-[-0.75em] text-[2em] h-[1.25em]">
                  {emoji}
                </div>
              ) : null}
              <h1>{title}</h1>
            </div>
            <div className="col-start-2 row-start-3 hyphens-auto mt-6 pb-96 min-w-0">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
export default Template
