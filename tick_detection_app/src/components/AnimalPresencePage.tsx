import { Card } from "./ui/card";

interface AnimalPresencePageProps {
  onNavigate: (page: string) => void;
}

export function AnimalPresencePage({ onNavigate }: AnimalPresencePageProps) {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 py-6 space-y-6">
        {/* Current Alert for Victoria */}
        <Card className="p-6 border border-yellow-200 bg-yellow-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg text-yellow-800 mb-1">Increased Wildlife Activity</h3>
              <p className="text-yellow-700 text-sm">Wombats and echidnas spotted frequently in Victorian bushland</p>
            </div>
          </div>
        </Card>

        {/* High-Risk Animals in Victoria */}
        <div className="space-y-4">
          <h3 className="text-lg text-gray-900">High-Risk Tick Carriers in Victoria</h3>
          
          <Card className="border border-gray-200 bg-white">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-gray-900 mb-1">Wombats</h4>
                  <p className="text-gray-600 text-sm">Primary tick carriers in Victorian bushland</p>
                </div>
                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Very High</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-700 text-sm mb-2">Common in Victoria:</p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Grampians National Park</li>
                  <li>• Wilson's Promontory</li>
                  <li>• Dandenong Ranges</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-gray-900 mb-1">Echidnas</h4>
                  <p className="text-gray-600 text-sm">Native tick carriers in Victorian forests</p>
                </div>
                <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">High</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-700 text-sm mb-2">Active Areas:</p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• You Yangs Regional Park</li>
                  <li>• Brisbane Ranges National Park</li>
                  <li>• Kinglake National Park</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-gray-900 mb-1">Kangaroos</h4>
                  <p className="text-gray-600 text-sm">Common carriers in rural Victoria</p>
                </div>
                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Medium</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-700 text-sm mb-2">Hotspots:</p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Gippsland region</li>
                  <li>• Mallee district</li>
                  <li>• Western Victoria grasslands</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Timeline for Victoria */}
        <div className="space-y-4 pb-32">
          <h3 className="text-lg text-gray-900">Recent Activity in Victoria</h3>
          
          <div className="space-y-3">
            <Card className="p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1">Wombat burrow activity</h4>
                  <p className="text-gray-600 text-sm">Dandenong Ranges, 2km from location</p>
                </div>
                <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">3h ago</span>
              </div>
            </Card>
            
            <Card className="p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1">Echidna tracks</h4>
                  <p className="text-gray-600 text-sm">Brisbane Ranges, walking trail</p>
                </div>
                <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">1d ago</span>
              </div>
            </Card>
            
            <Card className="p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1">Kangaroo grazing</h4>
                  <p className="text-gray-600 text-sm">Reported in Gippsland area</p>
                </div>
                <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">2d ago</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}