"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    schoolName: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        schoolName: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  const inputClasses = "w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            We&apos;re here to help and answer any question you might have
          </p>
        </motion.div>

        <div className="mt-20">
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="schoolName" className="block text-gray-300 text-sm font-bold mb-2">School Name</label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="districtName" className="block text-gray-300 text-sm font-bold mb-2">District Name</label>
                <input
                  type="text"
                  id="districtName"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} h-32`}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {formStatus === 'success' && (
                <p className="mt-4 text-green-400">Thank you for your message. We&apos;ll get back to you soon!</p>
              )}
              {formStatus === 'error' && (
                <p className="mt-4 text-red-400">There was an error sending your message. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 leading-tight">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaPhone, title: "Phone", content: "(123) 456-7890" },
              { icon: FaEnvelope, title: "Email", content: "info@seatapp.com" },
              { icon: FaMapMarkerAlt, title: "Address", content: "123 SEAT Street, City, State 12345" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <item.icon className="w-12 h-12 mx-auto mb-4 text-teal-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 leading-tight">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              {
                question: "How quickly can we implement SEAT in our school?",
                answer: "SEAT can typically be implemented within 2-4 weeks, depending on the size of your school and specific requirements."
              },
              {
                question: "Is training provided for staff and parents?",
                answer: "Yes, we provide comprehensive training for school staff and offer resources to help parents get started with the SEAT app."
              },
              {
                question: "Can SEAT integrate with our existing school management system?",
                answer: "SEAT is designed to integrate with many popular school management systems. Our team can work with you to ensure smooth integration with your existing infrastructure."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg transition-all duration-300 hover:bg-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
