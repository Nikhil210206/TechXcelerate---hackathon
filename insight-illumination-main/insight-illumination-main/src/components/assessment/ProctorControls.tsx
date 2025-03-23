
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Mic, Video, ScanFace, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProctorControlsProps {
  onReady: () => void;
}

interface DetectionStatus {
  audio: boolean;
  video: boolean;
  face: boolean;
}

const ProctorControls: React.FC<ProctorControlsProps> = ({ onReady }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionStatus, setPermissionStatus] = useState<DetectionStatus>({
    audio: false,
    video: false,
    face: false
  });
  const [loading, setLoading] = useState<DetectionStatus>({
    audio: false,
    video: false,
    face: false
  });
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const startCamera = async () => {
    setLoading(prev => ({ ...prev, video: true }));
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        setStream(videoStream);
        setPermissionStatus(prev => ({ ...prev, video: true }));
        toast.success("Camera access granted");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Unable to access camera. Please check permissions.");
    } finally {
      setLoading(prev => ({ ...prev, video: false }));
    }
  };
  
  const startAudio = async () => {
    setLoading(prev => ({ ...prev, audio: true }));
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionStatus(prev => ({ ...prev, audio: true }));
      toast.success("Microphone access granted");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Unable to access microphone. Please check permissions.");
    } finally {
      setLoading(prev => ({ ...prev, audio: false }));
    }
  };
  
  const detectFace = async () => {
    if (!videoRef.current || !stream) {
      toast.error("Camera must be enabled first");
      return;
    }
    
    setLoading(prev => ({ ...prev, face: true }));
    
    try {
      // In a real implementation, you would use a face detection library
      // Here we're simulating face detection with a timeout and additional UI feedback
      
      // Adding a more realistic simulation with multiple checks
      toast.info("Scanning for face...");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.info("Aligning face position...");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.info("Confirming facial features...");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPermissionStatus(prev => ({ ...prev, face: true }));
      toast.success("Face detection successful");
    } catch (error) {
      console.error("Face detection failed:", error);
      toast.error("Face detection failed. Please try again.");
    } finally {
      setLoading(prev => ({ ...prev, face: false }));
    }
  };
  
  // Cleanup function for media streams
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [stream]);
  
  const allPermissionsGranted = 
    permissionStatus.audio && 
    permissionStatus.video && 
    permissionStatus.face;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-sm aspect-video bg-muted rounded-lg overflow-hidden mb-6">
          {permissionStatus.video ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
          
          {permissionStatus.video && !permissionStatus.face && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-dashed border-yellow-400 w-32 h-32 rounded-full opacity-70 flex items-center justify-center">
                <span className="text-xs text-yellow-500 bg-black/50 px-2 py-1 rounded">Position face here</span>
              </div>
            </div>
          )}
          
          {permissionStatus.face && (
            <div className="absolute top-2 right-2 bg-green-500/80 text-white p-1 rounded text-xs flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Face Detected
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <div className="flex items-start mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              permissionStatus.video ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
            }`}>
              <Video className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium">Camera Access</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Required for identity verification
              </p>
            </div>
          </div>
          <Button 
            variant={permissionStatus.video ? "outline" : "default"} 
            className="w-full"
            onClick={startCamera}
            disabled={loading.video || permissionStatus.video}
          >
            {loading.video && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {permissionStatus.video ? "Connected" : "Enable Camera"}
          </Button>
        </div>
        
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <div className="flex items-start mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              permissionStatus.audio ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
            }`}>
              <Mic className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium">Microphone Access</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Required for audio monitoring
              </p>
            </div>
          </div>
          <Button 
            variant={permissionStatus.audio ? "outline" : "default"} 
            className="w-full"
            onClick={startAudio}
            disabled={loading.audio || permissionStatus.audio}
          >
            {loading.audio && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {permissionStatus.audio ? "Connected" : "Enable Microphone"}
          </Button>
        </div>
        
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <div className="flex items-start mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              permissionStatus.face ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
            }`}>
              <ScanFace className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium">Face Detection</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Required for proctoring
              </p>
            </div>
          </div>
          <Button 
            variant={permissionStatus.face ? "outline" : "default"} 
            className="w-full"
            onClick={detectFace}
            disabled={loading.face || permissionStatus.face || !permissionStatus.video}
          >
            {loading.face && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {permissionStatus.face ? "Detected" : "Detect Face"}
          </Button>
          {!permissionStatus.video && !loading.video && (
            <p className="text-xs text-amber-500 mt-2 text-center">Enable camera first</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-center pt-4">
        {!allPermissionsGranted ? (
          <div className="flex items-center gap-2 text-amber-500 mb-4">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">Please enable all required permissions to continue</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">All requirements met</span>
          </div>
        )}
        
        <Button 
          size="lg" 
          disabled={!allPermissionsGranted}
          onClick={onReady}
        >
          Begin Assessment
        </Button>
      </div>
    </div>
  );
};

export default ProctorControls;
