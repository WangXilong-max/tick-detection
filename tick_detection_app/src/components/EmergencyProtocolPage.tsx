import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Import tick images
import paralysisTickImg from '../assets/paralysis-tick.png?url';
import bushTickImg from '../assets/bush-tick.png?url';
import brownDogTickImg from '../assets/brown-dog-tick.png?url';

// Import video
import tickRemovalVideo from '../assets/tick-removal.mp4?url';

interface EmergencyProtocolPageProps {
  onNavigate: (page: string) => void;
}

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
          Call Nurse-on-Call
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

export function EmergencyProtocolPage({ onNavigate }: EmergencyProtocolPageProps) {
  const [activeTab, setActiveTab] = useState('removal'); // Default to removal tab

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
      {/* Page Title - Fixed at top */}
      <div className="px-6 pt-8 pb-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Emergency Protocol</h1>
        </div>
      </div>

      {/* Tab Navigation - Sticky below title */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 py-3">
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

      {/* Tab Content - Full content, not preview */}
      <div className="px-6 py-6 pb-32">
        {renderTabContent()}
      </div>
    </div>
  );
}