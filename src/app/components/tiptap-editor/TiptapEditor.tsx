// 'use client'

// import React, { forwardRef, useImperativeHandle } from 'react'
// import { EditorContent } from '@tiptap/react'
// import { useTiptapEditor } from './hooks/useTiptapEditor'
// import { Toolbar } from './Toolbar'
// import { TiptapEditorProps, EditorOutput } from './types'
// import './styles/editor.css'

// export interface TiptapEditorRef {
//   getOutput: () => EditorOutput
//   getHtml: () => string
//   getHtmlWithTailwind: () => string
//   getFullTemplate: (title?: string) => string
//   getJson: () => object
//   getText: () => string
//   setContent: (content: string) => void
//   clearContent: () => void
//   focus: () => void
//   isEmpty: boolean
// }

// export const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
//   (
//     {
//       content = '',
//       onChange,
//       onJsonChange,
//       placeholder = 'Nhập nội dung...',
//       editable = true,
//       className = '',
//       minHeight = '300px',
//       maxHeight = '600px',
//     },
//     ref
//   ) => {
//     const {
//       editor,
//       getOutput,
//       getWrappedHtml,
//       getFullTemplate,
//       setContent,
//       clearContent,
//       focus,
//       isEmpty,
//     } = useTiptapEditor({
//       content,
//       placeholder,
//       editable,
//       onChange,
//       onJsonChange,
//     })

//     // Expose methods via ref
//     useImperativeHandle(ref, () => ({
//       getOutput,
//       getHtml: () => editor?.getHTML() || '',
//       getHtmlWithTailwind: () => getWrappedHtml(),
//       getFullTemplate,
//       getJson: () => editor?.getJSON() || {},
//       getText: () => editor?.getText() || '',
//       setContent,
//       clearContent,
//       focus,
//       isEmpty,
//     }))

//     return (
//       <div
//         className={`border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm ${className}`}
//       >
//         {editable && <Toolbar editor={editor} />}

//         <div
//           className="overflow-y-auto"
//           style={{ minHeight, maxHeight }}
//         >
//           <EditorContent
//             editor={editor}
//             className="prose prose-lg max-w-none"
//           />
//         </div>
//       </div>
//     )
//   }
// )

// TiptapEditor.displayName = 'TiptapEditor'

// export default TiptapEditor






'use client'

import React, { forwardRef, useImperativeHandle } from 'react'
import { EditorContent } from '@tiptap/react'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import { Toolbar } from './Toolbar'
import { TiptapEditorProps, EditorOutput } from './types'
import './styles/editor.css'

export interface TiptapEditorRef {
    getOutput: () => EditorOutput
    getHtml: () => string
    getHtmlWithTailwind: () => string
    getFullTemplate: (title?: string) => string
    getJson: () => object
    getText: () => string
    setContent: (content: string) => void
    clearContent: () => void
    focus: () => void
    isEmpty: boolean
    characterCount: number
    wordCount: number
}

export const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
    (
        {
            content = '',
            onChange,
            onJsonChange,
            placeholder = 'Nhập nội dung...',
            editable = true,
            className = '',
            minHeight = '300px',
            maxHeight = '600px',
            showWordCount = true,
            maxCharacters,
            onImageUpload,
        },
        ref
    ) => {
        const {
            editor,
            getOutput,
            getWrappedHtml,
            getFullTemplate,
            setContent,
            clearContent,
            focus,
            isEmpty,
            characterCount,
            wordCount,
        } = useTiptapEditor({
            content,
            placeholder,
            editable,
            maxCharacters,
            onChange,
            onJsonChange,
        })

        useImperativeHandle(ref, () => ({
            getOutput,
            getHtml: () => editor?.getHTML() || '',
            getHtmlWithTailwind: () => getWrappedHtml(),
            getFullTemplate,
            getJson: () => editor?.getJSON() || {},
            getText: () => editor?.getText() || '',
            setContent,
            clearContent,
            focus,
            get isEmpty() {
                return editor?.isEmpty ?? true;
            },
            //   isEmpty,
            characterCount,
            wordCount,
        }))

        return (
            <div
                data-tiptap-root
                className={`border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm ${className}`}
            >
                {editable && <Toolbar editor={editor} onImageUpload={onImageUpload} />}

                <div className="overflow-y-auto" style={{ minHeight, maxHeight }}>
                    <EditorContent editor={editor} className="prose prose-lg max-w-none" />
                </div>

                {/* Status bar */}
                {showWordCount && (
                    <div className="flex items-center justify-between px-3 py-1.5 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                        <div className="flex gap-3">
                            <span>{wordCount} từ</span>
                            <span>{characterCount} ký tự</span>
                        </div>
                        {maxCharacters && (
                            <span
                                className={
                                    characterCount > maxCharacters * 0.9
                                        ? 'text-red-500 font-medium'
                                        : ''
                                }
                            >
                                {characterCount}/{maxCharacters}
                            </span>
                        )}
                    </div>
                )}
            </div>
        )
    }
)

TiptapEditor.displayName = 'TiptapEditor'
export default TiptapEditor