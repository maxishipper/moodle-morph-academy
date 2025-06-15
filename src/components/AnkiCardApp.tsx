
import React, { useState, useEffect } from 'react';
import { BookOpen, RotateCw, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AnkiCardAppProps {
  isEnabled: boolean;
}

const AnkiCardApp: React.FC<AnkiCardAppProps> = ({ isEnabled }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const sampleCards = [
    { front: "Photosynthesis", back: "The process by which plants convert light energy into chemical energy" },
    { front: "Mitochondria", back: "The powerhouse of the cell, responsible for energy production" },
    { front: "DNA", back: "Deoxyribonucleic acid - carries genetic information" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFlipped) {
        setTimeout(() => {
          setIsFlipped(false);
          setCardIndex(prev => (prev + 1) % sampleCards.length);
        }, 1000);
      } else {
        setIsFlipped(true);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [isFlipped, sampleCards.length]);

  const currentCard = sampleCards[cardIndex];

  return (
    <Card className={`transition-all duration-300 ${isEnabled ? 'border-[#0f6cbf] shadow-lg' : 'border-gray-200 opacity-60'}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-[#0f6cbf]">
          <BookOpen className="h-6 w-6 mr-2" />
          Anki Cards
        </CardTitle>
        <CardDescription>
          Learn key terms and definitions with spaced repetition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Animation Demo */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 min-h-[120px]">
            <div 
              className={`relative w-full h-full min-h-[88px] transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div className={`absolute inset-0 bg-white border rounded-lg p-4 flex items-center justify-center shadow-md ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Term</div>
                  <div className="text-lg font-semibold text-[#0f6cbf]">{currentCard.front}</div>
                  <RotateCw className="h-4 w-4 text-gray-400 mx-auto mt-2 animate-spin" />
                </div>
              </div>
              
              {/* Back of card */}
              <div className={`absolute inset-0 bg-blue-50 border rounded-lg p-4 flex items-center justify-center shadow-md ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Definition</div>
                  <div className="text-sm text-gray-700">{currentCard.back}</div>
                  <div className="flex justify-center space-x-3 mt-3">
                    <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span>Auto-generated from PDFs</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCw className="h-4 w-4 text-purple-500" />
              <span>Spaced repetition algorithm</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span>Track learning progress</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#0f6cbf] hover:bg-[#0d5aa7]" 
            disabled={!isEnabled}
          >
            {isEnabled ? 'Study Cards' : 'Upload PDFs to Enable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnkiCardApp;
