import AboutPage from '@/components/about/About'
import ContactPage from '@/components/contact/Contact'
import DownloadCV from '@/components/cv'
import HomePage from '@/components/home/Home'
import ProjectsPage from '@/components/projects/Projects'
import React from 'react'

export default function Page() {
  return (
    <div>
      <HomePage />
      <div className='flex justify-center align-center'>

      <DownloadCV  />
      </div>
      <ProjectsPage />
      <AboutPage />
      

      <ContactPage />
    </div>
  )
}
