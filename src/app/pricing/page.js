"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PricingTier = ({ name, price, features, isPopular }) => {
  return (
    <motion.div
      className={`bg-gray-800 p-6 rounded-lg shadow-xl ${isPopular ? 'border-2 border-teal-500' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      {isPopular && (
        <span className="bg-teal-500 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-4 text-white">{name}</h3>
      <p className="text-4xl font-bold mb-6 text-teal-400">${price}<span className="text-lg font-normal text-gray-400">/month</span></p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            {feature.included ? (
              <FaCheck className="text-teal-500 mr-2 flex-shrink-0" />
            ) : (
              <FaTimes className="text-red-500 mr-2 flex-shrink-0" />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="block w-full bg-teal-600 text-white text-center py-2 rounded-md hover:bg-teal-700 transition duration-300">
        Get Started
      </Link>
    </motion.div>
  );
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pricingTiers = [
    {
      name: "Basic",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        { text: "Up to 500 students", included: true },
        { text: "Real-time bus tracking", included: true },
        { text: "Basic messaging", included: true },
        { text: "5 GB storage", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Custom integrations", included: false },
      ]
    },
    {
      name: "Pro",
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        { text: "Up to 2000 students", included: true },
        { text: "Real-time bus tracking", included: true },
        { text: "Advanced messaging", included: true },
        { text: "20 GB storage", included: true },
        { text: "Priority email & phone support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom integrations", included: false },
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      monthlyPrice: 399,
      annualPrice: 319,
      features: [
        { text: "Unlimited students", included: true },
        { text: "Real-time bus tracking", included: true },
        { text: "Advanced messaging", included: true },
        { text: "Unlimited storage", included: true },
        { text: "24/7 premium support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom integrations", included: true },
      ]
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 leading-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl md:text-2xl text-center text-gray-300 mb-8">
            Choose the plan that's right for your school
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className={`mr-4 ${!isAnnual ? 'text-teal-400 font-bold' : 'text-gray-400'}`}>Monthly</span>
          <motion.div
            className="w-14 h-8 flex items-center bg-gray-700 rounded-full p-1 cursor-pointer"
            onClick={() => setIsAnnual(!isAnnual)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="bg-teal-500 w-6 h-6 rounded-full shadow-md"
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              animate={{ x: isAnnual ? 24 : 0 }}
            />
          </motion.div>
          <span className={`ml-4 ${isAnnual ? 'text-teal-400 font-bold' : 'text-gray-400'}`}>Annual (20% off)</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              name={tier.name}
              price={isAnnual ? tier.annualPrice : tier.monthlyPrice}
              features={tier.features}
              isPopular={tier.isPopular}
            />
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 leading-tight">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial available?",
                answer: "We offer a 14-day free trial for all our plans. You can explore all features during this period without any commitment."
              },
              {
                question: "Do you offer discounts for non-profit organizations?",
                answer: "Yes, we offer special pricing for non-profit and educational institutions. Please contact our sales team for more information."
              },
              {
                question: "What kind of support do you offer?",
                answer: "We provide email support for all plans, with priority support and phone support available for Pro and Enterprise plans. Our Enterprise customers also receive 24/7 premium support."
              },
              {
                question: "Can I cancel my subscription at any time?",
                answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll retain access to SEAT until the end of your current billing period."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="mb-8 bg-gray-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-400">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of schools already using SEAT to improve their operations.</p>
          <Link href="/contact" className="bg-teal-600 text-white py-3 px-8 rounded-full text-lg hover:bg-teal-700 transition duration-300 inline-block">
            Start Your Free Trial
          </Link>
        </motion.div>
      </div>
    </div>
  );
}