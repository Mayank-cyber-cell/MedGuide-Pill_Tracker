const MedGuideHeader = () => {
  return (
    <header className="bg-medical-primary text-white py-6 px-4 text-center shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          <span className="text-4xl">💊</span>
          MedGuide
        </h1>
        <p className="text-medical-light mt-2 text-lg">Your Personal Medicine Helper</p>
      </div>
    </header>
  );
};

export default MedGuideHeader;