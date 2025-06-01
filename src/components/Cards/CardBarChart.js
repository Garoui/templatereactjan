import React from "react";


export default function CardBarChart() {

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        {/* Welcome Banner */}
        <div className="w-full bg-blue-50 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-800">Welcome back, [User]!</h1>
          <p className="text-blue-600">You have 3 ongoing courses and 2 upcoming deadlines</p>
        </div>
        
        {/* Current Courses */}
        <div className="flex-1 min-w-[300px] bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <div className="space-y-3">
            <div className="border p-3 rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Introduction to React</h3>
              <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                <div className="bg-green-500 h-2 rounded" style={{width: '65%'}}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">65% completed</p>
            </div>
            <div className="border p-3 rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Advanced JavaScript</h3>
              <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                <div className="bg-blue-500 h-2 rounded" style={{width: '30%'}}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">30% completed</p>
            </div>
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all courses →
          </button>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="flex-1 min-w-[300px] bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-3 py-2">
              <h3 className="font-medium">Assignment: React Components</h3>
              <p className="text-sm text-gray-500">Due tomorrow</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 py-2">
              <h3 className="font-medium">Quiz: JavaScript Fundamentals</h3>
              <p className="text-sm text-gray-500">Due in 3 days</p>
            </div>
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
            View calendar →
          </button>
        </div>
        
        {/* Recent Resources */}
        <div className="w-full bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border p-3 rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">React Documentation</h3>
              <p className="text-sm text-gray-500">Added 2 days ago</p>
            </div>
            <div className="border p-3 rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">JavaScript Cheat Sheet</h3>
              <p className="text-sm text-gray-500">Added 1 week ago</p>
            </div>
            <div className="border p-3 rounded hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">CSS Flexbox Guide</h3>
              <p className="text-sm text-gray-500">Added 2 weeks ago</p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="w-full bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Continue Learning
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
              Browse Courses
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              View Progress
            </button>
          </div>
        </div>
      </div>
    </>
  );
}