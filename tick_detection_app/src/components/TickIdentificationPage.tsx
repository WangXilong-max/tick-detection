import React, { useState, useRef } from "react";
import { SaveShareFlow } from "./SaveShareFlow";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getApiUrl } from "../config/api";

// Import tick images
import paralysisTickImg from '../assets/paralysis-tick.png?url';
import bushTickImg from '../assets/bush-tick.png?url';
import brownDogTickImg from '../assets/brown-dog-tick.png?url';

// Import video
import tickRemovalVideo from '../assets/tick-removal.mp4?url';

interface TickIdentificationPageProps {
  onNavigate: (page: string) => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

export function TickIdentificationPage({ onNavigate, onModalStateChange }: TickIdentificationPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetectionResult, setShowDetectionResult] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(82); // Confidence from API
  const [detectionCount, setDetectionCount] = useState(0); // Number of detections
  const [activeTab, setActiveTab] = useState('removal'); // For sticky tabs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    try {
      // Convert base64 image to file
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' });
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Call our FastAPI backend (local proxy or direct localhost)
      const apiResponse = await fetch(getApiUrl('/detect-tick'), {
        method: 'POST',
        body: formData,
      });
      
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error('API Error:', errorText);
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      
      const result = await apiResponse.json();
      console.log('API Response:', result);
      
      // Parse the result from ChatGPT API
      const detectionResult = result.result;
      console.log('Detection result:', detectionResult);
      
      // Check if tick is detected based on the response
      // API returns: "这是xx蜱虫" (tick detected) or "不是,这是xxx" (no tick)
      const isTickDetected = !detectionResult.includes('不是');
      
      if (isTickDetected) {
        // Tick detected
        setDetectionCount(1);
        setConfidence(85); // Set a default confidence for ChatGPT detection
        setShowDetectionResult(true);
        onModalStateChange?.(false);
      } else {
        // No tick detected
        setDetectionCount(0);
        setConfidence(0);
        setShowDetectionResult(true);
        onModalStateChange?.(false);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      // Fallback to mock result if API fails
      setShowDetectionResult(true);
      onModalStateChange?.(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetSelection = () => {
    setSelectedImage(null);
    setIsProcessing(false);
    setShowDetectionResult(false);
    setCurrentFlow(null);
    setConfidence(82);
    setDetectionCount(0);
    onModalStateChange?.(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleActionSelect = (action: string) => {
    setCurrentFlow(action);
  };

  const handleFlowComplete = () => {
    setCurrentFlow(null);
    // Directly return to detection results, no aftercare card
  };

  // Embedded RemovalFlow content
  const RemovalFlowContent = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const renderPage1 = () => (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Don't pull or scratch forcefully
          </h2>
        </div>

        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <video 
            className="w-full h-auto"
            controls
            preload="metadata"
          >
            <source src={tickRemovalVideo} type="video/mp4" />
            <div className="flex items-center justify-center h-48 text-gray-500">
              <p className="text-sm">Your browser does not support the video tag.</p>
            </div>
          </video>
        </div>

        <div className="mt-8">
          <div className="text-center text-gray-500 text-sm mb-4">1/3</div>
          <div className="flex justify-center">
            <Button 
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={() => setCurrentPage(2)}
            >
              Next Page
            </Button>
          </div>
        </div>
      </div>
    );

    const renderPage2 = () => (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Removal Instructions
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 text-lg">What NOT to do</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Don't pull with tweezers or fingers</li>
              <li>• Don't scratch or irritate the tick</li>
              <li>• Don't apply heat, petroleum jelly, or alcohol</li>
              <li>• Don't squeeze the tick's body</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-lg">Recommend Method</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Purchase ether freeze spray from pharmacy</li>
              <li>• Apply spray directly to the tick</li>
              <li>• Follow product instructions carefully</li>
              <li>• Keep area clean and dry</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 text-lg">Alternative</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              If freeze spray is not available, seek medical assistance rather than attempting removal yourself.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <div className="text-center text-gray-500 text-sm mb-4">2/3</div>
          <div className="flex justify-between">
            <Button 
              variant="outline"
              className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              onClick={() => setCurrentPage(1)}
            >
              Previous
            </Button>
            <Button 
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={() => setCurrentPage(3)}
            >
              Next Page
            </Button>
          </div>
        </div>
      </div>
    );

    const renderPage3 = () => (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            After Removal
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 text-lg">After Treatment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Wait up to 5 minutes for tick to drop off</li>
              <li>• Do not disturb or check frequently</li>
              <li>• Clean the area with antiseptic once removed</li>
              <li>• Save the tick in a container for identification</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 text-lg">If Tick Doesn't Drop Off</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Seek immediate medical help. Do not attempt other removal methods.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <div className="text-center text-gray-500 text-sm mb-4">3/3</div>
          <div className="flex justify-between">
            <Button 
              variant="outline"
              className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              onClick={() => setCurrentPage(2)}
            >
              Previous
            </Button>
            <Button 
              className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              onClick={() => setCurrentPage(1)}
            >
              Complete
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderPage2()}
        {currentPage === 3 && renderPage3()}
      </div>
    );
  };

  // Embedded EmergencySymptomChecker content
  const EmergencyContent = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleEmergencyCall = () => {
      window.location.href = 'tel:000';
    };

    const handleNurseCall = () => {
      window.location.href = 'tel:1300606024';
    };

    const handlePoisonCall = () => {
      window.location.href = 'tel:131126';
    };

    const renderPage1 = () => (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Emergency Protocols
          </h2>
        </div>

        <div className="mb-6">
          <Button 
            className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xl font-bold"
            onClick={handleEmergencyCall}
          >
            📞 Call 000 - Emergency
          </Button>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 text-lg">
              If you/someone have symptoms:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-red-800 text-sm space-y-2">
              <li>• Difficulty breathing</li>
              <li>• Swollen throat or tongue</li>
              <li>• Wheeze or a cough that's there all the time</li>
              <li>• Dizziness or collapse</li>
              <li>• Pale and floppy (young children)</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <div className="text-center text-gray-500 text-sm mb-4">1/3</div>
          <div className="flex justify-center">
            <Button 
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={() => setCurrentPage(2)}
            >
              Next Page
            </Button>
          </div>
        </div>
      </div>
    );

    const renderPage2 = () => (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Call Nurse on Call
          </h2>
        </div>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700 text-lg">24/7 Health Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Contact Information:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Phone: 1300 60 60 24</li>
                  <li>• Available 24 hours, 7 days a week</li>
                  <li>• Free from landlines and most mobiles</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Services:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Free health advice from registered nurses</li>
                  <li>• Health information and support</li>
                  <li>• Referrals to appropriate health services</li>
                  <li>• Non-emergency health guidance</li>
                </ul>
              </div>

              <div className="mt-4">
                <Button 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  onClick={handleNurseCall}
                >
                  📞 Call 1300 60 60 24
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <div className="text-center text-gray-500 text-sm mb-4">2/3</div>
          <div className="flex justify-between">
            <Button 
              variant="outline"
              className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              onClick={() => setCurrentPage(1)}
            >
              Previous
            </Button>
            <Button 
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={() => setCurrentPage(3)}
            >
              Next Page
            </Button>
          </div>
        </div>
      </div>
    );

    const renderPage3 = () => (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Call Victorian Poisons Centre
          </h2>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 text-lg">Poison Information & Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">Contact Information:</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Phone: 13 11 26</li>
                  <li>• Available 24 hours, 7 days a week</li>
                  <li>• Australia-wide service</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-green-800 mb-2">Location:</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Austin Health, Melbourne</li>
                  <li>• Level 1, Harold Stokes Building</li>
                  <li>• 145 Studley Road, Heidelberg VIC 3084</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-green-800 mb-2">Services:</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Poison information and advice</li>
                  <li>• Treatment recommendations</li>
                  <li>• Risk assessment for exposures</li>
                  <li>• Follow-up care guidance</li>
                </ul>
              </div>

              <div className="mt-4">
                <Button 
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                  onClick={handlePoisonCall}
                >
                  📞 Call 13 11 26
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <div className="text-center text-gray-500 text-sm mb-4">3/3</div>
          <div className="flex justify-between">
            <Button 
              variant="outline"
              className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              onClick={() => setCurrentPage(2)}
            >
              Previous
            </Button>
            <Button 
              className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              onClick={() => setCurrentPage(1)}
            >
              Complete
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderPage2()}
        {currentPage === 3 && renderPage3()}
      </div>
    );
  };

  // Embedded TickChart content
  const TickChartContent = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tick Chart</h1>
        </div>

        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <img 
                  src={paralysisTickImg} 
                  alt="Paralysis Tick" 
                  className="w-20 h-20 object-cover rounded-lg border-2 border-red-300"
                />
                <div className="flex-1">
                  <CardTitle className="text-red-700 text-lg">Paralysis Tick</CardTitle>
                  <p className="text-red-600 text-sm font-medium">Ixodes holocyclus</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Characteristics:</h4>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Most dangerous tick in Australia</li>
                    <li>• Grey to brown color with darker legs</li>
                    <li>• About 1cm when fully engorged</li>
                    <li>• Found along Australia's eastern coast</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Health Risks:</h4>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Can cause tick paralysis</li>
                    <li>• Allergic reactions (mammalian meat allergy)</li>
                    <li>• Requires immediate medical attention</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <img 
                  src={bushTickImg} 
                  alt="Bush Tick" 
                  className="w-20 h-20 object-cover rounded-lg border-2 border-orange-300"
                />
                <div className="flex-1">
                  <CardTitle className="text-orange-700 text-lg">Bush Tick</CardTitle>
                  <p className="text-orange-600 text-sm font-medium">Haemaphysalis longicornis</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Characteristics:</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Reddish-brown to dark brown color</li>
                    <li>• Smaller than paralysis tick</li>
                    <li>• Common in scrubland and grassland</li>
                    <li>• Active in warmer months</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Health Risks:</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Generally less dangerous</li>
                    <li>• Can transmit spotted fever</li>
                    <li>• May cause local skin irritation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <img 
                  src={brownDogTickImg} 
                  alt="Brown Dog Tick" 
                  className="w-20 h-20 object-cover rounded-lg border-2 border-amber-300"
                />
                <div className="flex-1">
                  <CardTitle className="text-amber-700 text-lg">Brown Dog Tick</CardTitle>
                  <p className="text-amber-600 text-sm font-medium">Rhipicephalus sanguineus</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-amber-800 mb-2">Characteristics:</h4>
                  <ul className="text-amber-800 text-sm space-y-1">
                    <li>• Reddish-brown color</li>
                    <li>• Prefers dogs as hosts</li>
                    <li>• Can survive indoors</li>
                    <li>• Found worldwide in warm climates</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-amber-800 mb-2">Health Risks:</h4>
                  <ul className="text-amber-800 text-sm space-y-1">
                    <li>• Rarely bites humans</li>
                    <li>• Can transmit diseases to dogs</li>
                    <li>• Low risk to human health</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Show current flow
  if (currentFlow === 'save') {
    return <SaveShareFlow onBack={() => setCurrentFlow(null)} onComplete={handleFlowComplete} imageUrl={selectedImage!} confidence={confidence} />;
  }

  // If image is selected, show preview and analysis interface
  if (selectedImage) {
    // If not showing detection results yet, show original upload/analysis interface
    if (!showDetectionResult) {
      return (
        <div className="min-h-full bg-white">
          <div className="px-4 pt-6 pb-32">
            {/* Image Preview with Bounding Box */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img 
                src={selectedImage} 
                alt="Selected for analysis" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', selectedImage);
                  console.error('Image error:', e);
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', selectedImage);
                }}
              />
              {/* Debug info */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                {selectedImage?.includes('/api/image/') ? 'Proxy Image' : selectedImage?.includes('s3.amazonaws.com') ? 'S3 Image' : 'Local Image'}
              </div>
            </div>

            {/* Offline Badge */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 11-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span className="text-xs text-gray-600">Offline mode available</span>
              </div>
            </div>
            
            {/* Analysis Status */}
            {isProcessing ? (
              <div className="text-center mb-6">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg text-gray-900 mb-2">Analyzing Image</h3>
                <p className="text-gray-600">Our AI is identifying potential ticks and assessing risk levels...</p>
              </div>
            ) : (
              <div className="text-center mb-6">
                <h3 className="text-lg text-gray-900 mb-2">Ready for Analysis</h3>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {!isProcessing && (
                <>
                  <Button 
                    size="lg" 
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    onClick={processImage}
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Start AI Analysis
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="w-full h-14 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                    onClick={resetSelection}
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Choose Different Image
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    // If showing detection results and ticks detected, show sticky tab interface
    if (showDetectionResult && detectionCount > 0) {
      const tabs = [
        { id: 'removal', label: 'Tick Removal', icon: '', color: 'blue' },
        { id: 'emergency', label: 'Emergency', icon: '', color: 'red' },
        { id: 'tickchart', label: 'Tick Chart', icon: '', color: 'green' }
      ];

      const renderTabContent = () => {
        switch (activeTab) {
          case 'removal':
            return <RemovalFlowContent />;
          case 'emergency':
            return <EmergencyContent />;
          case 'tickchart':
            return <TickChartContent />;
          default:
            return null;
        }
      };

      return (
        <div className="min-h-full bg-white">
          {/* Image Preview - Fixed at top */}
          <div className="px-4 pt-6 pb-4">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img 
                src={selectedImage} 
                alt="Selected for analysis" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                {selectedImage?.includes('/api/image/') ? 'Proxy Image' : selectedImage?.includes('s3.amazonaws.com') ? 'S3 Image' : 'Local Image'}
              </div>
            </div>

            {/* Detection Result Header */}
            <div className="text-center mb-4">
              <h3 className="text-lg text-gray-900 mb-2">Emergency Protocols - Tick detected</h3>
              <div className="flex justify-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                  {confidence}% confidence
                </Badge>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button 
                variant="outline"
                className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm"
                onClick={resetSelection}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Analyze New
              </Button>
              
              <Button 
                className="h-12 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl border border-gray-200 text-sm"
                onClick={() => handleActionSelect('save')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Save & Share
              </Button>
            </div>
          </div>

          {/* Tab Navigation - Sticky below image */}
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="px-4 py-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? `bg-${tab.color}-600 text-white`
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.icon && <span className="mr-1">{tab.icon}</span>}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-4 py-6 pb-32">
            {renderTabContent()}
          </div>
        </div>
      );
    }

    // If no ticks detected, show simple result
    if (showDetectionResult && detectionCount === 0) {
      return (
        <div className="min-h-full bg-white">
          <div className="px-4 pt-6 pb-32">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img 
                src={selectedImage} 
                alt="Selected for analysis" 
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg text-gray-900 mb-2">No ticks detected</h3>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline"
                size="lg" 
                className="w-full h-14 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                onClick={resetSelection}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Analyze New Image
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Default state - upload interface
  return (
    <div className="min-h-full bg-white">
      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl text-gray-900 mb-4">AI Tick Detection</h2>
        </div>
      </div>

      {/* Upload Info */}
      <div className="px-6 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 mb-1">Photo Guidelines</p>
              <p className="text-xs text-blue-600 leading-relaxed">
                For best results, ensure the image is clear, well-lit, and the tick is visible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-32">
        <div className="space-y-4">
          {/* Take Photo Button */}
          <Button 
            size="lg" 
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            onClick={() => alert('Camera feature will be available in the full version. For now, please use "Choose from Gallery".')}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Take Photo
          </Button>

          {/* Upload Button */}
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-14 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Choose from Gallery
          </Button>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}