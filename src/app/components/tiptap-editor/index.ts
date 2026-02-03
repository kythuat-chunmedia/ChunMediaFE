// // Main Component
// export { TiptapEditor, type TiptapEditorRef } from './TiptapEditor'
// export { Toolbar } from './Toolbar'


// // Hooks
// export { useTiptapEditor } from './hooks/useTiptapEditor'

// // Types
// export type {
//   TiptapEditorProps,
//   ToolbarProps,
//   EditorOutput,
//   HeadingLevel,
//   ToolbarButtonProps,
// } from './types'

// // Utils
// export {
//   getEditorOutput,
//   wrapWithContainer,
//   sanitizeHtml,
//   generateTailwindTemplate,
// } from './utils/html-serializer'

// // Extensions (nếu cần customize thêm)
// export {
//   getCustomExtensions,
//   tailwindClasses,
//   CustomHeading,
//   CustomParagraph,
//   CustomBulletList,
//   CustomOrderedList,
//   CustomBlockquote,
//   CustomCodeBlock,
//   CustomImage,
//   CustomLink,
// } from './extensions'







// Main Component
export { TiptapEditor } from './TiptapEditor'
export type { TiptapEditorRef } from './TiptapEditor'

// Toolbar
export { Toolbar } from './Toolbar'

// Hooks
export { useTiptapEditor } from './hooks/useTiptapEditor'

// Types
export type {
  TiptapEditorProps,
  ToolbarProps,
  EditorOutput,
  HeadingLevel,
  ToolbarButtonProps,
} from './types'

// Utils
export {
  getEditorOutput,
  wrapWithContainer,
  sanitizeHtml,
  generateTailwindTemplate,
} from './utils/html-serializer'

// Extensions
export {
  getCustomExtensions,
  tailwindClasses,
  FontSize,
} from './extensions'