
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, User, FileText, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

interface ChatAppProps {
  isEnabled: boolean;
}

const ChatApp: React.FC<ChatAppProps> = ({ isEnabled }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hi! I'm Chad, your AI study assistant. I can help you understand your course materials, generate quiz questions, and answer any questions you have. What would you like to study today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple response logic - in a real app, this would connect to an AI service
    if (lowerMessage.includes('photosynthesis')) {
      return "Photosynthesis is the process by which plants convert light energy into chemical energy using chlorophyll. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Would you like me to create a quiz question about this topic?";
    } else if (lowerMessage.includes('mitochondria')) {
      return "Mitochondria are the powerhouses of the cell! They produce ATP through cellular respiration. They have a double membrane structure and their own DNA. Would you like to learn more about cellular respiration?";
    } else if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
      return "I can help generate quiz questions based on your study materials! Try asking me about specific topics like 'create a quiz about cellular respiration' or 'test me on photosynthesis'.";
    } else if (lowerMessage.includes('help')) {
      return "I can assist you with: \n• Explaining complex concepts\n• Creating quiz questions\n• Summarizing your study materials\n• Breaking down difficult topics\n• Providing study tips\n\nWhat specific topic would you like help with?";
    } else {
      return "That's an interesting question! Based on your uploaded materials, I can provide more detailed explanations. Could you be more specific about what aspect you'd like to explore? I'm here to help you understand the concepts better.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: generateResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
    <div className="h-full flex flex-col max-h-[600px]">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-[#0f6cbf]' : 'bg-green-500'}`}>
                  {msg.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                </div>
                <div className={`p-3 rounded-lg text-sm ${msg.type === 'user' ? 'bg-[#0f6cbf] text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <div className="whitespace-pre-line">{msg.message}</div>
                  <div className={`text-xs mt-1 opacity-70 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
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
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Features List */}
      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <div className="space-y-2 text-xs text-gray-600">
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
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask Chad a question..."
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-[#0f6cbf] hover:bg-[#0d5aa7]"
            disabled={isTyping || !inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
