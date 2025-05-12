"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FaCheck, FaClock, FaGraduationCap, FaUserGraduate, FaFileAlt, FaVideo, FaLaptopCode, FaUserTie, FaHandshake, FaBook, FaClipboardCheck, FaMedal } from 'react-icons/fa';

// Enhanced Program Card Component 
const ProgramCard = ({ title, description, priceInFull, pricePlan, duration, features, featured = false, callToAction, delay, icon: Icon = FaGraduationCap }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-all duration-300 ${
        featured ? 'border-t-4 border-blue-600' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {featured && (
        <div className="bg-blue-600 text-white py-2 px-4 text-center">
          <span className="text-sm font-semibold uppercase flex items-center justify-center">
            <FaMedal className="mr-2" /> Most Popular Choice
          </span>
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${featured ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Icon className={`text-3xl ${featured ? 'text-blue-600' : 'text-gray-600'}`} />
          </div>
          <h3 className="text-2xl font-bold mt-4 text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        
        <div className={`p-4 rounded-lg mb-6 ${featured ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <div className="text-center">
            <span className={`text-2xl font-bold ${featured ? 'text-blue-600' : 'text-gray-800'}`}>${priceInFull}</span>
            <span className="text-sm text-gray-500 block">Paid in Full</span>
            
            {pricePlan !== priceInFull && (
              <>
                <span className="text-lg text-gray-700 mt-2">${pricePlan}</span>
                <span className="text-sm text-gray-500 block">Payment Plan</span>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FaClock className={`mr-2 ${featured ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className="text-gray-700 font-medium">{duration}</span>
          </div>
          
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <FaCheck className={`mt-1 mr-3 flex-shrink-0 ${featured ? 'text-blue-500' : 'text-green-500'}`} />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Link 
          href="/contact" 
          className={`mt-auto text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
            featured 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {callToAction || "Enroll Now"}
        </Link>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-md p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <Icon className="text-blue-600 text-2xl" />
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

// Learning Format Card
const LearningFormatCard = ({ title, description, icon: Icon, features, buttonText }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-md h-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <Icon className="text-blue-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link href="/contact" className="block text-center py-3 px-4 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors">
          {buttonText}
        </Link>
      </div>
    </motion.div>
  );
};

// Programs section heading component
const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      {subtitle}
    </p>
  </div>
);

export default function Programs() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });
  
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });
  
  const programsRef = useRef(null);
  const isProgramsInView = useInView(programsRef, { once: true, amount: 0.2 });
  
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });
  
  // Program data - corrected to only 2 programs
  const programs = [
    {
      title: "Medical Coding Certificate Program",
      description: "Our comprehensive program prepares you for the Certified Coding Specialist (CCS) certification and employment in healthcare.",
      priceInFull: "4,000",
      pricePlan: "5,000",
      duration: "6-12 months",
      featured: true,
      icon: FaGraduationCap,
      features: [
        "ICD-10-CM/PCS coding systems",
        "CPT procedural coding",
        "Medical terminology",
        "Anatomy and physiology",
        "Healthcare compliance and ethics",
        "CCS certification preparation"
      ],
      callToAction: "Enroll Now"
    },
    {
      title: "HCC Risk Adjustment Training",
      description: "Specialized training in HCC coding for risk adjustment in Medicare Advantage and value-based payment models.",
      priceInFull: "1,000",
      pricePlan: "1,000",
      duration: "2-3 months",
      featured: false,
      icon: FaClipboardCheck,
      features: [
        "HCC coding fundamentals",
        "Risk adjustment models",
        "Documentation requirements",
        "Coding for chronic conditions",
        "Compliance guidelines",
        "RADV audit preparation"
      ],
      callToAction: "Enroll Now"
    }
  ];
  
  // Learning formats
  const learningFormats = [
    {
      title: "Online Self-Paced",
      description: "Complete coursework on your own schedule with access to recorded lectures, exercises, and support from instructors.",
      icon: FaLaptopCode,
      features: [
        "24/7 access to learning materials",
        "Study at your own pace",
        "Email support from instructors",
        "Practice exercises & quizzes"
      ],
      buttonText: "Learn More"
    },
    {
      title: "Live Online Classes",
      description: "Attend scheduled virtual classes with live instruction and real-time interaction with instructors and peers.",
      icon: FaVideo,
      features: [
        "Live virtual classroom sessions",
        "Real-time interaction with instructors",
        "Structured schedule with flexibility",
        "Recordings available for review"
      ],
      buttonText: "Learn More"
    },
    {
      title: "One-on-One Mentoring",
      description: "Personalized instruction with a dedicated mentor who guides you through the program and answers all your questions.",
      icon: FaUserTie,
      features: [
        "Dedicated personal instructor",
        "Customized learning path",
        "Weekly one-on-one sessions",
        "Accelerated learning option"
      ],
      buttonText: "Learn More"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Fixed to ensure text isn't covered */}
      <div className="bg-blue-900 text-white pt-32 pb-28 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div ref={headerRef} className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Medical Coding Programs
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Comprehensive training programs designed to prepare you for a successful career in medical coding.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Wave SVG divider - Adjusted to ensure proper display */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,128C1120,128,1280,96,1360,80L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <section ref={statsRef} className="mb-24 -mt-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              icon={FaUserGraduate} 
              value="15+" 
              label="Expert Instructors" 
            />
            <StatCard 
              icon={FaBook} 
              value="2" 
              label="Specialized Programs" 
            />
            <StatCard 
              icon={FaHandshake} 
              value="95%" 
              label="Job Placement Rate" 
            />
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="mb-20">
          <SectionHeading 
            title="Why Choose Capitol Coding Institute"
            subtitle="We offer comprehensive medical coding education with a focus on practical skills and career readiness"
          />
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Your Success</h3>
                <p className="text-gray-700 mb-6">At Capitol Coding Institute, we're dedicated to providing the highest quality medical coding education. Our programs are designed to equip you with the skills and knowledge needed to excel in the healthcare industry.</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <FaCheck className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Expert Instruction</h4>
                      <p className="text-gray-600">Learn from certified medical coders with years of real-world experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <FaCheck className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Comprehensive Curriculum</h4>
                      <p className="text-gray-600">Our programs cover all essential coding systems and healthcare concepts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <FaCheck className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Career Support</h4>
                      <p className="text-gray-600">From certification preparation to job placement assistance, we support you every step of the way</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <FaGraduationCap className="text-blue-600 text-3xl mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Career Outlook</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">Salary Potential</h4>
                    <p className="text-gray-600">Medical coders typically earn between $20-$65 per hour depending on experience and certification.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">Job Growth</h4>
                    <p className="text-gray-600">The demand for medical coders is projected to grow 9% by 2030, faster than average.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">Work Settings</h4>
                    <p className="text-gray-600">Hospitals, physician practices, insurance companies, and remote work opportunities are available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Programs Section - Side by Side */}
        <section ref={programsRef} className="mb-24">
          <SectionHeading 
            title="Our Medical Coding Programs"
            subtitle="Choose from our selection of comprehensive, industry-recognized medical coding programs"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                description={program.description}
                priceInFull={program.priceInFull}
                pricePlan={program.pricePlan}
                duration={program.duration}
                features={program.features}
                featured={program.featured}
                icon={program.icon}
                callToAction={program.callToAction}
                delay={0.1 * index}
              />
            ))}
          </div>
        </section>
        
        {/* Learning Format Section */}
        <section className="mb-24">
          <SectionHeading
            title="Flexible Learning Options"
            subtitle="Choose the learning format that works best for your schedule and learning style"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningFormats.map((format, index) => (
              <LearningFormatCard
                key={index}
                title={format.title}
                description={format.description}
                icon={format.icon}
                features={format.features}
                buttonText={format.buttonText}
              />
            ))}
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="mb-24">
          <SectionHeading
            title="Student Success Stories"
            subtitle="Hear from our graduates who are now working in the medical coding field"
          />
          
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-4xl text-blue-300 mb-4">"</div>
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  Capitol Coding Institute changed my life! I was working in retail making minimum wage, and now I'm a certified medical coder earning over $25 per hour with benefits. The instructors were amazing and truly cared about my success.
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">N</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Nancy A.</p>
                    <p className="text-sm text-gray-500">Medical Coder</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4">What Our Students Achieve</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <FaClipboardCheck className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Industry Certifications</h4>
                      <p className="text-gray-600">Our students successfully obtain CCS and other industry certifications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <FaFileAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Professional Positions</h4>
                      <p className="text-gray-600">Graduates secure positions in hospitals, clinics, and remote work settings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <FaUserGraduate className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Career Advancement</h4>
                      <p className="text-gray-600">Many students significantly increase their income after program completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section ref={ctaRef} className="mb-16">
          <motion.div
            className="bg-blue-800 p-12 rounded-xl text-white text-center shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Start Your Medical Coding Career Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Speak with our admissions team to find the right program for your career goals and get started on your path to becoming a medical coding professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block bg-white text-blue-800 py-3 px-10 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-md">
                Schedule a Consultation
              </Link>
              <Link href="/contact" className="inline-block bg-transparent border-2 border-white text-white py-3 px-10 rounded-lg text-lg font-semibold hover:bg-white/10 transition duration-300">
                Request Information
              </Link>
            </div>
          </motion.div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-16">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about our programs and medical coding careers"
          />
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What prerequisites do I need to enroll?</h3>
                <p className="text-gray-600">
                  Most of our programs don't require any specific prerequisites. For our Medical Coding Certificate, we recommend a high school diploma or equivalent. Basic computer skills and a good understanding of English are helpful for all programs.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Do you offer financial assistance or payment plans?</h3>
                <p className="text-gray-600">
                  Yes, we offer flexible payment plans that allow you to pay for your program in monthly installments. We also provide information about potential financial assistance options. Contact our admissions team for details.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Will I be prepared for certification exams after completing your program?</h3>
                <p className="text-gray-600">
                  Absolutely! Our programs are designed specifically to prepare you for industry certification exams like the CCS. We include practice tests and exam preparation materials to ensure you're ready to pass your certification exam.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Do you offer job placement assistance after graduation?</h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive career services including resume preparation, interview coaching, and job placement assistance. We maintain relationships with healthcare employers and help connect our graduates with job opportunities.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
              Have more questions? Contact our admissions team
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}