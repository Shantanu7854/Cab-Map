"use client";

export default function AnimatedBackground() {
  return (
    <>
      {/* Fixed background container */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        
        {/* Animated map grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4f46e5" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating location pins */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 animate-bounce delay-100">
            <div className="w-6 h-6 bg-red-500 rounded-full relative">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-red-500"></div>
            </div>
          </div>
          
          <div className="absolute top-40 right-20 animate-bounce delay-300">
            <div className="w-6 h-6 bg-yellow-500 rounded-full relative">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-yellow-500"></div>
            </div>
          </div>
          
          <div className="absolute bottom-32 left-1/4 animate-bounce delay-500">
            <div className="w-6 h-6 bg-green-500 rounded-full relative">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-green-500"></div>
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/3 animate-bounce delay-700">
            <div className="w-6 h-6 bg-blue-500 rounded-full relative">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-blue-500"></div>
            </div>
          </div>
        </div>
        
        {/* Animated road paths */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,100 Q200,50 400,100 T800,100" 
              stroke="#6366f1" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="10,5"
              className="animate-dash"
            />
            <path 
              d="M100,200 Q300,150 500,200 T900,200" 
              stroke="#8b5cf6" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="10,5"
              className="animate-dash-slow"
            />
            <path 
              d="M50,300 Q250,250 450,300 T850,300" 
              stroke="#06b6d4" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="10,5"
              className="animate-dash-slower"
            />
          </svg>
        </div>
        
        {/* Floating cab icons */}
        <div className="absolute inset-0">
          <div className="absolute top-24 left-1/4 animate-pulse">
            <div className="text-yellow-600 text-2xl transform rotate-12">🚕</div>
          </div>
          <div className="absolute bottom-40 right-1/4 animate-pulse delay-1000">
            <div className="text-yellow-600 text-2xl transform -rotate-12">🚖</div>
          </div>
          <div className="absolute top-1/2 left-1/6 animate-pulse delay-500">
            <div className="text-blue-600 text-2xl">🚙</div>
          </div>
        </div>
        
        {/* Subtle floating circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200 rounded-full opacity-15 animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/5 w-24 h-24 bg-indigo-200 rounded-full opacity-25 animate-float-slow"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes dashMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -15; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1s;
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite 2s;
        }
        
        .animate-dash {
          animation: dashMove 2s linear infinite;
        }
        
        .animate-dash-slow {
          animation: dashMove 2.5s linear infinite;
        }
        
        .animate-dash-slower {
          animation: dashMove 3s linear infinite;
        }
      `}</style>
    </>
  );
}