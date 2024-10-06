// From https://dev.to/codingnninja/how-to-extract-title-description-or-metadata-from-markdown-3nn8,
// I was feeling lazy and didn't wanted to write a parser myself, so this should do the trick... until it doesn't
const extractMetadataFromMarkdown = (
  markdown: string
): Record<string, string> => {
  const charactersBetweenGroupedHyphens = /^<!---([\s\S]*?)--->/
  const metadataMatched = markdown.match(charactersBetweenGroupedHyphens)
  // @ts-ignore
  const metadata = metadataMatched[1]

  if (!metadata) {
    return {}
  }

  const metadataLines = metadata.split("\n")
  const metadataObject = metadataLines.reduce(
    (accumulator, line): Record<string, string> => {
      const [key, ...value] = line.split(":").map((part) => part.trim())

      if (key) {
        // @ts-ignore
        accumulator[key] = value[1] ? value.join(":") : value.join("")
      }
      return accumulator
    },
    {}
  )

  return metadataObject
}

export default extractMetadataFromMarkdown
