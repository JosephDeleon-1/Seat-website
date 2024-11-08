"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoLocationOutline, IoChatbubblesOutline, IoClipboardOutline, IoCalendarOutline, IoHeartOutline, IoWarningOutline } from "react-icons/io5";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-5xl text-teal-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
);

const features = [
  {
    icon: IoLocationOutline,
    title: "Real-time Bus Tracking",
    description: "Keep parents informed with live updates on bus locations and estimated arrival times."
  },
  {
    icon: IoChatbubblesOutline,
    title: "Secure Messaging",
    description: "Enable safe, encrypted communication between parents, teachers, and administrators."
  },
  {
    icon: IoClipboardOutline,
    title: "Attendance Management",
    description: "Streamline the process of taking and reporting attendance with our digital system."
  },
  {
    icon: IoCalendarOutline,
    title: "Event Scheduling",
    description: "Easily plan and manage school events, field trips, and parent-teacher conferences."
  },
  {
    icon: IoHeartOutline,
    title: "Special Education Support",
    description: "Tailored features to support students with special needs and their families."
  },
  {
    icon: IoWarningOutline,
    title: "Emergency Alerts",
    description: "Quickly disseminate important information to the entire school community in case of emergencies."
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">SEAT Features</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover how SEAT can transform your school&apos;s operations
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={0.1 * (index + 1)} />
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 leading-tight">Feature Spotlight</h2>
          <div className="flex flex-col md:flex-row items-center bg-gray-800 p-8 rounded-lg">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/feature-spotlight.jpg" alt="Feature Spotlight" width={600} height={400} className="rounded-lg shadow-lg" />
            </motion.div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4 text-white">{features[activeFeature].title}</h3>
              <p className="text-lg mb-4 text-gray-300">{features[activeFeature].description}</p>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      index === activeFeature
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    {feature.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">What Our Users Say</h2>
          <motion.div
            className="bg-gray-800 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <blockquote className="text-2xl italic mb-4 text-gray-300">
              &ldquo;SEAT has revolutionized how we manage our school&apos;s operations. The real-time 
              bus tracking and secure messaging features have been game-changers for our community.&rdquo;
            </blockquote>
            <p className="text-xl font-semibold text-teal-400">- Principal Johnson, Springfield Elementary</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to Elevate Your School&apos;s Operations?</h2>
          <p className="text-xl text-gray-300 mb-8">Join the schools already benefiting from SEAT&apos;s powerful features.</p>
          <Link href="/contact" className="bg-teal-600 text-white py-3 px-8 rounded-full text-lg hover:bg-teal-700 transition duration-300">
            Schedule a Demo
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
