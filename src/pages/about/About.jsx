import { FaLinkedin, FaTwitter, FaInstagram, FaRobot } from 'react-icons/fa';
import ConfettiExplosion from 'react-confetti-explosion';
import { useEffect, useState } from 'react';
const TeamMember = ({ name, role, image }) => (
  <div className="flex flex-col items-center mb-8">
    <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 mb-4">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
  </div>
);

const About = () => {
  const [isExploding, setIsExploding] = useState({width:window.innerWidth, height:window.innerHeight});
const [Btn, setBtn]=useState(false)
  const detectSize=()=>{
    setIsExploding({width:window.innerWidth, height:window.innerHeight})
  }

  useEffect(()=>{
window.addEventListener("resize", detectSize)
return ()=>{
window.removeEventListener("resize", detectSize)

}
  },[isExploding])
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          About Our Mental Health Community
        </h1>
        
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            We are a group of passionate students and professionals dedicated to helping those 
            who suffer from mental health issues. While we're not experts, we aim to provide 
            support, resources, and a platform for connection.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.linkedin.com/in/rupesh-chaudhary-54a519261/" className="text-blue-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-pink-500 ease-out">
              <FaLinkedin size={24} />
            </a>
            <a href="https://x.com/RupeshChy212591" className="text-blue-500 hover:text-pink-600 dark:text-blue-300 dark:hover:text-pink-500 ease-out">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/immortal_webfinity/" className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-500 ease-out">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <TeamMember 
            name="Rupesh Chaudhary"
            role="Founder, 12th Pass Student"
            image="/rupes.jpg"
          />
          <TeamMember 
            name="Abishek Chaudhary"
            role="Co-Founder, Diploma in Pharmacy"
            image="/abishek.jpg"
          />
          <TeamMember 
            name="Roman Chaudhary"
            role="Co-Founder, Health Assistant"
            image="/roman.jpg"
          />
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
                <FaRobot className="mr-2" /> Mental Health Chatbot
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chat with our AI-powered bot for immediate support and resources related to mental health.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Professional Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We have partnered with licensed mental health professionals who can provide expert advice.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg mb-16">
          <h3 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">Important Notice</h3>
          <p className="text-red-700 dark:text-red-300">
            We are students passionate about mental health, not licensed professionals. If you're experiencing 
            severe symptoms or are in crisis, please seek immediate help from a qualified mental health professional 
            or emergency services.
          </p>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Join Our Community</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of our mission to support mental health awareness and provide resources to those in need. 
            Sign up for our newsletter to stay updated on our latest initiatives and mental health tips.
          </p>

          <button onClick={()=>setBtn(!Btn)} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Subscribe Now
          </button>
          {
            
            Btn && <ConfettiExplosion
            width={isExploding.width}
             height={isExploding.height}
             tweenDuration={1000}
             force={ 0.8}
             duration= {3000}
             particleCount= {250}
             />
          }

     
          
        </div>
      </div>
    </div>
  );
};

export default About;