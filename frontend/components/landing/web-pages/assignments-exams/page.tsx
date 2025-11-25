//app/web-pages/assignments-exams/page.tsx 

'use client';

import React from 'react';
import { ArrowRight, CheckCircle, MessageSquare, Zap, Shield, Users, BookOpen, FileCheck } from 'lucide-react';
import Link from 'next/link';

// Educational Icons
const AttendanceIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="16" width="40" height="32" rx="4" fill="currentColor" />
    <rect x="16" y="20" width="32" height="24" rx="2" fill="white" />
    <path d="M24 28H40M24 34H40" stroke="currentColor" strokeWidth="2" />
    <circle cx="44" cy="44" r="10" fill="currentColor" />
    <path d="M40 44l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PollsQuizzesIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="20" width="40" height="24" rx="4" fill="white" stroke="currentColor" strokeWidth="2" />
    <rect x="16" y="24" width="12" height="12" fill="#EEE" />
    <path d="M20 28l4 4" stroke="currentColor" strokeWidth="2" />
    <rect x="36" y="24" width="12" height="12" fill="#EEE" />
    <path d="M40 30l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DiscussionsIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="18" width="28" height="18" rx="4" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="27" r="2" fill="currentColor" />
    <circle cx="28" cy="27" r="2" fill="currentColor" />
    <circle cx="34" cy="27" r="2" fill="currentColor" />
    <rect x="24" y="30" width="28" height="18" rx="4" fill="currentColor" />
    <path d="M28 36h16" stroke="white" strokeWidth="2" />
  </svg>
);

const PersonalizableContentIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="16" width="40" height="32" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
    <path d="M20 22h24M20 30h16" stroke="currentColor" strokeWidth="2" />
    <path d="M44 40l-4-4-6 6" stroke="currentColor" strokeWidth="3" />
  </svg>
);

const AssignmentsExamsIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="12" width="32" height="40" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20h16M20 28h24M20 36h20" stroke="currentColor" strokeWidth="2" />
    <circle cx="44" cy="20" r="6" fill="currentColor" />
    <path d="M42 20l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RealtimeDataIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="16" width="40" height="32" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
    <rect x="20" y="36" width="4" height="8" fill="currentColor" />
    <rect x="28" y="32" width="4" height="12" fill="currentColor" />
    <rect x="36" y="28" width="4" height="16" fill="currentColor" />
    <rect x="44" y="24" width="4" height="20" fill="currentColor" />
  </svg>
);

const LearningGamesIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 12v16l-8 16c0 6 4 10 12 10s12-4 12-10l-8-16V12" stroke="currentColor" strokeWidth="2" fill="white" />
    <circle cx="32" cy="44" r="6" fill="currentColor" />
    <circle cx="28" cy="36" r="2" fill="currentColor" />
    <circle cx="36" cy="38" r="2" fill="currentColor" />
  </svg>
);

const LessonPlanningIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="8" width="36" height="48" rx="3" fill="white" stroke="currentColor" strokeWidth="2" />
    <path d="M20 16h24M20 24h20M20 32h16" stroke="currentColor" strokeWidth="2" />
    <rect x="38" y="36" width="8" height="8" rx="1" fill="currentColor" />
    <path d="M40 40l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LiveLessonsIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="18" width="48" height="28" rx="4" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="20" cy="28" r="4" fill="currentColor" />
    <path d="M28 32v8M36 28v12M44 32v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="52" cy="12" r="6" fill="currentColor" />
    <circle cx="52" cy="12" r="3" fill="white" />
  </svg>
);

const MarkingIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="12" width="32" height="40" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20h16M20 28h24M20 36h20" stroke="currentColor" strokeWidth="2" />
    <path d="M44 40l4-4 4 4-4 4-4-4z" fill="currentColor" />
    <path d="M40 44l4-4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IEPManagementIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="16" width="40" height="32" rx="3" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="28" r="4" fill="currentColor" />
    <path d="M32 24h16M32 32h12M20 40h24" stroke="currentColor" strokeWidth="2" />
    <path d="M44 36l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AssignmentsExamsPage() {
  const educationalFeatures = [
    {
      icon: <AssignmentsExamsIcon />,
      title: "Assignments & Exams",
      description: "Create and manage assignments, tests, and exams with automated grading and feedback."
    },
    {
      icon: <LessonPlanningIcon />,
      title: "Lesson Planning",
      description: "Design comprehensive lesson plans with objectives, activities, and assessment tools."
    },
    {
      icon: <PollsQuizzesIcon />,
      title: "Polls & Quizzes",
      description: "Engage students with interactive polls and quizzes for real-time assessment."
    },
    {
      icon: <PersonalizableContentIcon />,
      title: "Personalized Content",
      description: "Deliver customized learning materials tailored to each student's needs and pace."
    },
    {
      icon: <LiveLessonsIcon />,
      title: "Live Lessons",
      description: "Conduct interactive live lessons with screen sharing, whiteboards, and collaboration tools."
    },
    {
      icon: <MarkingIcon />,
      title: "Marking",
      description: "Streamline grading with efficient marking tools, rubrics, and automated feedback."
    },
    {
      icon: <AttendanceIcon />,
      title: "Attendance",
      description: "Track student attendance with automated reporting and parent notifications."
    },
    {
      icon: <DiscussionsIcon />,
      title: "Discussions",
      description: "Foster meaningful classroom discussions with threaded conversations and moderation tools."
    },
    {
      icon: <IEPManagementIcon />,
      title: "IEP Management",
      description: "Comprehensive tools for creating, tracking, and managing Individual Education Programs."
    },
    {
      icon: <RealtimeDataIcon />,
      title: "Real-time Data",
      description: "Access instant analytics and insights on student performance and engagement."
    },
    {
      icon: <LearningGamesIcon />,
      title: "Learning Games",
      description: "Gamify education with interactive learning games and achievement systems."
    }
  ];

  const benefits = [
    "Unlimited assignments",
    "Advanced grading tools", 
    "Plagiarism detection",
    "Custom rubrics",
    "Analytics dashboard",
    "Gradebook integration"
  ];

  return (
    <div className="min-h-screen">
      {/* Original Hero Section - Unchanged */}
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-green-300 flex items-center justify-center p-10">
        <div className="max-w-5xl text-white grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <p className="uppercase tracking-wide text-sm font-semibold">Feature: Assignments & Exams</p>
            <h1 className="text-4xl font-bold mt-4">
              Easy-to-build assignments and exams.<br />Easy-to-see <em>progress</em>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
              Homework assignments and assessments don't have to stress your students out. Delivered 
              in dynamic and interactive formats, they establish a learning environment that builds 
              confidence. Our tools make it easy to create assignments and exams that support better outcomes.
            </p>

            <p className="mt-6 text-xl font-semibold">
              <span className="text-yellow-200">93%</span> of students said the variety of assessments 
              helped them develop critical thinking skills.
            </p>

            
          </div>

          {/* Right Mockup */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-black">
            <p className="font-bold text-lg">Homework 1</p>
            <ul className="mt-4 space-y-2">
              <li className="border p-2 rounded">Item 1</li>
              <li className="border p-2 rounded">Item 2</li>
              <li className="border p-2 rounded">Item 3</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Feature Detail Sections - Add after Educational Tools Section */}

{/* Section 1 - Image Left, Content Right */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Image Left */}
      <div className="bg-gradient-to-r from-green-500 to-green-300 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
        {/* Replace with your image */}
        <div className="text-white text-center">
          <div className="text-6xl font-bold">1</div>
        </div>
      </div>

      {/* Content Right */}
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-300 text-white text-2xl font-bold mb-6">
          1
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Automated scheduling & reminders
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
              1
            </span>
            <span className="text-lg text-gray-700 leading-relaxed">Keep students on track with smart scheduling that automatically reminds them of due dates.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
              2
            </span>
            <span className="text-lg text-gray-700 leading-relaxed">Eliminate late or forgotten assignments with built-in deadline reminders.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
              3
            </span>
            <span className="text-lg text-gray-700 leading-relaxed">Save time by letting the system manage schedules and alerts for you.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Section 2 - Content Left, Image Right */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Content Left */}
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-300 text-white text-2xl font-bold mb-6">
          2
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          Secure online submissions
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
              1
            </span>
            <span className="text-lg text-gray-700 leading-relaxed">No more lost homework — every submission is safely stored and organized.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
              2
            </span>
            <span className="text-lg text-gray-700 leading-relaxed">Review assignments anytime, anywhere, with all student work in one place.</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
              3
            </span>
            <span className="text-lg text-gray-700 leading-relaxed">A clutter-free way to collect, store, and manage student assignments.</span>
          </li>
        </ul>
      </div>

      {/* Image Right */}
      <div className="bg-gradient-to-r from-green-500 to-green-300 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
        {/* Replace with your image */}
        <div className="text-white text-center">
          <div className="text-6xl font-bold">2</div>
        </div>
      </div>
    </div>
  </div>
</section>






      {/* Educational Tools Section */}
      <section className="px-10 py-20 bg-gradient-to-br from-green-00 via-white to-blue-00">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Everything</span> You Need to Succeed.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive educational tools that enable teachers to create engaging content, manage classrooms effectively, and support every student's learning journey in online, hybrid, or face-to-face environments.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {educationalFeatures.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 mx-auto mb-4 text-purple-600 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 hidden md:block">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              View All Features
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-green-600 to-green-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Streamline Your Grading Process
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Save hours every week with automated grading, smart feedback tools, and comprehensive assignment management.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-200 flex-shrink-0" />
                    <span className="text-green-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50%</div>
                  <div className="text-green-100 mb-6">Time Saved on Grading</div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">95%</div>
                      <div className="text-green-100 text-sm">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-green-100 text-sm">Availability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Assignments?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of educators who have streamlined their assignment workflow with our powerful tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-lg inline-flex items-center justify-center">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-100 transition-colors font-medium text-lg">
              Schedule Demo
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Free trial available • No credit card required • Setup in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between border-t border-gray-800 pt-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-400 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Teacher Pro</span>
            </div>
            <div className="text-sm">
              © 2024 Teacher Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}