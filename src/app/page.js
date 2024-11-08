"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBus, FaComments, FaUserGraduate, FaChartLine, FaSchool, FaUser, FaUserTie, FaRoute } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-4xl text-teal-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: FaSchool,
      title: "For Schools",
      description: "Streamline operations, enhance safety, and improve communication with SEAT's comprehensive school management system.",
    },
    {
      icon: FaUser,
      title: "For Parents",
      description: "Stay connected with your child's education journey, track school buses, and communicate easily with teachers.",
    },
    {
      icon: FaUserGraduate,
      title: "For Students",
      description: "Access schedules, assignments, and bus information all in one place for a smoother school experience.",
    },
    {
      icon: FaUserTie,
      title: "For Administrators",
      description: "Gain valuable insights, manage staff efficiently, and ensure top-notch safety measures with our advanced tools.",
    },
    {
      icon: FaBus,
      title: "For Bus Drivers",
      description: "Optimize routes, manage student lists, and communicate effectively with schools and parents for safer, more efficient transportation.",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">Built to connect all schools</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Connecting schools, parents, students, and bus services like never before
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/contact" className="bg-teal-600 text-white py-3 px-6 rounded-full text-lg hover:bg-teal-700 transition duration-300">
            Get Started
          </Link>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={0.1 * (index + 1)} />
          ))}
        </div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 leading-tight">How SEAT Works</h2>
          <div className="bg-gray-800 p-8 rounded-lg">
            <ol className="list-decimal pl-6 text-white">
              {[
                { title: "Registration", description: "Schools, bus companies, and parents sign up and input their information." },
                { title: "Integration", description: "Bus routes, student data, and communication channels are integrated into the SEAT system." },
                { title: "Daily Operations", description: "SEAT facilitates real-time bus tracking, attendance management, and secure communications for all parties." },
                { title: "Optimization", description: "Continuous data analysis helps optimize routes, improve safety, and enhance overall efficiency." },
                { title: "Feedback Loop", description: "Regular updates and new features based on user feedback and emerging technologies." }
              ].map((step, index) => (
                <li key={index} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-teal-400">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to transform your school&apos;s transportation and communication?</h2>
          <p className="text-xl text-gray-300 mb-8">Join SEAT today and experience the difference for schools, parents, students, and bus services.</p>
          <Link href="/contact" className="bg-teal-600 text-white py-3 px-8 rounded-full text-lg hover:bg-teal-700 transition duration-300">
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
