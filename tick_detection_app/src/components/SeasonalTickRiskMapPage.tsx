import { Card } from "./ui/card";

interface SeasonalTickRiskMapPageProps {
  onNavigate: (page: string) => void;
}

export function SeasonalTickRiskMapPage({ onNavigate }: SeasonalTickRiskMapPageProps) {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 py-6 space-y-6">
        {/* Current Season Status */}
        <Card className="p-6 border border-orange-200 bg-orange-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl text-orange-800 mb-2">Spring Peak Season</h3>
            <p className="text-orange-700 mb-4">October - December</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-200 text-orange-800 text-sm">
              High Activity Period
            </div>
          </div>
        </Card>

        {/* Victoria Regional Risk Levels */}
        <div className="space-y-4">
          <h3 className="text-lg text-gray-900">Victoria Regional Risk Levels</h3>
          
          <Card className="border border-red-200 bg-red-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-red-800 mb-1">Coastal Areas</h4>
                  <p className="text-red-700 text-sm">Gippsland, Mornington Peninsula, Great Ocean Road</p>
                </div>
                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Very High</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-700">Paralysis Tick</span>
                  <span className="text-red-800">Peak Activity</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-700">Bush Tick</span>
                  <span className="text-red-800">High Activity</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-orange-200 bg-orange-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-orange-800 mb-1">Metropolitan Melbourne</h4>
                  <p className="text-orange-700 text-sm">Outer suburbs, Dandenong Ranges, Yarra Valley</p>
                </div>
                <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Moderate</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-orange-700">Brown Dog Tick</span>
                  <span className="text-orange-800">Moderate Activity</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-700">Bush Tick</span>
                  <span className="text-orange-800">Low-Moderate Activity</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-yellow-200 bg-yellow-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-yellow-800 mb-1">Central Victoria</h4>
                  <p className="text-yellow-700 text-sm">Bendigo, Ballarat, Macedon Ranges</p>
                </div>
                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Low-Moderate</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-700">Brown Dog Tick</span>
                  <span className="text-yellow-800">Low Activity</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-green-200 bg-green-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-green-800 mb-1">Western Victoria</h4>
                  <p className="text-green-700 text-sm">Grampians, Western Plains, Mallee</p>
                </div>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Low</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Cattle Tick</span>
                  <span className="text-green-800">Minimal Activity</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly Forecast for Victoria */}
        <div className="space-y-4 pb-32">
          <h3 className="text-lg text-gray-900">Victoria 3-Month Forecast</h3>
          
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center border border-orange-200 bg-orange-50">
              <h4 className="text-lg text-orange-800 mb-2">Oct</h4>
              <div className="w-8 h-8 bg-orange-200 rounded-full mx-auto mb-2"></div>
              <p className="text-orange-700 text-sm">Peak</p>
            </Card>
            
            <Card className="p-4 text-center border border-red-200 bg-red-50">
              <h4 className="text-lg text-red-800 mb-2">Nov</h4>
              <div className="w-8 h-8 bg-red-200 rounded-full mx-auto mb-2"></div>
              <p className="text-red-700 text-sm">Very High</p>
            </Card>
            
            <Card className="p-4 text-center border border-orange-200 bg-orange-50">
              <h4 className="text-lg text-orange-800 mb-2">Dec</h4>
              <div className="w-8 h-8 bg-orange-200 rounded-full mx-auto mb-2"></div>
              <p className="text-orange-700 text-sm">High</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}