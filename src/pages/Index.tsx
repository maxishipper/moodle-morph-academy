
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Brain, MessageSquare, BookOpen, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import FileUploadZone from '@/components/FileUploadZone';
import QuizApp from '@/components/QuizApp';
import MockExamApp from '@/components/MockExamApp';
import AnkiCardApp from '@/components/AnkiCardApp';
import ChatApp from '@/components/ChatApp';

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [examDate] = useState(new Date('2025-07-15')); // Example exam date
  const [progress, setProgress] = useState(65); // Example progress
  const [timeLeft, setTimeLeft] = useState('');

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

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    // Simulate progress increase when files are uploaded
    setProgress(prev => Math.min(prev + 10, 100));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      {/* Header */}
      <header className="bg-[#0f6cbf] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-2xl font-bold">EduLearn Platform</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Clock className="h-5 w-5" />
              <span>Exam in: {timeLeft}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* File Upload Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0f6cbf] mb-4">Upload Course Materials</h2>
          <FileUploadZone onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />
        </div>

        {/* Main Apps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <QuizApp isEnabled={uploadedFiles.length > 0} />
          <MockExamApp isEnabled={uploadedFiles.length > 0} />
          <AnkiCardApp isEnabled={uploadedFiles.length > 0} />
          <ChatApp isEnabled={uploadedFiles.length > 0} />
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
    </div>
  );
};

export default Index;
