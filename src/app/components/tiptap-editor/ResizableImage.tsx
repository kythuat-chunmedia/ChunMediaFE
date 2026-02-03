'use client'

import React, { useEffect, useRef, useState } from 'react'
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react'

type Handle = 'nw' | 'n' | 'ne' | 'w' | 'e' | 'sw' | 's' | 'se'

const MIN_SIZE = 30

const HANDLES: { id: Handle; style: React.CSSProperties; cursor: string }[] = [
  { id: 'nw', style: { top: -4, left: -4 }, cursor: 'nw-resize' },
  { id: 'n', style: { top: -4, left: '50%', transform: 'translateX(-50%)' }, cursor: 'ns-resize' },
  { id: 'ne', style: { top: -4, right: -4 }, cursor: 'ne-resize' },
  { id: 'w', style: { top: '50%', left: -4, transform: 'translateY(-50%)' }, cursor: 'ew-resize' },
  { id: 'e', style: { top: '50%', right: -4, transform: 'translateY(-50%)' }, cursor: 'ew-resize' },
  { id: 'sw', style: { bottom: -4, left: -4 }, cursor: 'sw-resize' },
  { id: 's', style: { bottom: -4, left: '50%', transform: 'translateX(-50%)' }, cursor: 'ns-resize' },
  { id: 'se', style: { bottom: -4, right: -4 }, cursor: 'se-resize' },
]

export const ResizableImageComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [displaySize, setDisplaySize] = useState<{ w: number; h: number } | null>(null)

  // Refs for drag state (no re-render needed during drag)
  const dragRef = useRef({
    active: false,
    handle: '' as Handle,
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
    ratio: 1,
  })
  const currentSizeRef = useRef({ w: 0, h: 0 })
  const updateAttrsRef = useRef(updateAttributes)
  updateAttrsRef.current = updateAttributes

  const { src, alt, title, width, height } = node.attrs

  // Current display dimensions
  const displayW = displaySize?.w ?? width ?? undefined
  const displayH = displaySize?.h ?? height ?? undefined

  // Global mouse listeners (always mounted, check drag.active)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return
      e.preventDefault()

      const { handle, startX, startY, startW, startH, ratio } = dragRef.current
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let newW = startW
      let newH = startH

      // Corner handles: maintain aspect ratio (based on width)
      // Edge handles: change one dimension only
      switch (handle) {
        case 'se': newW = startW + dx; newH = newW / ratio; break
        case 'sw': newW = startW - dx; newH = newW / ratio; break
        case 'ne': newW = startW + dx; newH = newW / ratio; break
        case 'nw': newW = startW - dx; newH = newW / ratio; break
        case 'e':  newW = startW + dx; break
        case 'w':  newW = startW - dx; break
        case 's':  newH = startH + dy; break
        case 'n':  newH = startH - dy; break
      }

      newW = Math.max(MIN_SIZE, Math.round(newW))
      newH = Math.max(MIN_SIZE, Math.round(newH))

      currentSizeRef.current = { w: newW, h: newH }
      setDisplaySize({ w: newW, h: newH })
    }

    const onMouseUp = () => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      setIsResizing(false)

      // Commit the final size to the document
      const { w, h } = currentSizeRef.current
      if (w > 0 && h > 0) {
        updateAttrsRef.current({ width: w, height: h })
      }
      setDisplaySize(null)

      // Restore body styles
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const startResize = (e: React.MouseEvent, handle: Handle) => {
    e.preventDefault()
    e.stopPropagation()

    const img = imgRef.current
    if (!img) return

    // Use client dimensions as the starting size
    const w = width || img.clientWidth || img.naturalWidth
    const h = height || img.clientHeight || img.naturalHeight
    const ratio = w / h || 1

    dragRef.current = {
      active: true,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startW: w,
      startH: h,
      ratio,
    }
    currentSizeRef.current = { w, h }

    setIsResizing(true)
    setDisplaySize({ w, h })

    // Prevent text selection & set cursor during drag
    document.body.style.userSelect = 'none'
    document.body.style.cursor = HANDLES.find((h) => h.id === handle)?.cursor || 'default'
  }

  const imgStyle: React.CSSProperties = {
    width: displayW ? `${displayW}px` : undefined,
    height: displayH ? `${displayH}px` : undefined,
  }

  const showHandles = selected || isResizing

  return (
    <NodeViewWrapper as="div" className="tiptap-resizable-image-wrapper">
      <div className="tiptap-resizable-image-container">
        <img
          ref={imgRef}
          src={src}
          alt={alt || ''}
          title={title || ''}
          style={imgStyle}
          className={`tiptap-resizable-image ${selected ? 'selected' : ''}`}
          draggable={false}
        />

        {/* Resize handles */}
        {showHandles &&
          HANDLES.map(({ id, style, cursor }) => (
            <div
              key={id}
              onMouseDown={(e) => startResize(e, id)}
              className={`tiptap-resize-handle ${isResizing ? 'active' : ''}`}
              style={{ ...style, cursor, position: 'absolute' }}
            />
          ))}

        {/* Size tooltip during resize */}
        {isResizing && displaySize && (
          <div className="tiptap-resize-tooltip">
            {displaySize.w} × {displaySize.h}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export default ResizableImageComponent