// import { useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { useCallback } from 'react'
// import { getCustomExtensions } from '../extensions'
// import { getEditorOutput, wrapWithContainer, generateTailwindTemplate } from '../utils/html-serializer'
// import { TiptapEditorProps, EditorOutput } from '../types'

// interface UseTiptapEditorOptions {
//   content?: string
//   placeholder?: string
//   editable?: boolean
//   onChange?: (html: string) => void
//   onJsonChange?: (json: object) => void
// }

// export const useTiptapEditor = (options: UseTiptapEditorOptions = {}) => {
//   const { content = '', placeholder, editable = true, onChange, onJsonChange } = options

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit.configure({
//         heading: false,
//         paragraph: false,
//         bulletList: false,
//         orderedList: false,
//         listItem: false,
//         blockquote: false,
//         codeBlock: false,
//       }),
//       ...getCustomExtensions(placeholder),
//     ],
//     content,
//     editable,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML()
//       onChange?.(html)
//       onJsonChange?.(editor.getJSON())
//     },
//     editorProps: {
//       attributes: {
//         class: 'prose prose-lg max-w-none focus:outline-none min-h-[200px] px-4 py-3',
//       },
//     },
//   })

//   // Lấy output
//   const getOutput = useCallback((): EditorOutput => {
//     return getEditorOutput(editor)
//   }, [editor])

//   // Lấy HTML có wrapper
//   const getWrappedHtml = useCallback((containerClass?: string): string => {
//     if (!editor) return ''
//     return wrapWithContainer(editor.getHTML(), containerClass)
//   }, [editor])

//   // Lấy full HTML template
//   const getFullTemplate = useCallback((title?: string): string => {
//     if (!editor) return ''
//     return generateTailwindTemplate(editor.getHTML(), title)
//   }, [editor])

//   // Set content
//   const setContent = useCallback((newContent: string) => {
//     editor?.commands.setContent(newContent)
//   }, [editor])

//   // Clear content
//   const clearContent = useCallback(() => {
//     editor?.commands.clearContent()
//   }, [editor])

//   // Focus editor
//   const focus = useCallback(() => {
//     editor?.commands.focus()
//   }, [editor])

//   return {
//     editor,
//     getOutput,
//     getWrappedHtml,
//     getFullTemplate,
//     setContent,
//     clearContent,
//     focus,
//     isEmpty: editor?.isEmpty ?? true,
//     isEditable: editor?.isEditable ?? true,
//   }
// }






import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback } from 'react'
import { getCustomExtensions } from '../extensions'
import {
  getEditorOutput,
  wrapWithContainer,
  generateTailwindTemplate,
} from '../utils/html-serializer'
import { EditorOutput } from '../types'

interface UseTiptapEditorOptions {
  content?: string
  placeholder?: string
  editable?: boolean
  maxCharacters?: number
  onChange?: (html: string) => void
  onJsonChange?: (json: object) => void
}

export const useTiptapEditor = (options: UseTiptapEditorOptions = {}) => {
  const {
    content = '',
    placeholder,
    editable = true,
    maxCharacters,
    onChange,
    onJsonChange,
  } = options

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      ...getCustomExtensions(placeholder, maxCharacters),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
      onJsonChange?.(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[200px] px-4 py-3',
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          // Xử lý drag & drop image
          const file = event.dataTransfer.files[0]
          if (file.type.startsWith('image/')) {
            event.preventDefault()
            const reader = new FileReader()
            reader.onload = () => {
              const { schema } = view.state
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })
              if (coordinates && typeof reader.result === 'string') {
                const node = schema.nodes.image.create({ src: reader.result })
                const transaction = view.state.tr.insert(coordinates.pos, node)
                view.dispatch(transaction)
              }
            }
            reader.readAsDataURL(file)
            return true
          }
        }
        return false
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        if (items) {
          for (const item of Array.from(items)) {
            if (item.type.startsWith('image/')) {
              event.preventDefault()
              const file = item.getAsFile()
              if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                  if (typeof reader.result === 'string') {
                    const { schema } = view.state
                    const node = schema.nodes.image.create({
                      src: reader.result,
                    })
                    const transaction = view.state.tr.replaceSelectionWith(node)
                    view.dispatch(transaction)
                  }
                }
                reader.readAsDataURL(file)
              }
              return true
            }
          }
        }
        return false
      },
    },
  })

  const getOutput = useCallback((): EditorOutput => {
    return getEditorOutput(editor)
  }, [editor])

  const getWrappedHtml = useCallback(
    (containerClass?: string): string => {
      if (!editor) return ''
      return wrapWithContainer(editor.getHTML(), containerClass)
    },
    [editor]
  )

  const getFullTemplate = useCallback(
    (title?: string): string => {
      if (!editor) return ''
      return generateTailwindTemplate(editor.getHTML(), title)
    },
    [editor]
  )

  const setContent = useCallback(
    (newContent: string) => {
      editor?.commands.setContent(newContent)
    },
    [editor]
  )

  const clearContent = useCallback(() => {
    editor?.commands.clearContent()
  }, [editor])

  const focus = useCallback(() => {
    editor?.commands.focus()
  }, [editor])

  return {
    editor,
    getOutput,
    getWrappedHtml,
    getFullTemplate,
    setContent,
    clearContent,
    focus,
    isEmpty: editor?.isEmpty ?? true,
    isEditable: editor?.isEditable ?? true,
    characterCount: editor?.storage.characterCount?.characters() ?? 0,
    wordCount: editor?.storage.characterCount?.words() ?? 0,
  }
}