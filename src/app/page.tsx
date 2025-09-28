import AboutPage from '@/components/about/About'
import ContactPage from '@/components/contact/Contact'
import HomePage from '@/components/home/Home'
import ProjectsPage from '@/components/projects/Projects'
import React from 'react'

export default function Page() {
  return (
    <div>
      <HomePage />
      <ProjectsPage />
      <AboutPage />
      <ContactPage />
    </div>
  )
}
