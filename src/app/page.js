"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaMoneyBillWave, FaClock, FaHome, FaUserMd, FaLaptopMedical, 
         FaCheckCircle, FaChalkboardTeacher, FaGraduationCap, FaHandshake } from 'react-icons/fa';

// FeatureCard Component with improved styling
const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border-b-4 border-transparent hover:border-blue-500"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative mb-6">
        <div className="absolute -top-10 -left-8 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
        <Icon className={`text-5xl mb-4 relative z-10 ${isHovered ? 'text-blue-600' : 'text-blue-500'} transition-colors duration-300`} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Stats component for highlighting key metrics
const StatItem = ({ value, label }) => (
  <div className="text-center p-4">
    <h3 className="text-4xl font-bold text-blue-600 mb-2">{value}</h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

// Testimonial Card with enhanced styling
const TestimonialCard = ({ quote, author, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute -top-5 left-6 text-5xl text-blue-400">"</div>
      <p className="italic text-gray-600 mb-4 mt-3 relative z-10">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-blue-600 font-bold">{author.charAt(0)}</span>
        </div>
        <p className="font-semibold text-blue-800">{author}</p>
      </div>
    </motion.div>
  );
};

// REDESIGNED: Modern Journey Step component
const JourneyStep = ({ number, title, description, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  
  const icons = [
    <svg key="enrollment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>,
    <svg key="terminology" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
    </svg>,
    <svg key="fundamentals" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
      <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
      <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
    </svg>,
    <svg key="practical" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
    </svg>,
    <svg key="certification" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ];
  
  return (
    <motion.div 
      ref={ref}
      className={`${isHovered ? 'scale-105' : 'scale-100'} transition-all duration-300`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: number * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 relative">
        {/* Timeline connector */}
        {number < 5 && (
          <div className="absolute left-[39px] top-24 md:left-[39px] md:top-[70px] w-1 bg-gradient-to-b from-blue-600 to-blue-400/30 h-32 md:h-20 -z-10"></div>
        )}
        
        {/* Step number and icon */}
        <div className="flex flex-col items-center">
          <div className={`w-20 h-20 rounded-full ${isHovered ? 'bg-blue-600' : 'bg-blue-500'} text-white flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-300`}>
            {number}
          </div>
          <div className={`mt-4 p-3 rounded-full ${isHovered ? 'bg-blue-100' : 'bg-blue-50'} transition-colors duration-300`}>
            {icons[number-1]}
          </div>
        </div>
        
        {/* Content */}
        <div className={`pt-2 ${isHovered ? 'bg-white' : 'bg-transparent'} rounded-xl transition-colors duration-300 flex-1`}>
          <h3 className={`text-2xl font-bold mb-2 ${isHovered ? 'text-blue-600' : 'text-blue-800'} transition-colors duration-300`}>{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Data for features
const features = [
  { 
    icon: FaUserGraduate, 
    title: "Quality Education", 
    description: "Learn from certified medical coders with years of industry experience. Our comprehensive curriculum covers all aspects of medical coding." 
  },
  { 
    icon: FaMoneyBillWave, 
    title: "High-Paying Career", 
    description: "Medical coders can earn $20-$65 per hour. Our program prepares you for this lucrative career path with high job security." 
  },
  { 
    icon: FaClock, 
    title: "Fast-Track Learning", 
    description: "Complete your medical coding education in just 6-9 months, getting you job-ready in less than a year." 
  },
  { 
    icon: FaHome, 
    title: "Work From Home", 
    description: "Many medical coding positions offer remote work opportunities, giving you flexibility in your career." 
  },
  { 
    icon: FaUserMd, 
    title: "Industry Connections", 
    description: "We help you connect with healthcare employers and provide job placement assistance after graduation." 
  },
  { 
    icon: FaLaptopMedical, 
    title: "Hands-On Training", 
    description: "Practice with real-world scenarios and actual medical records to build practical skills employers need." 
  },
];

const programSteps = [
  { 
    title: "Enrollment", 
    description: "Complete your application and speak with our admissions team. We'll guide you through the process and help you choose the right program for your career goals." 
  },
  { 
    title: "Medical Terminology", 
    description: "Build your foundation with essential healthcare terminology. Understanding medical language is crucial for accurate coding and communication in healthcare settings." 
  },
  { 
    title: "Coding Fundamentals", 
    description: "Learn ICD-10-CM/PCS and CPT coding systems and guidelines. Master the principles of diagnosis and procedure coding that are used throughout the healthcare industry." 
  },
  { 
    title: "Practical Experience", 
    description: "Practice with real medical records and case scenarios. Apply your knowledge to realistic examples that prepare you for day-to-day tasks in your future career." 
  },
  { 
    title: "Certification Preparation", 
    description: "Get ready to pass industry certification exams. We provide targeted review materials, practice tests, and strategies to help you succeed on certification day." 
  }
];

const testimonials = [
  {
    quote: "I just started with CCI and it was one of the best career decisions I made so far. I can see the income potential and truly appreciate the hands-on approach to learning. Can't wait to complete the program.",
    author: "Nancy A."
  },
  {
    quote: "Capitol Coding Institute is the BEST school ever, the staff is amazing!! I recently took their one-on-one medical coding class and it was great. The instructors take time to ensure you understand every concept.",
    author: "Peter P."
  },
  {
    quote: "Thank you Capitol Coding Institute for helping me excel in my career! I was able to get a coding job within weeks of graduating. The job placement assistance really made a difference.",
    author: "Manuel C."
  },
  {
    quote: "CCI gave me HOPE. I was not sure what would be the best career path for me, but through a friend I met one of the instructors here, and the rest is history. Great courses, great support!",
    author: "Helen L."
  }
];

const benefits = [
  { icon: FaCheckCircle, title: "Certification Ready", description: "Our program prepares you for industry certifications like CPC, CCS, and more" },
  { icon: FaChalkboardTeacher, title: "Expert Instructors", description: "Learn from experienced professionals with real-world coding expertise" },
  { icon: FaGraduationCap, title: "Comprehensive Curriculum", description: "Cover all essential coding systems, guidelines, and practices" },
  { icon: FaHandshake, title: "Career Services", description: "Resume help, interview coaching, and job placement assistance included" }
];

export default function Home() {
  // Refs and InView Hooks for Animations
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });

  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });
  
  const programRef = useRef(null);
  const isProgramInView = useInView(programRef, { once: true, amount: 0.2 });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Hero Section with Background Image */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
          {/* You would replace this with an actual image in production */}
          <div className="h-full w-full bg-[url('/images/medical-coding-bg.jpg')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 py-32 md:py-40 relative z-10">
          <section ref={heroRef} className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                THE BEST PLACE TO START YOUR <span className="text-blue-300">MEDICAL CODING CAREER</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl">
                Capitol Coding Institute makes it easy for you to receive a quality education at an affordable cost. Learn coding in 6-9 months.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 shadow-lg">
                Start Your Career Today
              </Link>
              <Link href="/programs" className="inline-block bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition duration-300">
                Explore Programs
              </Link>
            </motion.div>
          </section>
        </div>
        
        {/* Wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <section ref={statsRef} className="mb-24">
          <motion.div
            className="bg-white rounded-xl shadow-xl p-8 -mt-20 relative z-20 grid grid-cols-1 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <StatItem value="6-9" label="Months to Completion" />
            <StatItem value="$20-65" label="Hourly Wage Potential" />
            <StatItem value="95%" label="Job Placement Rate" />
            <StatItem value="100%" label="Online Availability" />
          </motion.div>
        </section>

        {/* Program Introduction */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900">
              Your Path to a <span className="text-blue-600">Healthcare Career</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Medical coding is an in-demand career with excellent growth potential. Our program is designed to get you certified and employed in less than a year.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Why Choose Capitol Coding Institute?</h3>
              <p className="text-gray-600 mb-6">
                Our focused curriculum, experienced instructors, and career-oriented approach have helped hundreds of students transform their lives through successful medical coding careers.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <benefit.icon className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Upcoming Classes</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between pb-4 border-b border-blue-200">
                  <div>
                    <h4 className="font-bold text-gray-800">Day Program</h4>
                    <p className="text-gray-600">Mon-Thu, 9am-2pm</p>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm self-start">
                    Starting June 15
                  </div>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-blue-200">
                  <div>
                    <h4 className="font-bold text-gray-800">Evening Program</h4>
                    <p className="text-gray-600">Mon, Wed, Thu, 6pm-9pm</p>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm self-start">
                    Starting July 10
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Weekend Program</h4>
                    <p className="text-gray-600">Sat-Sun, 9am-4pm</p>
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm self-start">
                    Spots Available
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/contact" className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold">
                  Reserve Your Spot
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="mb-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900">Why Choose Medical Coding?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Medical coding offers excellent career prospects with stability, competitive pay, and flexibility.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={0.1 * index} />
            ))}
          </div>
        </section>

        {/* What is Medical Coding Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-blue-50 to-white p-10 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                  {/* You would replace this with an actual image in production */}
                  <div className="absolute inset-0 bg-blue-200 flex items-center justify-center">
                    <span className="text-blue-700 font-semibold">Medical Coding Professional Image</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">What is Medical Coding?</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Medical coding is the transformation of healthcare diagnosis, procedures, medical services, and equipment into universal medical codes using a classification system. It is the language used by insurance companies and healthcare providers.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Coders take medical reports from doctors, which may include a patient's condition, the doctor's diagnosis, a prescription, and whatever procedures the doctor performed, and turn them into a set of codes that make up the crucial part of the medical claim.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">ICD-10-CM</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">CPT</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">HCPCS</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Medical Billing</span>
                </div>
<Link href="/programs" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Learn more about our programs
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* REDESIGNED: Learning Journey Section with modern design */}
        <section ref={programRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProgramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-70"></div>
              <div className="absolute bottom-20 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full opacity-30"></div>
            </div>
            
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900">
                Your Learning <span className="text-blue-600">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our structured program guides you through everything you need to become a certified medical coder.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-blue-100 max-w-5xl mx-auto">
              <div className="flex justify-center items-center mb-12">
                <div className="h-1 bg-gradient-to-r from-blue-50 via-blue-300 to-blue-50 w-32 rounded-full"></div>
                <div className="px-4 py-2 bg-blue-600 text-white rounded-full mx-4 text-sm font-medium shadow-lg">5 Steps to Success</div>
                <div className="h-1 bg-gradient-to-r from-blue-50 via-blue-300 to-blue-50 w-32 rounded-full"></div>
              </div>
              
              <div className="space-y-16 md:space-y-12">
                {programSteps.map((step, index) => (
                  <JourneyStep 
                    key={index}
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <Link 
                  href="/programs" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-md group"
                >
                  <span>Explore Our Full Program</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Success metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isProgramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">Choose from day, evening, or weekend classes to fit your life commitments</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isProgramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive Training</h3>
                <p className="text-gray-600">Our program covers all essential coding systems and healthcare regulations</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isProgramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Certification Success</h3>
                <p className="text-gray-600">95% of our students pass their certification exams on the first attempt</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who have transformed their careers with Capitol Coding Institute.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-10 left-14 w-32 h-32 bg-blue-100 rounded-full opacity-50 -z-10"></div>
            <div className="absolute bottom-10 right-14 w-32 h-32 bg-blue-100 rounded-full opacity-50 -z-10"></div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section ref={ctaRef} className="mb-16">
          <motion.div
            className="bg-gradient-to-r from-blue-800 to-blue-600 p-12 rounded-2xl text-white text-center shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Start Your Medical Coding Career?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join Capitol Coding Institute today and get started on a rewarding career path with flexibility, good pay, and high demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block bg-white text-blue-800 py-3 px-10 rounded-full text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 transition duration-300 shadow-lg">
                Enroll Now
              </Link>
              <Link href="/programs" className="inline-block bg-transparent border-2 border-white text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 transition duration-300">
                View Program Details
              </Link>
            </div>
          </motion.div>
        </section>
        
        {/* FAQ Preview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">How long does it take to complete the program?</h3>
                <p className="text-gray-600">Our comprehensive medical coding program can be completed in 6-9 months, depending on your schedule and pace. We offer full-time, part-time, and weekend options to accommodate your needs.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Do I need prior healthcare experience?</h3>
                <p className="text-gray-600">No prior healthcare experience is required. Our program starts with the fundamentals and progressively builds your knowledge and skills to prepare you for certification and employment.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">What job opportunities are available after graduation?</h3>
                <p className="text-gray-600">Graduates can pursue careers in hospitals, physician offices, insurance companies, and remote work opportunities. Our career services team will help you find positions that match your preferences.</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                Have more questions? Contact us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}