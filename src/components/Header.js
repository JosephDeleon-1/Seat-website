// components/Header.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    title: 'Programs',
    path: '/programs',
    submenu: [
      { title: 'Medical Coding', items: ['Medical Coding Certificate', 'Advanced Coding', 'Specialty Certifications'] },
      { title: 'Career Resources', items: ['Job Placement', 'Resume Building', 'Interview Preparation'] },
    ],
  },
  {
    title: 'About',
    path: '/about',
    submenu: [
      { title: 'Our Institute', items: ['Our Mission', 'Our Instructors', 'Facilities'] },
      { title: 'Testimonials', items: ['Student Success Stories', 'Employer Feedback'] },
    ],
  },
  {
    title: 'Resources',
    path: '/resources',
    submenu: [
      { title: 'Learning', 
        items: [
          {text: 'Medical Terminology', path: '/medical_terminology'}, 
          {text: 'Anatomy Basics', path: '/anatomy_basics'},
          'Coding Guidelines'
        ] 
      },
      { 
        title: 'Student Support', 
        items: [
          {text: 'FAQ', path: '/faq'},
          {text: 'Student Portal', path: '/'},
          {text: 'Technical Support', path: '/'},
          
        ] 
      },
    ],
  },
  {
    title: 'Contact',
    path: '/contact',
    submenu: [],
  },
];

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [underline, setUnderline] = useState({ width: 0, left: 0 });
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const updateUnderline = () => {
      if (menuRef.current && isHeaderHovered) {
        const activeItem = menuRef.current.querySelector(`[data-menu="${activeMenu}"]`);
        if (activeItem) {
          const rect = activeItem.getBoundingClientRect();
          const containerRect = menuRef.current.getBoundingClientRect();
          setUnderline({
            width: rect.width,
            left: rect.left - containerRect.left,
          });
        } else {
          setUnderline({ width: 0, left: 0 });
        }
      } else {
        setUnderline({ width: 0, left: 0 });
      }
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [activeMenu, isHeaderHovered]);

  return (
    <header 
      ref={headerRef}
      className={`transition-colors duration-300 ${isHeaderHovered ? 'bg-white' : 'bg-blue-900'}`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        setActiveMenu(null);
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className={`text-2xl font-bold ${isHeaderHovered ? 'text-blue-600' : 'text-white'}`}>CCI</span>
        </Link>
        <nav className="relative" ref={menuRef}>
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li
                key={item.title}
                onMouseEnter={() => setActiveMenu(item.title)}
              >
                <Link
                  href={item.path}
                  className={`py-2 ${isHeaderHovered ? 'text-gray-800' : 'text-white'}`}
                  data-menu={item.title}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <motion.div
            className={`absolute bottom-0 h-0.5 ${isHeaderHovered ? 'bg-blue-600' : 'bg-blue-400'}`}
            initial={false}
            animate={{
              width: underline.width,
              x: underline.left,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="https://capitolcodinginstitute.thinkific.com/users/sign_in" className={`hover:text-blue-400 ${isHeaderHovered ? 'text-gray-800' : 'text-white'}`}>
            Student Login
          </Link>
          <Link href="/contact" className={`px-4 py-2 rounded-md ${isHeaderHovered ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            Enroll Now
          </Link>
        </div>
      </div>
      
      <AnimatePresence>
        {isHeaderHovered && activeMenu && menuItems.find(item => item.title === activeMenu)?.submenu.length > 0 && (
          <motion.div
            className="absolute left-0 right-0 bg-white shadow-md z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {menuItems.find(item => item.title === activeMenu).submenu.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-blue-600 font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {typeof item === 'object' ? (
                            <Link href={item.path} className="text-gray-600 hover:text-blue-600">
                              {item.text}
                            </Link>
                          ) : (
                            <Link href="/" className="text-gray-600 hover:text-blue-600">
                              {item}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;