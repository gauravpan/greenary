import Footer from '../src/components/Footer'
import HeroSection from '../src/components/HeroSection'
import HireSection from '../src/components/HireSection'
import Services from '../src/components/Services'
import { Box } from '@chakra-ui/react'
About.title = 'About | Agro'
About.Layout = ({ children }) => <>{children}</>
export default function About() {
  return (
    <Box>
      <HeroSection />
      <Services />
      <HireSection />
      <Footer />
    </Box>
  )
}
