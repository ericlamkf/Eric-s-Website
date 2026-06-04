import React, { useState } from 'react'
import './Skills.css'

const skills = [
    // Frontend
    { name: "HTML5/CSS", level: 95, category: "frontend" },
    { name: "JavaScript/TypeScript", level: 90, category: "frontend" },
    { name: "React", level: 80, category: "frontend" },
    { name: "Tailwind CSS", level: 70, category: "frontend" },
    { name: "XML", level: 90, category: "frontend" },

    // Backend
    { name: "Python", level: 90, category: "backend" },
    { name: "Java", level: 95, category: "backend" },
    { name: "Spring Boot", level: 60, category: "backend" },
    { name: "Firebase", level: 80, category: "backend" },
    { name: "Supabase", level: 80, category: "backend" },
    { name: "C", level: 80, category: "backend" },

    // Tool
    { name: "Git/GitHub", level: 90, category: "tools" },
    { name: "Figma", level: 90, category: "tools" },
    { name: "Android Studio", level: 90, category: "tools" },
    { name: "Postman", level: 90, category: "tools" },
    { name: "Google Colab", level: 90, category: "tools" },

];

const categories = ["all", "frontend", "backend", "tools"]

const Skills = () => {
    const [currentCategory, setCurrentCategory] = useState("all");
    const filteredSkills = skills.filter((skill) => currentCategory === "all" || skill.category === currentCategory)

    return (
        <div className='skills'>
            <div className="category">
                {categories.map((category, key) => (
                    <button key={key} onClick={() => setCurrentCategory(category)} className={'category-btn ' + (category === currentCategory ? "active" : "")}>
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="skills-container">
                {filteredSkills.map((skill, key) => (
                    <div className="skill-card">
                        {/* Skill Name */}
                        <div className="skill-name">
                            <h3>{skill.name}</h3>
                        </div>

                        {/* Skill Level */}
                        <div className="skill-level">
                            <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                        </div>

                        {/* Percentage */}
                        <div className="skill-percent">
                            {skill.level}%
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Skills
