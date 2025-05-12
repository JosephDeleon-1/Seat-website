"use client";

import { useState, useRef } from "react"; // Removed useEffect, added useRef
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion"; // Added AnimatePresence, useInView
import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa"; // Added FaChevronDown

// --- Pricing Tier Component ---
const PricingTier = ({
  name,
  price,
  priceTerm,
  features,
  isPopular,
  delay,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 }); // Animate when 10% visible

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col bg-gray-800 p-6 rounded-lg shadow-xl h-full ${
        isPopular
          ? "border-2 border-teal-500 relative"
          : "border border-gray-700"
      }`} // Added border for non-popular, full height, flex col
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
          Most Popular
        </span>
      )}
      <div className="pt-4">
        {" "}
        {/* Added padding top to account for potential badge */}
        <h3 className="text-2xl font-bold mb-4 text-white">{name}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-teal-400">${price}</span>
          <span className="text-lg font-normal text-gray-400">
            /{priceTerm}
          </span>
        </div>
        <ul className="mb-8 space-y-3">
          {" "}
          {/* Increased spacing */}
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-300">
              {" "}
              {/* Use items-start for long text */}
              {feature.included ? (
                <FaCheck
                  className="text-teal-500 mr-2 mt-1 flex-shrink-0"
                  aria-label="Included:"
                />
              ) : (
                <FaTimes
                  className="text-red-500 mr-2 mt-1 flex-shrink-0"
                  aria-label="Not included:"
                />
              )}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        {" "}
        {/* Pushes button to bottom */}
        <Link
          href={
            name === "Enterprise"
              ? "/contact?plan=enterprise"
              : "/signup?plan=" + name.toLowerCase()
          } // Example dynamic links
          className={`block w-full text-white text-center py-3 px-4 rounded-md transition duration-300 font-semibold ${
            isPopular
              ? "bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800" // Popular button style
              : "bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800" // Standard button style
          }`}
        >
          {name === "Enterprise" ? "Contact Us" : "Get Started"}{" "}
          {/* Dynamic Button Text */}
        </Link>
      </div>
    </motion.div>
  );
};

// --- FAQ Item Component ---
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  // Animate FAQ items as they enter view individually
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="mb-4 bg-gray-800 rounded-lg overflow-hidden" // Added overflow-hidden
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }} // Stagger FAQ items slightly
    >
      <h2>
        {" "}
        {/* Changed h3 to h2 for semantic structure within FAQ section */}
        <button
          type="button"
          className="flex justify-between items-center w-full p-5 md:p-6 text-left font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-lg">{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown className="w-5 h-5 text-gray-400" />
          </motion.span>
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pt-4 pb-5 md:pb-6 text-gray-300">
              {" "}
              {/* Added pt-4 */}
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Pricing Page Data ---
const pricingTiersData = [
  {
    name: "Basic",
    monthlyPrice: 99,
    annualPrice: 79, // Approx 20% discount (99*12 = 1188, 79*12 = 948)
    features: [
      { text: "Up to 500 students", included: true },
      { text: "Real-time bus tracking", included: true },
      { text: "Basic parent/school messaging", included: true },
      { text: "Standard route management", included: true },
      { text: "5 GB document storage", included: true },
      { text: "Email support", included: true },
      { text: "Advanced analytics dashboard", included: false },
      { text: "API access for integrations", included: false },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 199,
    annualPrice: 159, // Approx 20% discount
    features: [
      { text: "Up to 2000 students", included: true },
      { text: "Real-time bus tracking with alerts", included: true },
      { text: "Advanced messaging with groups", included: true },
      { text: "Route optimization suggestions", included: true },
      { text: "20 GB document storage", included: true },
      { text: "Priority email & phone support", included: true },
      { text: "Advanced analytics dashboard", included: true },
      { text: "API access for integrations", included: false },
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null, // Use null or specific text for custom pricing
    annualPrice: null,
    features: [
      { text: "Unlimited students & staff", included: true },
      { text: "Real-time bus tracking with geofencing", included: true },
      { text: "Advanced messaging & emergency broadcasts", included: true },
      { text: "Automated route optimization", included: true },
      { text: "Unlimited storage & data retention", included: true },
      {
        text: "Dedicated account manager & 24/7 premium support",
        included: true,
      },
      { text: "Advanced analytics & custom reports", included: true },
      { text: "Full API access & custom integrations", included: true },
    ],
  },
];

const faqData = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time through your account dashboard. Changes for upgrades are immediate (prorated), and downgrades apply at the next billing cycle.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial of our Pro plan so you can experience the full range of features. No credit card required to start.",
  },
  {
    question: "What happens after the trial ends?",
    answer:
      "We'll notify you before your trial expires. You can then choose a paid plan to continue using SEAT or let the trial expire.",
  },
  {
    question: "Do you offer discounts for non-profits or school districts?",
    answer:
      "Absolutely. We offer special pricing for registered non-profit organizations and multi-school districts. Please contact our sales team for a custom quote.",
  },
  {
    question: "What kind of support is included?",
    answer:
      "All plans include access to our knowledge base and email support. Pro plans add phone support, and Enterprise plans include a dedicated account manager and 24/7 premium support.",
  },
  {
    question: "How is 'student count' calculated?",
    answer:
      "Student count refers to the number of active student profiles within the SEAT system that require tracking or are associated with parent accounts.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You will retain access to your account and features until the end of your current paid billing period.",
  },
];

// --- Main Pricing Page Component ---
export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  // --- Refs and InView Hooks for Section Animations ---
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const toggleRef = useRef(null);
  const isToggleInView = useInView(toggleRef, { once: true, amount: 0.2 });

  const tiersRef = useRef(null);
  // Tiers have individual animations via PricingTier component

  const faqRef = useRef(null);
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        {/* --- Hero Section --- */}
        <section ref={heroRef} className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={
              isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
            }
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-center text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose the SEAT plan that fits your school's size and needs. Save
              ~20% with annual billing.
            </p>
          </motion.div>
        </section>

        {/* --- Billing Toggle --- */}
        <section
          ref={toggleRef}
          className="flex justify-center items-center mb-12 md:mb-16"
        >
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={isToggleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className={`transition-colors ${
                !isAnnual ? "text-teal-400 font-semibold" : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            {/* Accessible Toggle Button */}
            <motion.button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual pricing"
              className="w-14 h-8 flex items-center bg-gray-700 rounded-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-white w-6 h-6 rounded-full shadow-md"
                layout // Keep layout for smooth transition
                transition={{ type: "spring", stiffness: 600, damping: 30 }} // Keep spring transition
                animate={{ x: isAnnual ? 24 : 0 }} // USE animate prop with pixel value
                initial={false}
              />
            </motion.button>
            <span
              className={`transition-colors ${
                isAnnual ? "text-teal-400 font-semibold" : "text-gray-400"
              }`}
            >
              Annual <span className="hidden sm:inline">(Save ~20%)</span>
            </span>
          </motion.div>
        </section>

        {/* --- Pricing Tiers Grid --- */}
        <section
          ref={tiersRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 md:mb-28 items-stretch"
        >
          {" "}
          {/* Use items-stretch */}
          {pricingTiersData.map((tier, index) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const priceTerm = isAnnual ? "year" : "month";
            // Handle custom pricing display for Enterprise
            const displayPrice = name === "Enterprise" ? "Custom" : price;
            const displayTerm =
              name === "Enterprise" ? "Contact Us" : `/${priceTerm}`;

            return (
              <PricingTier
                key={index}
                name={tier.name}
                price={
                  tier.name === "Enterprise"
                    ? "Custom"
                    : isAnnual
                    ? tier.annualPrice
                    : tier.monthlyPrice
                }
                priceTerm={
                  tier.name === "Enterprise" ? "" : isAnnual ? "year" : "month"
                }
                features={tier.features}
                isPopular={tier.isPopular}
                delay={index * 0.1} // Stagger animation delay
              />
            );
          })}
        </section>

        {/* --- FAQ Section --- */}
        <section ref={faqRef} className="mb-20 md:mb-28">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 leading-tight"
            initial={{ opacity: 0 }}
            animate={isFaqInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            {/* FAQ items handle their own animation via useInView in FAQItem */}
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>

        {/* --- Final CTA Section --- */}
        <section ref={ctaRef} className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to streamline your school operations?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial of SEAT Pro today. No credit card
              required.
            </p>
            <Link
              href="/signup?plan=pro&trial=true" // Example trial link
              className="inline-block bg-teal-600 text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
