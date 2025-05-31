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
      <section className="px-6 py-20 bg-valoriya-gradient">
        <div className="max-w-6xl mx-auto text-center text-white">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            A brand new ranking experience for you
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Valoriya Service can do a variety of things that you&apos;d need as a group owner or administrator. Ranking, exiling, 
            or shouting from the comfort of your Discord server or Roblox game has never been easier before. Unlike other 
            services, we pride ourselves on our new dashboard, affordable pricing, and premium support for all customers.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What makes us so different?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center card-hover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-valoriya-gradient-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-8 w-8 text-valoriya-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Constant Development</h3>
              <p className="text-gray-600">Our team works actively to ensure our products and services are up-to-date and are functioning 24/7.</p>
            </motion.div>

            <motion.div 
              className="text-center card-hover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-valoriya-gradient-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-valoriya-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-600">We provide quality and a dashboard for you to monitor the flow, all at one of the cheapest prices.</p>
            </motion.div>

            <motion.div 
              className="text-center card-hover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-valoriya-gradient-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-valoriya-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">All of the sensitive information you supply is kept in a secure database and is encrypted forever.</p>
            </motion.div>

            <motion.div 
              className="text-center card-hover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-valoriya-gradient-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-valoriya-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sleek Dashboard</h3>
              <p className="text-gray-600">Our newest dashboard provides our customers with an ease of mind. You&apos;re able to edit and monitor everything.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-valoriya-gradient">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            What do our customers think?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                  <CardHeader className="text-center">
                    <img src={testimonial.logo} alt={testimonial.author} className="w-16 h-16 mx-auto rounded-full mb-4" />
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                    <div className="text-center">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm opacity-80">{testimonial.role}</p>
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
                    <span className="text-5xl font-bold text-valoriya-blue-600">$5.00</span>
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