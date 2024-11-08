"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Joseph Cordero',
    role: 'Co-Founder & CEO',
    bio: 'Joseph is a software engineer with a background in building scalable, secure applications for education.',
    image: '/team-member-1.jpg',
  },
  {
    name: 'Isaia Ahhing',
    role: 'Co-Founder',
    bio: 'Isaia has over 4 years of experience in EdTech and is passionate about improving school operations.',
    image: '/team-member-2.jpg',
  },
  {
    name: 'Emily Brown',
    role: 'Head of Product',
    bio: 'Emily has a decade of experience in product management and user experience design in the education sector.',
    image: '/team-member-3.jpg',
  },
];

const TeamMember = ({ name, role, bio, image, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
      <p className="text-teal-400 mb-4">{role}</p>
      <p className="text-gray-300 text-sm mb-4">{bio}</p>
      <motion.div
        className="flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <a href="#" className="text-gray-400 hover:text-teal-400"><FaLinkedin size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-teal-400"><FaTwitter size={20} /></a>
        <a href="#" className="text-gray-400 hover:text-teal-400"><FaEnvelope size={20} /></a>
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
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">About SEAT</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Revolutionizing school operations and communication
          </p>
        </motion.div>

        <div className="mt-20">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Mission
          </motion.h2>
          <motion.div
            className="bg-gray-800 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-300 mb-4">
              At SEAT, we&apos;re on a mission to transform school operations and enhance communication between schools, parents, and students. We believe that by leveraging technology, we can create more efficient, safer, and more connected educational communities.
            </p>
            <p className="text-gray-300">
              Our goal is to empower schools with tools that streamline administrative tasks, improve safety measures, and foster better engagement between all stakeholders in the education process.
            </p>
          </motion.div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} delay={0.1 * (index + 1)} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', description: 'We constantly seek new ways to improve and innovate in the EdTech space.' },
              { title: 'Security', description: 'We prioritize the security and privacy of all our users\' data.' },
              { title: 'User-Centric', description: 'We design our solutions with the needs of schools, parents, and students in mind.' },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-400">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Join Us in Transforming Education</h2>
          <p className="text-xl text-gray-300 mb-8">Experience the SEAT difference for your school community.</p>
          <Link href="/contact" className="bg-teal-600 text-white py-3 px-8 rounded-full text-lg hover:bg-teal-700 transition duration-300">
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
