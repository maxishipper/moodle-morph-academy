
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
            <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
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
                className="bg-white text-gray-700 font-medium text-base h-12 px-6 hover:bg-gray-50 w-full flex items-center justify-center gap-3 shadow-sm border border-gray-300"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google Calendar
              </Button>
            </div>
            <p className="text-white/80">Upload every course you have and let AI do the magic ✨</p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-emerald-400 fill-current" />
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
                <Brain className="h-16 w-16 mx-auto mb-6 text-emerald-400" />
                <h3 className="text-2xl font-semibold mb-4">AI-Generated Quizzes</h3>
                <p className="text-white/90">
                  Upload your PDFs and get personalized quizzes generated from your actual course content.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 mx-auto mb-6 text-emerald-400" />
                <h3 className="text-2xl font-semibold mb-4">Smart Flashcards</h3>
                <p className="text-white/90">
                  Anki-style flashcards that adapt to your learning progress and focus on weak areas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-6 text-emerald-400" />
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
                    <div className="bg-emerald-400 rounded-full p-2 flex-shrink-0">
                      <Upload className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Upload Any Format</h3>
                      <p className="text-white/90">PDFs, slides, notes - we handle it all and extract the key information.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-400 rounded-full p-2 flex-shrink-0">
                      <Calendar className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exam-Focused Planning</h3>
                      <p className="text-white/90">Set your exam date and get a personalized study schedule that adapts to your progress.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-400 rounded-full p-2 flex-shrink-0">
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
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg p-6 text-black">
                    <h4 className="font-bold text-lg mb-2">📈 Average Grade Improvement</h4>
                    <div className="text-4xl font-bold">+23%</div>
                    <p className="text-sm opacity-80">After using mood for one semester</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span>Study Efficiency</span>
                      <span className="text-emerald-400">+45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retention Rate</span>
                      <span className="text-emerald-400">+38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exam Confidence</span>
                      <span className="text-emerald-400">+52%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-emerald-400 to-teal-400 text-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Exams?</h2>
          <p className="text-xl mb-8 opacity-80">Join thousands of students who are already studying smarter with mood</p>
          <div className="flex justify-center items-center max-w-lg mx-auto">
            <Button 
              onClick={handleGoogleCalendarLogin}
              className="bg-white text-gray-700 font-medium text-lg h-14 px-8 hover:bg-gray-50 flex items-center justify-center gap-3 shadow-sm border border-gray-300"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google Calendar
            </Button>
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
