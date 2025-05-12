"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

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
        phone: '',
        subject: '',
        message: ''
      });

      // Scroll to form to show success message
      if (formRef.current) { // Added a check for formRef.current
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
       // Optionally, reset error message after some time
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    }
  };

  const contactInfoItems = [
    {
      icon: PhoneIcon,
      title: "Phone",
      content: "(123) 456-7890",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "info@capitolcodinginstitute.com",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: MapPinIcon,
      title: "Address",
      content: "123 Coding Street, City, State 12345",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      icon: ClockIcon,
      title: "Hours",
      content: "Mon-Fri: 9AM - 5PM EST",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to complete the program?",
      answer: "Our medical coding program typically takes 6-9 months to complete, depending on your pace and schedule."
    },
    {
      question: "Do you offer financial assistance?",
      answer: "Yes, we offer flexible payment plans and can provide information about financial aid options. Please contact our admissions office for details."
    },
    {
      question: "Will I be prepared for certification exams?",
      answer: "Absolutely! Our curriculum is designed to prepare you for industry-standard certification exams including CPC, CCS, and more."
    },
    {
      question: "Can I study while working full-time?",
      answer: "Yes, our program is designed with flexibility in mind for working professionals. Many of our students successfully balance full-time employment with their studies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-700/20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-700/10 -ml-10 -mb-10"></div>

        <div className="container mx-auto px-6 py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let's Start Your <span className="text-blue-300">Coding Journey</span> Together
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Have questions about our programs or ready to enroll? We're here to help you take the next step in your medical coding career.
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-900 rounded-full text-lg font-medium hover:bg-blue-50 transition duration-300 shadow-lg"
            >
              Contact Us Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>

        {/* Wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
            <path
              fill="#f9fafb" // Assuming gray-50 is #f9fafb. Change if your gray-50 is different.
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Contact information cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {contactInfoItems.map((item, index) => (
            <motion.div
              key={index}
              className={`${item.bgColor} p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-xl ${item.bgColor} mr-4`}> {/* Consider making icon background slightly different for contrast if item.bgColor is very light */}
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.content}</p> {/* Made content text slightly smaller for balance */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-column layout for form and map/image */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          {/* Contact form */}
          <motion.div
            className="w-full lg:w-7/12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            ref={formRef}
            id="contact-form"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 h-36"
                      placeholder="Tell us what you're looking for..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div
                        className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-start"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                        <p>Thank you for your message! We'll get back to you as soon as possible.</p>
                      </motion.div>
                    )}

                    {formStatus === 'error' && (
                      <motion.div
                        className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <ExclamationCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                        <p>There was an error sending your message. Please try again or contact us directly by phone.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Map or image */}
          <motion.div
            className="w-full lg:w-5/12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gray-100 h-full rounded-3xl overflow-hidden shadow-lg min-h-[400px] lg:min-h-full"> {/* Added min-height for better appearance */}
              <div className="relative h-full w-full bg-gray-200">
                {/* This is a placeholder for a map. You can replace it with an actual map component */}
                <div className="absolute inset-0 bg-blue-900/10">
                  <iframe
                    src="https://maps.google.com/maps?q=123%20Coding%20Street%2C%20City%2C%20State%2012345&t=&z=13&ie=UTF8&iwloc=&output=embed" // Example working src
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find quick answers to common questions about our program.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }} // Corrected to use isVisible for consistency
                transition={{ duration: 0.5, delay: 0.1 * (index + 2) }} // Adjusted delay to avoid overlap with form animation
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all FAQs
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* CTA Section --- CORRECTED --- */}
        <motion.div
          className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl overflow-hidden shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Abstract shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-700/10 rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10 p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Begin Your Medical Coding Career?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Take the first step towards a rewarding career in healthcare. Our team is here to guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-medium hover:bg-blue-50 transition duration-300 shadow-lg"
              >
                Explore Programs
              </Link>
              <a 
                href="#contact-form"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}