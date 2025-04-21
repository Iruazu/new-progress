'use client'

import { ReactNode, useState } from 'react'
import { X } from 'lucide-react'
import { TodoList } from './TodoList'

interface ProjectDetailPageProps {
  title: string
  description: string
  progress: number
  progressColor: 'coral' | 'yellow'
  icon: ReactNode
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
  title,
  description,
  progress,
  progressColor,
  icon,
  onClose,
  initialTab
}: ProjectDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'todo' | 'notes' | 'files' | null>(initialTab)
  
  // Sample notes and files data
  const [notes] = useState<NoteItem[]>([
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
  
  const [files] = useState<FileItem[]>([
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
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Notes</h3>
                <button className="px-4 py-2 bg-transparent border border-[#444] rounded-md hover:bg-[#2a2a2a] text-sm">
                  + Add Note
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map(note => (
                  <div key={note.id} className="bg-[#252525] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{note.title}</h4>
                    <p className="text-[#999] text-sm mb-4">{note.content}</p>
                    <div className="text-xs text-[#777]">{note.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'files' && (
            <div className="files-content">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Files</h3>
                <button className="px-4 py-2 bg-transparent border border-[#444] rounded-md hover:bg-[#2a2a2a] text-sm">
                  + Upload File
                </button>
              </div>
              
              <div className="bg-[#252525] rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#2c2c2c]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#999] uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#999] uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#999] uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#999] uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#999] uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#333]">
                    {files.map(file => (
                      <tr key={file.id} className="hover:bg-[#2a2a2a]">
                        <td className="px-6 py-4 text-sm">{file.name}</td>
                        <td className="px-6 py-4 text-sm text-[#999]">{file.type}</td>
                        <td className="px-6 py-4 text-sm text-[#999]">{file.size}</td>
                        <td className="px-6 py-4 text-sm text-[#999]">{file.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-[#999] hover:text-white">View</button>
                            <button className="text-[#999] hover:text-white">Download</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}