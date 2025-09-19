import { Button } from "./ui/button";
import backgroundImage from 'figma:asset/354a8a77ee0981d256f12218e82a530b22ac5f65.png';

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

export function WelcomePage({ onNavigate }: WelcomePageProps) {
  return (
    <div className="h-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top section with branding */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 text-center">
          {/* App Name */}
          <h1 className="text-4xl text-black font-extrabold font-mono mb-6 drop-shadow-lg">
            TickSafe Victoria
          </h1>
        </div>

        {/* Bottom section with button - positioned at absolute bottom */}
        <div className="pb-12 px-8 text-center">
          {/* Footer */}
          <p className="text-xs text-black font-mono mb-6 drop-shadow">
            Designed for Victoria, Australia
          </p>

          {/* Enter Button */}
          <Button 
            className="w-36 h-11 bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg mx-auto text-sm"
            onClick={() => onNavigate('identification')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}