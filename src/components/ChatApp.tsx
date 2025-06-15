
import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User, FileText, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatAppProps {
  isEnabled: boolean;
}

const ChatApp: React.FC<ChatAppProps> = ({ isEnabled }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const chatDemo = [
    { type: 'user', message: "What is photosynthesis?" },
    { type: 'bot', message: "Photosynthesis is the process by which plants convert light energy into chemical energy using chlorophyll..." },
    { type: 'user', message: "Can you quiz me on this topic?" },
    { type: 'bot', message: "Sure! Here's a question: Which organelle is primarily responsible for photosynthesis?" }
  ];

  useEffect(() => {
    if (!isEnabled) return;
    
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessageIndex(prev => (prev + 1) % chatDemo.length);
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [chatDemo.length, isEnabled]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // In a real implementation, this would send the message
      console.log('Sending message:', inputMessage);
      setInputMessage('');
    }
  };

  if (!isEnabled) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full border-gray-200 opacity-60">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Upload PDFs First</h3>
            <p className="text-gray-500">Upload your course materials to start chatting with Chad</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <div className="text-center text-sm text-gray-500 mb-4">
          Chat with Chad about your course materials
        </div>
        
        {chatDemo.slice(0, messageIndex + 1).map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.type === 'user' ? 'bg-[#0f6cbf]' : 'bg-green-500'}`}>
                {msg.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${msg.type === 'user' ? 'bg-[#0f6cbf] text-white' : 'bg-gray-100 text-gray-800'}`}>
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features List */}
      <div className="space-y-2 text-xs text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-3 w-3 text-green-500" />
          <span>Natural language queries</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="h-3 w-3 text-green-500" />
          <span>Context from uploaded PDFs</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bot className="h-3 w-3 text-green-500" />
          <span>Generates quiz questions</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Chad a question..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          size="sm"
          className="bg-[#0f6cbf] hover:bg-[#0d5aa7]"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatApp;
