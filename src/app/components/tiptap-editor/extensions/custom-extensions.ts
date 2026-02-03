// import { mergeAttributes } from '@tiptap/core'
// import Heading from '@tiptap/extension-heading'
// import Paragraph from '@tiptap/extension-paragraph'
// import BulletList from '@tiptap/extension-bullet-list'
// import OrderedList from '@tiptap/extension-ordered-list'
// import ListItem from '@tiptap/extension-list-item'
// import Blockquote from '@tiptap/extension-blockquote'
// import CodeBlock from '@tiptap/extension-code-block'
// import Image from '@tiptap/extension-image'
// import Link from '@tiptap/extension-link'
// import TextAlign from '@tiptap/extension-text-align'
// import Underline from '@tiptap/extension-underline'
// import Placeholder from '@tiptap/extension-placeholder'
// import Highlight from '@tiptap/extension-highlight'
// import TextStyle from '@tiptap/extension-text-style'
// import Color from '@tiptap/extension-color'
// import Table from '@tiptap/extension-table'
// import TableRow from '@tiptap/extension-table-row'
// import TableCell from '@tiptap/extension-table-cell'
// import TableHeader from '@tiptap/extension-table-header'

// // Tailwind classes mapping
// const tailwindClasses = {
//   heading: {
//     1: 'text-4xl font-bold text-gray-900 mb-4 mt-6',
//     2: 'text-3xl font-semibold text-gray-800 mb-3 mt-5',
//     3: 'text-2xl font-medium text-gray-700 mb-2 mt-4',
//     4: 'text-xl font-medium text-gray-700 mb-2 mt-3',
//     5: 'text-lg font-medium text-gray-600 mb-1 mt-2',
//     6: 'text-base font-medium text-gray-600 mb-1 mt-2',
//   },
//   paragraph: 'text-base text-gray-700 leading-relaxed mb-4',
//   bulletList: 'list-disc list-inside space-y-2 mb-4 ml-4',
//   orderedList: 'list-decimal list-inside space-y-2 mb-4 ml-4',
//   listItem: 'text-gray-700',
//   blockquote: 'border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-gray-50 py-2',
//   codeBlock: 'bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto my-4',
//   image: 'max-w-full h-auto rounded-lg shadow-md my-4',
//   link: 'text-blue-600 hover:text-blue-800 underline',
//   table: 'w-full border-collapse border border-gray-300 my-4',
//   tableCell: 'border border-gray-300 px-4 py-2',
//   tableHeader: 'border border-gray-300 px-4 py-2 bg-gray-100 font-semibold',
// }

// // Custom Heading với Tailwind classes
// export const CustomHeading = Heading.extend({
//   renderHTML({ node, HTMLAttributes }) {
//     const level = node.attrs.level as keyof typeof tailwindClasses.heading
//     return [
//       `h${level}`,
//       mergeAttributes(HTMLAttributes, {
//         class: tailwindClasses.heading[level],
//       }),
//       0,
//     ]
//   },
// })

// // Custom Paragraph
// export const CustomParagraph = Paragraph.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['p', mergeAttributes(HTMLAttributes, { class: tailwindClasses.paragraph }), 0]
//   },
// })

// // Custom Bullet List
// export const CustomBulletList = BulletList.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['ul', mergeAttributes(HTMLAttributes, { class: tailwindClasses.bulletList }), 0]
//   },
// })

// // Custom Ordered List
// export const CustomOrderedList = OrderedList.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['ol', mergeAttributes(HTMLAttributes, { class: tailwindClasses.orderedList }), 0]
//   },
// })

// // Custom List Item
// export const CustomListItem = ListItem.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['li', mergeAttributes(HTMLAttributes, { class: tailwindClasses.listItem }), 0]
//   },
// })

// // Custom Blockquote
// export const CustomBlockquote = Blockquote.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['blockquote', mergeAttributes(HTMLAttributes, { class: tailwindClasses.blockquote }), 0]
//   },
// })

// // Custom Code Block
// export const CustomCodeBlock = CodeBlock.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['pre', mergeAttributes(HTMLAttributes, { class: tailwindClasses.codeBlock }), ['code', {}, 0]]
//   },
// })

// // Custom Image
// export const CustomImage = Image.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['img', mergeAttributes(HTMLAttributes, { class: tailwindClasses.image })]
//   },
// })

// // Custom Link
// export const CustomLink = Link.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['a', mergeAttributes(HTMLAttributes, { class: tailwindClasses.link }), 0]
//   },
// })

// // Custom Table
// export const CustomTable = Table.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['table', mergeAttributes(HTMLAttributes, { class: tailwindClasses.table }), 0]
//   },
// })

// // Custom Table Cell
// export const CustomTableCell = TableCell.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['td', mergeAttributes(HTMLAttributes, { class: tailwindClasses.tableCell }), 0]
//   },
// })

// // Custom Table Header
// export const CustomTableHeader = TableHeader.extend({
//   renderHTML({ HTMLAttributes }) {
//     return ['th', mergeAttributes(HTMLAttributes, { class: tailwindClasses.tableHeader }), 0]
//   },
// })

// // Export tất cả extensions đã config
// export const getCustomExtensions = (placeholder?: string) => [
//   CustomHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
//   CustomParagraph,
//   CustomBulletList,
//   CustomOrderedList,
//   CustomListItem,
//   CustomBlockquote,
//   CustomCodeBlock,
//   CustomImage,
//   CustomLink.configure({
//     openOnClick: false,
//     HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
//   }),
//   CustomTable.configure({ resizable: true }),
//   TableRow,
//   CustomTableCell,
//   CustomTableHeader,
//   TextAlign.configure({ types: ['heading', 'paragraph'] }),
//   Underline,
//   Highlight.configure({ multicolor: true }),
//   TextStyle,
//   Color,
//   Placeholder.configure({
//     placeholder: placeholder || 'Nhập nội dung...',
//     emptyEditorClass: 'is-editor-empty',
//   }),
// ]

// export { tailwindClasses }









// import { mergeAttributes, Extension } from '@tiptap/core'
// import Heading from '@tiptap/extension-heading'
// import Paragraph from '@tiptap/extension-paragraph'
// import BulletList from '@tiptap/extension-bullet-list'
// import OrderedList from '@tiptap/extension-ordered-list'
// import ListItem from '@tiptap/extension-list-item'
// import Blockquote from '@tiptap/extension-blockquote'
// import CodeBlock from '@tiptap/extension-code-block'
// import Image from '@tiptap/extension-image'
// import { Link } from '@tiptap/extension-link'
// import { TextAlign } from '@tiptap/extension-text-align'
// import { Underline } from '@tiptap/extension-underline'
// import { Placeholder } from '@tiptap/extension-placeholder'
// import { Highlight } from '@tiptap/extension-highlight'
// import { TextStyle } from '@tiptap/extension-text-style'
// import { Color } from '@tiptap/extension-color'
// import { Table } from '@tiptap/extension-table'
// import { TableRow } from '@tiptap/extension-table-row'
// import { TableCell } from '@tiptap/extension-table-cell'
// import { TableHeader } from '@tiptap/extension-table-header'
// import { Subscript } from '@tiptap/extension-subscript'
// import { Superscript } from '@tiptap/extension-superscript'
// import { TaskList } from '@tiptap/extension-task-list'
// import { TaskItem } from '@tiptap/extension-task-item'
// import { Youtube } from '@tiptap/extension-youtube'
// import { CharacterCount } from '@tiptap/extension-character-count'
// import { FontFamily } from '@tiptap/extension-font-family'
// import { HorizontalRule } from '@tiptap/extension-horizontal-rule'

// // ============================================================
// // Tailwind classes mapping
// // ============================================================
// export const tailwindClasses = {
//   heading: {
//     1: 'text-4xl font-bold text-gray-900 mb-4 mt-6',
//     2: 'text-3xl font-semibold text-gray-800 mb-3 mt-5',
//     3: 'text-2xl font-medium text-gray-700 mb-2 mt-4',
//     4: 'text-xl font-medium text-gray-700 mb-2 mt-3',
//     5: 'text-lg font-medium text-gray-600 mb-1 mt-2',
//     6: 'text-base font-medium text-gray-600 mb-1 mt-2',
//   } as Record<number, string>,
//   paragraph: 'text-base text-gray-700 leading-relaxed mb-4',
//   bulletList: 'list-disc list-inside space-y-2 mb-4 ml-4',
//   orderedList: 'list-decimal list-inside space-y-2 mb-4 ml-4',
//   listItem: 'text-gray-700',
//   blockquote:
//     'border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-gray-50 py-2',
//   codeBlock:
//     'bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto my-4',
//   image: 'max-w-full h-auto rounded-lg shadow-md my-4',
//   link: 'text-blue-600 hover:text-blue-800 underline',
//   table: 'w-full border-collapse border border-gray-300 my-4',
//   tableCell: 'border border-gray-300 px-4 py-2',
//   tableHeader: 'border border-gray-300 px-4 py-2 bg-gray-100 font-semibold',
//   taskList: 'list-none space-y-2 mb-4',
//   taskItem: 'flex items-start gap-2',
//   horizontalRule: 'border-none border-t-2 border-gray-300 my-6',
// }

// // ============================================================
// // Font Size Extension (custom)
// // ============================================================
// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     fontSize: {
//       setFontSize: (size: string) => ReturnType
//       unsetFontSize: () => ReturnType
//     }
//   }
// }

// export const FontSize = Extension.create({
//   name: 'fontSize',

//   addOptions() {
//     return { types: ['textStyle'] }
//   },

//   addGlobalAttributes() {
//     return [
//       {
//         types: this.options.types,
//         attributes: {
//           fontSize: {
//             default: null,
//             parseHTML: (element: HTMLElement) => element.style.fontSize?.replace('px', ''),
//             renderHTML: (attributes: Record<string, string | null>) => {
//               if (!attributes.fontSize) return {}
//               return { style: `font-size: ${attributes.fontSize}px` }
//             },
//           },
//         },
//       },
//     ]
//   },

//   addCommands() {
//     return {
//       setFontSize:
//         (size: string) =>
//         ({ chain }) =>
//           chain().setMark('textStyle', { fontSize: size }).run(),
//       unsetFontSize:
//         () =>
//         ({ chain }) =>
//           chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
//     }
//   },
// })

// // ============================================================
// // Custom Extensions với Tailwind classes
// // ============================================================

// export const CustomHeading = Heading.extend({
//   renderHTML({ node, HTMLAttributes }) {
//     const level = node.attrs.level as number
//     return [
//       `h${level}`,
//       mergeAttributes(HTMLAttributes, {
//         class: tailwindClasses.heading[level] || '',
//       }),
//       0,
//     ]
//   },
// })

// export const CustomParagraph = Paragraph.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'p',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.paragraph }),
//       0,
//     ]
//   },
// })

// export const CustomBulletList = BulletList.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'ul',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.bulletList }),
//       0,
//     ]
//   },
// })

// export const CustomOrderedList = OrderedList.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'ol',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.orderedList }),
//       0,
//     ]
//   },
// })

// export const CustomListItem = ListItem.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'li',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.listItem }),
//       0,
//     ]
//   },
// })

// export const CustomBlockquote = Blockquote.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'blockquote',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.blockquote }),
//       0,
//     ]
//   },
// })

// export const CustomCodeBlock = CodeBlock.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'pre',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.codeBlock }),
//       ['code', {}, 0],
//     ]
//   },
// })

// export const CustomImage = Image.extend({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       width: { default: null, renderHTML: (attrs: Record<string, string | null>) => (attrs.width ? { width: attrs.width } : {}) },
//       height: { default: null, renderHTML: (attrs: Record<string, string | null>) => (attrs.height ? { height: attrs.height } : {}) },
//       loading: { default: 'lazy' },
//     }
//   },
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'img',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.image }),
//     ]
//   },
// })

// export const CustomLink = Link.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'a',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.link }),
//       0,
//     ]
//   },
// })

// export const CustomTable = Table.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'table',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.table }),
//       ['tbody', 0],
//     ]
//   },
// })

// export const CustomTableCell = TableCell.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'td',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.tableCell }),
//       0,
//     ]
//   },
// })

// export const CustomTableHeader = TableHeader.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'th',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.tableHeader }),
//       0,
//     ]
//   },
// })

// export const CustomHorizontalRule = HorizontalRule.extend({
//   renderHTML({ HTMLAttributes }) {
//     return [
//       'hr',
//       mergeAttributes(HTMLAttributes, { class: tailwindClasses.horizontalRule }),
//     ]
//   },
// })

// // ============================================================
// // Export configured extensions
// // ============================================================
// export const getCustomExtensions = (
//   placeholder?: string,
//   maxCharacters?: number
// ) => [
//   CustomHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
//   CustomParagraph,
//   CustomBulletList,
//   CustomOrderedList,
//   CustomListItem,
//   CustomBlockquote,
//   CustomCodeBlock,
//   CustomImage.configure({ allowBase64: true, inline: false }),
//   CustomLink.configure({
//     openOnClick: false,
//     HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
//   }),
//   CustomTable.configure({ resizable: true }),
//   TableRow,
//   CustomTableCell,
//   CustomTableHeader,
//   CustomHorizontalRule,
//   TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
//   Underline,
//   Highlight.configure({ multicolor: true }),
//   TextStyle,
//   Color,
//   FontSize,
//   FontFamily,
//   Subscript,
//   Superscript,
//   TaskList.configure({ HTMLAttributes: { class: tailwindClasses.taskList } }),
//   TaskItem.configure({
//     nested: true,
//     HTMLAttributes: { class: tailwindClasses.taskItem },
//   }),
//   Youtube.configure({
//     inline: false,
//     ccLanguage: 'vi',
//     HTMLAttributes: {
//       class: 'w-full aspect-video rounded-lg my-4',
//     },
//   }),
//   CharacterCount.configure({ limit: maxCharacters }),
//   Placeholder.configure({
//     placeholder: placeholder || 'Nhập nội dung...',
//     emptyEditorClass: 'is-editor-empty',
//   }),
// ]







import { mergeAttributes, Extension } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import Image from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Highlight } from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Youtube } from '@tiptap/extension-youtube'
import { CharacterCount } from '@tiptap/extension-character-count'
import { FontFamily } from '@tiptap/extension-font-family'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { ResizableImageComponent } from '../../tiptap-editor/ResizableImage'

// ============================================================
// Tailwind classes mapping
// ============================================================
export const tailwindClasses = {
  heading: {
    1: 'text-4xl font-bold text-gray-900 mb-4 mt-6',
    2: 'text-3xl font-semibold text-gray-800 mb-3 mt-5',
    3: 'text-2xl font-medium text-gray-700 mb-2 mt-4',
    4: 'text-xl font-medium text-gray-700 mb-2 mt-3',
    5: 'text-lg font-medium text-gray-600 mb-1 mt-2',
    6: 'text-base font-medium text-gray-600 mb-1 mt-2',
  } as Record<number, string>,
  paragraph: 'text-base text-gray-700 leading-relaxed mb-4',
  bulletList: 'list-disc list-inside flex space-y-2 mb-4 ml-4',
  orderedList: 'list-decimal list-inside space-y-2 mb-4 ml-4',
  listItem: 'text-gray-700',
  blockquote:
    'border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-gray-50 py-2',
  codeBlock:
    'bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto my-4',
  image: 'max-w-full h-auto rounded-lg shadow-md my-4',
  link: 'text-blue-600 hover:text-blue-800 underline',
  table: 'w-full border-collapse border border-gray-300 my-4',
  tableCell: 'border border-gray-300 px-4 py-2',
  tableHeader: 'border border-gray-300 px-4 py-2 bg-gray-100 font-semibold',
  taskList: 'list-none space-y-2 mb-4',
  taskItem: 'flex items-start gap-2',
  horizontalRule: 'border-none border-t-2 border-gray-300 my-6',
}

// ============================================================
// Font Size Extension (custom)
// ============================================================
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return { types: ['textStyle'] }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) =>
              element.style.fontSize?.replace('px', ''),
            renderHTML: (attributes: Record<string, string | null>) => {
              if (!attributes.fontSize) return {}
              return { style: `font-size: ${attributes.fontSize}px` }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run(),
    }
  },
})

// ============================================================
// Custom Extensions với Tailwind classes
// ============================================================

export const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level as number
    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, {
        class: tailwindClasses.heading[level] || '',
      }),
      0,
    ]
  },
})

export const CustomParagraph = Paragraph.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.paragraph }),
      0,
    ]
  },
})

export const CustomBulletList = BulletList.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'ul',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.bulletList }),
      0,
    ]
  },
})

export const CustomOrderedList = OrderedList.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'ol',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.orderedList }),
      0,
    ]
  },
})

export const CustomListItem = ListItem.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.listItem }),
      0,
    ]
  },
})

export const CustomBlockquote = Blockquote.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'blockquote',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.blockquote }),
      0,
    ]
  },
})

export const CustomCodeBlock = CodeBlock.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.codeBlock }),
      ['code', {}, 0],
    ]
  },
})

// ============================================================
// ✅ RESIZABLE IMAGE - Dùng ReactNodeViewRenderer
// ============================================================
export const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute('src'),
      },
      alt: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute('alt'),
      },
      title: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute('title'),
      },
      width: {
        default: null,
        parseHTML: (el: HTMLElement) => {
          const w =
            el.getAttribute('width') ||
            el.style.width?.replace('px', '')
          return w ? parseInt(w as string) : null
        },
        // Không render ở đây, xử lý trong renderHTML chính
        renderHTML: () => ({}),
      },
      height: {
        default: null,
        parseHTML: (el: HTMLElement) => {
          const h =
            el.getAttribute('height') ||
            el.style.height?.replace('px', '')
          return h ? parseInt(h as string) : null
        },
        renderHTML: () => ({}),
      },
      loading: { default: 'lazy' },
    }
  },

  // renderHTML dùng cho getHTML() serialization
  renderHTML({ node, HTMLAttributes }) {
    const { width, height } = node.attrs
    const styles: string[] = []
    if (width) styles.push(`width: ${width}px`)
    if (height) styles.push(`height: ${height}px`)

    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        class: tailwindClasses.image,
        ...(width ? { width: String(width) } : {}),
        ...(height ? { height: String(height) } : {}),
        ...(styles.length ? { style: styles.join('; ') } : {}),
      }),
    ]
  },

  // ✅ NodeView cho editor - render ResizableImage component
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent)
  },
})

export const CustomLink = Link.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.link }),
      0,
    ]
  },
})

export const CustomTable = Table.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'table',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.table }),
      ['tbody', 0],
    ]
  },
})

export const CustomTableCell = TableCell.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'td',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.tableCell }),
      0,
    ]
  },
})

export const CustomTableHeader = TableHeader.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'th',
      mergeAttributes(HTMLAttributes, { class: tailwindClasses.tableHeader }),
      0,
    ]
  },
})

export const CustomHorizontalRule = HorizontalRule.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'hr',
      mergeAttributes(HTMLAttributes, {
        class: tailwindClasses.horizontalRule,
      }),
    ]
  },
})

// ============================================================
// Export configured extensions
// ============================================================
export const getCustomExtensions = (
  placeholder?: string,
  maxCharacters?: number
) => [
  CustomHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  CustomParagraph,
  CustomBulletList,
  CustomOrderedList,
  CustomListItem,
  CustomBlockquote,
  CustomCodeBlock,
  CustomImage.configure({ allowBase64: true, inline: false }),
  CustomLink.configure({
    openOnClick: false,
    HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
  }),
  CustomTable.configure({ resizable: true }),
  TableRow,
  CustomTableCell,
  CustomTableHeader,
  CustomHorizontalRule,
  TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
  Underline,
  Highlight.configure({ multicolor: true }),
  TextStyle,
  Color,
  FontSize,
  FontFamily,
  Subscript,
  Superscript,
  TaskList.configure({ HTMLAttributes: { class: tailwindClasses.taskList } }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: { class: tailwindClasses.taskItem },
  }),
  Youtube.configure({
    inline: false,
    ccLanguage: 'vi',
    HTMLAttributes: {
      class: 'w-full aspect-video rounded-lg my-4',
    },
  }),
  CharacterCount.configure({ limit: maxCharacters }),
  Placeholder.configure({
    placeholder: placeholder || 'Nhập nội dung...',
    emptyEditorClass: 'is-editor-empty',
  }),
]