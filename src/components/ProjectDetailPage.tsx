'use client'

import { ReactNode, useState, useEffect } from 'react'
import { X, Plus, File, FileText, Image, Table } from 'lucide-react'
import { TodoList } from './TodoList'
import { Project } from '@/app/page'
import { ProjectIcon } from './ProjectIcons'
import { RichNote, NoteItem } from './RichNote'

interface ProjectDetailPageProps {
  project: Project
  onClose: () => void
  initialTab: 'todo' | 'notes' | 'files' | null
}

interface FileItem {
  id: number
  name: string
  type: string
  size: string
  date: string
}

export function ProjectDetailPage({
  project,
  onClose,
  initialTab
}: ProjectDetailPageProps) {
  const { title, description, progress, progressColor, iconType } = project
  const [activeTab, setActiveTab] = useState<'todo' | 'notes' | 'files' | null>(initialTab)
  const icon = <ProjectIcon type={iconType} />
  
  // Rich Note state
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 1,
      title: 'Lighting Research',
      content: '# Lighting Options\n\n**Natural lighting** considerations:\n- Window placement\n- Skylights\n- Light wells\n\n**Artificial lighting** options:\n- LED fixtures\n- Smart lighting systems\n- Energy-efficient solutions',
      date: '2025-04-10',
      tags: ['lighting', 'research']
    },
    {
      id: 2,
      title: 'Material Selection',
      content: '# Sustainable Materials\n\nFocus on *eco-friendly* materials that align with project goals:\n\n- Recycled content\n- Renewable resources\n- Low VOC emissions\n\n[ ] Research bamboo flooring\n[x] Contact sustainable suppliers\n[ ] Compare cost efficiency',
      date: '2025-04-15',
      tags: ['materials', 'sustainability']
    }
  ])
  
  // File state and handlers
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: 'project_requirements.pdf',
      type: 'PDF',
      size: '2.4 MB',
      date: '2025-04-05'
    },
    {
      id: 2,
      name: 'color_palette.png',
      type: 'Image',
      size: '840 KB',
      date: '2025-04-12'
    },
    {
      id: 3,
      name: 'project_timeline.xlsx',
      type: 'Spreadsheet',
      size: '1.2 MB',
      date: '2025-04-18'
    }
  ])
  const [showFileModal, setShowFileModal] = useState(false)
  const [fileForm, setFileForm] = useState({ name: '', type: 'Document', size: '' })
  
  const handleAddNote = (note: Omit<NoteItem, 'id' | 'date'>) => {
    const newNote: NoteItem = {
      id: Date.now(),
      title: note.title,
      content: note.content,
      tags: note.tags || [],
      date: new Date().toISOString().split('T')[0]
    }
    setNotes([...notes, newNote])
  }
  
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }
  
  const handleUpdateNote = (id: number, updatedNote: Partial<NoteItem>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updatedNote }
        : note
    ))
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFileForm({ ...fileForm, [name]: value })
  }
  
  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault()
    const newFile: FileItem = {
      id: Date.now(),
      name: fileForm.name,
      type: fileForm.type,
      size: fileForm.size || '0 KB',
      date: new Date().toISOString().split('T')[0]
    }
    setFiles([...files, newFile])
    setFileForm({ name: '', type: 'Document', size: '' })
    setShowFileModal(false)
  }
  
  const handleDeleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id))
  }

  // Helper function to get the appropriate file icon
  const getFileIcon = (type: string): ReactNode => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-red-400" size={20} />
      case 'image':
        return <Image className="text-blue-400" size={20} />
      case 'spreadsheet':
        return <Table className="text-green-400" size={20} />
      default:
        return <File className="text-gray-400" size={20} />
    }
  }

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] z-50 overflow-auto">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="mr-4">
              {icon}
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-wider">{title}</h1>
              <p className="text-[#999] text-sm">{description}</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="progress-container mb-8">
          <div className="progress-label flex justify-between text-[#999] text-sm mb-2">
            <span>PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar h-2 bg-[#333] rounded-full overflow-hidden">
            <div 
              className={`progress h-full rounded-full ${
                progressColor === 'coral' ? 'bg-[#f8a387]' : 'bg-[#e2b04a]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="tabs-container border-b border-[#333] mb-8">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === null ? 'text-white border-b-2 border-white' : 'text-[#999]'
              }`}
              onClick={() => setActiveTab(null)}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'todo' ? 'text-white border-b-2 border-white' : 'text-[#999]'
              }`}
              onClick={() => setActiveTab('todo')}
            >
              To Do List
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notes' ? 'text-white border-b-2 border-white' : 'text-[#999]'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'files' ? 'text-white border-b-2 border-white' : 'text-[#999]'
              }`}
              onClick={() => setActiveTab('files')}
            >
              Files
            </button>
          </div>
        </div>
        
        <div className="content-container">
          {activeTab === null && (
            <div className="overview-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#252525] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#999] text-sm">Title</p>
                      <p>{title}</p>
                    </div>
                    <div>
                      <p className="text-[#999] text-sm">Description</p>
                      <p>{description}</p>
                    </div>
                    <div>
                      <p className="text-[#999] text-sm">Progress</p>
                      <p>{progress}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#252525] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f8a387] rounded-full mr-3"></div>
                      <p className="text-sm">Project created</p>
                      <p className="text-[#999] text-sm ml-auto">April 21, 2025</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f8a387] rounded-full mr-3"></div>
                      <p className="text-sm">Progress updated to {progress}%</p>
                      <p className="text-[#999] text-sm ml-auto">April 21, 2025</p>
                    </div>
                    {notes.length > 0 && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#f8a387] rounded-full mr-3"></div>
                        <p className="text-sm">Added note: {notes[notes.length - 1].title}</p>
                        <p className="text-[#999] text-sm ml-auto">{notes[notes.length - 1].date}</p>
                      </div>
                    )}
                    {files.length > 0 && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#f8a387] rounded-full mr-3"></div>
                        <p className="text-sm">Added file: {files[files.length - 1].name}</p>
                        <p className="text-[#999] text-sm ml-auto">{files[files.length - 1].date}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'todo' && (
            <div className="todo-content">
              <TodoList />
            </div>
          )}
          
          {activeTab === 'notes' && (
  <div className="notes-content">
    {/* RichNote 内に Add Note ボタン含まれているのでここは空でOK */}
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Notes</h3>
      <div className="h-8">{/* ←このままでOK */}</div>
    </div>

    {/* ←ここを常に表示するようにする */}
    <RichNote 
      notes={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onUpdateNote={handleUpdateNote}
    />
  </div>
)}

          
          {activeTab === 'files' && (
            <div className="files-content">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Files</h3>
                <button 
                  onClick={() => setShowFileModal(true)}
                  className="bg-transparent text-white border border-[#444] rounded-full px-4 py-2 flex items-center text-sm hover:bg-[#2a2a2a] transition-all"
                >
                  <Plus size={16} className="mr-1" />
                  Upload File
                </button>
              </div>
              
              {files.length === 0 ? (
                <div className="text-center py-8 text-[#999]">
                  No files yet. Upload your first file to get started.
                </div>
              ) : (
                <div className="bg-[#252525] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#333]">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-[#999]">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-[#999]">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-[#999]">Size</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-[#999]">Date</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-[#999]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map(file => (
                        <tr key={file.id} className="border-t border-[#333]">
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              {getFileIcon(file.type)}
                              <span className="ml-2">{file.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#999]">{file.type}</td>
                          <td className="px-4 py-3 text-sm text-[#999]">{file.size}</td>
                          <td className="px-4 py-3 text-sm text-[#999]">{file.date}</td>
                          <td className="px-4 py-3 text-sm text-right">
                            <button 
                              onClick={() => handleDeleteFile(file.id)}
                              className="text-[#999] hover:text-red-400"
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Add File Modal */}
              {showFileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-[#252525] rounded-lg w-full max-w-md p-6 relative">
                    <button 
                      onClick={() => setShowFileModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                    
                    <h2 className="text-xl font-semibold mb-4">Upload File</h2>
                    
                    <form onSubmit={handleAddFile}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          File Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={fileForm.name}
                          onChange={handleFileChange}
                          className="w-full p-2 bg-[#2c2c2c] border border-[#444] rounded-md text-white"
                          placeholder="example.pdf"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          File Type
                        </label>
                        <select
                          name="type"
                          value={fileForm.type}
                          onChange={handleFileChange}
                          className="w-full p-2 bg-[#2c2c2c] border border-[#444] rounded-md text-white"
                        >
                          <option value="Document">Document</option>
                          <option value="PDF">PDF</option>
                          <option value="Image">Image</option>
                          <option value="Spreadsheet">Spreadsheet</option>
                          <option value="Video">Video</option>
                          <option value="Audio">Audio</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          File Size
                        </label>
                        <input
                          type="text"
                          name="size"
                          value={fileForm.size}
                          onChange={handleFileChange}
                          className="w-full p-2 bg-[#2c2c2c] border border-[#444] rounded-md text-white"
                          placeholder="1.5 MB"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowFileModal(false)}
                          className="px-4 py-2 bg-transparent border border-[#444] text-white rounded-md hover:bg-[#2a2a2a]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#f8a387] text-[#1a1a1a] font-medium rounded-md hover:opacity-90"
                        >
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}