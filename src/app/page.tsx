import { ProjectCard } from '@/components/ProjectCard'
import { TodoList } from '@/components/TodoList'

export default function Home() {
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
        <button className="new-project-btn bg-transparent text-white border border-[#444] rounded-full px-4 py-2 flex items-center text-sm hover:bg-[#2a2a2a] transition-all">
          <span className="plus-icon mr-1">+</span>
          NEW PROJECT
        </button>
      </div>
      
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ProjectCard 
          title="UNIVERSITY MANAGEMENT"
        description="MATERIALS AND ASSIGNMENT"
          progress={65}
          progressColor="coral"
          icon={
            <svg className="icon w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
              <rect x="20" y="60" width="20" height="20" />
              <rect x="50" y="30" width="30" height="50" />
            </svg>
          }
          actions={["OPEN", "DETAILS"]}
        />
        
        <ProjectCard 
          title="LAB ACTIVITY"
          description="RESEARCH AND MANAGEMENT"
          progress={40}
          progressColor="yellow"
          icon={
            <svg className="icon w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
              <rect x="25" y="40" width="50" height="20" />
              <line x1="30" y1="60" x2="30" y2="70" />
              <line x1="70" y1="60" x2="70" y2="70" />
            </svg>
          }
          actions={["OPEN", "DETAILS"]}
        />
        
        <ProjectCard 
          title="DEVELOPMENT ACTIVITY"
          description="PROJECT MANAGEMENT AND LEARNING"
          progress={80}
          progressColor="coral"
          icon={
            <svg className="icon w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
              <circle cx="50" cy="50" r="30" />
              <line x1="50" y1="20" x2="50" y2="80" />
              <line x1="20" y1="50" x2="80" y2="50" />
            </svg>
          }
          actions={["OPEN", "DETAILS"]}
        />
        
        <ProjectCard 
          title="TO DO LIST"
          description="Material exploration"
          progress={25}
          progressColor="yellow"
          icon={
            <svg className="icon w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
              <line x1="25" y1="25" x2="75" y2="25" />
              <line x1="25" y1="50" x2="75" y2="50" />
              <line x1="25" y1="75" x2="75" y2="75" />
              <line x1="25" y1="25" x2="25" y2="75" />
              <line x1="50" y1="25" x2="50" y2="75" />
              <line x1="75" y1="25" x2="75" y2="75" />
            </svg>
          }
          actions={["TODO"]}
        />
        
        <ProjectCard 
          title="NOTES"
          description="Natural and artificial lighting"
          progress={50}
          progressColor="yellow"
          icon={
            <svg className="icon w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
              <circle cx="50" cy="60" r="20" />
              <path d="M50 40 L50 20" />
              <path d="M50 20 C50 20, 40 30, 60 30" />
            </svg>
          }
          actions={["NOTES"]}
        />
        
        <ProjectCard 
          title="FILES"
          description="Eco-friendly options"
          progress={15}
          progressColor="coral"
          icon={
            <svg className="icon w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2">
              <path d="M50 20 C70 20, 80 50, 60 70 C40 90, 20 70, 30 50 C40 30, 60 40, 50 20" />
            </svg>
          }
          actions={["FILES"]}
        />
      </div>
      
      <TodoList />
    </main>
  )
} 