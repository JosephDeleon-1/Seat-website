// app/admin/dashboard/page.js
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSchool, 
  FaUserShield, 
  FaChartBar, 
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch
} from 'react-icons/fa';

const StatCard = ({ title, value, icon: Icon, percentage, isIncrease }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 rounded-lg p-6 relative overflow-hidden"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
        {percentage && (
          <p className={`text-sm mt-2 ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
            {isIncrease ? '↑' : '↓'} {percentage}% from last month
          </p>
        )}
      </div>
      <div className="bg-teal-500/10 p-3 rounded-lg">
        <Icon className="text-teal-500 text-xl" />
      </div>
    </div>
  </motion.div>
);

const PendingApprovalCard = ({ school, district, role, date }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-gray-800 rounded-lg p-4 mb-4"
  >
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-white font-semibold">{school}</h4>
        <p className="text-gray-400 text-sm">{district}</p>
        <p className="text-teal-400 text-sm mt-1">{role}</p>
      </div>
      <div className="flex space-x-2">
        <button className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20">
          <FaCheckCircle />
        </button>
        <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
          <FaTimesCircle />
        </button>
      </div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-teal-500">SEAT Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-gray-700 rounded-lg relative">
                <FaBell className="text-gray-300" />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 bg-red-500 rounded-full text-xs">3</span>
              </button>
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Schools" 
            value="156" 
            icon={FaSchool}
            percentage="12"
            isIncrease={true}
          />
          <StatCard 
            title="Active Admins" 
            value="243" 
            icon={FaUserShield}
            percentage="8"
            isIncrease={true}
          />
          <StatCard 
            title="Pending Approvals" 
            value="18" 
            icon={FaBell}
            percentage="5"
            isIncrease={false}
          />
          <StatCard 
            title="Total Districts" 
            value="32" 
            icon={FaChartBar}
            percentage="15"
            isIncrease={true}
          />
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search schools, districts, or admins..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Add School
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {/* Activity items */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center border-b border-gray-700 pb-4">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center mr-4">
                    <FaSchool className="text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">New school registered</p>
                    <p className="text-xs text-gray-400">Lincoln High School - California District</p>
                  </div>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Pending Approvals</h2>
            <div className="space-y-4">
              <PendingApprovalCard
                school="Washington High School"
                district="Northern District"
                role="School Admin"
                date="2024-03-08"
              />
              <PendingApprovalCard
                school="Lincoln Elementary"
                district="Eastern District"
                role="School Admin"
                date="2024-03-08"
              />
              <PendingApprovalCard
                school="Roosevelt Middle School"
                district="Western District"
                role="School Admin"
                date="2024-03-08"
              />
            </div>
            <button className="w-full mt-4 text-teal-400 text-sm hover:text-teal-300">
              View all approvals →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}