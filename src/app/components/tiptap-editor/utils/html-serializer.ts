// import { Editor } from '@tiptap/react'
// import { EditorOutput } from '../types'

// /**
//  * Lấy tất cả output từ editor
//  */
// export const getEditorOutput = (editor: Editor | null): EditorOutput => {
//   if (!editor) {
//     return {
//       html: '',
//       htmlWithTailwind: '',
//       json: {},
//       text: '',
//     }
//   }

//   return {
//     html: editor.getHTML(),
//     htmlWithTailwind: editor.getHTML(), // Đã có Tailwind classes từ custom extensions
//     json: editor.getJSON(),
//     text: editor.getText(),
//   }
// }

// /**
//  * Wrap HTML với container div
//  */
// export const wrapWithContainer = (html: string, containerClass?: string): string => {
//   const defaultClass = 'prose prose-lg max-w-none'
//   return `<div class="${containerClass || defaultClass}">${html}</div>`
// }

// /**
//  * Sanitize HTML (basic)
//  */
// export const sanitizeHtml = (html: string): string => {
//   return html
//     .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
//     .replace(/on\w+="[^"]*"/gi, '')
//     .replace(/javascript:/gi, '')
// }

// /**
//  * Convert HTML to clean Tailwind HTML template
//  */
// export const generateTailwindTemplate = (html: string, title?: string): string => {
//   return `<!DOCTYPE html>
// <html lang="vi">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>${title || 'Document'}</title>
//   <script src="https://cdn.tailwindcss.com"></script>
// </head>
// <body class="bg-white">
//   <article class="max-w-4xl mx-auto px-4 py-8">
//     ${html}
//   </article>
// </body>
// </html>`
// }






import { Editor } from '@tiptap/react'
import { EditorOutput } from '../types'

export const getEditorOutput = (editor: Editor | null): EditorOutput => {
  if (!editor) {
    return { html: '', htmlWithTailwind: '', json: {}, text: '', wordCount: 0, characterCount: 0 }
  }

  return {
    html: editor.getHTML(),
    htmlWithTailwind: editor.getHTML(),
    json: editor.getJSON(),
    text: editor.getText(),
    wordCount: editor.storage.characterCount?.words() ?? 0,
    characterCount: editor.storage.characterCount?.characters() ?? 0,
  }
}

export const wrapWithContainer = (html: string, containerClass?: string): string => {
  return `<div class="${containerClass || 'prose prose-lg max-w-none'}">${html}</div>`
}

export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')
}

export const generateTailwindTemplate = (html: string, title?: string): string => {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Document'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
  <article class="max-w-4xl mx-auto px-4 py-8">
    ${html}
  </article>
</body>
</html>`
}