import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface SaveShareFlowProps {
  onBack: () => void;
  onComplete: () => void;
  imageUrl: string;
  confidence: number;
}

export function SaveShareFlow({ onBack, onComplete, imageUrl, confidence }: SaveShareFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const detectionData = {
    date: new Date().toLocaleDateString('en-AU'),
    time: new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }),
    confidence: confidence,
    location: 'Victoria, Australia',
    species: 'Tick detected (analysis required)',
    notes: ''
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving process
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setCurrentStep(2);
    }, 2000);
  };

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF export functionality would be implemented here. The report would include the image, bounding box, confidence level, timestamp, and recommendations.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tick Detection Result',
        text: `Tick detected with ${confidence}% confidence on ${detectionData.date}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Tick detected with ${confidence}% confidence on ${detectionData.date}. Detected using TickSafe Victoria app.`;
      navigator.clipboard.writeText(shareText);
      alert('Detection details copied to clipboard!');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💾</span>
        </div>
        <h2 className="text-xl text-gray-900 mb-2">Save Detection</h2>
        <p className="text-gray-600">Save this detection for your records</p>
      </div>

      {/* Detection Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detection Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Preview */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Detected tick" 
              className="w-full h-32 object-cover"
            />
            {/* Simulated bounding box */}
            <div className="absolute top-8 left-8 w-8 h-8 border border-red-500 bg-red-500/10 rounded">
              <div className="absolute -top-4 left-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                Tick
              </div>
            </div>
          </div>

          {/* Detection Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Date:</span>
              <p className="font-medium">{detectionData.date}</p>
            </div>
            <div>
              <span className="text-gray-600">Time:</span>
              <p className="font-medium">{detectionData.time}</p>
            </div>
            <div>
              <span className="text-gray-600">Confidence:</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {detectionData.confidence}%
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">Location:</span>
              <p className="font-medium text-xs">{detectionData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!saved && (
        <Button 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </div>
          ) : (
            '💾 Save Detection'
          )}
        </Button>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-xl text-gray-900 mb-2">Detection Saved</h2>
        <p className="text-gray-600">Your detection has been saved successfully</p>
      </div>

      {/* Sharing Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Share & Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline"
            className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl flex items-center justify-center space-x-2"
            onClick={handleExportPDF}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export as PDF</span>
          </Button>

          <Button 
            variant="outline"
            className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl flex items-center justify-center space-x-2"
            onClick={handleShare}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share Detection</span>
          </Button>
        </CardContent>
      </Card>

      {/* Saved Records Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-blue-900 text-sm mb-1">Your Records</h4>
              <p className="text-blue-800 text-xs">
                This detection is saved locally on your device. You can access your detection history from the main menu.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl"
        onClick={onComplete}
      >
        Continue to Aftercare
      </Button>
    </div>
  );

  return (
    <div className="min-h-full bg-white">
      <div className="px-6 pt-8 pb-32">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of 2</span>
            <button 
              onClick={onBack}
              className="text-blue-600 text-sm hover:underline"
            >
              ← Back
            </button>
          </div>
          <Progress value={(currentStep / 2) * 100} className="h-2" />
        </div>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
      </div>
    </div>
  );
}