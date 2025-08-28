import React, { useRef } from 'react'
import Hero from './Hero'
import Services from './Services'
import OurServices from './OurServices'
import Mission from './Mission'

const HomePage = () => {
  const ourServicesRef = useRef<HTMLDivElement | null>(null)

  const scrollToServices = () => {
    ourServicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className='bg-zinc-100 -z-10'>
      <Hero onScrollClick={scrollToServices} />
      <Services />
      <div ref={ourServicesRef}>
        <OurServices />
        <Mission/>
      </div>
    </div>
  )
}

export default HomePage
