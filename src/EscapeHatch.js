import marked from 'marked';
import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

export function markdownToHtml(markdown) {
  return DOMPurify.sanitize(marked(markdown));
}
