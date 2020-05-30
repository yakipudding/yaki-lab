import Marked from 'marked'

const Toc = (tokens: Marked.TokensList, downLevel?: number) => {
  let htmlText = ""
  let level = 0
  tokens.forEach((token) => {
    if(token.type === "heading"){
      // ul
      if(level < token.depth){
        htmlText = htmlText + "\n<ul>"
      }
      else if(token.depth < level){
        const closeCount = level - token.depth
        htmlText = htmlText + "\n</ul>".repeat(closeCount)
      }
      // li
      htmlText = htmlText + Li(token.depth, token.text, downLevel ?? 1)
      level = token.depth
    }
  })
  // 段落下げ
  const closeCount = level + 1
  htmlText = htmlText + "\n</ul>".repeat(closeCount)
  
  return htmlText
}

const Li = (level: number, text: string, downLevel: number) => {
  return `
    <li>
      <a href=#h${level + downLevel}_${text}>${text}</a>
    </li>`
}

export default Toc;