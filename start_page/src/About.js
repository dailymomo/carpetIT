import React from 'react'



const About = () => {

  const emailAddress = 'example@example.com';


  return (
<section className='Content'>
        <h1>
          What is CarpetIt?
        </h1>
        <p>
          Shopping website owned by Zahra
        </p>
        <br></br>
        <h1>
          What do we do?  
        </h1>
        <p>
          Users can purchase rugs on the website
        </p>
        <br></br>
        <h1>
        Why do we do it?
        </h1>
        <p>
          Because this can better provide Zahra users with a better shopping experience
        </p>
        <br></br>
        <h1>
        Who's behind RecordIt?
        </h1>
        <p>
        Here, our team members are Master student from UniMelb.
        </p>
        <p>Phone: (04) 88256155</p>
        <p>Our emailAddress is: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>  
    
        
    </section>
  )
}

export default About