// Instructions: Replace the basic features section with a stunning, enhanced version featuring floating animations, better gradients, statistics, and improved visual hierarchy

'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, DollarSign, Shield, Monitor, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const testimonials = [
    {
      quote: "Valoriya Service is quite literally the reason that my community runs as smooth as it does. Prior to using this service, I used multiple other ranking bots and has exceeded my expectations by far with the quality of this service.",
      author: "S4PPHIRE",
      role: "Bondi Beach Roleplay Owner",
      logo: "https://ext.same-assets.com/988994115/642405093.png"
    },
    {
      quote: "Valoriya&apos;s ranking service is the reason my community can operate efficiently! Without it, it would be nearly impossible to rank thousands of people everyday, but with this service it can be done with ease!",
      author: "SilverAuthority", 
      role: "SizzleBurger Owner",
      logo: "https://ext.same-assets.com/988994115/701745873.png"
    },
    {
      quote: "Valoriya Service has made our promotion system so much more easier! With just one touch away, you can effectively shout, promote and do so much more. It's truly great and has influenced our group with growth.",
      author: "Pierzinas",
      role: "1970s Owner", 
      logo: "https://ext.same-assets.com/988994115/510415305.png"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-valoriya-gradient rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Valoriya Service</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="#features" className="text-gray-700 hover:text-valoriya-blue-600 transition-colors">Features</Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-valoriya-blue-600 transition-colors">Testimonials</Link>
            <Link href="/modules" className="text-gray-700 hover:text-valoriya-blue-600 transition-colors">Modules</Link>
            <Link href="/auth/login">
              <Button variant="outline" className="border-valoriya-blue-600 text-valoriya-blue-600 hover:bg-valoriya-blue-600 hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-valoriya-gradient hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-valoriya-gradient"></div>
        <div className="absolute inset-0 particles-bg animate-particles opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto text-center text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Ranking <br />
              <span className="text-white/90">Made</span>{" "}
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Simple
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Valoriya Service revolutionizes group management with seamless ranking, automated processes, 
            and a premium dashboard. Experience the future of Roblox group administration.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/auth/register">
              <Button 
                size="lg" 
                className="bg-white text-valoriya-blue-600 hover:bg-blue-50 text-lg px-8 py-4 animate-pulse-glow font-semibold"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">1000+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Enterprise Security</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative px-6 py-32 overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-50/30 to-transparent"></div>
        
        {/* Floating particles background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block px-6 py-3 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg"
            >
              🚀 Why Choose Valoriya?
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
              Unmatched Excellence
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the perfect blend of innovation, reliability, and performance that sets us apart from the competition
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Enhanced Feature Cards */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Card background with enhanced gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-blue-100/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8 text-center">
                {/* Floating animated icon */}
                <motion.div 
                  className="relative mb-8"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                      <Code className="h-12 w-12 text-white" />
                    </div>
                    {/* Pulsing glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl w-24 h-24 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                    {/* Additional sparkle effects */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-200 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
                
                {/* Enhanced typography */}
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    24/7 Development
                  </h3>
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">99.9% Uptime</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Our dedicated team ensures continuous updates and flawless performance, keeping your operations running smoothly around the clock.
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="pt-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Reliability Score: 95%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-green-100/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8 text-center">
                <motion.div 
                  className="relative mb-8"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                      <DollarSign className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl w-24 h-24 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-emerald-200 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                    Best Value Pricing
                  </h3>
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      💰 Save 60%
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Premium features at unbeatable prices. Get enterprise-grade functionality without breaking the bank.
                  </p>
                  
                  <div className="pt-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "88%" }}
                        transition={{ duration: 1.5, delay: 0.6 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Value Score: 88%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-red-100/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8 text-center">
                <motion.div 
                  className="relative mb-8"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                      <Shield className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl w-24 h-24 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-rose-200 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-red-700 transition-colors duration-300">
                    Military-Grade Security
                  </h3>
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      🔒 256-bit SSL
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Your data is protected with enterprise-level encryption and security protocols trusted by fortune 500 companies.
                  </p>
                  
                  <div className="pt-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-red-500 to-rose-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Security Score: 98%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-purple-100/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8 text-center">
                <motion.div 
                  className="relative mb-8"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                      <Monitor className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl w-24 h-24 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-violet-200 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    Intuitive Dashboard
                  </h3>
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ⚡ Real-time
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Monitor everything from a beautifully designed dashboard with real-time analytics and intuitive controls.
                  </p>
                  
                  <div className="pt-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">User Experience: 92%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Statistics Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-24 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <motion.div 
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  10K+
                </motion.div>
                <div className="text-blue-100 text-lg">Active Users</div>
              </div>
              <div className="space-y-2">
                <motion.div 
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  99.9%
                </motion.div>
                <div className="text-blue-100 text-lg">Uptime</div>
              </div>
              <div className="space-y-2">
                <motion.div 
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  1M+
                </motion.div>
                <div className="text-blue-100 text-lg">Requests Processed</div>
              </div>
              <div className="space-y-2">
                <motion.div 
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  24/7
                </motion.div>
                <div className="text-blue-100 text-lg">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block px-6 py-3 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg"
            >
              📜 Testimonials
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
              What Our Community Says
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Read what our satisfied users have to say about Valoriya Service
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="relative p-8 text-center">
                  <motion.div 
                    className="relative mb-8"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                        <Star className="h-12 w-12 text-white" />
                      </div>
                      {/* Pulsing glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl w-24 h-24 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                      {/* Additional sparkle effects */}
                      <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-200 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {testimonial.quote}
                    </h3>
                    <div className="flex justify-center items-center space-x-2 mb-4">
                      <img src={testimonial.logo} alt={testimonial.author} className="w-12 h-12 rounded-full" />
                      <span className="text-sm text-gray-500 font-semibold">{testimonial.author}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}