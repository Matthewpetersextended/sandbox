// frontend/components/website/websitepage.tsx

'use client';

import { ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';
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

export default function LandingPage() {
  const educationalFeatures = [
    {
      icon: <AssignmentsExamsIcon />,
      title: "Assignments & Exams",
      description: "Create and manage assignments, tests, and exams with automated grading and feedback.",
      path: "/web-pages/assignments-exams"
    },
    {
      icon: <LessonPlanningIcon />,
      title: "Lesson Planning",
      description: "Design comprehensive lesson plans with objectives, activities, and assessment tools.",
      path: "/web-pages/lesson-planning"
    },
    {
      icon: <PollsQuizzesIcon />,
      title: "Polls & Quizzes",
      description: "Engage students with interactive polls and quizzes for real-time assessment.",
      path: "/web-pages/polls-quizes"
    },
    {
      icon: <PersonalizableContentIcon />,
      title: "Personalized Content",
      description: "Deliver customized learning materials tailored to each student's needs and pace.",
      path: "/web-pages/personalized-content"
    },
    {
      icon: <LiveLessonsIcon />,
      title: "Live Lessons",
      description: "Conduct interactive live lessons with screen sharing, whiteboards, and collaboration tools.",
      path: "/web-pages/live-lesson"
    },
    {
      icon: <MarkingIcon />,
      title: "Marking",
      description: "Streamline grading with efficient marking tools, rubrics, and automated feedback.",
      path: "/web-pages/marking"
    },
    {
      icon: <AttendanceIcon />,
      title: "Attendance",
      description: "Track student attendance with automated reporting and parent notifications.",
      path: "/web-pages/attendance"
    },
    {
      icon: <DiscussionsIcon />,
      title: "Discussions",
      description: "Foster meaningful classroom discussions with threaded conversations and moderation tools.",
      path: "/web-pages/discussions"
    },
    {
      icon: <IEPManagementIcon />,
      title: "IEP Management",
      description: "Comprehensive tools for creating, tracking, and managing Individual Education Programs.",
      path: "/web-pages/iep-management"
    },
    {
      icon: <RealtimeDataIcon />,
      title: "Real-time Data",
      description: "Access instant analytics and insights on student performance and engagement.",
      path: "/web-pages/real-time-data"
    },
    {
      icon: <LearningGamesIcon />,
      title: "Learning Games",
      description: "Gamify education with interactive learning games and achievement systems.",
      path: "/web-pages/learning-games"
    }
  ];

  const benefits = [
    "Unlimited conversations",
    "Advanced AI capabilities",
    "24/7 support",
    "Custom integrations",
    "Analytics dashboard",
    "Team management"
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 via-green-50 to-green-200">

      {/* Hero Section */}
      <section className="px-10 py-18">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                ⚡ Power Up Your Classroom
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Elevate Your Classroom with
                <span className="bg-linear-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Teacher Pro's Class Managment Tools</span>
              </h1>

              {/* Student and Educator Sign Up Section */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                {/* Students Section */}
                <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-green-600 mb-4 text-center">STUDENTS</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/sign-up" className="flex-1 border-2 border-green-400 text-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition-colors font-medium text-center flex items-center justify-center text-sm">
                      <span>Sign Up</span>
                    </Link>
                    <Link href="/sign-in" className="flex-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors font-medium text-center flex items-center justify-center text-sm">
                      <span>Sign In</span>
                    </Link>
                  </div>
                </div>

                {/* Educators Section */}
                <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">EDUCATORS</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/sign-up" className="flex-1 border-2 border-pink-400 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors font-medium text-center flex items-center justify-center text-sm">
                      <span>Sign Up</span>
                    </Link>
                    <Link href="/sign-in" className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors font-medium text-center flex items-center justify-center text-sm">
                      <span>Sign In</span>
                    </Link>
                  </div>
                </div>
              </div>



            </div>

            <div className="relative">
              <img
                src="/TeacherProMan.svg"
                alt="Teacher Pro Classroom Management"
                className="w-full h-auto max-w-sm mx-auto"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Educational Tools Section */}
      <section className="px-10 py-20 bg-linear-to-br from-green-00 via-white to-blue-00">
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
              <Link
                key={index}
                href={feature.path}
                className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-4 text-purple-600 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 hidden md:block">{feature.description}</p>
              </Link>
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
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Join Thousands of Educators
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Experience the power of AI-driven productivity and transform the way you work.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">10,000+</div>
                  <div className="text-blue-100 mb-6">Active Users</div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-blue-100 text-sm">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4.9/5</div>
                      <div className="text-blue-100 text-sm">Rating</div>
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
            Ready to Learn More?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover how thousands of users are transforming their workflow with AI-driven productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-100 transition-colors font-medium text-lg">
              Schedule Demo
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Learn more about our platform • See how it works • Get in touch
          </p>
        </div>
      </section>

      {/* Student Love Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Educators <em className="text-purple-600 not-italic">love</em> Teacher Pro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* 95% Statistic */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient1)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${95 * 2.827} ${(100 - 95) * 2.827}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">95%</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 max-w-xs mx-auto">
                say Teacher Pro is easy to use
              </p>
            </div>

            {/* 85% Statistic */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient2)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${85 * 2.827} ${(100 - 85) * 2.827}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 max-w-xs mx-auto">
                say Teacher Pro helped them feel engaged in the learning process
              </p>
            </div>

            {/* 91% Statistic */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient3)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${91 * 2.827} ${(100 - 91) * 2.827}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">91%</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 max-w-xs mx-auto">
                recommend that others use Teacher Pro
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/sign-up" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              Sign Up for Teacher Pro
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between border-t border-gray-800 pt-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">YourApp</span>
            </div>
            <div className="text-sm">
              © 2024 YourApp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
