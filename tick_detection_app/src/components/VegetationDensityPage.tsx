import { Card } from "./ui/card";

interface VegetationDensityPageProps {
  onNavigate: (page: string) => void;
}

export function VegetationDensityPage({ onNavigate }: VegetationDensityPageProps) {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 py-6 space-y-6">
        {/* Current Area Assessment for Victoria */}
        <Card className="p-6 border border-green-200 bg-green-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl text-green-800 mb-2">Melbourne Suburban Forest</h3>
            <p className="text-green-700 mb-4">Your Current Location - Victoria</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-200 text-green-800 text-sm">
              Moderate Risk Zone
            </div>
          </div>
        </Card>

        {/* Victoria Vegetation Risk Categories */}
        <div className="space-y-4">
          <h3 className="text-lg text-gray-900">Risk by Victorian Vegetation Types</h3>
          
          <Card className="border border-red-200 bg-red-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-red-800 mb-1">Dense Eucalyptus Forest</h4>
                  <p className="text-red-700 text-sm">Mountain Ash, Red Gum forests with thick undergrowth</p>
                </div>
                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Very High</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-700">Tick Survival Rate</span>
                  <span className="text-red-800">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-700">Common Areas</span>
                  <span className="text-red-800 text-right">Otway Ranges, Grampians</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-orange-200 bg-orange-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-orange-800 mb-1">Coastal Scrubland</h4>
                  <p className="text-orange-700 text-sm">Tea tree, banksia, coastal heath vegetation</p>
                </div>
                <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">High</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-orange-700">Tick Survival Rate</span>
                  <span className="text-orange-800">80%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-700">Common Areas</span>
                  <span className="text-orange-800 text-right">Phillip Island, Mornington Peninsula</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-yellow-200 bg-yellow-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-yellow-800 mb-1">Suburban Parkland</h4>
                  <p className="text-yellow-700 text-sm">Mixed native and exotic trees, managed undergrowth</p>
                </div>
                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Moderate</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-700">Tick Survival Rate</span>
                  <span className="text-yellow-800">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-700">Common Areas</span>
                  <span className="text-yellow-800 text-right">Royal Botanic Gardens, Albert Park</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-green-200 bg-green-50">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg text-green-800 mb-1">Open Grassland</h4>
                  <p className="text-green-700 text-sm">Regularly maintained grass areas, minimal shelter</p>
                </div>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full whitespace-nowrap flex-shrink-0">Low</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Tick Survival Rate</span>
                  <span className="text-green-800">15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Common Areas</span>
                  <span className="text-green-800 text-right">Melbourne Cricket Ground, Flemington</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Mitigation for Victorian Conditions */}
        <div className="space-y-4 pb-32">
          <h3 className="text-lg text-gray-900">Victorian Risk Reduction Tips</h3>
          
          <Card className="border border-blue-200 bg-blue-50">
            <div className="p-4">
              <h4 className="text-lg text-blue-800 mb-3">For Victorian Properties</h4>
              <ul className="text-blue-700 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span>Remove blackberry and lantana infestations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span>Maintain clear zones around houses (3m minimum)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span>Regular slashing of long grass before tick season</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span>Plant native tick-resistant species like bottlebrush</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}