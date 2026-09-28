import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Layers, Droplets, Wind, Leaf, DollarSign, ArrowLeft, ThumbsUp } from 'lucide-react';

const RecommendationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.result) {
    return <Navigate to="/app/recommend" replace />;
  }

  const { result } = location.state;
  const { recommendedMaterial, alternatives, formData } = result;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Recommendation Result</h1>
          <p className="mt-2 text-slate-600">Analysis complete for: <strong className="text-slate-900">{formData.foodName}</strong></p>
        </div>
        <button 
          onClick={() => navigate('/app/recommend')}
          className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
        >
          <ArrowLeft size={16} /> New Analysis
        </button>
      </div>

      <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Layers size={120} className="text-brand-600" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-brand-600 font-semibold mb-2">
              <CheckCircle size={20} /> Primary Recommendation
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{recommendedMaterial.name}</h2>
            <p className="text-lg text-slate-700 mb-6">{recommendedMaterial.description}</p>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/40 mb-6">
              <h3 className="font-semibold text-slate-900 mb-2">Why this material?</h3>
              <p className="text-slate-700">{result.explanation}</p>
            </div>
            
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Layers size={18} className="text-brand-500" /> 
              Recommended Structure: <span className="text-slate-900 font-bold bg-white px-3 py-1 rounded-md shadow-sm ml-2">{result.recommendedStructure}</span>
            </div>
          </div>
          
          <div className="w-full md:w-64 bg-white rounded-xl p-6 shadow-sm border border-brand-100 flex flex-col items-center justify-center text-center">
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Suitability Score</div>
            <div className="text-6xl font-black text-brand-600 mb-2">{result.suitabilityScore}</div>
            <div className="text-sm text-slate-400">out of 100</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle size={24} className="text-emerald-500" /> Material Properties
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3 text-slate-700">
                <Wind size={20} className="text-blue-500" /> Oxygen Transmission (OTR)
              </div>
              <span className="font-semibold text-slate-900">{recommendedMaterial.otr}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3 text-slate-700">
                <Droplets size={20} className="text-cyan-500" /> Moisture Vapour (WVTR)
              </div>
              <span className="font-semibold text-slate-900">{recommendedMaterial.wvtr}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3 text-slate-700">
                <DollarSign size={20} className="text-amber-500" /> Relative Cost Level
              </div>
              <div className="flex">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`h-2 w-4 mx-0.5 rounded-sm ${i < recommendedMaterial.costLevel ? 'bg-amber-400' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3 text-slate-700">
                <Leaf size={20} className="text-emerald-500" /> Sustainability Level
              </div>
              <div className="flex">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`h-2 w-4 mx-0.5 rounded-sm ${i < recommendedMaterial.sustainabilityLevel ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ThumbsUp size={20} className="text-emerald-500" /> Key Advantages
            </h3>
            <ul className="space-y-2">
              {recommendedMaterial.advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" /> {adv}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-500" /> Limitations
            </h3>
            <ul className="space-y-2">
              {recommendedMaterial.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" /> {lim}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {alternatives.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Alternative Materials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {alternatives.map((alt, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-slate-900">{alt.name}</h4>
                  <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">Score: {Math.round(alt.score)}</div>
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{alt.description}</p>
                <button 
                  className="text-brand-600 text-sm font-semibold hover:text-brand-700 transition-colors"
                  onClick={() => navigate('/app/compare')}
                >
                  Compare Materials &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationResult;
