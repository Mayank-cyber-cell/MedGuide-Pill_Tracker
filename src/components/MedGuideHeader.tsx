const MedGuideHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-medical-primary via-blue-500 to-teal-500 text-white py-12 px-4 text-center shadow-2xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <span className="text-5xl">💊</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            MedGuide
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-blue-100 font-medium mb-2">Your Personal Medicine Helper</p>
        <p className="text-blue-200/80 max-w-2xl mx-auto text-lg">
          Track medications, get safety insights, and stay informed with FDA data
        </p>
      </div>
    </header>
  );
};

export default MedGuideHeader;