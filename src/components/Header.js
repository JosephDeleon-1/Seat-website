// components/Header.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    title: 'Products',
    submenu: [
      { title: 'Schools', items: ['Bus Tracking', 'Event Management', 'Attendance System'] },
      { title: 'Parents', items: ['Mobile App', 'Real-time Notifications', 'Student Progress Tracking'] },
      { title: 'Students', items: ['Schedule Viewer', 'Assignment Tracker', 'School Bus Locator'] },
      { title: 'Administrators', items: ['Analytics Dashboard', 'Staff Management', 'Emergency Alert System'] },
    ],
  },
  {
    title: 'Features',
    submenu: [
      { title: 'Core Features', items: ['Real-time Tracking', 'Communication', 'Attendance Management', 'Event Planning'] },
      { title: 'Advanced Features', items: ['Data Analytics', 'API Integration', 'Custom Reports', 'Multi-language Support'] },
    ],
  },
  {
    title: 'Pricing',
    submenu: [
      { title: 'Plans', items: ['Basic', 'Pro', 'Enterprise'] },
      { title: 'Add-ons', items: ['Extra Storage', 'Priority Support', 'Custom Development'] },
    ],
  },
  {
    title: 'Resources',
    submenu: [
      { title: 'Learn', items: ['Blog', 'Webinars', 'Case Studies', 'White Papers'] },
      { title: 'Support', items: ['Documentation', 'FAQs', 'Community Forum', 'Video Tutorials'] },
    ],
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
      className={`transition-colors duration-300 ${isHeaderHovered ? 'bg-white' : 'bg-gray-900'}`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        setActiveMenu(null);
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className={`text-2xl font-bold ${isHeaderHovered ? 'text-teal-600' : 'text-white'}`}>SEAT</span>
        </Link>
        <nav className="relative" ref={menuRef}>
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li
                key={item.title}
                onMouseEnter={() => setActiveMenu(item.title)}
              >
                <Link
                  href={`/${item.title.toLowerCase()}`}
                  className={`py-2 ${isHeaderHovered ? 'text-gray-800' : 'text-white'}`}
                  data-menu={item.title}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <motion.div
            className={`absolute bottom-0 h-0.5 ${isHeaderHovered ? 'bg-teal-600' : 'bg-teal-600'}`}
            initial={false}
            animate={{
              width: underline.width,
              x: underline.left,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/signin" className={`hover:text-teal-400 ${isHeaderHovered ? 'text-gray-800' : 'text-white'}`}>
            Sign In
          </Link>
          <Link href="/signup" className={`px-4 py-2 rounded-md ${isHeaderHovered ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
            Get Started
          </Link>
        </div>
      </div>
      
      <AnimatePresence>
        {isHeaderHovered && activeMenu && menuItems.find(item => item.title === activeMenu)?.submenu && (
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
                    <h3 className="text-teal-600 font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link href="/" className="text-gray-600 hover:text-teal-600">
                            {item}
                          </Link>
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