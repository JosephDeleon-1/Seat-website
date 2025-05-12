"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  HeartIcon,
  BrainIcon,
  DocumentTextIcon,
  BookmarkIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  LightBulbIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

// Term Card Component
const TermCard = ({ prefix, meaning, examples, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-xl font-bold text-blue-800">{prefix}</h3>
          <p className="text-gray-600 mt-1">{meaning}</p>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Examples:</h4>
                <ul className="space-y-2">
                  {examples.map((example, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-800">
                          {example.term}
                        </span>
                        <span className="text-gray-600">
                          {" "}
                          - {example.definition}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Category Section Component
const CategorySection = ({ title, icon: Icon, children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center mb-8">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mr-5 shadow-sm">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
};

// Flash Card Component
const FlashCard = ({ term, definition, delay }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="h-60 w-full perspective"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white rounded-xl shadow-md h-full flex items-center justify-center p-6 border-2 border-blue-200 cursor-pointer hover:border-blue-400 transition-colors">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">{term}</h3>
              <p className="text-sm text-gray-500">
                Click to reveal definition
              </p>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-blue-600 rounded-xl shadow-md h-full flex items-center justify-center p-6 text-white cursor-pointer">
            <p className="text-center">{definition}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// List of prefixes
const prefixes = [
  {
    prefix: "cardio-",
    meaning: "related to the heart",
    examples: [
      { term: "Cardiology", definition: "The study of the heart" },
      {
        term: "Cardiovascular",
        definition: "Relating to the heart and blood vessels",
      },
      { term: "Cardiomyopathy", definition: "Disease of the heart muscle" },
    ],
  },
  {
    prefix: "derma-",
    meaning: "relating to the skin",
    examples: [
      { term: "Dermatology", definition: "The study of skin" },
      { term: "Dermatitis", definition: "Inflammation of the skin" },
      {
        term: "Dermatome",
        definition: "An area of skin supplied by a single spinal nerve",
      },
    ],
  },
  {
    prefix: "gastro-",
    meaning: "relating to the stomach",
    examples: [
      { term: "Gastrology", definition: "The study of the stomach" },
      {
        term: "Gastroenterology",
        definition: "The study of the digestive system",
      },
      { term: "Gastritis", definition: "Inflammation of the stomach lining" },
    ],
  },
  {
    prefix: "neuro-",
    meaning: "relating to nerves or the nervous system",
    examples: [
      { term: "Neurology", definition: "The study of the nervous system" },
      {
        term: "Neuralgia",
        definition: "Pain that follows the path of a nerve",
      },
      {
        term: "Neuroplasticity",
        definition: "The ability of the brain to form new connections",
      },
    ],
  },
  {
    prefix: "osteo-",
    meaning: "relating to bone",
    examples: [
      { term: "Osteology", definition: "The study of bones" },
      {
        term: "Osteoporosis",
        definition: "Condition where bones become brittle",
      },
      { term: "Osteoblast", definition: "Cell that forms new bone tissue" },
    ],
  },
  {
    prefix: "cyto-",
    meaning: "relating to cells",
    examples: [
      { term: "Cytology", definition: "The study of cells" },
      { term: "Cytoplasm", definition: "The material within a cell" },
      { term: "Cytotoxic", definition: "Toxic to cells" },
    ],
  },
];

// List of suffixes
const suffixes = [
  {
    prefix: "-itis",
    meaning: "inflammation",
    examples: [
      { term: "Arthritis", definition: "Inflammation of joints" },
      { term: "Bronchitis", definition: "Inflammation of the bronchial tubes" },
      { term: "Dermatitis", definition: "Inflammation of the skin" },
    ],
  },
  {
    prefix: "-ology",
    meaning: "the study of",
    examples: [
      { term: "Cardiology", definition: "The study of the heart" },
      { term: "Neurology", definition: "The study of the nervous system" },
      { term: "Pathology", definition: "The study of disease" },
    ],
  },
  {
    prefix: "-ectomy",
    meaning: "surgical removal",
    examples: [
      { term: "Appendectomy", definition: "Surgical removal of the appendix" },
      { term: "Tonsillectomy", definition: "Surgical removal of the tonsils" },
      { term: "Mastectomy", definition: "Surgical removal of the breast" },
    ],
  },
  {
    prefix: "-osis",
    meaning: "abnormal condition or disease",
    examples: [
      {
        term: "Osteoporosis",
        definition: "Condition where bones become brittle",
      },
      {
        term: "Neurosis",
        definition: "Mental disorder characterized by anxiety",
      },
      {
        term: "Sclerosis",
        definition: "Hardening of tissue, typically from inflammation",
      },
    ],
  },
  {
    prefix: "-gram",
    meaning: "a record or image",
    examples: [
      {
        term: "Electrocardiogram",
        definition: "Record of electrical activity of the heart",
      },
      { term: "Mammogram", definition: "X-ray image of the breast" },
      { term: "Angiogram", definition: "X-ray image of blood vessels" },
    ],
  },
];

// Flashcards data
const flashcards = [
  { term: "Etiology", definition: "The cause or origin of a disease" },
  {
    term: "Prognosis",
    definition: "The likely outcome of a disease or injury",
  },
  { term: "Idiopathic", definition: "A disease with no known cause" },
  {
    term: "Acute",
    definition: "Having a rapid onset, severe symptoms, and short duration",
  },
  {
    term: "Chronic",
    definition: "Persisting for a long time or constantly recurring",
  },
  { term: "Benign", definition: "Not cancerous, not harmful" },
  {
    term: "Malignant",
    definition: "Tending to spread, especially referring to cancerous cells",
  },
  {
    term: "Anemia",
    definition:
      "A condition in which there is a deficiency of red cells or hemoglobin in the blood",
  },
];

export default function MedicalTerminology() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  const resourcesRef = useRef(null);
  const isResourcesInView = useInView(resourcesRef, {
    once: true,
    amount: 0.2,
  });

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
                Medical Terminology
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                Master the language of healthcare with our comprehensive guide
                to medical terminology. Understanding these terms is essential
                for accurate medical coding.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#common-prefixes"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Common Prefixes</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="#common-suffixes"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Common Suffixes</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="#key-terms"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Key Medical Terms</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="#flashcards"
                  className="inline-flex items-center px-5 py-2 bg-blue-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                >
                  <span>Practice Flashcards</span>
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Understanding Medical Terminology
            </h2>
            <p className="text-gray-700 mb-4">
              Medical terminology is the language used by healthcare
              professionals to identify anatomical structures, procedures,
              conditions, and processes. Learning these terms is essential for
              accurate communication in healthcare settings and crucial for
              medical coding professionals.
            </p>
            <p className="text-gray-700 mb-4">
              Most medical terms consist of three basic components:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Root/stem words</strong> - the foundation of the term
                that typically refers to an organ, condition, or body part
              </li>
              <li>
                <strong>Prefixes</strong> - added to the beginning of terms to
                modify their meaning
              </li>
              <li>
                <strong>Suffixes</strong> - added to the end of terms to
                indicate a procedure, condition, or disease
              </li>
            </ul>
            <p className="text-gray-700">
              By understanding these building blocks, you can decipher the
              meaning of thousands of medical terms. Let's explore some common
              prefixes, suffixes, and key medical terms essential for medical
              coding.
            </p>
          </div>
        </div>

        {/* Common Prefixes Section */}
        <div id="common-prefixes">
          <CategorySection title="Common Medical Prefixes" icon={BookmarkIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {prefixes.map((item, index) => (
                <TermCard
                  key={index}
                  prefix={item.prefix}
                  meaning={item.meaning}
                  examples={item.examples}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </CategorySection>
        </div>

        {/* Common Suffixes Section */}
        <div id="common-suffixes">
          <CategorySection
            title="Common Medical Suffixes"
            icon={DocumentTextIcon}
            delay={0.2}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {suffixes.map((item, index) => (
                <TermCard
                  key={index}
                  prefix={item.prefix}
                  meaning={item.meaning}
                  examples={item.examples}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </CategorySection>
        </div>

        {/* Key Medical Terms */}
        <div id="key-terms">
          <CategorySection
            title="Key Medical Terms by Body System"
            icon={HeartIcon}
            delay={0.3}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Cardiovascular System
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Angioplasty
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Procedure to widen narrowed or blocked blood vessels
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Arrhythmia
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Irregular heartbeat
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Myocardial Infarction
                      </span>
                      <span className="text-gray-600"> - Heart attack</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Hypertension
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - High blood pressure
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Respiratory System
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Bronchitis
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the bronchial tubes
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Pneumonia
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Infection causing inflammation of the air sacs in the
                        lungs
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Emphysema
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Lung condition causing shortness of breath
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Pleurisy
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the tissue that lines the lungs and
                        chest cavity
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Nervous System
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Encephalitis
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the brain
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Meningitis
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the membranes covering the brain and
                        spinal cord
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Neuralgia
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Intense pain along the path of a nerve
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">Stroke</span>
                      <span className="text-gray-600">
                        {" "}
                        - Interruption of blood supply to the brain
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Digestive System
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Gastritis
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the stomach lining
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">Colitis</span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the colon
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Hepatitis
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the liver
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Cholecystitis
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        - Inflammation of the gallbladder
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CategorySection>
        </div>

        {/* Flashcards Section */}
        <div id="flashcards">
          <CategorySection
            title="Practice with Flashcards"
            icon={AcademicCapIcon}
            delay={0.4}
          >
            <p className="text-gray-600 mb-8 max-w-3xl">
              Test your knowledge of important medical terms with these
              flashcards. Click on a card to flip it and reveal the definition.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashcards.map((card, index) => (
                <FlashCard
                  key={index}
                  term={card.term}
                  definition={card.definition}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </CategorySection>
        </div>

        {/* Additional Resources Section */}
        <div ref={resourcesRef}>
          <motion.div
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl text-white p-10 mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isResourcesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-700/10 rounded-full -ml-40 -mb-40"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">
                Additional Learning Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <BookOpenIcon className="w-10 h-10 text-blue-200 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Recommended Books
                  </h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Medical Terminology For Dummies</li>
                    <li>• Quick & Easy Medical Terminology</li>
                    <li>• Medical Terminology: An Illustrated Guide</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <AcademicCapIcon className="w-10 h-10 text-blue-200 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">CCI Courses</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Medical Terminology Foundations</li>
                    <li>• Advanced Medical Vocabulary</li>
                    <li>• Terminology for Specialty Coding</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-100 transition duration-300 shadow-md"
                >
                  <span>Contact Us for More Resources</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Study Tips Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Tips for Mastering Medical Terminology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Break Terms into Components
                  </h3>
                  <p className="text-gray-600">
                    Identify the prefix, root, and suffix of each term to
                    understand its meaning.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Practice Pronunciation
                  </h3>
                  <p className="text-gray-600">
                    Say terms aloud to reinforce your memory and become
                    comfortable with using them.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Make Connections
                  </h3>
                  <p className="text-gray-600">
                    Associate new terms with related ones you already know to
                    build a mental network.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Use Flashcards
                  </h3>
                  <p className="text-gray-600">
                    Create or use digital flashcards for quick, frequent review
                    sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Watch Educational Videos
                  </h3>
                  <p className="text-gray-600">
                    Visual learning can reinforce understanding of complex
                    medical concepts.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Apply in Context
                  </h3>
                  <p className="text-gray-600">
                    Practice using terms in medical documentation scenarios to
                    improve retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Ready to Master Medical Terminology?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our comprehensive Medical Coding program and get expert
            guidance on mastering medical terminology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Explore Our Programs
            </Link>
            <Link
              href="/resources/anatomy-basics"
              className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition duration-300"
            >
              Explore Anatomy Basics
            </Link>
          </div>
        </div>
      </div>

      {/* Custom styles for the perspective */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
