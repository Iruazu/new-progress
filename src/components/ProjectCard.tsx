'use client'

import { ReactNode, useState } from 'react'
import { ProjectDetailPage } from './ProjectDetailPage'

interface ProjectCardProps {
  title: string
  description: string
  progress: number
  progressColor: 'coral' | 'yellow'
  icon: ReactNode
  actions: string[]
}

export function ProjectCard({ title, description, progress, progressColor, icon, actions }: ProjectCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'todo' | 'notes' | 'files' | null>(null)
  
  const handleActionClick = (action: string) => {
    if (action === 'OPEN') {
      setIsDetailOpen(true)
      
      // Set default tab based on project type
      if (actions.includes('TODO')) {
        setActiveTab('todo')
      } else if (actions.includes('NOTES')) {
        setActiveTab('notes')
      } else if (actions.includes('FILES')) {
        setActiveTab('files')
      }
    } else if (action === 'DETAILS') {
      setIsDetailOpen(true)
      setActiveTab(null)
    } else if (action === 'TODO') {
      setIsDetailOpen(true)
      setActiveTab('todo')
    } else if (action === 'NOTES') {
      setIsDetailOpen(true)
      setActiveTab('notes')
    } else if (action === 'FILES') {
      setIsDetailOpen(true)
      setActiveTab('files')
    }
  }
  
  const handleCloseDetail = () => {
    setIsDetailOpen(false)
  }

  return (
    <>
      <div className="project-card bg-[#252525] rounded-lg overflow-hidden">
        <div className="project-header p-5">
          <h3 className="project-title text-lg font-semibold mb-1">{title}</h3>
          <div className="project-description text-[#999] text-sm mb-4">{description}</div>
          <div className="progress-container mb-4">
            <div className="progress-label flex justify-between text-[#999] text-xs mb-2">
              <span>PROGRESS</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar h-1 bg-[#333] rounded-full overflow-hidden">
              <div 
                className={`progress h-full rounded-full ${
                  progressColor === 'coral' ? 'bg-[#f8a387]' : 'bg-[#e2b04a]'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="icon-container bg-[#2c2c2c] flex justify-center items-center py-8">
          {icon}
        </div>
        <div className="project-actions flex border-t border-[#333]">
          {actions.map((action, index) => (
            <button
              key={action}
              className={`action-btn flex-1 py-3 bg-transparent border-none text-white text-sm cursor-pointer hover:bg-[#2a2a2a] transition-all ${
                index !== actions.length - 1 ? 'border-r border-[#333]' : ''
              }`}
              onClick={() => handleActionClick(action)}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
      
      {isDetailOpen && (
        <ProjectDetailPage
          title={title}
          description={description}
          progress={progress}
          progressColor={progressColor}
          icon={icon}
          onClose={handleCloseDetail}
          initialTab={activeTab}
        />
      )}
    </>
  )
}