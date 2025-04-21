'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { TodoList } from '@/components/TodoList'
import { NewProjectModal, NewProjectData } from '@/components/NewProjectModal'
import { ProjectIcon, IconType } from '@/components/ProjectIcons'

// Define project type to use throughout the application
export interface Project {
  id: string
  title: string
  description: string
  progress: number
  progressColor: 'coral' | 'yellow'
  iconType: IconType
  actions: string[]
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'UNIVERSITY MANAGEMENT',
      description: 'MATERIALS AND ASSIGNMENT',
      progress: 65,
      progressColor: 'coral',
      iconType: 'desktop',
      actions: ['OPEN', 'DETAILS', 'EDIT', 'DELETE']
    },
    {
      id: '2',
      title: 'LAB ACTIVITY',
      description: 'RESEARCH AND MANAGEMENT',
      progress: 40,
      progressColor: 'yellow',
      iconType: 'table',
      actions: ['OPEN', 'DETAILS', 'EDIT', 'DELETE']
    },
    {
      id: '3',
      title: 'DEVELOPMENT ACTIVITY',
      description: 'PROJECT MANAGEMENT AND LEARNING',
      progress: 80,
      progressColor: 'coral',
      iconType: 'circle',
      actions: ['OPEN', 'DETAILS', 'EDIT', 'DELETE']
    },
    {
      id: '4',
      title: 'TO DO LIST',
      description: 'Material exploration',
      progress: 25,
      progressColor: 'yellow',
      iconType: 'grid',
      actions: ['TODO', 'EDIT', 'DELETE']
    },
    {
      id: '5',
      title: 'NOTES',
      description: 'Natural and artificial lighting',
      progress: 50,
      progressColor: 'yellow',
      iconType: 'timer',
      actions: ['NOTES', 'EDIT', 'DELETE']
    },
    {
      id: '6',
      title: 'FILES',
      description: 'Eco-friendly options',
      progress: 15,
      progressColor: 'coral',
      iconType: 'leaf',
      actions: ['FILES', 'EDIT', 'DELETE']
    }
  ])

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project)
    } else {
      setEditingProject(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
  }

  const handleSaveProject = (projectData: NewProjectData) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...projectData } 
          : project
      ))
    } else {
      // Create new project
      const newProject: Project = {
        id: Date.now().toString(),
        ...projectData,
        actions: [...projectData.actions, 'EDIT', 'DELETE']
      }
      
      setProjects([...projects, newProject])
    }
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="header flex items-center mb-6">
        <div className="logo w-6 h-6 bg-[#f8a387] rounded-full mr-4"></div>
        <h1 className="title text-2xl font-semibold tracking-wider">PROGRESS PALETTE</h1>
      </div>
      
      <div className="subtitle text-[#999] text-sm mb-8">
        Modern dashboard for your design and productivity projects
      </div>
      
      <div className="projects-header flex justify-between items-center mb-6">
        <h2 className="projects-title text-xl font-semibold tracking-wider">PROJECTS</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="new-project-btn bg-transparent text-white border border-[#444] rounded-full px-4 py-2 flex items-center text-sm hover:bg-[#2a2a2a] transition-all"
        >
          <span className="plus-icon mr-1">+</span>
          NEW PROJECT
        </button>
      </div>
      
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map(project => (
          <ProjectCard 
            key={project.id}
            project={project}
            onEdit={() => handleOpenModal(project)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))}
      </div>
      
      <TodoList />

      <NewProjectModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
        editProject={editingProject}
      />
    </main>
  )
}