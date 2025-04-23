'use client'

import { useState, useEffect } from 'react'
import { X, Bold, Italic, List, Link, Image, AlignLeft, CheckSquare, Code, Plus } from 'lucide-react'

export interface NoteItem {
  id: number
  title: string
  content: string
  date: string
  tags: string[]
  formattedContent?: FormattedContent[]
}

type FormattedContent = {
  text: string
  format?: {
    bold?: boolean
    italic?: boolean
    code?: boolean
    link?: string
  }
  type: 'paragraph' | 'heading' | 'list-item' | 'check-item' | 'code-block'
  checked?: boolean
}

interface RichNoteProps {
  notes: NoteItem[]
  onAddNote: (note: Omit<NoteItem, 'id' | 'date'>) => void
  onDeleteNote: (id: number) => void
  onUpdateNote?: (id: number, note: Partial<NoteItem>) => void
}

export function RichNote({ notes, onAddNote, onDeleteNote, onUpdateNote }: RichNoteProps) {
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteForm, setNoteForm] = useState({ 
    title: '', 
    content: '', 
    tags: [] as string[], 
    currentTag: ''
  })
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [formatOptions, setFormatOptions] = useState({
    bold: false,
    italic: false,
    list: false,
    checkItem: false,
    code: false
  })

  // Load note for editing
  useEffect(() => {
    if (editingNoteId !== null) {
      const noteToEdit = notes.find(note => note.id === editingNoteId)
      if (noteToEdit) {
        setNoteForm({
          title: noteToEdit.title,
          content: noteToEdit.content,
          tags: noteToEdit.tags || [],
          currentTag: ''
        })
      }
    }
  }, [editingNoteId, notes])

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNoteForm({ ...noteForm, [name]: value })
  }

  const handleAddTag = () => {
    if (noteForm.currentTag && !noteForm.tags.includes(noteForm.currentTag)) {
      setNoteForm({
        ...noteForm,
        tags: [...noteForm.tags, noteForm.currentTag],
        currentTag: ''
      })
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNoteForm({
      ...noteForm,
      tags: noteForm.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingNoteId !== null && onUpdateNote) {
      onUpdateNote(editingNoteId, {
        title: noteForm.title,
        content: noteForm.content,
        tags: noteForm.tags
      })
    } else {
      onAddNote({
        title: noteForm.title,
        content: noteForm.content,
        tags: noteForm.tags
      })
    }
    
    resetForm()
  }

  const resetForm = () => {
    setNoteForm({ title: '', content: '', tags: [], currentTag: '' })
    setEditingNoteId(null)
    setShowNoteModal(false)
    setFormatOptions({
      bold: false,
      italic: false,
      list: false,
      checkItem: false,
      code: false
    })
  }

  const startEditingNote = (noteId: number) => {
    setEditingNoteId(noteId)
    setShowNoteModal(true)
  }

  const applyFormat = (format: keyof typeof formatOptions) => {
    setFormatOptions({
      ...formatOptions,
      [format]: !formatOptions[format]
    })
    
    // Here you would implement the actual formatting logic
    // For now, we just toggle the state for UI feedback
  }

  const parseFormattedContent = (content: string): FormattedContent[] => {
    // This is a simplified parser - in a real app you'd have more sophisticated parsing
    const lines = content.split('\n').filter(line => line.trim() !== '')
    
    return lines.map(line => {
      if (line.startsWith('# ')) {
        return { text: line.slice(2), type: 'heading' }
      } else if (line.startsWith('- ')) {
        return { text: line.slice(2), type: 'list-item' }
      } else if (line.startsWith('[ ] ')) {
        return { text: line.slice(4), type: 'check-item', checked: false }
      } else if (line.startsWith('[x] ')) {
        return { text: line.slice(4), type: 'check-item', checked: true }
      } else if (line.startsWith('```') && line.endsWith('```')) {
        return { text: line.slice(3, -3), type: 'code-block' }
      } else {
        // Simple detection of formatting within paragraphs
        let formattedText: FormattedContent = { text: line, type: 'paragraph' }
        
        // Check for bold formatting with **text**
        if (line.includes('**')) {
          formattedText.format = { bold: true }
        }
        
        // Check for italic formatting with *text*
        if (line.includes('*') && !line.includes('**')) {
          formattedText.format = { ...(formattedText.format || {}), italic: true }
        }
        
        // Check for code formatting with `text`
        if (line.includes('`')) {
          formattedText.format = { ...(formattedText.format || {}), code: true }
        }
        
        return formattedText
      }
    })
  }

  return (
    <div className="rich-note-container">
      {/* Add Note Button - Moved to header area to match other tabs */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Notes</h3>
        <button 
          onClick={() => setShowNoteModal(true)}
          className="bg-transparent text-white border border-[#444] rounded-full px-4 py-2 flex items-center text-sm hover:bg-[#2a2a2a] transition-all"
        >
          <Plus size={16} className="mr-1" />
          Add Note
        </button>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-8 text-[#999]">
          No notes yet. Add your first note to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map(note => {
            const formattedContent = parseFormattedContent(note.content)
            
            return (
              <div key={note.id} className="bg-[#252525] p-5 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{note.title}</h4>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => startEditingNote(note.id)}
                      className="text-[#999] hover:text-white"
                    >
                      <Code size={16} />
                    </button>
                    <button 
                      onClick={() => onDeleteNote(note.id)}
                      className="text-[#999] hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="note-content text-[#999] text-sm mb-3">
                  {formattedContent.map((item, index) => {
                    switch (item.type) {
                      case 'heading':
                        return <h3 key={index} className="text-white text-lg font-medium mb-2">{item.text}</h3>
                      
                      case 'list-item':
                        return (
                          <div key={index} className="flex items-start mb-1">
                            <span className="mr-2">•</span>
                            <span>{item.text}</span>
                          </div>
                        )
                      
                      case 'check-item':
                        return (
                          <div key={index} className="flex items-start mb-1">
                            <span className={`mr-2 ${item.checked ? 'text-green-400' : ''}`}>
                              {item.checked ? '☑' : '☐'}
                            </span>
                            <span className={item.checked ? 'line-through opacity-70' : ''}>
                              {item.text}
                            </span>
                          </div>
                        )
                      
                      case 'code-block':
                        return (
                          <pre key={index} className="bg-[#333] p-2 rounded mb-2 overflow-x-auto">
                            <code>{item.text}</code>
                          </pre>
                        )
                      
                      default:
                        return (
                          <p key={index} className="mb-2">
                            {item.format?.bold ? <strong>{item.text}</strong> : 
                             item.format?.italic ? <em>{item.text}</em> : 
                             item.format?.code ? <code className="bg-[#333] px-1 rounded">{item.text}</code> : 
                             item.text}
                          </p>
                        )
                    }
                  })}
                </div>
                
                {note.tags && note.tags.length > 0 && (
                  <div className="note-tags flex flex-wrap gap-2 mb-3">
                    {note.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-[#333] rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="text-xs text-[#777]">{note.date}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#252525] rounded-lg w-full max-w-2xl p-6 relative">
            <button 
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-semibold mb-4">
              {editingNoteId !== null ? 'Edit Note' : 'Add New Note'}
            </h2>
            
            <form onSubmit={handleSaveNote}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={noteForm.title}
                  onChange={handleNoteChange}
                  className="w-full p-2 bg-[#2c2c2c] border border-[#444] rounded-md text-white"
                  placeholder="Note Title"
                  required
                />
              </div>
              
              <div className="formatting-toolbar flex space-x-2 mb-2">
                <button 
                  type="button"
                  onClick={() => applyFormat('bold')}
                  className={`p-2 rounded ${formatOptions.bold ? 'bg-[#444]' : 'bg-[#333]'}`}
                >
                  <Bold size={16} />
                </button>
                <button 
                  type="button"
                  onClick={() => applyFormat('italic')}
                  className={`p-2 rounded ${formatOptions.italic ? 'bg-[#444]' : 'bg-[#333]'}`}
                >
                  <Italic size={16} />
                </button>
                <button 
                  type="button"
                  onClick={() => applyFormat('list')}
                  className={`p-2 rounded ${formatOptions.list ? 'bg-[#444]' : 'bg-[#333]'}`}
                >
                  <List size={16} />
                </button>
                <button 
                  type="button"
                  onClick={() => applyFormat('checkItem')}
                  className={`p-2 rounded ${formatOptions.checkItem ? 'bg-[#444]' : 'bg-[#333]'}`}
                >
                  <CheckSquare size={16} />
                </button>
                <button 
                  type="button"
                  onClick={() => applyFormat('code')}
                  className={`p-2 rounded ${formatOptions.code ? 'bg-[#444]' : 'bg-[#333]'}`}
                >
                  <Code size={16} />
                </button>
                <div className="text-xs text-[#777] ml-auto self-center">
                  Formatting: Use # for headings, * for italic, ** for bold, - for lists, [ ] for tasks, ```code``` for code blocks
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={noteForm.content}
                  onChange={handleNoteChange}
                  className="w-full p-2 bg-[#2c2c2c] border border-[#444] rounded-md text-white h-48 font-mono"
                  placeholder="Write your note here..."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {noteForm.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[#333] rounded-full flex items-center">
                      #{tag}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-[#999] hover:text-red-400"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    name="currentTag"
                    value={noteForm.currentTag}
                    onChange={handleNoteChange}
                    onKeyPress={handleTagKeyPress}
                    className="flex-grow p-2 bg-[#2c2c2c] border border-[#444] rounded-l-md text-white"
                    placeholder="Add tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-[#333] text-white rounded-r-md hover:bg-[#444]"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-transparent border border-[#444] text-white rounded-md hover:bg-[#2a2a2a]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f8a387] text-[#1a1a1a] font-medium rounded-md hover:opacity-90"
                >
                  {editingNoteId !== null ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </form>

            {/* Preview Section */}
            {noteForm.content && (
              <div className="mt-6 border-t border-[#444] pt-4">
                <h3 className="text-md font-medium mb-2">Preview</h3>
                <div className="bg-[#2a2a2a] p-4 rounded-md">
                  {parseFormattedContent(noteForm.content).map((item, index) => {
                    switch (item.type) {
                      case 'heading':
                        return <h3 key={index} className="text-white text-lg font-medium mb-2">{item.text}</h3>
                      
                      case 'list-item':
                        return (
                          <div key={index} className="flex items-start mb-1">
                            <span className="mr-2">•</span>
                            <span>{item.text}</span>
                          </div>
                        )
                      
                      case 'check-item':
                        return (
                          <div key={index} className="flex items-start mb-1">
                            <span className={`mr-2 ${item.checked ? 'text-green-400' : ''}`}>
                              {item.checked ? '☑' : '☐'}
                            </span>
                            <span className={item.checked ? 'line-through opacity-70' : ''}>
                              {item.text}
                            </span>
                          </div>
                        )
                      
                      case 'code-block':
                        return (
                          <pre key={index} className="bg-[#333] p-2 rounded mb-2 overflow-x-auto">
                            <code>{item.text}</code>
                          </pre>
                        )
                      
                      default:
                        return (
                          <p key={index} className="mb-2">
                            {item.format?.bold ? <strong>{item.text}</strong> : 
                             item.format?.italic ? <em>{item.text}</em> : 
                             item.format?.code ? <code className="bg-[#333] px-1 rounded">{item.text}</code> : 
                             item.text}
                          </p>
                        )
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

