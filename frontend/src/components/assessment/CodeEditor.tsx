
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Save, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CodeChallenge {
  id: number;
  title: string;
  description: string;
  boilerplate: string;
  test: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface CodeEditorProps {
  onComplete: () => void;
}

// Sample coding challenges
const sampleChallenges: CodeChallenge[] = [
  {
    id: 1,
    title: "Array Sum",
    description: "Write a function that takes an array of numbers and returns the sum of all elements.",
    boilerplate: "function arraySum(numbers) {\n  // Your code here\n\n}",
    test: "// Test cases:\n// arraySum([1, 2, 3, 4, 5]) should return 15\n// arraySum([-1, -2, -3]) should return -6",
    difficulty: "easy"
  },
  {
    id: 2,
    title: "String Reverse",
    description: "Write a function that takes a string and returns it reversed.",
    boilerplate: "function reverseString(str) {\n  // Your code here\n\n}",
    test: "// Test cases:\n// reverseString('hello') should return 'olleh'\n// reverseString('javascript') should return 'tpircsavaj'",
    difficulty: "easy"
  },
  {
    id: 3,
    title: "Palindrome Check",
    description: "Write a function that checks if a given string is a palindrome (reads the same forward and backward).",
    boilerplate: "function isPalindrome(str) {\n  // Your code here\n\n}",
    test: "// Test cases:\n// isPalindrome('racecar') should return true\n// isPalindrome('hello') should return false",
    difficulty: "medium"
  }
];

const CodeEditor: React.FC<CodeEditorProps> = ({ onComplete }) => {
  const [challenges] = useState<CodeChallenge[]>(sampleChallenges);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  
  useEffect(() => {
    setCode(challenges[currentChallenge].boilerplate);
    setOutput("");
  }, [currentChallenge, challenges]);
  
  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate code execution
    setTimeout(() => {
      setOutput("// Code executed successfully!\n// All tests passed.");
      setIsRunning(false);
    }, 1500);
  };
  
  const submitSolution = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setCompletedChallenges(prev => [...prev, challenges[currentChallenge].id]);
      setIsSubmitting(false);
      
      toast.success("Solution submitted successfully!");
      
      // Move to the next challenge
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
      } else if (completedChallenges.length === challenges.length - 1) {
        // All challenges completed
        onComplete();
      }
    }, 2000);
  };
  
  const allChallengesCompleted = completedChallenges.length === challenges.length;
  
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{challenges[currentChallenge].title}</CardTitle>
              <CardDescription>
                Difficulty: <span className={
                  challenges[currentChallenge].difficulty === 'easy' 
                    ? 'text-green-500' 
                    : challenges[currentChallenge].difficulty === 'medium' 
                      ? 'text-amber-500' 
                      : 'text-red-500'
                }>
                  {challenges[currentChallenge].difficulty.charAt(0).toUpperCase() + 
                   challenges[currentChallenge].difficulty.slice(1)}
                </span>
              </CardDescription>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                Challenge {currentChallenge + 1} of {challenges.length}
              </span>
              
              <div className="flex gap-1">
                {challenges.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      completedChallenges.includes(challenges[index].id)
                        ? 'bg-green-500'
                        : index === currentChallenge
                          ? 'bg-primary'
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm mb-4">
            {challenges[currentChallenge].description}
          </p>
          
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="mt-4">
              <div className="border rounded-md bg-muted">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[300px] p-4 font-mono text-sm bg-transparent focus:outline-none resize-none"
                  spellCheck="false"
                />
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="border rounded-md bg-muted p-4 font-mono whitespace-pre-wrap">
                  {challenges[currentChallenge].test}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="output" className="mt-4">
              <div className="border rounded-md bg-muted p-4 h-[370px] font-mono text-sm overflow-auto">
                {isRunning ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Running code...</span>
                  </div>
                ) : output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Run your code to see output</span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-0">
          <Button
            variant="outline"
            onClick={runCode}
            disabled={isRunning || isSubmitting}
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </>
            )}
          </Button>
          
          <Button
            onClick={submitSolution}
            disabled={isSubmitting || isRunning}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting
              </>
            ) : completedChallenges.includes(challenges[currentChallenge].id) ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Submit Solution
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {allChallengesCompleted && (
        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={onComplete}
          >
            Complete Assessment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
