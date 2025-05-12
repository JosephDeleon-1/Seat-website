"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Dr. Jennifer Smith',
    role: 'Director of Education',
    bio: 'Dr. Smith has over 15 years of experience in medical coding education and healthcare management.',
    image: '/team-member-1.jpg',
  },
  {
    name: 'Michael Johnson',
    role: 'Lead Instructor',
    bio: 'Michael is a certified medical coder with 10+ years of experience in various healthcare settings.',
    image: '/team-member-2.jpg',
  },
  {
    name: 'Sarah Williams',
    role: 'Career Counselor',
    bio: 'Sarah specializes in helping students find employment in the medical coding field after graduation.',
    image: '/team-member-3.jpg',
  },
];

const TeamMember = ({ name, role, bio, image, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-100 p-6 rounded-lg transition-all duration-300 hover:bg-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-300">
        {/* Replace with actual images when available */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Profile Photo
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-900">{name}</h3>
      <p className="text-blue-600 mb-4">{role}</p>
      <p className="text-gray-600 text-sm mb-4">{bio}</p>
      <motion.div
        className="flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <a href="#" className="text-gray-500 hover:text-blue-600"><FaLinkedin size={20} /></a>
        <a href="#" className="text-gray-500 hover:text-blue-600"><FaTwitter size={20} /></a>
        <a href="#" className="text-gray-500 hover:text-blue-600"><FaEnvelope size={20} /></a>
      </motion.div>
    </motion.div>
  );
};

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-4 leading-tight">About CCI</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Providing quality medical coding education since 2010
          </p>
        </motion.div>

        <div className="mt-20">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Mission
          </motion.h2>
          <motion.div
            className="bg-gray-100 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-600 mb-4">
              At Capitol Coding Institute, our mission is to provide high-quality, affordable education in medical coding that prepares students for successful careers in the healthcare industry. We believe that everyone deserves access to career opportunities in this growing field.
            </p>
            <p className="text-gray-600">
              We are committed to student success through comprehensive training, personalized support, and industry connections that help our graduates secure employment in medical coding positions.
            </p>
          </motion.div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 leading-tight">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} delay={0.1 * (index + 1)} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 leading-tight">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Excellence', description: 'We strive for excellence in all aspects of our educational programs.' },
              { title: 'Integrity', description: 'We uphold the highest standards of integrity in our teaching and business practices.' },
              { title: 'Student Success', description: 'We measure our success by the achievements of our students in their careers.' },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg transition-all duration-300 hover:bg-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 leading-tight">Start Your Medical Coding Journey Today</h2>
          <p className="text-xl text-gray-600 mb-8">Join our community of successful medical coding professionals.</p>
          <Link href="/contact" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300">
            Enroll Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}