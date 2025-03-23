
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, User, Bot, AlertCircle } from 'lucide-react';

interface ChatAssessmentProps {
  onComplete: () => void;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  isQuestion?: boolean;
}

// Sample technical questions (in a real app, these would come from an API)
const sampleQuestions = [
  "Explain the difference between var, let, and const in JavaScript.",
  "What is React's Virtual DOM and how does it work?",
  "Describe the box model in CSS.",
  "What is the difference between == and === in JavaScript?",
  "Explain how promises work in JavaScript.",
  "What are React hooks and why were they introduced?",
  "What is the purpose of the useEffect hook in React?",
  "Explain how event delegation works in JavaScript.",
  "What is CSS specificity and how is it calculated?",
  "Describe the concept of closure in JavaScript.",
];

const ChatAssessment: React.FC<ChatAssessmentProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize with a welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Welcome to the technical assessment! I'll ask you a series of questions to evaluate your knowledge. Please provide detailed answers."
      }
    ]);
    
    // Ask the first question after a short delay
    setTimeout(() => {
      askQuestion(0);
    }, 1000);
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const askQuestion = (index: number) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `question-${index}`,
          role: "assistant",
          content: sampleQuestions[index],
          isQuestion: true
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleSubmit = () => {
    if (input.trim() === "") return;
    
    // Add user's answer
    setMessages(prev => [
      ...prev,
      {
        id: `answer-${currentQuestion}`,
        role: "user",
        content: input
      }
    ]);
    
    setInput("");
    setIsSubmitting(true);
    
    // Simulate AI evaluation
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Move to next question
      const nextQuestion = currentQuestion + 1;
      
      if (nextQuestion < sampleQuestions.length) {
        setCurrentQuestion(nextQuestion);
        askQuestion(nextQuestion);
      } else {
        // All questions answered
        setMessages(prev => [
          ...prev,
          {
            id: "completion",
            role: "assistant",
            content: "You've answered all the technical questions. Let's move on to the coding challenges."
          }
        ]);
        
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="h-[600px] flex flex-col">
        <div className="p-4 border-b bg-muted/50">
          <h3 className="font-medium">Technical Assessment</h3>
          <p className="text-xs text-muted-foreground">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === "assistant" 
                    ? "bg-muted text-foreground" 
                    : "bg-primary text-primary-foreground"
                } ${message.isQuestion ? "border-l-4 border-primary" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === "assistant" ? "AI Assessor" : "You"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 bg-muted rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] resize-none"
              disabled={isSubmitting || currentQuestion >= sampleQuestions.length}
            />
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || input.trim() === "" || currentQuestion >= sampleQuestions.length}
              className="self-end"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {currentQuestion < sampleQuestions.length && (
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3 mr-1" />
              Provide a detailed response. Press Enter to submit.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChatAssessment;
