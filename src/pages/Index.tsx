import React, { useState, useEffect } from 'react';
import { Upload, Clock, BarChart3, X, Calendar as CalendarIcon, User, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import QuizApp from '@/components/QuizApp';
import MockExamApp from '@/components/MockExamApp';
import AnkiCardApp from '@/components/AnkiCardApp';
import ChatApp from '@/components/ChatApp';
import UserStatsMenu from '@/components/UserStatsMenu';

const Index = () => {
  const [examDate] = useState(new Date('2025-07-15'));
  const [progress, setProgress] = useState(65);
  const [timeLeft, setTimeLeft] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isStatsMenuOpen, setIsStatsMenuOpen] = useState(false);
  const hasUploadedFiles = true;

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
    <div className="min-h-screen bg-[#f8f9fa] font-sans relative flex flex-col">
      {/* Header */}
      <header className="bg-[#0f6cbf] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="h-16 w-16 flex items-center justify-center">
                <Book className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold font-mono tracking-wider">mood</h1>
            </Link>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsStatsMenuOpen(true)}
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Link to="/upload">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Materials
                </Button>
              </Link>
              <Link to="/calendar">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Calendar
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
        
        {/* Progress Bar - Full Width and Higher */}
        <div className="w-full bg-[#0f6cbf] px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium">Learning Progress</span>
            <span className="text-lg font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-6 bg-white/20" />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 flex-1">
        {/* Main Apps Grid */}
        <div className="space-y-6">
          {/* Quiz App - Full Width */}
          <div className="w-full">
            <Link to="/quiz">
              <div className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-200">
                <QuizApp isEnabled={hasUploadedFiles} />
              </div>
            </Link>
          </div>
          
          {/* Anki Cards and Mock Exam - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Link to="/anki-cards">
              <div className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-200 h-full">
                <AnkiCardApp isEnabled={hasUploadedFiles} />
              </div>
            </Link>
            <Link to="/mock-exam">
              <div className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-200 h-full">
                <MockExamApp isEnabled={hasUploadedFiles} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer with Progress Bar */}
      <footer className="bg-[#0f6cbf] text-white shadow-lg mt-auto">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium">Overall Learning Progress</span>
            <span className="text-lg font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-6 bg-white/20" />
        </div>
      </footer>

      {/* User Stats Menu */}
      <UserStatsMenu 
        isOpen={isStatsMenuOpen} 
        onClose={() => setIsStatsMenuOpen(false)} 
      />

      {/* Chat Sidebar Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsChatOpen(false)}
          />
          
          <div className="w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
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
              
              <div className="flex-1">
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
