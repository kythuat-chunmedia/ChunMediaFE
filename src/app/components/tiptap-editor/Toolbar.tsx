// 'use client'

// import React, { useCallback } from 'react'
// import { Editor } from '@tiptap/react'
// import { ToolbarProps, HeadingLevel } from './types'

// // Icon components (có thể thay bằng lucide-react)
// const icons = {
//   bold: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
//     </svg>
//   ),
//   italic: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m-2 0v16m-4 0h8" transform="skewX(-10)" />
//     </svg>
//   ),
//   underline: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3M4 21h16" />
//     </svg>
//   ),
//   strikethrough: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12M6 12a4 4 0 014-4h4a4 4 0 014 4M6 12a4 4 0 004 4h4a4 4 0 004-4" />
//     </svg>
//   ),
//   bulletList: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//       <circle cx="2" cy="6" r="1" fill="currentColor" />
//       <circle cx="2" cy="12" r="1" fill="currentColor" />
//       <circle cx="2" cy="18" r="1" fill="currentColor" />
//     </svg>
//   ),
//   orderedList: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6h13M7 12h13M7 18h13" />
//       <text x="1" y="8" fontSize="6" fill="currentColor">1</text>
//       <text x="1" y="14" fontSize="6" fill="currentColor">2</text>
//       <text x="1" y="20" fontSize="6" fill="currentColor">3</text>
//     </svg>
//   ),
//   quote: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//     </svg>
//   ),
//   code: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//     </svg>
//   ),
//   image: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
//   ),
//   link: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//     </svg>
//   ),
//   alignLeft: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" />
//     </svg>
//   ),
//   alignCenter: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M5 18h14" />
//     </svg>
//   ),
//   alignRight: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M6 18h14" />
//     </svg>
//   ),
//   undo: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//     </svg>
//   ),
//   redo: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
//     </svg>
//   ),
//   table: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
//     </svg>
//   ),
//   highlight: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//     </svg>
//   ),
// }

// // Toolbar Button Component
// const ToolbarButton: React.FC<{
//   onClick: () => void
//   isActive?: boolean
//   disabled?: boolean
//   children: React.ReactNode
//   title?: string
// }> = ({ onClick, isActive = false, disabled = false, children, title }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     disabled={disabled}
//     title={title}
//     className={`
//       p-2 rounded-md transition-all duration-150 
//       ${isActive 
//         ? 'bg-blue-100 text-blue-700 shadow-sm' 
//         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//       }
//       ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
//     `}
//   >
//     {children}
//   </button>
// )

// // Divider
// const Divider: React.FC = () => (
//   <div className="w-px h-6 bg-gray-300 mx-1" />
// )

// // Heading Dropdown
// const HeadingDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const getCurrentHeading = () => {
//     for (let i = 1; i <= 6; i++) {
//       if (editor.isActive('heading', { level: i })) return `H${i}`
//     }
//     return 'Paragraph'
//   }

//   return (
//     <select
//       value={getCurrentHeading()}
//       onChange={(e) => {
//         const value = e.target.value
//         if (value === 'Paragraph') {
//           editor.chain().focus().setParagraph().run()
//         } else {
//           const level = parseInt(value.replace('H', '')) as HeadingLevel
//           editor.chain().focus().toggleHeading({ level }).run()
//         }
//       }}
//       className="px-2 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       <option value="Paragraph">Paragraph</option>
//       <option value="H1">Heading 1</option>
//       <option value="H2">Heading 2</option>
//       <option value="H3">Heading 3</option>
//       <option value="H4">Heading 4</option>
//       <option value="H5">Heading 5</option>
//       <option value="H6">Heading 6</option>
//     </select>
//   )
// }

// // Main Toolbar Component
// export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
//   if (!editor) return null

//   const addImage = useCallback(() => {
//     const url = window.prompt('Nhập URL hình ảnh:')
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run()
//     }
//   }, [editor])

//   const addLink = useCallback(() => {
//     const previousUrl = editor.getAttributes('link').href
//     const url = window.prompt('Nhập URL:', previousUrl)
    
//     if (url === null) return
    
//     if (url === '') {
//       editor.chain().focus().extendMarkRange('link').unsetLink().run()
//       return
//     }

//     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
//   }, [editor])

//   const addTable = useCallback(() => {
//     editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
//   }, [editor])

//   return (
//     <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//       {/* Heading Dropdown */}
//       <HeadingDropdown editor={editor} />
      
//       <Divider />

//       {/* Text Formatting */}
//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         isActive={editor.isActive('bold')}
//         title="Bold (Ctrl+B)"
//       >
//         {icons.bold}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         isActive={editor.isActive('italic')}
//         title="Italic (Ctrl+I)"
//       >
//         {icons.italic}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         isActive={editor.isActive('underline')}
//         title="Underline (Ctrl+U)"
//       >
//         {icons.underline}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         isActive={editor.isActive('strike')}
//         title="Strikethrough"
//       >
//         {icons.strikethrough}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleHighlight().run()}
//         isActive={editor.isActive('highlight')}
//         title="Highlight"
//       >
//         {icons.highlight}
//       </ToolbarButton>

//       <Divider />

//       {/* Lists */}
//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         isActive={editor.isActive('bulletList')}
//         title="Bullet List"
//       >
//         {icons.bulletList}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         isActive={editor.isActive('orderedList')}
//         title="Numbered List"
//       >
//         {icons.orderedList}
//       </ToolbarButton>

//       <Divider />

//       {/* Alignment */}
//       <ToolbarButton
//         onClick={() => editor.chain().focus().setTextAlign('left').run()}
//         isActive={editor.isActive({ textAlign: 'left' })}
//         title="Align Left"
//       >
//         {icons.alignLeft}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().setTextAlign('center').run()}
//         isActive={editor.isActive({ textAlign: 'center' })}
//         title="Align Center"
//       >
//         {icons.alignCenter}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().setTextAlign('right').run()}
//         isActive={editor.isActive({ textAlign: 'right' })}
//         title="Align Right"
//       >
//         {icons.alignRight}
//       </ToolbarButton>

//       <Divider />

//       {/* Block Elements */}
//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         isActive={editor.isActive('blockquote')}
//         title="Quote"
//       >
//         {icons.quote}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         isActive={editor.isActive('codeBlock')}
//         title="Code Block"
//       >
//         {icons.code}
//       </ToolbarButton>

//       <Divider />

//       {/* Insert */}
//       <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Add Link">
//         {icons.link}
//       </ToolbarButton>

//       <ToolbarButton onClick={addImage} title="Add Image">
//         {icons.image}
//       </ToolbarButton>

//       <ToolbarButton onClick={addTable} title="Insert Table">
//         {icons.table}
//       </ToolbarButton>

//       <Divider />

//       {/* History */}
//       <ToolbarButton
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().undo()}
//         title="Undo (Ctrl+Z)"
//       >
//         {icons.undo}
//       </ToolbarButton>

//       <ToolbarButton
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().redo()}
//         title="Redo (Ctrl+Y)"
//       >
//         {icons.redo}
//       </ToolbarButton>

//       {/* Color Picker */}
//       <Divider />
//       <input
//         type="color"
//         onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
//         value={editor.getAttributes('textStyle').color || '#000000'}
//         className="w-8 h-8 p-0 border border-gray-300 rounded cursor-pointer"
//         title="Text Color"
//       />
//     </div>
//   )
// }

// export default Toolbar








// 'use client'

// import React, { useCallback, useRef, useState } from 'react'
// import { Editor } from '@tiptap/react'
// import { ToolbarProps, HeadingLevel } from './types'

// /* ─── Toolbar Button ─── */
// const ToolbarButton: React.FC<{
//   onClick: () => void
//   isActive?: boolean
//   disabled?: boolean
//   children: React.ReactNode
//   title?: string
// }> = ({ onClick, isActive = false, disabled = false, children, title }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     disabled={disabled}
//     title={title}
//     className={`
//       p-1.5 rounded-md transition-all duration-150
//       ${
//         isActive
//           ? 'bg-blue-100 text-blue-700 shadow-sm'
//           : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//       }
//       ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
//     `}
//   >
//     {children}
//   </button>
// )

// /* ─── Divider ─── */
// const Divider: React.FC = () => <div className="w-px h-6 bg-gray-300 mx-1" />

// /* ─── Heading Dropdown ─── */
// const HeadingDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const getCurrent = () => {
//     for (let i = 1; i <= 6; i++) {
//       if (editor.isActive('heading', { level: i })) return `H${i}`
//     }
//     return 'Paragraph'
//   }

//   return (
//     <select
//       value={getCurrent()}
//       onChange={(e) => {
//         const v = e.target.value
//         if (v === 'Paragraph') {
//           editor.chain().focus().setParagraph().run()
//         } else {
//           const level = parseInt(v.replace('H', '')) as HeadingLevel
//           editor.chain().focus().toggleHeading({ level }).run()
//         }
//       }}
//       className="h-8 px-2 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       <option value="Paragraph">Paragraph</option>
//       {[1, 2, 3, 4, 5, 6].map((l) => (
//         <option key={l} value={`H${l}`}>
//           Heading {l}
//         </option>
//       ))}
//     </select>
//   )
// }

// /* ─── Font Family Dropdown ─── */
// const FontFamilyDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const fonts = [
//     { label: 'Default', value: '' },
//     { label: 'Inter', value: 'Inter' },
//     { label: 'Arial', value: 'Arial' },
//     { label: 'Georgia', value: 'Georgia' },
//     { label: 'Times New Roman', value: 'Times New Roman' },
//     { label: 'Courier New', value: 'Courier New' },
//     { label: 'Verdana', value: 'Verdana' },
//     { label: 'Roboto', value: 'Roboto' },
//   ]

//   return (
//     <select
//       onChange={(e) => {
//         const v = e.target.value
//         if (v === '') {
//           editor.chain().focus().unsetFontFamily().run()
//         } else {
//           editor.chain().focus().setFontFamily(v).run()
//         }
//       }}
//       className="h-8 px-2 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       {fonts.map((f) => (
//         <option key={f.value} value={f.value}>
//           {f.label}
//         </option>
//       ))}
//     </select>
//   )
// }

// /* ─── Font Size Dropdown ─── */
// const FontSizeDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const sizes = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '64']

//   return (
//     <select
//       onChange={(e) => {
//         const v = e.target.value
//         if (v === '') {
//           editor.chain().focus().unsetFontSize().run()
//         } else {
//           editor.chain().focus().setFontSize(v).run()
//         }
//       }}
//       className="h-8 w-16 px-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       <option value="">Size</option>
//       {sizes.map((s) => (
//         <option key={s} value={s}>
//           {s}px
//         </option>
//       ))}
//     </select>
//   )
// }

// /* ─── Icon helper (16×16 SVG) ─── */
// const I: React.FC<{ d: string; viewBox?: string }> = ({
//   d,
//   viewBox = '0 0 24 24',
// }) => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={2}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     viewBox={viewBox}
//   >
//     <path d={d} />
//   </svg>
// )

// /* ═══════════════════════════════════════════════════════════
//    MAIN TOOLBAR
//    ═══════════════════════════════════════════════════════════ */
// export const Toolbar: React.FC<ToolbarProps> = ({ editor, onImageUpload }) => {
//   const imageInputRef = useRef<HTMLInputElement>(null)
//   const [isFullscreen, setIsFullscreen] = useState(false)

//   if (!editor) return null

//   /* --- Actions --- */
//   const addLink = useCallback(() => {
//     const prev = editor.getAttributes('link').href
//     const url = window.prompt('Nhập URL:', prev)
//     if (url === null) return
//     if (url === '') {
//       editor.chain().focus().extendMarkRange('link').unsetLink().run()
//       return
//     }
//     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
//   }, [editor])

//   const addImageUrl = useCallback(() => {
//     const url = window.prompt('Nhập URL hình ảnh:')
//     if (url) editor.chain().focus().setImage({ src: url }).run()
//   }, [editor])

//   const handleImageUpload = useCallback(
//     async (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0]
//       if (!file) return

//       if (onImageUpload) {
//         // Upload lên server
//         const url = await onImageUpload(file)
//         editor.chain().focus().setImage({ src: url }).run()
//       } else {
//         // Fallback: base64
//         const reader = new FileReader()
//         reader.onload = () => {
//           if (typeof reader.result === 'string') {
//             editor.chain().focus().setImage({ src: reader.result }).run()
//           }
//         }
//         reader.readAsDataURL(file)
//       }
//       // Reset input
//       if (imageInputRef.current) imageInputRef.current.value = ''
//     },
//     [editor, onImageUpload]
//   )

//   const addYoutube = useCallback(() => {
//     const url = window.prompt('Nhập URL YouTube:')
//     if (url) editor.commands.setYoutubeVideo({ src: url })
//   }, [editor])

//   const addTable = useCallback(() => {
//     editor
//       .chain()
//       .focus()
//       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//       .run()
//   }, [editor])

//   const toggleFullscreen = useCallback(() => {
//     const el = document.querySelector('[data-tiptap-root]') as HTMLElement | null
//     if (el) {
//       el.classList.toggle('fixed')
//       el.classList.toggle('inset-0')
//       el.classList.toggle('z-50')
//       el.classList.toggle('bg-white')
//       setIsFullscreen((p) => !p)
//     }
//   }, [])

//   /* --- Rows --- */
//   return (
//     <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
//       {/* Row 1 – Block, Font, Size */}
//       <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-100">
//         <HeadingDropdown editor={editor} />
//         <FontFamilyDropdown editor={editor} />
//         <FontSizeDropdown editor={editor} />

//         <Divider />

//         {/* Text color */}
//         <div className="relative flex items-center" title="Màu chữ">
//           <span className="text-[10px] text-gray-500 mr-0.5">A</span>
//           <input
//             type="color"
//             onInput={(e) =>
//               editor
//                 .chain()
//                 .focus()
//                 .setColor((e.target as HTMLInputElement).value)
//                 .run()
//             }
//             value={editor.getAttributes('textStyle').color || '#000000'}
//             className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
//           />
//         </div>

//         {/* Highlight color */}
//         <div className="relative flex items-center" title="Màu nền">
//           <span className="text-[10px] text-gray-500 mr-0.5">🖍</span>
//           <input
//             type="color"
//             onInput={(e) =>
//               editor
//                 .chain()
//                 .focus()
//                 .toggleHighlight({
//                   color: (e.target as HTMLInputElement).value,
//                 })
//                 .run()
//             }
//             value="#fef08a"
//             className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Row 2 – Formatting & Insert */}
//       <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
//         {/* Text formatting */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           isActive={editor.isActive('bold')}
//           title="Bold (Ctrl+B)"
//         >
//           <span className="font-bold text-sm">B</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           isActive={editor.isActive('italic')}
//           title="Italic (Ctrl+I)"
//         >
//           <span className="italic text-sm">I</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           isActive={editor.isActive('underline')}
//           title="Underline (Ctrl+U)"
//         >
//           <span className="underline text-sm">U</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           isActive={editor.isActive('strike')}
//           title="Strikethrough"
//         >
//           <span className="line-through text-sm">S</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleSubscript().run()}
//           isActive={editor.isActive('subscript')}
//           title="Subscript"
//         >
//           <span className="text-sm">
//             X<sub className="text-[10px]">2</sub>
//           </span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleSuperscript().run()}
//           isActive={editor.isActive('superscript')}
//           title="Superscript"
//         >
//           <span className="text-sm">
//             X<sup className="text-[10px]">2</sup>
//           </span>
//         </ToolbarButton>

//         <Divider />

//         {/* Lists */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           isActive={editor.isActive('bulletList')}
//           title="Bullet List"
//         >
//           <I d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           isActive={editor.isActive('orderedList')}
//           title="Numbered List"
//         >
//           <I d="M10 6h11M10 12h11M10 18h11M4 6V2l-2 1M3 12h2l-2 2h2M3 18h1.5l.5-.5.5.5H7" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleTaskList().run()}
//           isActive={editor.isActive('taskList')}
//           title="Todo List"
//         >
//           <I d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//         </ToolbarButton>

//         <Divider />

//         {/* Alignment */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('left').run()}
//           isActive={editor.isActive({ textAlign: 'left' })}
//           title="Align Left"
//         >
//           <I d="M3 6h18M3 12h12M3 18h16" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('center').run()}
//           isActive={editor.isActive({ textAlign: 'center' })}
//           title="Align Center"
//         >
//           <I d="M3 6h18M6 12h12M4 18h16" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('right').run()}
//           isActive={editor.isActive({ textAlign: 'right' })}
//           title="Align Right"
//         >
//           <I d="M3 6h18M9 12h12M5 18h16" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('justify').run()}
//           isActive={editor.isActive({ textAlign: 'justify' })}
//           title="Justify"
//         >
//           <I d="M3 6h18M3 12h18M3 18h18" />
//         </ToolbarButton>

//         <Divider />

//         {/* Block elements */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           isActive={editor.isActive('blockquote')}
//           title="Quote"
//         >
//           <I d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           isActive={editor.isActive('codeBlock')}
//           title="Code Block"
//         >
//           <I d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setHorizontalRule().run()}
//           title="Horizontal Rule"
//         >
//           <I d="M3 12h18" />
//         </ToolbarButton>

//         <Divider />

//         {/* Insert */}
//         <ToolbarButton
//           onClick={addLink}
//           isActive={editor.isActive('link')}
//           title="Link"
//         >
//           <I d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
//         </ToolbarButton>

//         {/* Unlink */}
//         {editor.isActive('link') && (
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().extendMarkRange('link').unsetLink().run()
//             }
//             title="Remove Link"
//           >
//             <span className="text-xs text-red-500 font-bold">✕🔗</span>
//           </ToolbarButton>
//         )}

//         {/* Image from URL */}
//         <ToolbarButton onClick={addImageUrl} title="Image from URL">
//           <I d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </ToolbarButton>

//         {/* Image upload */}
//         <ToolbarButton
//           onClick={() => imageInputRef.current?.click()}
//           title="Upload Image"
//         >
//           <I d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//         </ToolbarButton>
//         <input
//           ref={imageInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//         />

//         {/* YouTube */}
//         <ToolbarButton onClick={addYoutube} title="YouTube Video">
//           <I d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
//         </ToolbarButton>

//         {/* Table */}
//         <ToolbarButton onClick={addTable} title="Insert Table">
//           <I d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
//         </ToolbarButton>

//         {/* Table controls (visible khi đang ở trong table) */}
//         {editor.isActive('table') && (
//           <>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().addColumnAfter().run()}
//               title="Add Column"
//             >
//               <span className="text-[10px] font-bold">+Col</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().addRowAfter().run()}
//               title="Add Row"
//             >
//               <span className="text-[10px] font-bold">+Row</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().deleteColumn().run()}
//               title="Delete Column"
//             >
//               <span className="text-[10px] font-bold text-red-500">-Col</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().deleteRow().run()}
//               title="Delete Row"
//             >
//               <span className="text-[10px] font-bold text-red-500">-Row</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().deleteTable().run()}
//               title="Delete Table"
//             >
//               <span className="text-[10px] font-bold text-red-500">✕Tbl</span>
//             </ToolbarButton>
//           </>
//         )}

//         <Divider />

//         {/* Undo / Redo */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().undo()}
//           title="Undo (Ctrl+Z)"
//         >
//           <I d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().redo()}
//           title="Redo (Ctrl+Y)"
//         >
//           <I d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
//         </ToolbarButton>

//         <Divider />

//         {/* Clear formatting */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
//           title="Clear Formatting"
//         >
//           <I d="M4 7h11M9 3L5 21M16 3l-4 18" />
//         </ToolbarButton>

//         {/* Fullscreen */}
//         <ToolbarButton onClick={toggleFullscreen} title="Fullscreen">
//           {isFullscreen ? (
//             <I d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
//           ) : (
//             <I d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//           )}
//         </ToolbarButton>
//       </div>
//     </div>
//   )
// }

// export default Toolbar




























// 'use client'

// import React, { useCallback, useRef, useState } from 'react'
// import { Editor } from '@tiptap/react'
// import { ToolbarProps, HeadingLevel } from './types'

// /* ─── Toolbar Button ─── */
// const ToolbarButton: React.FC<{
//   onClick: () => void
//   isActive?: boolean
//   disabled?: boolean
//   children: React.ReactNode
//   title?: string
// }> = ({ onClick, isActive = false, disabled = false, children, title }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     disabled={disabled}
//     title={title}
//     className={`
//       p-1.5 rounded-md transition-all duration-150
//       ${
//         isActive
//           ? 'bg-blue-100 text-blue-700 shadow-sm'
//           : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//       }
//       ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
//     `}
//   >
//     {children}
//   </button>
// )

// /* ─── Divider ─── */
// const Divider: React.FC = () => <div className="w-px h-6 bg-gray-300 mx-1" />

// /* ─── Heading Dropdown ─── */
// const HeadingDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const getCurrent = () => {
//     for (let i = 1; i <= 6; i++) {
//       if (editor.isActive('heading', { level: i })) return `H${i}`
//     }
//     return 'Paragraph'
//   }

//   return (
//     <select
//       value={getCurrent()}
//       onChange={(e) => {
//         const v = e.target.value
//         if (v === 'Paragraph') {
//           editor.chain().focus().setParagraph().run()
//         } else {
//           const level = parseInt(v.replace('H', '')) as HeadingLevel
//           editor.chain().focus().toggleHeading({ level }).run()
//         }
//       }}
//       className="h-8 px-2 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       <option value="Paragraph">Paragraph</option>
//       {[1, 2, 3, 4, 5, 6].map((l) => (
//         <option key={l} value={`H${l}`}>
//           Heading {l}
//         </option>
//       ))}
//     </select>
//   )
// }

// /* ─── Font Family Dropdown ─── */
// const FontFamilyDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const fonts = [
//     { label: 'Default', value: '' },
//     { label: 'Inter', value: 'Inter' },
//     { label: 'Arial', value: 'Arial' },
//     { label: 'Georgia', value: 'Georgia' },
//     { label: 'Times New Roman', value: 'Times New Roman' },
//     { label: 'Courier New', value: 'Courier New' },
//     { label: 'Verdana', value: 'Verdana' },
//     { label: 'Roboto', value: 'Roboto' },
//   ]

//   return (
//     <select
//       onChange={(e) => {
//         const v = e.target.value
//         if (v === '') {
//           editor.chain().focus().unsetFontFamily().run()
//         } else {
//           editor.chain().focus().setFontFamily(v).run()
//         }
//       }}
//       className="h-8 px-2 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       {fonts.map((f) => (
//         <option key={f.value} value={f.value}>
//           {f.label}
//         </option>
//       ))}
//     </select>
//   )
// }

// /* ─── Font Size Dropdown ─── */
// const FontSizeDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
//   const sizes = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '64']

//   return (
//     <select
//       onChange={(e) => {
//         const v = e.target.value
//         if (v === '') {
//           editor.chain().focus().unsetFontSize().run()
//         } else {
//           editor.chain().focus().setFontSize(v).run()
//         }
//       }}
//       className="h-8 w-16 px-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       <option value="">Size</option>
//       {sizes.map((s) => (
//         <option key={s} value={s}>
//           {s}px
//         </option>
//       ))}
//     </select>
//   )
// }

// /* ─── Icon helper (16×16 SVG) ─── */
// const I: React.FC<{ d: string; viewBox?: string }> = ({
//   d,
//   viewBox = '0 0 24 24',
// }) => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={2}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     viewBox={viewBox}
//   >
//     <path d={d} />
//   </svg>
// )

// /* ═══════════════════════════════════════════════════════════
//    MAIN TOOLBAR
//    ═══════════════════════════════════════════════════════════ */
// export const Toolbar: React.FC<ToolbarProps> = ({ editor, onImageUpload }) => {
//   const imageInputRef = useRef<HTMLInputElement>(null)
//   const [isFullscreen, setIsFullscreen] = useState(false)

//   // ✅ TẤT CẢ useCallback PHẢI nằm TRƯỚC early return
//   const addLink = useCallback(() => {
//     if (!editor) return
//     const prev = editor.getAttributes('link').href
//     const url = window.prompt('Nhập URL:', prev)
//     if (url === null) return
//     if (url === '') {
//       editor.chain().focus().extendMarkRange('link').unsetLink().run()
//       return
//     }
//     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
//   }, [editor])

//   const addImageUrl = useCallback(() => {
//     if (!editor) return
//     const url = window.prompt('Nhập URL hình ảnh:')
//     if (url) editor.chain().focus().setImage({ src: url }).run()
//   }, [editor])

//   const handleImageUpload = useCallback(
//     async (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (!editor) return
//       const file = e.target.files?.[0]
//       if (!file) return

//       if (onImageUpload) {
//         const url = await onImageUpload(file)
//         editor.chain().focus().setImage({ src: url }).run()
//       } else {
//         const reader = new FileReader()
//         reader.onload = () => {
//           if (typeof reader.result === 'string') {
//             editor.chain().focus().setImage({ src: reader.result }).run()
//           }
//         }
//         reader.readAsDataURL(file)
//       }
//       if (imageInputRef.current) imageInputRef.current.value = ''
//     },
//     [editor, onImageUpload]
//   )

//   const addYoutube = useCallback(() => {
//     if (!editor) return
//     const url = window.prompt('Nhập URL YouTube:')
//     if (url) editor.commands.setYoutubeVideo({ src: url })
//   }, [editor])

//   const addTable = useCallback(() => {
//     if (!editor) return
//     editor
//       .chain()
//       .focus()
//       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//       .run()
//   }, [editor])

//   const toggleFullscreen = useCallback(() => {
//     const el = document.querySelector('[data-tiptap-root]') as HTMLElement | null
//     if (el) {
//       el.classList.toggle('fixed')
//       el.classList.toggle('inset-0')
//       el.classList.toggle('z-50')
//       el.classList.toggle('bg-white')
//       setIsFullscreen((p) => !p)
//     }
//   }, [])

//   // ✅ Early return SAU tất cả hooks
//   if (!editor) return null

//   return (
//     <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
//       {/* Row 1 – Block, Font, Size */}
//       <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-100">
//         <HeadingDropdown editor={editor} />
//         <FontFamilyDropdown editor={editor} />
//         <FontSizeDropdown editor={editor} />

//         <Divider />

//         {/* Text color */}
//         <div className="relative flex items-center" title="Màu chữ">
//           <span className="text-[10px] text-gray-500 mr-0.5">A</span>
//           <input
//             type="color"
//             onInput={(e) =>
//               editor
//                 .chain()
//                 .focus()
//                 .setColor((e.target as HTMLInputElement).value)
//                 .run()
//             }
//             value={editor.getAttributes('textStyle').color || '#000000'}
//             className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
//           />
//         </div>

//         {/* Highlight color */}
//         <div className="relative flex items-center" title="Màu nền">
//           <span className="text-[10px] text-gray-500 mr-0.5">🖍</span>
//           <input
//             type="color"
//             onInput={(e) =>
//               editor
//                 .chain()
//                 .focus()
//                 .toggleHighlight({
//                   color: (e.target as HTMLInputElement).value,
//                 })
//                 .run()
//             }
//             value="#fef08a"
//             className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Row 2 – Formatting & Insert */}
//       <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
//         {/* Text formatting */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           isActive={editor.isActive('bold')}
//           title="Bold (Ctrl+B)"
//         >
//           <span className="font-bold text-sm">B</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           isActive={editor.isActive('italic')}
//           title="Italic (Ctrl+I)"
//         >
//           <span className="italic text-sm">I</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           isActive={editor.isActive('underline')}
//           title="Underline (Ctrl+U)"
//         >
//           <span className="underline text-sm">U</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           isActive={editor.isActive('strike')}
//           title="Strikethrough"
//         >
//           <span className="line-through text-sm">S</span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleSubscript().run()}
//           isActive={editor.isActive('subscript')}
//           title="Subscript"
//         >
//           <span className="text-sm">
//             X<sub className="text-[10px]">2</sub>
//           </span>
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleSuperscript().run()}
//           isActive={editor.isActive('superscript')}
//           title="Superscript"
//         >
//           <span className="text-sm">
//             X<sup className="text-[10px]">2</sup>
//           </span>
//         </ToolbarButton>

//         <Divider />

//         {/* Lists */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           isActive={editor.isActive('bulletList')}
//           title="Bullet List"
//         >
//           <I d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           isActive={editor.isActive('orderedList')}
//           title="Numbered List"
//         >
//           <I d="M10 6h11M10 12h11M10 18h11M4 6V2l-2 1M3 12h2l-2 2h2M3 18h1.5l.5-.5.5.5H7" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleTaskList().run()}
//           isActive={editor.isActive('taskList')}
//           title="Todo List"
//         >
//           <I d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//         </ToolbarButton>

//         <Divider />

//         {/* Alignment */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('left').run()}
//           isActive={editor.isActive({ textAlign: 'left' })}
//           title="Align Left"
//         >
//           <I d="M3 6h18M3 12h12M3 18h16" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('center').run()}
//           isActive={editor.isActive({ textAlign: 'center' })}
//           title="Align Center"
//         >
//           <I d="M3 6h18M6 12h12M4 18h16" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('right').run()}
//           isActive={editor.isActive({ textAlign: 'right' })}
//           title="Align Right"
//         >
//           <I d="M3 6h18M9 12h12M5 18h16" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setTextAlign('justify').run()}
//           isActive={editor.isActive({ textAlign: 'justify' })}
//           title="Justify"
//         >
//           <I d="M3 6h18M3 12h18M3 18h18" />
//         </ToolbarButton>

//         <Divider />

//         {/* Block elements */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           isActive={editor.isActive('blockquote')}
//           title="Quote"
//         >
//           <I d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           isActive={editor.isActive('codeBlock')}
//           title="Code Block"
//         >
//           <I d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().setHorizontalRule().run()}
//           title="Horizontal Rule"
//         >
//           <I d="M3 12h18" />
//         </ToolbarButton>

//         <Divider />

//         {/* Insert */}
//         <ToolbarButton
//           onClick={addLink}
//           isActive={editor.isActive('link')}
//           title="Link"
//         >
//           <I d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
//         </ToolbarButton>

//         {/* Unlink */}
//         {editor.isActive('link') && (
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().extendMarkRange('link').unsetLink().run()
//             }
//             title="Remove Link"
//           >
//             <span className="text-xs text-red-500 font-bold">✕🔗</span>
//           </ToolbarButton>
//         )}

//         {/* Image from URL */}
//         <ToolbarButton onClick={addImageUrl} title="Image from URL">
//           <I d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </ToolbarButton>

//         {/* Image upload */}
//         <ToolbarButton
//           onClick={() => imageInputRef.current?.click()}
//           title="Upload Image"
//         >
//           <I d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//         </ToolbarButton>
//         <input
//           ref={imageInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//         />

//         {/* YouTube */}
//         <ToolbarButton onClick={addYoutube} title="YouTube Video">
//           <I d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
//         </ToolbarButton>

//         {/* Table */}
//         <ToolbarButton onClick={addTable} title="Insert Table">
//           <I d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
//         </ToolbarButton>

//         {/* Table controls */}
//         {editor.isActive('table') && (
//           <>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().addColumnAfter().run()}
//               title="Add Column"
//             >
//               <span className="text-[10px] font-bold">+Col</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().addRowAfter().run()}
//               title="Add Row"
//             >
//               <span className="text-[10px] font-bold">+Row</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().deleteColumn().run()}
//               title="Delete Column"
//             >
//               <span className="text-[10px] font-bold text-red-500">-Col</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().deleteRow().run()}
//               title="Delete Row"
//             >
//               <span className="text-[10px] font-bold text-red-500">-Row</span>
//             </ToolbarButton>
//             <ToolbarButton
//               onClick={() => editor.chain().focus().deleteTable().run()}
//               title="Delete Table"
//             >
//               <span className="text-[10px] font-bold text-red-500">✕Tbl</span>
//             </ToolbarButton>
//           </>
//         )}

//         <Divider />

//         {/* Undo / Redo */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().undo()}
//           title="Undo (Ctrl+Z)"
//         >
//           <I d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//         </ToolbarButton>

//         <ToolbarButton
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().redo()}
//           title="Redo (Ctrl+Y)"
//         >
//           <I d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
//         </ToolbarButton>

//         <Divider />

//         {/* Clear formatting */}
//         <ToolbarButton
//           onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
//           title="Clear Formatting"
//         >
//           <I d="M4 7h11M9 3L5 21M16 3l-4 18" />
//         </ToolbarButton>

//         {/* Fullscreen */}
//         <ToolbarButton onClick={toggleFullscreen} title="Fullscreen">
//           {isFullscreen ? (
//             <I d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
//           ) : (
//             <I d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//           )}
//         </ToolbarButton>
//       </div>
//     </div>
//   )
// }

// export default Toolbar









'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import { ToolbarProps, HeadingLevel } from './types'

/* ─── Toolbar Button ─── */
const ToolbarButton: React.FC<{
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title?: string
}> = ({ onClick, isActive = false, disabled = false, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-1.5 rounded-md transition-all duration-150
      ${
        isActive
          ? 'bg-blue-100 text-blue-700 shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {children}
  </button>
)

/* ─── Divider ─── */
const Divider: React.FC = () => <div className="w-px h-6 bg-gray-300 mx-1" />

/* ─── Heading Dropdown ─── */
const HeadingDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
  const getCurrent = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive('heading', { level: i })) return `H${i}`
    }
    return 'Paragraph'
  }

  return (
    <select
      value={getCurrent()}
      onChange={(e) => {
        const v = e.target.value
        if (v === 'Paragraph') {
          editor.chain().focus().setParagraph().run()
        } else {
          const level = parseInt(v.replace('H', '')) as HeadingLevel
          editor.chain().focus().toggleHeading({ level }).run()
        }
      }}
      className="h-8 px-2 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      <option value="Paragraph">Paragraph</option>
      {[1, 2, 3, 4, 5, 6].map((l) => (
        <option key={l} value={`H${l}`}>
          Heading {l}
        </option>
      ))}
    </select>
  )
}

/* ─── Font Family Dropdown ─── */
const FontFamilyDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
  const fonts = [
    { label: 'Default', value: '' },
    { label: 'Inter', value: 'Inter' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Roboto', value: 'Roboto' },
  ]

  return (
    <select
      onChange={(e) => {
        const v = e.target.value
        if (v === '') {
          editor.chain().focus().unsetFontFamily().run()
        } else {
          editor.chain().focus().setFontFamily(v).run()
        }
      }}
      className="h-8 px-2 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      {fonts.map((f) => (
        <option key={f.value} value={f.value}>
          {f.label}
        </option>
      ))}
    </select>
  )
}

/* ─── Font Size Dropdown ─── */
const FontSizeDropdown: React.FC<{ editor: Editor }> = ({ editor }) => {
  const sizes = [
    '12',
    '14',
    '16',
    '18',
    '20',
    '24',
    '28',
    '32',
    '36',
    '48',
    '64',
  ]

  return (
    <select
      onChange={(e) => {
        const v = e.target.value
        if (v === '') {
          editor.chain().focus().unsetFontSize().run()
        } else {
          editor.chain().focus().setFontSize(v).run()
        }
      }}
      className="h-8 w-16 px-1 text-xs border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      <option value="">Size</option>
      {sizes.map((s) => (
        <option key={s} value={s}>
          {s}px
        </option>
      ))}
    </select>
  )
}

/* ─── Icon helper (16×16 SVG) ─── */
const I: React.FC<{ d: string; viewBox?: string }> = ({
  d,
  viewBox = '0 0 24 24',
}) => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox={viewBox}
  >
    <path d={d} />
  </svg>
)

/* ═══════════════════════════════════════════════════════════
   MAIN TOOLBAR
   ═══════════════════════════════════════════════════════════ */
export const Toolbar: React.FC<ToolbarProps> = ({ editor, onImageUpload }) => {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // ── Image size state (synced từ editor) ──
  const [imageSize, setImageSize] = useState({ w: '', h: '' })

  // ── Sync image dimensions khi selection thay đổi ──
  useEffect(() => {
    if (!editor) return

    const syncImageSize = () => {
      if (editor.isActive('image')) {
        const attrs = editor.getAttributes('image')
        setImageSize({
          w: attrs.width?.toString() || '',
          h: attrs.height?.toString() || '',
        })
      }
    }

    editor.on('selectionUpdate', syncImageSize)
    editor.on('transaction', syncImageSize)

    return () => {
      editor.off('selectionUpdate', syncImageSize)
      editor.off('transaction', syncImageSize)
    }
  }, [editor])

  // ── All useCallbacks TRƯỚC early return ──
  const addLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url = window.prompt('Nhập URL:', prev)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }, [editor])

  const addImageUrl = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Nhập URL hình ảnh:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editor) return
      const file = e.target.files?.[0]
      if (!file) return

      if (onImageUpload) {
        const url = await onImageUpload(file)
        editor.chain().focus().setImage({ src: url }).run()
      } else {
        const reader = new FileReader()
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            editor.chain().focus().setImage({ src: reader.result }).run()
          }
        }
        reader.readAsDataURL(file)
      }
      if (imageInputRef.current) imageInputRef.current.value = ''
    },
    [editor, onImageUpload]
  )

  const addYoutube = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Nhập URL YouTube:')
    if (url) editor.commands.setYoutubeVideo({ src: url })
  }, [editor])

  const addTable = useCallback(() => {
    if (!editor) return
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run()
  }, [editor])

  const toggleFullscreen = useCallback(() => {
    const el = document.querySelector(
      '[data-tiptap-root]'
    ) as HTMLElement | null
    if (el) {
      el.classList.toggle('fixed')
      el.classList.toggle('inset-0')
      el.classList.toggle('z-50')
      el.classList.toggle('bg-white')
      setIsFullscreen((p) => !p)
    }
  }, [])

  // ── Image size handlers ──
  const commitImageWidth = useCallback(
    (value: string) => {
      if (!editor) return
      const w = parseInt(value)
      if (!w || w < 30) return

      const attrs = editor.getAttributes('image')
      const oldW = attrs.width
      const oldH = attrs.height
      const ratio = oldW && oldH ? oldW / oldH : 1
      const h = Math.round(w / ratio)

      editor
        .chain()
        .focus()
        .updateAttributes('image', { width: w, height: h })
        .run()
    },
    [editor]
  )

  const commitImageHeight = useCallback(
    (value: string) => {
      if (!editor) return
      const h = parseInt(value)
      if (!h || h < 30) return

      const attrs = editor.getAttributes('image')
      const oldW = attrs.width
      const oldH = attrs.height
      const ratio = oldW && oldH ? oldW / oldH : 1
      const w = Math.round(h * ratio)

      editor
        .chain()
        .focus()
        .updateAttributes('image', { width: w, height: h })
        .run()
    },
    [editor]
  )

  const applyImagePreset = useCallback(
    (percent: number) => {
      if (!editor) return
      const attrs = editor.getAttributes('image')
      if (!attrs.src) return

      const img = document.createElement('img')
      img.onload = () => {
        const w = Math.round((img.naturalWidth * percent) / 100)
        const h = Math.round((img.naturalHeight * percent) / 100)
        editor
          .chain()
          .focus()
          .updateAttributes('image', {
            width: Math.max(30, w),
            height: Math.max(30, h),
          })
          .run()
      }
      img.src = attrs.src
    },
    [editor]
  )

  const resetImageSize = useCallback(() => {
    if (!editor) return
    editor
      .chain()
      .focus()
      .updateAttributes('image', { width: null, height: null })
      .run()
  }, [editor])

  // ✅ Early return SAU tất cả hooks
  if (!editor) return null

  const isImageSelected = editor.isActive('image')

  return (
    <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
      {/* Row 1 – Block, Font, Size */}
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-gray-100">
        <HeadingDropdown editor={editor} />
        <FontFamilyDropdown editor={editor} />
        <FontSizeDropdown editor={editor} />

        <Divider />

        {/* Text color */}
        <div className="relative flex items-center" title="Màu chữ">
          <span className="text-[10px] text-gray-500 mr-0.5">A</span>
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setColor((e.target as HTMLInputElement).value)
                .run()
            }
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
          />
        </div>

        {/* Highlight color */}
        <div className="relative flex items-center" title="Màu nền">
          <span className="text-[10px] text-gray-500 mr-0.5">🖍</span>
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .toggleHighlight({
                  color: (e.target as HTMLInputElement).value,
                })
                .run()
            }
            value="#fef08a"
            className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Row 2 – Formatting & Insert */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold text-sm">B</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <span className="italic text-sm">I</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <span className="underline text-sm">U</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <span className="line-through text-sm">S</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          isActive={editor.isActive('subscript')}
          title="Subscript"
        >
          <span className="text-sm">
            X<sub className="text-[10px]">2</sub>
          </span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          isActive={editor.isActive('superscript')}
          title="Superscript"
        >
          <span className="text-sm">
            X<sup className="text-[10px]">2</sup>
          </span>
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <I d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <I d="M10 6h11M10 12h11M10 18h11M4 6V2l-2 1M3 12h2l-2 2h2M3 18h1.5l.5-.5.5.5H7" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive('taskList')}
          title="Todo List"
        >
          <I d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <I d="M3 6h18M3 12h12M3 18h16" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <I d="M3 6h18M6 12h12M4 18h16" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <I d="M3 6h18M9 12h12M5 18h16" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        >
          <I d="M3 6h18M3 12h18M3 18h18" />
        </ToolbarButton>

        <Divider />

        {/* Block elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <I d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <I d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <I d="M3 12h18" />
        </ToolbarButton>

        <Divider />

        {/* Insert */}
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          title="Link"
        >
          <I d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </ToolbarButton>

        {editor.isActive('link') && (
          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .unsetLink()
                .run()
            }
            title="Remove Link"
          >
            <span className="text-xs text-red-500 font-bold">✕🔗</span>
          </ToolbarButton>
        )}

        <ToolbarButton onClick={addImageUrl} title="Image from URL">
          <I d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          title="Upload Image"
        >
          <I d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </ToolbarButton>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <ToolbarButton onClick={addYoutube} title="YouTube Video">
          <I d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
        </ToolbarButton>

        <ToolbarButton onClick={addTable} title="Insert Table">
          <I d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
        </ToolbarButton>

        {editor.isActive('table') && (
          <>
            <ToolbarButton
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Add Column"
            >
              <span className="text-[10px] font-bold">+Col</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title="Add Row"
            >
              <span className="text-[10px] font-bold">+Row</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title="Delete Column"
            >
              <span className="text-[10px] font-bold text-red-500">-Col</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteRow().run()}
              title="Delete Row"
            >
              <span className="text-[10px] font-bold text-red-500">-Row</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Table"
            >
              <span className="text-[10px] font-bold text-red-500">✕Tbl</span>
            </ToolbarButton>
          </>
        )}

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <I d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <I d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
        </ToolbarButton>

        {/* <Divider />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="Clear Formatting"
        >
          <I d="M4 7h11M9 3L5 21M16 3l-4 18" />
        </ToolbarButton>

        <ToolbarButton onClick={toggleFullscreen} title="Fullscreen">
          {isFullscreen ? (
            <I d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
          ) : (
            <I d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          )}
        </ToolbarButton> */}
      </div>

      {/* ══════════════════════════════════════════════════════
          Row 3 – IMAGE CONTROLS (chỉ hiện khi chọn ảnh)
          ══════════════════════════════════════════════════════ */}
      {isImageSelected && (
        <div className="flex flex-wrap items-center gap-1.5 px-2 py-1.5 border-t border-blue-100 bg-blue-50/50">
          <span className="text-xs font-medium text-blue-700">🖼 Ảnh</span>

          <Divider />

          {/* Width input */}
          <div className="flex items-center gap-1">
            <label className="text-[10px] text-gray-500 font-medium">W</label>
            <input
              type="number"
              value={imageSize.w}
              onChange={(e) =>
                setImageSize((prev) => ({ ...prev, w: e.target.value }))
              }
              onBlur={(e) => commitImageWidth(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitImageWidth(imageSize.w)
              }}
              className="tiptap-image-toolbar-input"
              min={30}
              placeholder="auto"
            />
          </div>

          <span className="text-xs text-gray-400">×</span>

          {/* Height input */}
          <div className="flex items-center gap-1">
            <label className="text-[10px] text-gray-500 font-medium">H</label>
            <input
              type="number"
              value={imageSize.h}
              onChange={(e) =>
                setImageSize((prev) => ({ ...prev, h: e.target.value }))
              }
              onBlur={(e) => commitImageHeight(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitImageHeight(imageSize.h)
              }}
              className="tiptap-image-toolbar-input"
              min={30}
              placeholder="auto"
            />
          </div>

          <Divider />

          {/* Preset sizes */}
          {[25, 50, 75, 100].map((pct) => (
            <ToolbarButton
              key={pct}
              onClick={() => applyImagePreset(pct)}
              title={`${pct}% kích thước gốc`}
            >
              <span className="text-[10px] font-bold">{pct}%</span>
            </ToolbarButton>
          ))}

          <Divider />

          {/* Reset to auto */}
          <ToolbarButton onClick={resetImageSize} title="Reset kích thước gốc">
            <span className="text-[10px] font-bold text-orange-600">Reset</span>
          </ToolbarButton>

          {/* Delete image */}
          <ToolbarButton
            onClick={() => editor.chain().focus().deleteSelection().run()}
            title="Xóa ảnh"
          >
            <span className="text-[10px] font-bold text-red-500">Xóa</span>
          </ToolbarButton>
        </div>
      )}
    </div>
  )
}

export default Toolbar