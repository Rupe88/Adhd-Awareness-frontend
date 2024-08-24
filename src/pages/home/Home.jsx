import { motion } from 'framer-motion';
import Blogs from '../blogs/Blogs';
import { NavLink } from "react-router-dom";


const Home = () => {
  return (

    <>
      <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center">
        {/* Left section: Animated ADHD image */}
        <div className="md:w-1/2">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <img
              src="/adhd-banner.png"
              alt="ADHD banner img"
              className="w-full h-[80p%] rounded-lg"
            />
          
       
          </motion.div>
        </div>
        
        {/* Right section: ADHD text */}
        <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
          <h1 className="text-4xl font-bold mb-6 text-pink-600 dark:text-pink-400 mt-4">Understanding ADHD</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects both children and adults. Its characterized by difficulties with focus, hyperactivity, and impulsivity.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Living with ADHD can be challenging, but with proper support and strategies, individuals can thrive and harness their unique strengths.
          </p>
          <button className="bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition duration-300 ease-out dark:bg-pink-500 dark:hover:bg-pink-600">
       <NavLink to={"/about-us"}>
       Learn More
       </NavLink>
  
          </button>
       
        </div>
       
        
  
      </div>
      <div>
      </div>

    </div>
    {/* <hr /> */}

    {/* <div className='bg-white text-primary container mx-auto'> */}
      <Blogs/>
    {/* </div> */}
    </>
  

  );
};

export default Home;