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
      quote: "Valoriya Service has made our promotion system so much more easier! With just one touch away, you can effectively shout, promote and do so much more. It&apos;s truly great and has influenced our group with growth.",
      author: "Pierzinas",
      role: "1970s Owner", 
      logo: "https://ext.same-assets.com/988994115/510415305.png"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold gradient-text">Valoriya Service</div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-valoriya-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-valoriya-blue-600 transition-colors">Pricing</a>
          </div>
        </div>
        <Link href="/auth/login">
          <Button variant="valoriya" className="animate-bounce-in">Login</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-32 bg-valoriya-gradient overflow-hidden">
        {/* Animated particles background */}
        <div className="absolute inset-0 particles-bg animate-particles opacity-30"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/20 rounded-lg rotate-45 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/15 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white/10 rounded-lg animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-6xl mx-auto text-center text-white z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text-enhanced text-white">
              A brand new ranking<br />
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                experience for you
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

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              What makes us so different?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that set Valoriya Service apart from the competition
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="bg-valoriya-gradient p-6 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-valoriya-gradient rounded-2xl w-20 h-20 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Constant Development</h3>
              <p className="text-gray-600 leading-relaxed">Our team works actively to ensure our products and services are up-to-date and are functioning 24/7.</p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="bg-valoriya-gradient p-6 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-valoriya-gradient rounded-2xl w-20 h-20 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Affordable Prices</h3>
              <p className="text-gray-600 leading-relaxed">We provide quality and a dashboard for you to monitor the flow, all at one of the cheapest prices.</p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="bg-valoriya-gradient p-6 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-valoriya-gradient rounded-2xl w-20 h-20 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Safe & Secure</h3>
              <p className="text-gray-600 leading-relaxed">All of the sensitive information you supply is kept in a secure database and is encrypted forever.</p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="bg-valoriya-gradient p-6 rounded-2xl w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Monitor className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-valoriya-gradient rounded-2xl w-20 h-20 mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Sleek Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Our newest dashboard provides our customers with an ease of mind. You&apos;re able to edit and monitor everything.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-6 py-24 bg-valoriya-gradient overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 particles-bg animate-particles opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              What do our customers think?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust Valoriya Service
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="glass-card text-white h-full relative overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardHeader className="text-center relative z-10">
                    <div className="relative mb-6">
                      <img 
                        src={testimonial.logo} 
                        alt={testimonial.author} 
                        className="w-20 h-20 mx-auto rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-300" 
                      />
                      <div className="absolute inset-0 bg-white/10 rounded-full w-20 h-20 mx-auto blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400 mx-0.5" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-center mb-6 italic text-lg leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="text-center">
                      <p className="font-bold text-xl">{testimonial.author}</p>
                      <p className="text-blue-200 text-sm mt-1">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card-hover"
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-gray-600">Free Trial</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-valoriya-blue-600">$0.00</span>
                    <p className="text-gray-600 mt-2">for 7 days</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">A perfect plan for those who are new to our service. Experiment with our API and dashboard with ease. We&apos;re all about simplicity.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Ranking Service</li>
                    <li>• Customer Service</li>
                    <li>• Templates</li>
                  </ul>
                  <Link href="/auth/register">
                    <Button variant="valoriya" className="w-full">Get started</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card-hover"
            >
              <Card className="h-full border-valoriya-blue-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-gray-600">Monthly</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-valoriya-blue-600">$2.50</span>
                    <p className="text-gray-600 mt-2">per month</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">A perfect plan for groups of any size, small or large. Access to our service means you can start creating systems using our service that others have never thought of before!</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Ranking Service</li>
                    <li>• Fast Customer Service</li>
                    <li>• Special Templates</li>
                  </ul>
                  <Link href="/auth/register">
                    <Button variant="valoriya" className="w-full">Buy now</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="px-6 py-20 bg-valoriya-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8">Need assistance? No problem.</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-4">Discord</h3>
            <p className="mb-6 opacity-90">Contact our team on Discord, or seek help from our active community. This is typically our fastest method of providing support. We&apos;re available 24/7.</p>
            <Button variant="outline" className="bg-white text-valoriya-blue-600 border-white hover:bg-white/90">
              Join our Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-valoriya-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-sm opacity-80">
              © Copyright 2024 Valoriya Service. All Rights Reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="hover:text-valoriya-blue-300 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-valoriya-blue-300 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}