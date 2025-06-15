
import React, { useState } from 'react';
import { Book, Upload, Brain, Zap, Users, Star, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Landing = () => {
  const handleGoogleCalendarLogin = () => {
    // This would integrate with Google Calendar OAuth
    window.open('https://accounts.google.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=https://www.googleapis.com/auth/calendar&response_type=code', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f6cbf] via-[#1e7bcf] to-[#2d8adf] text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-white/80" />
            <h1 className="text-lg font-light tracking-[0.2em] text-white/90">mood</h1>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" className="bg-transparent border-white/30 text-white/80 hover:bg-white/5 hover:text-white hover:border-white/50 transition-all">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Study
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Game Forever
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            AI-powered learning platform that turns your course materials into personalized quizzes, 
            flashcards, and mock exams. Study smarter, not harder.
          </p>

          {/* CTA Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-16 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Connect Your Calendar to Get Started</h3>
            <div className="flex flex-col gap-4 mb-6">
              <Button 
                onClick={handleGoogleCalendarLogin}
                className="bg-white text-[#0f6cbf] font-semibold text-lg h-14 px-8 hover:bg-gray-100 w-full flex items-center justify-center gap-3"
              >
                <Calendar className="h-6 w-6" />
                Connect Google Calendar
              </Button>
              <div className="text-white/60 text-sm">or</div>
              <Link to="/upload" className="w-full">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold text-lg h-12 px-8 hover:from-yellow-300 hover:to-orange-300 w-full">
                  Upload Courses Directly
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-white/80">Upload every course you have and let AI do the magic ✨</p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-white/90">4.9/5 from 10k+ students</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Students Love mood</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Brain className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-2xl font-semibold mb-4">AI-Generated Quizzes</h3>
                <p className="text-white/90">
                  Upload your PDFs and get personalized quizzes generated from your actual course content.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-2xl font-semibold mb-4">Smart Flashcards</h3>
                <p className="text-white/90">
                  Anki-style flashcards that adapt to your learning progress and focus on weak areas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-2xl font-semibold mb-4">AI Study Assistant</h3>
                <p className="text-white/90">
                  Chat with Chad, your personal AI tutor who knows all your course materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">Study Like Never Before</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                      <Upload className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Upload Any Format</h3>
                      <p className="text-white/90">PDFs, slides, notes - we handle it all and extract the key information.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                      <Calendar className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exam-Focused Planning</h3>
                      <p className="text-white/90">Set your exam date and get a personalized study schedule that adapts to your progress.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                      <Users className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Trusted by 10k+ Students</h3>
                      <p className="text-white/90">Join thousands of students who've improved their grades with mood.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-6 text-black">
                    <h4 className="font-bold text-lg mb-2">📈 Average Grade Improvement</h4>
                    <div className="text-4xl font-bold">+23%</div>
                    <p className="text-sm opacity-80">After using mood for one semester</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span>Study Efficiency</span>
                      <span className="text-yellow-400">+45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retention Rate</span>
                      <span className="text-yellow-400">+38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exam Confidence</span>
                      <span className="text-yellow-400">+52%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Exams?</h2>
          <p className="text-xl mb-8 opacity-80">Join thousands of students who are already studying smarter with mood</p>
          <div className="flex flex-col gap-4 justify-center items-center max-w-lg mx-auto">
            <Button 
              onClick={handleGoogleCalendarLogin}
              className="bg-black text-white font-semibold text-lg h-14 px-8 hover:bg-gray-800 w-full flex items-center justify-center gap-3"
            >
              <Calendar className="h-6 w-6" />
              Connect Google Calendar & Start
            </Button>
            <div className="text-black/60 text-sm">or</div>
            <Link to="/upload" className="w-full">
              <Button className="bg-white text-black font-semibold text-lg h-12 px-8 hover:bg-gray-100 w-full">
                Upload Courses Directly
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Book className="h-6 w-6 text-white/60" />
              <span className="text-lg font-light tracking-[0.2em] text-white/70">mood</span>
            </div>
            <div className="text-white/70">
              © 2025 mood. All rights reserved. Study smarter, achieve more.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
