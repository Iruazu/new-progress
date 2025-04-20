"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CheckSquare } from "lucide-react";
// Define custom components instead of importing from non-existent paths
// Card Components
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`rounded-lg ${className}`}>{children}</div>
);

const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <p className={`text-sm text-gray-400 ${className}`}>{children}</p>
);

const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`px-5 pb-5 ${className}`}>{children}</div>
);

const CardFooter = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`px-0 py-0 ${className}`}>{children}</div>
);

// Progress Component
const Progress = ({ value, className, style }: { value: number, className?: string, style?: React.CSSProperties }) => (
  <div 
    className={`w-full h-1 bg-gray-700 rounded-full overflow-hidden ${className}`}
    style={style}
  >
    <div 
      className="h-full" 
      style={{ 
        width: `${value}%`, 
        backgroundColor: style?.['--progress-fill'] as string || '#f8a387' 
      }} 
    />
  </div>
);

// Button Component
const Button = ({ 
  variant = "default", 
  size = "default", 
  className, 
  children 
}: { 
  variant?: "default" | "outline" | "ghost", 
  size?: "default" | "sm" | "lg", 
  className?: string, 
  children: React.ReactNode 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-800 bg-transparent";
      case "ghost":
        return "bg-transparent hover:bg-gray-800/50";
      default:
        return "bg-[#f8a387] text-white hover:bg-[#f8a387]/90";
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-1 px-3 text-sm";
      case "lg":
        return "py-3 px-6 text-lg";
      default:
        return "py-2 px-4";
    }
  };
  
  return (
    <button 
      className={`rounded font-medium focus:outline-none transition-colors ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

// Project Type definition
interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  image: string;
  color: string;
}

// Mock data for projects
const projects: Project[] = [
  {
    id: 1,
    name: "INTERIOR DESIGN",
    description: "Modern living space concepts",
    progress: 65,
    image: "living-room",
    color: "#f8a387" // Coral
  },
  {
    id: 2,
    name: "FURNITURE LAYOUT",
    description: "Spatial arrangement study",
    progress: 40,
    image: "furniture",
    color: "#e2b04a" // Golden
  },
  {
    id: 3,
    name: "COLOR PALETTE",
    description: "Seasonal color combinations",
    progress: 80,
    image: "palette",
    color: "#f8a387" // Coral
  },
  {
    id: 4,
    name: "TEXTURE STUDY",
    description: "Material exploration",
    progress: 25,
    image: "texture",
    color: "#e2b04a" // Golden
  },
  {
    id: 5,
    name: "LIGHTING PLAN",
    description: "Natural and artificial lighting",
    progress: 50,
    image: "lighting",
    color: "#e2b04a" // Golden
  },
  {
    id: 6,
    name: "SUSTAINABLE MATERIALS",
    description: "Eco-friendly options",
    progress: 15,
    image: "sustainable",
    color: "#f8a387" // Coral
  }
];

// Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  index: number;
}> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border border-gray-800 bg-[#252525] hover:border-gray-700 transition-all duration-300">
        <CardHeader className="p-5">
          <CardTitle className="text-lg font-semibold tracking-wide">{project.name}</CardTitle>
          <CardDescription className="text-gray-400 text-sm">
            {project.description}
          </CardDescription>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs text-gray-400">
              <span>PROGRESS</span>
              <span>{project.progress}%</span>
            </div>
            <Progress 
              value={project.progress} 
              className="h-1" 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                '--progress-fill': project.color
              } as React.CSSProperties} 
            />
          </div>
        </CardHeader>
        <div 
          className="h-48 flex items-center justify-center" 
          style={{ backgroundColor: `${project.color}10` }}
        >
          <div className="flex items-center justify-center w-20 h-20">
            {project.image === "living-room" && (
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="2">
                <rect x="20" y="60" width="20" height="20" />
                <rect x="50" y="30" width="30" height="50" />
              </svg>
            )}
            {project.image === "furniture" && (
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="2">
                <rect x="25" y="40" width="50" height="20" />
                <line x1="30" y1="60" x2="30" y2="70" />
                <line x1="70" y1="60" x2="70" y2="70" />
              </svg>
            )}
            {project.image === "palette" && (
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="50" cy="50" r="30" />
                <line x1="50" y1="20" x2="50" y2="80" />
                <line x1="20" y1="50" x2="80" y2="50" />
              </svg>
            )}
            {project.image === "texture" && (
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="2">
                <line x1="25" y1="25" x2="75" y2="25" />
                <line x1="25" y1="50" x2="75" y2="50" />
                <line x1="25" y1="75" x2="75" y2="75" />
                <line x1="25" y1="25" x2="25" y2="75" />
                <line x1="50" y1="25" x2="50" y2="75" />
                <line x1="75" y1="25" x2="75" y2="75" />
              </svg>
            )}
            {project.image === "lighting" && (
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="50" cy="60" r="20" />
                <path d="M50 40 L50 20" />
                <path d="M50 20 C50 20, 40 30, 60 30" />
              </svg>
            )}
            {project.image === "sustainable" && (
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M50 20 C70 20, 80 50, 60 70 C40 90, 20 70, 30 50 C40 30, 60 40, 50 20" />
              </svg>
            )}
          </div>
        </div>
        <CardFooter className="p-0 flex border-t border-gray-800">
          <Button variant="ghost" size="sm" className="flex-1 rounded-none h-12 text-xs tracking-wide hover:bg-gray-800/50">
            {index < 3 ? "OPEN" : index === 3 ? "TODO" : index === 4 ? "NOTES" : "FILES"}
          </Button>
          {index < 3 && (
            <>
              <div className="w-px bg-gray-800" />
              <Button variant="ghost" size="sm" className="flex-1 rounded-none h-12 text-xs tracking-wide hover:bg-gray-800/50">
                DETAILS
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Dashboard Component
export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      {/* Header */}
      <header className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="w-6 h-6 rounded-full bg-[#f8a387]" />
          <h1 className="text-2xl font-semibold tracking-wider">
            PROGRESS PALETTE
          </h1>
        </motion.div>
        <p className="text-gray-400 text-sm tracking-wide">
          Modern dashboard for your design and productivity projects
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Projects Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold tracking-wide">PROJECTS</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-gray-700 hover:border-[#f8a387] hover:text-[#f8a387] transition-all duration-300"
            >
              <Plus size={16} className="mr-2" />
              NEW PROJECT
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Todo Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="border border-gray-800 bg-[#252525]">
            <CardHeader>
              <CardTitle className="tracking-wide">TODO ITEMS</CardTitle>
              <CardDescription>
                Track and manage your project tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { text: "Finalize color palette for living room", completed: true },
                  { text: "Source sustainable materials for flooring", completed: false },
                  { text: "Create lighting plan for dining area", completed: false }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center p-3 rounded ${item.completed ? 'opacity-60' : 'border border-gray-800 bg-[#2c2c2c]'}`}
                  >
                    <div className="relative">
                      <div className={`flex items-center justify-center w-5 h-5 rounded ${item.completed ? 'bg-[#f8a387]' : 'border border-gray-700'}`}>
                        {item.completed && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`ml-3 ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
};