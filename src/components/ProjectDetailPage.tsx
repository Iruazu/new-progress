'use client'

import { ReactNode, useState } from 'react'
import { X, Plus } from 'lucide-react'
import { TodoList } from './TodoList'
import { Project } from '@/app/page'
import { ProjectIcon } from './ProjectIcons'

interface ProjectDetailPageProps {
  project: Project
  onClose: () => void
  initialTab: 'todo' | 'notes' | 'files' | null
}

interface NoteItem {
  id: number
  title: string
  content: string
  date: string
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
  
  // Note state and handlers
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 1,
      title: 'Lighting Research',
      content: 'Consider both natural and artificial lighting options for the space. Research energy-efficient solutions.',
      date: '2025-04-10'
    },
    {
      id: 2,
      title: 'Material Selection',
      content: 'Focus on sustainable and eco-friendly materials that align with project goals.',
      date: '2025-04-15'
    }
  ])
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteForm, setNoteForm] = useState({ title: '', content: '' })
  
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
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNoteForm({ ...noteForm, [name]: value })
  }
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    const newNote: NoteItem = {
      id: Date.now(),
      title: noteForm.title,
      content: noteForm.content,
      date: new Date().toISOString().split('T')[0]
    }
    setNotes([...notes, newNote])
    setNoteForm({ title: '', content: '' })
    setShowNoteModal(false)
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
  
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }
  
  const handleDeleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id))
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
            </div