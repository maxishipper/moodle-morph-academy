
import React, { useState, useEffect } from 'react';
import { FileText, Play, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizAppProps {
  isEnabled: boolean;
}

const QuizApp: React.FC<QuizAppProps> = ({ isEnabled }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getAnimationContent = () => {
    switch (animationStep) {
      case 0:
        return (
          <div className="flex items-center space-x-2 text-blue-600">
            <FileText className="h-5 w-5 animate-pulse" />
            <span className="text-sm">Analyzing PDF content...</span>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center space-x-2 text-orange-600">
            <Play className="h-5 w-5 animate-spin" />
            <span className="text-sm">Generating questions...</span>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <div className="text-sm font-medium">Sample Question:</div>
            <div className="text-xs bg-gray-100 p-2 rounded">
              "What is the main principle of...?"
              <div className="mt-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>A) Correct answer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-3 w-3 text-red-500" />
                  <span>B) Wrong option</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2 animate-bounce" />
            <span className="text-sm text-green-600 font-medium">Quiz Ready!</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`transition-all duration-300 ${isEnabled ? 'border-[#0f6cbf] shadow-lg' : 'border-gray-200 opacity-60'}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-[#0f6cbf]">
          <FileText className="h-6 w-6 mr-2" />
          Quiz Generator
        </CardTitle>
        <CardDescription>
          Generate interactive quizzes from your course materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Animation Demo */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 min-h-[120px] flex items-center justify-center">
            {getAnimationContent()}
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>AI-powered question generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Multiple choice & true/false</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Instant feedback & explanations</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#0f6cbf] hover:bg-[#0d5aa7]" 
            disabled={!isEnabled}
          >
            {isEnabled ? 'Start Quiz' : 'Upload PDFs to Enable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizApp;
