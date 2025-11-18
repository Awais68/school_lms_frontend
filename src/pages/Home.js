import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current?.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Features animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target.children, {
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.7)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    // Stats counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll(".stat-number");
            statElements?.forEach((el) => {
              const target = parseInt(el.dataset.target);
              gsap.to(el, {
                innerHTML: target,
                duration: 2,
                ease: "power1.inOut",
                snap: { innerHTML: 1 },
              });
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const handleGetStarted = () => {
    if (user) {
      // Navigate to role-specific dashboard
      const dashboardMap = {
        admin: "/admin",
        teacher: "/teacher",
        student: "/student",
        parent: "/parent",
        accountant: "/accountant",
      };
      navigate(dashboardMap[user.role] || "/student");
    } else {
      navigate("/register");
    }
  };

  const features = [
    {
      icon: "📚",
      title: "Course Management",
      description:
        "Comprehensive course creation, scheduling, and material distribution",
    },
    {
      icon: "✅",
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring with biometric integration",
    },
    {
      icon: "💰",
      title: "Fee Management",
      description: "Automated fee collection, invoicing, and payment tracking",
    },
    {
      icon: "📊",
      title: "Grade Analytics",
      description: "Advanced analytics and reporting for student performance",
    },
    {
      icon: "📝",
      title: "Assignment System",
      description: "Online assignment submission and automated grading",
    },
    {
      icon: "🚌",
      title: "Transport Management",
      description: "Route optimization and vehicle tracking system",
    },
    {
      icon: "📖",
      title: "Digital Library",
      description: "E-library with book cataloging and borrowing system",
    },
    {
      icon: "💬",
      title: "AI Chatbot",
      description: "Intelligent assistant for instant query resolution",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                School LMS
              </span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" ref={heroRef}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your School
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Into a Digital Campus
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A complete Learning Management System designed to streamline
            education, enhance collaboration, and drive academic excellence.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            {user ? "Go to Dashboard" : "Start Your Journey"}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div
                className="text-4xl font-bold text-blue-600 stat-number"
                data-target="1000"
              >
                0
              </div>
              <div className="text-gray-600 mt-2">Active Students</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold text-purple-600 stat-number"
                data-target="150"
              >
                0
              </div>
              <div className="text-gray-600 mt-2">Qualified Teachers</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold text-green-600 stat-number"
                data-target="50"
              >
                0
              </div>
              <div className="text-gray-600 mt-2">Courses Offered</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold text-orange-600 stat-number"
                data-target="98"
              >
                0
              </div>
              <div className="text-gray-600 mt-2">% Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Modern Education
          </h2>
          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your School?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educational institutions already using our
            platform
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            {user ? "Access Your Dashboard" : "Get Started for Free"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">School LMS</h3>
              <p className="text-gray-400">
                Empowering education through innovative technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Register
                  </Link>
                </li>
                {user && (
                  <li>
                    <button
                      onClick={handleGetStarted}
                      className="hover:text-white transition-colors"
                    >
                      Dashboard
                    </button>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@schoollms.edu</li>
                <li>Phone: +1234567890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 School LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
