import { usePageTitle }  from '../hooks/usePageTitle'
import Hero            from '../components/home/Hero'
import ImageStrip      from '../components/home/ImageStrip'
import AboutSection    from '../components/home/AboutSection'
import StatsSection    from '../components/home/StatsSection'
import SponsorsPreview from '../components/home/SponsorsPreview'
import JoinCta         from '../components/ui/JoinCta'
import projects        from '../data/projects.json'
import sponsors        from '../data/sponsors.json'

export default function Home() {
  usePageTitle(null) // root — title is just "Stanford Student Robotics"
  return (
    <main>
      <Hero />
      <ImageStrip projects={projects} />
      <AboutSection />
      <StatsSection />
      <div className="container">
        <JoinCta
          headline="Ready to build something real?"
          body="We take on students from all disciplines — engineering, design, and everything in between. Applications open every quarter."
        />
      </div>
      <SponsorsPreview sponsors={sponsors} />
    </main>
  )
}
