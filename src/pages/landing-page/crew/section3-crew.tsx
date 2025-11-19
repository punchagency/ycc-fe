import LandingPageExitCard from '../../../components/landing-page/landing-page-exit'


const Section3Crew = () => {

    const sectionData = {
        title: 'Join Our Crew Network Today',
        subText: 'Elevate your career as a Yacht Crew member. Become a member of our Network and gain access to your department management tools.',
        button: {
            text: 'Join Now',
            path: '/get-started'
        }
    } 
  return (
    <LandingPageExitCard sectionData={sectionData} />
  )
}

export default Section3Crew