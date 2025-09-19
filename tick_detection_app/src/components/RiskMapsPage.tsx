import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface RiskMapsPageProps {
  onNavigate: (page: string) => void;
}

export function RiskMapsPage({ onNavigate }: RiskMapsPageProps) {
  return (
    <div className="min-h-full bg-white">
      {/* Current Location Status */}
      <div className="px-6 py-8">
        <Card className="p-6 border border-gray-200 bg-orange-50">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-900 mb-1">Current Location</h3>
              <p className="text-gray-600">Melbourne, Victoria</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg text-orange-700 mb-1">Moderate</div>
              <div className="text-gray-600 text-sm">Risk Level</div>
            </div>
            <div>
              <div className="text-lg text-orange-700 mb-1">Peak</div>
              <div className="text-gray-600 text-sm">Season</div>
            </div>
            <div>
              <div className="text-lg text-orange-700 mb-1">2h ago</div>
              <div className="text-gray-600 text-sm">Updated</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Assessment Options */}
      <div className="px-6 pb-32">
        <div className="space-y-4">
          {/* Seasonal Tick Risk Map */}
          <Card 
            className="border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNavigate('seasonal-risk-map')}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-2">Seasonal Tick Risk Map</h3>
                  <p className="text-gray-600 text-sm">View current tick activity levels across different regions</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Card>

          {/* Animal Presence */}
          <Card 
            className="border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNavigate('animal-presence')}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-2">Animal Presence</h3>
                  <p className="text-gray-600 text-sm">Monitor animal presence that may carry ticks in your area</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Card>

          {/* Vegetation Density Risk Levels */}
          <Card 
            className="border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNavigate('vegetation-density')}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-2">Vegetation Density Risk Levels</h3>
                  <p className="text-gray-600 text-sm">Assess risk based on vegetation density and habitat types</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}