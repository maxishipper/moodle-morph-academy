
import React, { useState } from 'react';
import { ArrowLeft, Brain, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface FlashCard {
  id: number;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const AnkiCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCards, setStudiedCards] = useState<number[]>([]);

  // Sample flashcards - in a real app, these would be generated from uploaded materials
  const flashcards: FlashCard[] = [
    {
      id: 1,
      front: "What is photosynthesis?",
      back: "The process by which plants use sunlight, carbon dioxide, and water to produce glucose and oxygen.",
      difficulty: 'medium'
    },
    {
      id: 2,
      front: "Define cellular respiration",
      back: "The process by which cells break down glucose and other organic molecules to release energy in the form of ATP.",
      difficulty: 'medium'
    },
    {
      id: 3,
      front: "What is the powerhouse of the cell?",
      back: "Mitochondria - they produce ATP through cellular respiration.",
      difficulty: 'easy'
    },
    {
      id: 4,
      front: "Explain the difference between prokaryotic and eukaryotic cells",
      back: "Prokaryotic cells lack a membrane-bound nucleus (bacteria), while eukaryotic cells have a nucleus enclosed by a nuclear membrane (plants, animals, fungi).",
      difficulty: 'hard'
    }
  ];

  const handleCardFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNext = (difficulty: 'easy' | 'medium' | 'hard') => {
    setStudiedCards(prev => [...prev, flashcards[currentCard].id]);
    
    if (difficulty === 'easy') {
      toast.success('Easy! Card mastered! 🎉');
    } else if (difficulty === 'medium') {
      toast.success('Good! Keep practicing! 👍');
    } else {
      toast.success('Challenging! Review again later. 📚');
    }

    if (currentCard < flashcards.length - 1) {
      setCurrentCard(prev => prev + 1);
      setShowAnswer(false);
    } else {
      toast.success('All cards reviewed! Great job! 🎉');
    }
  };

  const resetCards = () => {
    setCurrentCard(0);
    setShowAnswer(false);
    setStudiedCards([]);
  };

  const progress = ((currentCard + 1) / flashcards.length) * 100;

  if (currentCard >= flashcards.length) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] font-sans">
        <header className="bg-[#0f6cbf] text-white shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/b1e02ec5-6a97-4c44-912c-358925786899.png" 
                    alt="Dood Logo" 
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <h1 className="text-2xl font-bold">Dood</h1>
              </Link>
              <Link to="/">
                <Button className="bg-white text-[#0f6cbf] hover:bg-gray-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center space-y-6 p-8">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold text-[#0f6cbf]">Session Complete!</h2>
              <p className="text-gray-600">
                You've reviewed all {flashcards.length} cards. Great job studying!
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={resetCards}
                  className="bg-[#0f6cbf] hover:bg-[#0d5aa7] mr-4"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Study Again
                </Button>
                <Link to="/">
                  <Button variant="outline">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <header className="bg-[#0f6cbf] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/b1e02ec5-6a97-4c44-912c-358925786899.png" 
                  alt="Dood Logo" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold">Dood</h1>
            </Link>
            <Link to="/">
              <Button className="bg-white text-[#0f6cbf] hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#0f6cbf] flex items-center">
                <Brain className="h-6 w-6 mr-2" />
                Anki Cards
              </h2>
              <span className="text-sm text-gray-600">
                Card {currentCard + 1} of {flashcards.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#0f6cbf] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Card className="mb-6 min-h-[300px] cursor-pointer" onClick={handleCardFlip}>
            <CardContent className="p-8 flex flex-col justify-center items-center text-center h-full">
              <div className="flex items-center justify-center mb-4">
                {showAnswer ? (
                  <EyeOff className="h-6 w-6 text-gray-400 mr-2" />
                ) : (
                  <Eye className="h-6 w-6 text-gray-400 mr-2" />
                )}
                <span className="text-sm text-gray-500">
                  {showAnswer ? 'Answer' : 'Question - Click to reveal answer'}
                </span>
              </div>
              
              <div className="text-lg leading-relaxed">
                {showAnswer ? flashcards[currentCard].back : flashcards[currentCard].front}
              </div>

              {!showAnswer && (
                <div className="mt-6 text-sm text-gray-400">
                  Tap anywhere to flip the card
                </div>
              )}
            </CardContent>
          </Card>

          {showAnswer && (
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600 mb-4">
                How well did you know this answer?
              </p>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => handleNext('hard')}
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  Hard
                </Button>
                <Button
                  onClick={() => handleNext('medium')}
                  variant="outline"
                  className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                >
                  Medium
                </Button>
                <Button
                  onClick={() => handleNext('easy')}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  Easy
                </Button>
              </div>
            </div>
          )}

          {!showAnswer && (
            <div className="text-center">
              <Button
                onClick={handleCardFlip}
                className="bg-[#0f6cbf] hover:bg-[#0d5aa7]"
              >
                Reveal Answer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnkiCards;
