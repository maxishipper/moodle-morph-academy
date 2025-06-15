
import React, { useState, useEffect } from 'react';
import { Upload, Clock, BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import QuizApp from '@/components/QuizApp';
import MockExamApp from '@/components/MockExamApp';
import AnkiCardApp from '@/components/AnkiCardApp';
import ChatApp from '@/components/ChatApp';

const Index = () => {
  const [examDate] = useState(new Date('2025-07-15')); // Example exam date
  const [progress, setProgress] = useState(65); // Example progress
  const [timeLeft, setTimeLeft] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Simulate having files uploaded for demo purposes
  const hasUploadedFiles = true;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const examTime = examDate.getTime();
      const distance = examTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Exam time!');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans relative">
      {/* Header */}
      <header className="bg-[#0f6cbf] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-lg">
                🤖
              </div>
              <h1 className="text-2xl font-bold">Dood</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/upload">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Materials
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-5 w-5" />
                <span>Exam in: {timeLeft}</span>
              </div>
              <Button
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-[#0f6cbf] hover:bg-gray-100"
              >
                Ask Chad
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Main Apps Grid */}
        <div className="space-y-6 mb-8">
          {/* Quiz App - Full Width */}
          <div className="w-full">
            <QuizApp isEnabled={hasUploadedFiles} />
          </div>
          
          {/* Anki Cards and Mock Exam - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnkiCardApp isEnabled={hasUploadedFiles} />
            <MockExamApp isEnabled={hasUploadedFiles} />
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#0f6cbf] flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Learning Progress
            </h3>
            <span className="text-2xl font-bold text-[#0f6cbf]">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Course Completion</span>
            <span>Exam Readiness</span>
          </div>
        </div>
      </div>

      {/* Chat Sidebar Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsChatOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-[#0f6cbf] text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Chat with Chad</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Chat Content */}
              <div className="flex-1 p-4">
                <ChatApp isEnabled={hasUploadedFiles} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
