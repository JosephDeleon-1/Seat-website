// app/admin/districts/add/page.js
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddDistrict() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // District Info
    name: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    contact: {
      phone: '',
      email: '',
      website: '',
    },
    // Admin Info
    adminInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-8"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step >= i ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-400'}
                `}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`
                    w-24 h-1 mx-2
                    ${step > i ? 'bg-teal-500' : 'bg-gray-700'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: District Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">District Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    District Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Enter district name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      placeholder="Enter city"
                      value={formData.location.city}
                      onChange={(e) => setFormData({
                        ...formData, 
                        location: {...formData.location, city: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      placeholder="Enter state"
                      value={formData.location.state}
                      onChange={(e) => setFormData({
                        ...formData, 
                        location: {...formData.location, state: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Enter district website"
                    value={formData.contact.website}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contact: {...formData.contact, website: e.target.value}
                    })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              {step === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}