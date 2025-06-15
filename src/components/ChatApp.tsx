
import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ChatAppProps {
  isEnabled: boolean;
}

const ChatApp: React.FC<ChatAppProps> = ({ isEnabled }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const chatDemo = [
    { type: 'user', message: "What is photosynthesis?" },
    { type: 'bot', message: "Photosynthesis is the process by which plants convert light energy into chemical energy using chlorophyll..." },
    { type: 'user', message: "Can you quiz me on this topic?" },
    { type: 'bot', message: "Sure! Here's a question: Which organelle is primarily responsible for photosynthesis?" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessageIndex(prev => (prev + 1) % chatDemo.length);
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [chatDemo.length]);

  return (
    <Card className={`transition-all duration-300 ${isEnabled ? 'border-[#0f6cbf] shadow-lg' : 'border-gray-200 opacity-60'}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-[#0f6cbf]">
          <MessageSquare className="h-6 w-6 mr-2" />
          AI Chat Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about your course and get instant quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Animation Demo */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 min-h-[120px]">
            <div className="space-y-3 max-h-[100px] overflow-hidden">
              {chatDemo.slice(0, messageIndex + 1).map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.type === 'user' ? 'bg-[#0f6cbf]' : 'bg-green-500'}`}>
                      {msg.type === 'user' ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3 text-white" />}
                    </div>
                    <div className={`p-2 rounded-lg text-xs ${msg.type === 'user' ? 'bg-[#0f6cbf] text-white' : 'bg-white border'}`}>
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-white border p-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span>Natural language queries</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-green-500" />
              <span>Context from uploaded PDFs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 text-green-500" />
              <span>Generates quiz questions</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#0f6cbf] hover:bg-[#0d5aa7]" 
            disabled={!isEnabled}
          >
            {isEnabled ? 'Start Chat' : 'Upload PDFs to Enable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatApp;
