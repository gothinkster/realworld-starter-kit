@val external window: Dom.window = "window"

@module("marked") external marked: string => string = "default"

type domPurify
@module("dompurify") external createDompurify: Dom.window => domPurify = "default"
@send external sanitize: (domPurify, string) => string = "sanitize"

let dompurify = createDompurify(window)

let toHTML = (markdown: string): string => {
  dompurify->sanitize(marked(markdown))
}
