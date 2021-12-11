@module("marked") external marked: string => string = "marked"

type domPurify
@module("dompurify") external createDompurify: Dom.window => domPurify = "default"
@send external sanitize: (domPurify, string) => string = "sanitize"

let dompurify = createDompurify(Webapi.Dom.window)

let toHTML = (markdown: string): string => {
  dompurify->sanitize(marked(markdown))
}
