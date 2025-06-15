
import React, { useState, useEffect } from 'react';
import { Clock, FileText, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface MockExamAppProps {
  isEnabled: boolean;
}

const MockExamApp: React.FC<MockExamAppProps> = ({ isEnabled }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [mockProgress, setMockProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
      if (animationStep === 2) {
        setMockProgress(prev => (prev >= 100 ? 0 : prev + 20));
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [animationStep]);

  const getAnimationContent = () => {
    switch (animationStep) {
      case 0:
        return (
          <div className="text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium">Setting up exam environment</div>
            <div className="text-xs text-gray-500 mt-1">90 minutes • 50 questions</div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Question 1/50</span>
              <span className="text-xs text-gray-500">Time: 89:45</span>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-xs mb-2">Multiple Choice</div>
              <div className="text-sm">Which concept is fundamental to...?</div>
              <div className="mt-2 space-y-1 text-xs">
                <div className="p-1 bg-blue-100 rounded">A) Option A</div>
                <div className="p-1 hover:bg-gray-100 rounded">B) Option B</div>
                <div className="p-1 hover:bg-gray-100 rounded">C) Option C</div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <div className="text-sm font-medium text-center">Exam in Progress</div>
            <Progress value={mockProgress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Questions: {Math.floor(mockProgress/2)}/50</span>
              <span>Time: {90 - Math.floor(mockProgress/2)}:00</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <Award className="h-8 w-8 text-green-500 mx-auto mb-2 animate-pulse" />
            <div className="text-sm font-medium text-green-600">Exam Complete!</div>
            <div className="text-xs text-gray-500 mt-1">Score: 85% • Grade: B+</div>
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
          <Target className="h-6 w-6 mr-2" />
          Mock Exam
        </CardTitle>
        <CardDescription>
          Practice with timed exams based on your courses
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
              <Clock className="h-4 w-4 text-blue-500" />
              <span>Timed exam simulation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span>Real exam conditions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span>Detailed performance analysis</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#0f6cbf] hover:bg-[#0d5aa7]" 
            disabled={!isEnabled}
          >
            {isEnabled ? 'Start Mock Exam' : 'Upload PDFs to Enable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockExamApp;
