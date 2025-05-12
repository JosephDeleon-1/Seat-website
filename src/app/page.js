"use client";

import { useRef } from 'react'; // Import useRef
import Image from 'next/image'; // Keep if you plan to use Next/Image later
import Link from 'next/link';
import { motion, useInView } from 'framer-motion'; // Import useInView
import { FaBus, FaComments, FaUserGraduate, FaChartLine, FaSchool, FaUser, FaUserTie, FaRoute } from 'react-icons/fa';

// FeatureCard Component (Added aria-hidden to Icon)
const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Animate once when 20% visible

  return (
    <motion.div
      ref={ref}
      className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="text-4xl text-teal-400 mb-4" aria-hidden="true" /> {/* Added aria-hidden */}
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Data defined outside the component for better readability
const features = [
  { icon: FaSchool, title: "For Schools", description: "Streamline operations, enhance safety, and improve communication with SEAT's comprehensive school management system." },
  { icon: FaUser, title: "For Parents", description: "Stay connected with your child's education journey, track school buses, and communicate easily with teachers." },
  { icon: FaUserGraduate, title: "For Students", description: "Access schedules, assignments, and bus information all in one place for a smoother school experience." },
  { icon: FaUserTie, title: "For Administrators", description: "Gain valuable insights, manage staff efficiently, and ensure top-notch safety measures with our advanced tools." },
  { icon: FaBus, title: "For Bus Drivers", description: "Optimize routes, manage student lists, and communicate effectively with schools and parents for safer, more efficient transportation." },
  // Consider adding a 6th feature for balance, or adjust grid columns on different breakpoints if needed.
];

const howItWorksSteps = [
  { title: "Registration", description: "Schools, bus companies, and parents sign up and input their information." },
  { title: "Integration", description: "Bus routes, student data, and communication channels are integrated into the SEAT system." },
  { title: "Daily Operations", description: "SEAT facilitates real-time bus tracking, attendance management, and secure communications for all parties." },
  { title: "Optimization", description: "Continuous data analysis helps optimize routes, improve safety, and enhance overall efficiency." },
  { title: "Feedback Loop", description: "Regular updates and new features based on user feedback and emerging technologies." }
];


export default function Home() {
  // --- Refs and InView Hooks for Animations ---
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const featuresRef = useRef(null);
  // Note: Individual cards handle their own inView animation via the FeatureCard component

  const howItWorksRef = useRef(null);
  const isHowItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-gray-900 min-h-screen text-white"> {/* Added text-white default */}
      <div className="container mx-auto px-4 py-20 md:py-28"> {/* Increased padding slightly */}

        {/* --- Hero Section --- */}
        <section ref={heroRef} className="mb-20 md:mb-28"> {/* Added section tag and margin */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Built to connect all schools
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl"> {/* Added max-width */}
              Connecting schools, parents, students, and bus services like never before with SEAT. Seamless integration for enhanced safety and communication.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/contact" className="inline-block bg-teal-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"> {/* Added focus styles, inline-block */}
              Request a Demo
            </Link>
          </motion.div>
        </section>

        {/* --- Features Section --- */}
        {/* The ref is mainly for potentially animating the container as a whole if needed, */}
        {/* but individual cards handle their own stagger animation effectively. */}
        <section ref={featuresRef} className="mb-20 md:mb-28">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who Benefits from SEAT?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              // Delay calculation remains the same for staggered effect
              <FeatureCard key={index} {...feature} delay={0.1 * index} />
            ))}
          </div>
        </section>

        {/* --- How SEAT Works Section --- */}
        <section ref={howItWorksRef} className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 leading-tight">
              How SEAT Streamlines Everything
            </h2>
            <div className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg"> {/* Added shadow */}
              <ol className="relative border-l border-gray-700 space-y-10 ml-4"> {/* Changed to vertical timeline style */}
                {howItWorksSteps.map((step, index) => (
                  <li key={index} className="ml-6">
                     <span className="absolute flex items-center justify-center w-8 h-8 bg-teal-600 rounded-full -left-4 ring-4 ring-gray-900 text-white font-bold">
                        {index + 1}
                     </span>
                    <h3 className="text-xl font-semibold mb-1 text-teal-400">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </section>

        {/* --- Final CTA Section --- */}
        <section ref={ctaRef} className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ready to transform your school's coordination?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"> {/* Added max-width and centering */}
              Join SEAT today and experience the difference in efficiency and safety for your entire school community.
            </p>
            <Link href="/contact" className="inline-block bg-teal-600 text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"> {/* Added focus styles, inline-block */}
              Get Started Now
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}