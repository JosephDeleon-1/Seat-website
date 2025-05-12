"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
// import Image from "next/image"; // Image component is imported but not used. Consider removing if not planned.
import {
  HeartIcon,
  BrainIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  AcademicCapIcon,
  BeakerIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

// System Card Component
const SystemCard = ({
  title,
  icon: IconComponent, // Renamed prop to avoid potential (though unlikely here) clashes and be clearer
  description,
  imageSrc,
  altText,
  delay,
  facts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Fallback for ChevronDownIcon and CheckCircleIcon if they were the issue (less likely than IconComponent)
  const ValidChevronDownIcon = ChevronDownIcon || QuestionMarkCircleIcon;
  const ValidCheckCircleIcon = CheckCircleIcon || QuestionMarkCircleIcon;

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative h-48 bg-blue-100">
        <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
          <span className="text-blue-700 font-medium">{altText}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            {IconComponent ? (
              <IconComponent className="w-6 h-6 text-blue-600" />
            ) : (
              // Fallback if the passed icon is undefined
              <QuestionMarkCircleIcon className="w-6 h-6 text-red-500" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        <button
          className="flex items-center text-blue-600 font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Show Less" : "Show Key Facts"}
          <ValidChevronDownIcon // Using potentially guarded icon
            className={`w-5 h-5 ml-1 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Key Facts:</h4>
                <ul className="space-y-2">
                  {facts.map((fact, idx) => (
                    <li key={idx} className="flex items-start">
                      <ValidCheckCircleIcon // Using potentially guarded icon
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Quiz Question Component
const QuizQuestion = ({ question, options, correctAnswer, delay }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowResult(true);
  };

  const isCorrect = selectedOption === correctAnswer;

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">{question}</h3>

      <div className="space-y-3 mb-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedOption === option
                ? isCorrect
                  ? "bg-green-100 border-green-300 text-green-800"
                  : "bg-red-100 border-red-300 text-red-800"
                : "border-gray-200 hover:bg-gray-50 text-gray-900" // Changed text-gray-700 to text-gray-900
            } ${
              showResult &&
              option === correctAnswer &&
              selectedOption !== option 
                ? "bg-green-100 border-green-300 text-green-800" 
                : ""
            } ${
              showResult && selectedOption === option && isCorrect && "bg-green-100 border-green-300 text-green-800"
            }`}
            onClick={() => !showResult && handleSelect(option)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div
          className={`p-3 rounded-lg ${
            isCorrect ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p
            className={`font-medium ${
              isCorrect ? "text-green-800" : "text-red-800"
            }`}
          >
            {isCorrect
              ? "Correct!"
              : `Incorrect. The correct answer is: ${correctAnswer}`}
          </p>
        </div>
      )}

      {showResult && (
        <button
          className="mt-4 text-blue-600 font-medium hover:text-blue-700"
          onClick={() => {
            setSelectedOption(null);
            setShowResult(false);
          }}
        >
          Try Another Question / Next
        </button>
      )}
    </motion.div>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
      {title}
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

// Body systems data
const bodySystems = [
  {
    title: "Cardiovascular System",
    icon: HeartIcon,
    description:
      "The cardiovascular system consists of the heart, blood vessels, and blood. It's responsible for transporting oxygen, nutrients, hormones, and cellular waste throughout the body.",
    imageSrc: "/images/cardiovascular.jpg", // Ensure these image paths are correct in your /public directory
    altText: "Cardiovascular System Illustration",
    facts: [
      "The average adult heart beats 60-100 times per minute.",
      "Blood vessels include arteries, veins, and capillaries.",
      "A typical adult has 5-6 liters of blood.",
      "The heart pumps about 2,000 gallons of blood each day.",
    ],
  },
  {
    title: "Respiratory System",
    icon: BeakerIcon, // BeakerIcon might be more for chemistry/labs, consider LungIcon if available or a more relevant one
    description:
      "The respiratory system includes the lungs and airways that bring oxygen into the body and remove carbon dioxide. It works closely with the cardiovascular system.",
    imageSrc: "/images/respiratory.jpg",
    altText: "Respiratory System Illustration",
    facts: [
      "Adults typically take 12-20 breaths per minute.",
      "The lungs contain about 300 million alveoli.",
      "The diaphragm is the main muscle used for breathing.",
      "The right lung has three lobes while the left has two.",
    ],
  },
  {
    title: "Nervous System",
    icon: BrainIcon,
    description:
      "The nervous system is the body's command center, consisting of the brain, spinal cord, and nerves. It controls thoughts, movements, and automatic functions.",
    imageSrc: "/images/nervous.jpg",
    altText: "Nervous System Illustration",
    facts: [
      "The brain contains about 86 billion neurons.",
      "Neurons can transmit signals at speeds up to 268 mph.",
      "The central nervous system includes the brain and spinal cord.",
      "The peripheral nervous system connects the CNS to limbs and organs.",
    ],
  },
  {
    title: "Digestive System",
    icon: ChartBarIcon, // ChartBarIcon might not be the most intuitive for digestive system.
    description:
      "The digestive system processes food into nutrients and energy. It includes organs from the mouth to the rectum, plus accessory organs like the liver and pancreas.",
    imageSrc: "/images/digestive.jpg",
    altText: "Digestive System Illustration",
    facts: [
      "The digestive tract is about 30 feet long.",
      "The liver is the largest internal organ.",
      "The stomach's lining produces a new layer every 3-4 days.",
      "Food takes 24-72 hours to completely pass through the digestive system.",
    ],
  },
  {
    title: "Musculoskeletal System",
    icon: UserIcon, // UserIcon is generic, consider an icon more specific to bones/muscles if available.
    description:
      "The musculoskeletal system gives the body structure and enables movement. It consists of bones, muscles, cartilage, tendons, ligaments, joints, and other connective tissue.",
    imageSrc: "/images/musculoskeletal.jpg",
    altText: "Musculoskeletal System Illustration",
    facts: [
      "An adult has 206 bones.",
      "There are over 600 muscles in the human body.",
      "The femur is the longest and strongest bone.",
      "Bones contain marrow that produces blood cells.",
    ],
  },
  {
    title: "Endocrine System",
    icon: BookOpenIcon, // BookOpenIcon is for learning, consider something like a GlandIcon or similar if available.
    description:
      "The endocrine system is a network of glands that produce and release hormones, which control many body functions including metabolism, growth, and reproduction.",
    imageSrc: "/images/endocrine.jpg",
    altText: "Endocrine System Illustration",
    facts: [
      "The major endocrine glands include the pituitary, thyroid, and adrenal glands.",
      "Insulin is produced by the pancreas to regulate blood sugar.",
      "The pituitary gland is often called the 'master gland'.",
      "Hormones can affect cells throughout the body.",
    ],
  },
];

// Quiz questions
const quizQuestions = [
  {
    question:
      "Which of the following is NOT part of the cardiovascular system?",
    options: ["Heart", "Veins", "Alveoli", "Arteries"],
    correctAnswer: "Alveoli",
  },
  {
    question: "What is the main function of the respiratory system?",
    options: [
      "Process nutrients from food",
      "Exchange oxygen and carbon dioxide",
      "Filter blood",
      "Control body movement",
    ],
    correctAnswer: "Exchange oxygen and carbon dioxide",
  },
  {
    question: "How many bones are in an adult human body?",
    options: ["106", "186", "206", "226"],
    correctAnswer: "206",
  },
  {
    question:
      "Which organ is part of both the digestive and endocrine systems?",
    options: ["Liver", "Pancreas", "Kidney", "Heart"],
    correctAnswer: "Pancreas",
  },
];

// Anatomical terms
const anatomicalTerms = [
  { term: "Anterior", definition: "Front of the body or structure" },
  { term: "Posterior", definition: "Back of the body or structure" },
  {
    term: "Superior",
    definition: "Above another structure or toward the head",
  },
  {
    term: "Inferior",
    definition: "Below another structure or toward the feet",
  },
  { term: "Medial", definition: "Toward the midline of the body" },
  { term: "Lateral", definition: "Away from the midline of the body" },
  {
    term: "Proximal",
    definition: "Closer to the point of attachment or origin",
  },
  {
    term: "Distal",
    definition: "Further from the point of attachment or origin",
  },
  { term: "Superficial", definition: "Toward or at the body surface" },
  { term: "Deep", definition: "Away from the body surface" },
  { term: "Supine", definition: "Lying on the back, face upward" },
  { term: "Prone", definition: "Lying on the stomach, face downward" },
];

export default function AnatomyBasics() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  const termsRef = useRef(null);
  const isTermsInView = useInView(termsRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-28 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -left-20 top-20 w-64 h-64 rounded-full bg-blue-400"></div>
          <div className="absolute right-10 top-40 w-80 h-80 rounded-full bg-blue-300"></div>
          <div className="absolute left-1/3 bottom-10 w-40 h-40 rounded-full bg-blue-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div ref={headerRef} className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={
                isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
              }
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Anatomy Basics
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                Understand the fundamental structure and organization of the
                human body. This knowledge is essential for accurate medical
                coding and healthcare documentation.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#body-systems"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Body Systems</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="#anatomical-terms"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Anatomical Terms</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="#quiz"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Knowledge Check</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"> {/* Adjusted viewBox height for a potentially shorter wave */}
            <path
              fill="#f9fafb" /* Changed from #ffffff to match from-gray-50 of next section */
              fillOpacity="1"
              d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" // Adjusted path points slightly for the new viewBox height and to ensure it fills bottom
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Introduction to Human Anatomy
            </h2>
            <p className="text-gray-700 mb-4">
              Anatomy is the study of the structure and organization of the
              human body. Understanding anatomy is fundamental to medical
              coding, as it provides the foundation for accurately coding
              diagnoses and procedures.
            </p>
            <p className="text-gray-700 mb-4">
              The human body is organized into several levels of complexity:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Cells</strong> - The basic structural and functional
                units of all living organisms
              </li>
              <li>
                <strong>Tissues</strong> - Groups of similar cells that work
                together to perform a specific function
              </li>
              <li>
                <strong>Organs</strong> - Structures composed of two or more
                tissue types that perform specific functions
              </li>
              <li>
                <strong>Systems</strong> - Groups of organs that work together
                to perform a common function
              </li>
            </ul>
            <p className="text-gray-700">
              In this guide, we'll focus on the major body systems and
              anatomical terminology essential for understanding medical
              documentation and coding.
            </p>
          </div>
        </div>

        {/* Body Systems Section */}
        <div id="body-systems" className="mb-24">
          <SectionHeader
            title="Major Body Systems"
            subtitle="Each body system performs specific functions and works together with other systems to maintain homeostasis, the body's balanced internal environment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {bodySystems.map((system, index) => (
              <SystemCard
                key={index}
                title={system.title}
                icon={system.icon}
                description={system.description}
                imageSrc={system.imageSrc}
                altText={system.altText}
                facts={system.facts}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>

        {/* Anatomical Terms Section */}
        <div id="anatomical-terms" className="mb-24" ref={termsRef}>
          <SectionHeader
            title="Anatomical Terminology"
            subtitle="Anatomical terms provide a universal language to describe the body's position, regions, and relationships between structures."
          />

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTermsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-blue-800 mb-6">
              Directional and Positional Terms
            </h3>

            <div className="relative overflow-x-auto mb-8"> {/* This div might not be needed if using grid for responsiveness */}
              <div className="min-w-full"> {/* This div might not be needed if using grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Adjusted grid for better responsiveness */}
                  {anatomicalTerms.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-blue-50 p-4 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isTermsInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <h4 className="font-bold text-blue-800 mb-1">
                        {item.term}
                      </h4>
                      <p className="text-gray-600 text-sm">{item.definition}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Body Planes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Sagittal Plane
                      </span>
                      <p className="text-gray-600">
                        Divides the body into right and left portions
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Frontal (Coronal) Plane
                      </span>
                      <p className="text-gray-600">
                        Divides the body into anterior and posterior portions
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Transverse Plane
                      </span>
                      <p className="text-gray-600">
                        Divides the body into superior and inferior portions
                      </p>                    
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Body Cavities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Dorsal Cavity
                      </span>
                      <p className="text-gray-600">
                        Contains the brain and spinal cord
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Thoracic Cavity
                      </span>
                      <p className="text-gray-600">
                        Contains the heart, lungs, and esophagus
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Abdominal Cavity
                      </span>
                      <p className="text-gray-600">
                        Contains the stomach, liver, intestines, and other
                        organs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Pelvic Cavity
                      </span>
                      <p className="text-gray-600">
                        Contains the bladder, reproductive organs, and rectum
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="p-4 bg-blue-100 rounded-full mb-4 md:mb-0 md:mr-6 flex-shrink-0"> {/* Added flex-shrink-0 */}
                <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Why is Anatomical Terminology Important?
                </h3>
                <p className="text-gray-700">
                  Precise anatomical terminology is crucial in medical
                  documentation and coding. It ensures that healthcare providers
                  communicate accurately about the location of injuries,
                  diseases, and treatments. In medical coding, understanding
                  these terms helps assign the correct codes for body parts and
                  procedures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div id="quiz" className="mb-24">
          <SectionHeader
            title="Test Your Knowledge"
            subtitle="Check your understanding of basic anatomical concepts with these practice questions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quizQuestions.map((question, index) => (
              <QuizQuestion
                key={index}
                question={question.question}
                options={question.options}
                correctAnswer={question.correctAnswer}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>

        {/* Visual Learning Section */}
        <div className="mb-24">
          <SectionHeader
            title="Visual Learning Resources"
            subtitle="Enhance your understanding of anatomy with these visual learning tools."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-blue-100">
                <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
                  <span className="text-blue-700 font-medium">
                    3D Anatomy Models {/* Placeholder text */}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Interactive 3D Models
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore detailed 3D models of human anatomy. Rotate, zoom, and
                  identify structures to enhance your understanding.
                </p>
                <Link
                  href="/resources" // Update this link as needed
                  className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700"
                >
                  Access 3D Models
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-blue-100">
                <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
                  <span className="text-blue-700 font-medium">
                    Video Tutorials {/* Placeholder text */}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Video Tutorials
                </h3>
                <p className="text-gray-600 mb-4">
                  Watch comprehensive video lessons on body systems and
                  anatomical structures taught by experienced instructors.
                </p>
                <Link
                  href="/resources" // Update this link as needed
                  className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700"
                >
                  View Video Library
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-blue-100">
                <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
                  <span className="text-blue-700 font-medium">
                    Printable Diagrams {/* Placeholder text */}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Printable Resources
                </h3>
                <p className="text-gray-600 mb-4">
                  Download and print high-quality anatomical diagrams,
                  flashcards, and study sheets for offline learning.
                </p>
                <Link
                  href="/resources" // Update this link as needed
                  className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700"
                >
                  Download Resources
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Applications Section */}
        <div className="mb-24">
          <SectionHeader
            title="Clinical Applications"
            subtitle="Understanding how anatomical knowledge applies to medical coding and healthcare documentation."
          />

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Anatomy in Medical Coding
                </h3>
                <p className="text-gray-700 mb-4">
                  Accurate anatomical knowledge is essential for medical coders
                  to assign the correct diagnosis and procedure codes.
                  Understanding the relationships between body systems helps
                  coders interpret medical documentation correctly.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">
                    Example: Coding a Fracture
                  </h4>
                  <p className="text-gray-700">
                    When coding a fracture, you need to understand:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li>Which bone is affected (anatomy)</li>
                    <li>The specific part of the bone (anatomical location)</li>
                    <li>The type of fracture (medical terminology)</li>
                    <li>Any complications (related body systems)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Anatomy in Medical Documentation
                </h3>
                <p className="text-gray-700 mb-4">
                  Healthcare providers use anatomical terms to document patient
                  conditions precisely. Understanding these terms helps medical
                  coders translate the documentation into accurate codes.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">
                    Example: Operative Report
                  </h4>
                  <p className="text-gray-700">
                    An operative report might describe:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li>Surgical approach (anatomical planes)</li>
                    <li>Structures encountered (tissues, organs)</li>
                    <li>Procedure location (directional terms)</li>
                    <li>Findings (normal vs. pathological anatomy)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl text-white p-10 mb-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-700/10 rounded-full -ml-40 -mb-40"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Expand Your Anatomical Knowledge?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our comprehensive Medical Coding program and build a solid
              foundation in anatomy, medical terminology, and coding principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-medium hover:bg-blue-50 transition duration-300 shadow-lg"
              >
                Explore Our Programs
              </Link>
              <Link
                href="/resources/medical-terminology" // Ensure this path is correct
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition duration-300"
              >
                Explore Medical Terminology
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center md:text-left"> {/* Centered on small, left on medium+ */}
            Recommended Resources
          </h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-blue-800 mb-6"> {/* Increased margin bottom */}
              Further Study Materials
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0"> {/* Increased padding */}
                  <BookOpenIcon className="w-6 h-6 text-blue-600" /> {/* Increased icon size */}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Books</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1"> 
                    <li>Gray's Anatomy for Students</li>
                    <li>Netter's Atlas of Human Anatomy</li>
                    <li>The Anatomy Coloring Book</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Online Courses
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>CCI Anatomy & Physiology for Medical Coders</li>
                    <li>Human Anatomy & Physiology Fundamentals</li>
                    <li>Body Systems for Coding Professionals</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                  <svg // Lightbulb icon
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2} // Added strokeWidth for heroicons outline style
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Interactive Tools
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>3D Anatomy Apps</li>
                    <li>Visible Body Human Anatomy Atlas</li>
                    <li>Complete Anatomy Platform</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200"> {/* Increased top margin, slightly darker border */}
                <Link
                  href="/resources" // Update this link
                  className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700"
                >
                  View All Learning Resources
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Removed the extra closing curly brace that was here