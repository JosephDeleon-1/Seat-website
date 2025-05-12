"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDownIcon,
  AcademicCapIcon,
  CalendarIcon, // Note: CalendarIcon and some others were imported but not used. Removed for cleanup if not planned for use.
  ComputerDesktopIcon,
  DocumentCheckIcon, // Note: DocumentCheckIcon imported but not used.
  HandRaisedIcon,
  CurrencyDollarIcon, // Note: CurrencyDollarIcon imported but not used.
  BriefcaseIcon,      // Note: BriefcaseIcon imported but not used.
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// FAQ Category Component
const FAQCategory = ({ title, icon: Icon, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center mb-8">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mr-5 shadow-sm">
          <Icon className="text-blue-600 w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </motion.div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        className={`w-full p-6 flex items-center justify-between text-left focus:outline-none transition-colors duration-200 ${
          isOpen ? "bg-blue-50" : "bg-white hover:bg-gray-50/50" // Changed open state bg, added hover for closed
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon
            className={`w-5 h-5 ${isOpen ? "text-blue-600" : "text-gray-400"}`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 bg-white">
              <div className="prose prose-blue max-w-none pt-5 border-t border-gray-100 text-gray-600">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// List with icons
const IconList = ({ items }) => (
  <ul className="space-y-3 mt-4">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start">
        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
        <span className="text-gray-700">{item}</span>
      </li>
    ))}
  </ul>
);

export default function FAQ() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-36 pb-28 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -left-10 -top-10 w-64 h-64 rounded-full bg-blue-300"></div>
          <div className="absolute right-10 top-40 w-96 h-96 rounded-full bg-blue-400"></div>
          <div className="absolute left-1/3 bottom-10 w-80 h-80 rounded-full bg-blue-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={headerRef} className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={
                isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
              }
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Find answers to common questions about medical coding and our
                comprehensive learning programs
              </p>
            </motion.div>
          </div>
        </div>

        {/* Modern wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 200" // Reduced height for a subtler wave
            className="w-full h-auto"
          >
            <path
              fill="#f9fafb" // Changed to match the from-gray-50 for seamless transition
              fillOpacity="1"
              d="M0,128L60,133.3C120,139,240,149,360,144C480,139,600,117,720,122.7C840,128,960,160,1080,165.3C1200,171,1320,149,1380,138.7L1440,128L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z" // Adjusted path slightly
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Navigation - VISUALLY ENHANCED */}
        <div className="mb-20 bg-white rounded-3xl shadow-lg p-8 md:p-10 -mt-24 md:-mt-20 relative z-20 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                href: "#about-coding",
                icon: ComputerDesktopIcon,
                label: "About Medical Coding"
              },
              {
                href: "#program-info",
                icon: AcademicCapIcon,
                label: "Program Information"
              },
              {
                href: "#career-support",
                icon: HandRaisedIcon,
                label: "Career Support"
              },
              {
                href: "#why-choose",
                icon: CheckCircleIcon,
                label: "Why Choose Us"
              }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex flex-col items-center p-5 pt-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all duration-300 ease-in-out group border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ease-in-out group-hover:bg-blue-200 group-hover:scale-110">
                  <item.icon className="w-7 h-7 text-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-95" />
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-blue-700 text-center text-sm md:text-base transition-colors duration-300">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {/* About Medical Coding */}
          <section id="about-coding">
            <FAQCategory title="About Medical Coding" icon={ComputerDesktopIcon}>
              <FAQItem
                question="What is medical coding?"
                answer={
                  <p className="leading-relaxed">
                    Medical coding is the process of translating healthcare
                    diagnoses, procedures, services, and equipment into
                    standardized codes. These codes are essential for billing,
                    insurance claims, and maintaining accurate medical records.
                    Medical coding creates a universal language for healthcare
                    documentation and reimbursement across the industry.
                  </p>
                }
                initiallyOpen={true}
              />

              <FAQItem
                question="What qualifications do I need to enroll?"
                answer={
                  <p className="leading-relaxed">
                    Most programs require a high school diploma or GED. No prior
                    medical experience is necessary — we'll teach you everything
                    you need to know! A basic familiarity with computers and
                    attention to detail are helpful skills for success in this
                    field.
                  </p>
                }
              />
            </FAQCategory>
          </section>

          {/* Program Information */}
          <section id="program-info">
            <FAQCategory title="Program Information" icon={AcademicCapIcon}>
              <FAQItem
                question="How long does the program take to complete?"
                answer={
                  <p className="leading-relaxed">
                    Program lengths vary, but many can be completed in{" "}
                    <strong>6 to 12 months</strong>, depending on whether you
                    study full-time or part-time. Our curriculum is structured
                    to give you comprehensive knowledge while allowing you to
                    balance other responsibilities.
                  </p>
                }
              />

              <FAQItem
                question="Is this program online or in-person?"
                answer={
                  <p className="leading-relaxed">
                    Our online programs are designed to accommodate your
                    schedule and learning style. The virtual classroom
                    environment includes interactive lessons, practice
                    exercises, and regular check-ins with instructors to ensure
                    you're progressing well throughout the course.
                  </p>
                }
              />

              <FAQItem
                question="What certifications will I be prepared for?"
                answer={
                  <>
                    <p className="leading-relaxed">
                      Our program prepares students for industry-recognized
                      certifications like:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-1">
                      <li>
                        <strong>CCS® (Certified Coding Specialist)</strong> – by
                        AHIMA (gold-standard certification)
                      </li>
                    </ul>
                    <p className="mt-3 leading-relaxed">
                      This certification is highly respected in the industry and
                      can significantly enhance your employment opportunities
                      and earning potential.
                    </p>
                  </>
                }
              />

              <FAQItem
                question="Will I get hands-on experience?"
                answer={
                  <p className="leading-relaxed">
                    Yes! When you get certified you will have the option to
                    train and practice coding real-world medical cases, using
                    official coding manuals and electronic health records (EHRs)
                    to simulate real job scenarios. This practical experience
                    helps bridge the gap between classroom learning and
                    workplace requirements.
                  </p>
                }
              />
            </FAQCategory>
          </section>

          {/* Career Support */}
          <section id="career-support">
            <FAQCategory title="Career Support" icon={HandRaisedIcon}>
              <FAQItem
                question="Do you help with job placement?"
                answer={
                  <p className="leading-relaxed">
                    We offer <strong>career services</strong> including resume
                    help, interview coaching, and job placement assistance. Our
                    team works with local and national healthcare employers to
                    connect graduates with relevant job opportunities in the
                    medical coding field.
                  </p>
                }
              />

              <FAQItem
                question="How much does the program cost?"
                answer={
                  <p className="leading-relaxed">
                    Our tuition is affordable compared to other private
                    institutions, with flexible payment plans and discounts
                    available for full payment. We strive to make quality
                    medical coding education accessible to all qualified
                    candidates interested in pursuing this rewarding career
                    path.
                  </p>
                }
              />

              <FAQItem
                question="What kind of jobs can I get after graduation?"
                answer={
                  <>
                    <p className="leading-relaxed">Graduates can work as:</p>
                    <ul className="list-disc pl-5 mt-3 space-y-1">
                      <li>Medical Coders</li>
                      <li>Coding Specialists</li>
                      <li>Medical Billing Specialists</li>
                      <li>Revenue Cycle Analysts</li>
                      <li>
                        And more — in hospitals, clinics, billing companies, and
                        insurance firms.
                      </li>
                    </ul>
                    <p className="mt-3 leading-relaxed">
                      These positions are available across the healthcare
                      industry, offering stability and potential for career
                      advancement.
                    </p>
                  </>
                }
              />
            </FAQCategory>
          </section>

          {/* Why Choose Us */}
          <section id="why-choose">
            <FAQCategory
              title="Why Choose Capitol Coding Institute"
              icon={CheckCircleIcon}
            >
              <FAQItem
                question="Why should I choose your program?"
                answer={
                  <>
                    <p className="leading-relaxed">We offer:</p>
                    <IconList
                      items={[
                        "Experienced instructors with real-world coding experience",
                        "Comprehensive certification exam preparation",
                        "Flexible scheduling to fit your life commitments",
                        "Supportive learning community",
                        "Career resources focused on your success",
                        "Ongoing professional development opportunities",
                      ]}
                    />
                    <p className="mt-4 leading-relaxed">
                      We're committed to helping you succeed in the growing
                      field of medical coding from your first day of class
                      through your career placement and beyond.
                    </p>
                  </>
                }
              />

              <FAQItem
                question="What if I have additional questions?"
                answer={
                  <p className="leading-relaxed">
                    Our admissions team is available to answer any specific
                    questions about the program, career opportunities, or
                    enrollment process. We encourage prospective students to
                    reach out directly to discuss their individual situations
                    and how our program can help them achieve their professional
                    goals.
                  </p>
                }
              />
            </FAQCategory>
          </section>
        </div>

        {/* Still have questions section */}
        <div className="max-w-4xl mx-auto mt-16 mb-20">
          <div className="bg-gradient-to-br from-slate-50 to-white border border-gray-200/70 rounded-3xl p-10 md:p-12 text-center shadow-lg">
            <QuestionMarkCircleIcon className="w-16 h-16 mx-auto text-blue-500 mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Our admissions team is here to help with any specific questions
              about the program, career opportunities, or enrollment process.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white py-3 px-8 md:py-4 md:px-10 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Final CTA Section */}
        <section ref={ctaRef} className="mb-10 px-4"> {/* Added px-4 for small screen padding */}
          <motion.div
            className="bg-gradient-to-br from-blue-800 to-blue-900 p-10 md:p-14 rounded-3xl text-white text-center shadow-lg overflow-hidden relative max-w-5xl mx-auto" // Added max-w-5xl mx-auto
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full -ml-40 -mb-40"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Ready to Start Your Medical Coding Career?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Join our program and gain the skills, knowledge, and certification
                needed to succeed in this growing healthcare field.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/programs"
                  className="inline-block bg-white text-blue-800 py-3 px-8 md:py-4 md:px-10 rounded-xl text-lg font-medium hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Explore Programs
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white py-3 px-8 md:py-4 md:px-10 rounded-xl text-lg font-medium hover:bg-white/10 transition duration-300 backdrop-blur-sm"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}