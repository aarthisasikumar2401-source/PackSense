import React, { useState } from 'react';
import { RefreshCw, ArrowRight, TrendingDown, Leaf, DollarSign } from 'lucide-react';
import { saveHistory } from '../services/historyService';

const Redesign = () => {
  const [formData, setFormData] = useState({
    currentMaterial: 'PET/PE Laminate',
    goal: 'sustainability'
  });
  const [result, setResult] = useState(null);

  const handleRedesign = (e) => {
    e.preventDefault();
    
    let redesignData = {};

    if (formData.goal === 'sustainability') {
      redesignData = {
        newStructure: 'Mono-material PE (MDO-PE / PE)',
        improvements: ['Fully recyclable in PE streams', 'Eliminates mixed-material waste'],
        costImpact: 'Slightly Higher (+5%)',
        sustainabilityImpact: 'Excellent (Readily Recyclable)',
        barrierTradeoff: 'Slight reduction in OTR compared to PET'
      };
    } else {
      redesignData = {
        newStructure: 'Downgauged BOPP / MetBOPP',
        improvements: ['20% reduction in material weight', 'Lower logistics cost'],
        costImpact: 'Lower (-15%)',
        sustainabilityImpact: 'Better (Less source material used)',
        barrierTradeoff: 'Maintained through advanced metallization'
      };
    }

    const recResult = {
      id: Date.now().toString(),
      type: 'redesign',
      timestamp: new Date().toISOString(),
      formData,
      redesignData
    };

    saveHistory(recResult);
    setResult(recResult);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Redesign Packaging</h1>
        <p className="mt-2 text-slate-600">Optimize your existing structures for cost or sustainability.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleRedesign} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Structure</label>
            <input 
              type="text" 
              name="currentMaterial"
              value={formData.currentMaterial}
              onChange={(e) => setFormData({...formData, currentMaterial: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500" 
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Goal</label>
            <select 
              name="goal"
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="sustainability">Improve Sustainability / Recyclability</option>
              <option value="cost">Reduce Cost / Downgauge</option>
            </select>
          </div>
          <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <RefreshCw size={18} /> Generate
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left flex-1">
              <div className="text-sm font-semibold text-slate-500 mb-1">Current</div>
              <div className="text-xl font-bold text-slate-400 line-through">{formData.currentMaterial}</div>
            </div>
            <div className="bg-slate-100 p-3 rounded-full text-slate-400">
              <ArrowRight size={24} />
            </div>
            <div className="text-center md:text-right flex-1">
              <div className="text-sm font-semibold text-emerald-600 mb-1">Proposed Redesign</div>
              <div className="text-2xl font-bold text-slate-900">{result.redesignData.newStructure}</div>
            </div>
          </div>
          
          <div className="p-8 grid md:grid-cols-2 gap-8 bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Key Improvements</h4>
              <ul className="space-y-3">
                {result.redesignData.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle size={18} className="text-emerald-500 mt-0.5" /> {imp}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                <DollarSign className="text-amber-500" size={24} />
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Cost Impact</div>
                  <div className="font-medium text-slate-900">{result.redesignData.costImpact}</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                <Leaf className="text-emerald-500" size={24} />
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Sustainability Impact</div>
                  <div className="font-medium text-slate-900">{result.redesignData.sustainabilityImpact}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Redesign;
