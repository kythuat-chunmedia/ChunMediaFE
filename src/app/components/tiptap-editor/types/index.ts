// import { Editor } from '@tiptap/react'

// export interface TiptapEditorProps {
//   content?: string
//   onChange?: (html: string) => void
//   onJsonChange?: (json: object) => void
//   placeholder?: string
//   editable?: boolean
//   className?: string
//   minHeight?: string
//   maxHeight?: string
// }

// export interface ToolbarProps {
//   editor: Editor | null
// }

// export interface EditorOutput {
//   html: string
//   htmlWithTailwind: string
//   json: object
//   text: string
// }

// export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

// export interface ToolbarButtonProps {
//   onClick: () => void
//   isActive?: boolean
//   disabled?: boolean
//   children: React.ReactNode
//   title?: string
// }






import { Editor } from '@tiptap/react'

export interface TiptapEditorProps {
  content?: string
  onChange?: (html: string) => void
  onJsonChange?: (json: object) => void
  placeholder?: string
  editable?: boolean
  className?: string
  minHeight?: string
  maxHeight?: string
  showWordCount?: boolean
  maxCharacters?: number
  onImageUpload?: (file: File) => Promise<string> // callback upload ảnh
}

export interface ToolbarProps {
  editor: Editor | null
  onImageUpload?: (file: File) => Promise<string>
}

export interface EditorOutput {
  html: string
  htmlWithTailwind: string
  json: object
  text: string
  wordCount: number
  characterCount: number
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
}