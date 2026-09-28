import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { saveHistory } from '../services/historyService';

const Diagnose = () => {
  const [formData, setFormData] = useState({
    currentMaterial: 'PE',
    problem: 'short_shelf_life',
    foodType: 'snacks'
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const diagnoseIssue = (e) => {
    e.preventDefault();
    
    // Simple deterministic diagnostic logic
    let diagnosis = {
      issue: 'Unknown',
      cause: 'Analysis incomplete',
      severity: 'Medium',
      suggestion: 'Consult a packaging engineer'
    };

    if (formData.problem === 'moisture_ingress') {
      diagnosis = {
        issue: 'Moisture Ingress',
        cause: `The current material (${formData.currentMaterial}) has an insufficient Water Vapor Transmission Rate (WVTR) for the product.`,
        severity: 'High',
        suggestion: 'Upgrade to a material with higher moisture barrier such as Metallized BOPP or a Foil Laminate.'
      };
    } else if (formData.problem === 'short_shelf_life') {
      diagnosis = {
        issue: 'Premature Spoilage / Oxidation',
        cause: `Oxygen Transmission Rate (OTR) of ${formData.currentMaterial} is too high for ${formData.foodType}, leading to oxidation.`,
        severity: 'High',
        suggestion: 'Incorporate an oxygen barrier layer like EVOH, PET, or change to a metallized film.'
      };
    } else if (formData.problem === 'poor_sealing') {
      diagnosis = {
        issue: 'Seal Integrity Failure',
        cause: 'Inadequate heat seal temperature, dwell time, or sealant layer incompatible with machine settings.',
        severity: 'Critical',
        suggestion: 'Ensure a dedicated LLDPE or PE sealant layer is present. Check machine calibration.'
      };
    } else if (formData.problem === 'physical_damage') {
      diagnosis = {
        issue: 'Mechanical Failure (Puncture/Tear)',
        cause: `${formData.currentMaterial} lacks the tensile strength or puncture resistance for the supply chain stresses.`,
        severity: 'Medium',
        suggestion: 'Increase material thickness or laminate with a strong outer layer like BOPA (Nylon) or PET.'
      };
    }

    const diagResult = {
      id: Date.now().toString(),
      type: 'diagnosis',
      timestamp: new Date().toISOString(),
      formData,
      diagnosis
    };

    saveHistory(diagResult);
    setResult(diagResult);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Diagnose Packaging Issue</h1>
        <p className="mt-2 text-slate-600">Identify the root cause of packaging failures and get actionable solutions.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={diagnoseIssue} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Material</label>
              <select name="currentMaterial" value={formData.currentMaterial} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-white">
                <option value="PE">Polyethylene (PE)</option>
                <option value="BOPP">BOPP</option>
                <option value="PET">PET</option>
                <option value="Paper">Paper</option>
                <option value="PLA">PLA (Compostable)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Food Category</label>
              <select name="foodType" value={formData.foodType} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-white">
                <option value="snacks">Snacks & Dry Foods</option>
                <option value="fresh">Fresh Produce</option>
                <option value="meat">Meat / Dairy</option>
                <option value="frozen">Frozen Foods</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Observed Problem</label>
              <select name="problem" value={formData.problem} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-white">
                <option value="short_shelf_life">Short Shelf Life / Staling</option>
                <option value="moisture_ingress">Moisture Ingress (Soggy)</option>
                <option value="poor_sealing">Leaking / Poor Sealing</option>
                <option value="physical_damage">Physical Damage / Tearing</option>
              </select>
            </div>
            <button type="submit" className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors mt-2">
              <Search size={18} /> Run Diagnostics
            </button>
          </form>
        </div>

        <div className="md:col-span-3">
          {result ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className={`p-6 text-white flex items-center gap-3 ${result.diagnosis.severity === 'Critical' ? 'bg-rose-600' : 'bg-amber-500'}`}>
                <AlertTriangle size={28} />
                <div>
                  <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Detected Issue</div>
                  <h2 className="text-2xl font-bold">{result.diagnosis.issue}</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Probable Cause</h3>
                  <p className="text-slate-800 text-lg bg-slate-50 p-4 rounded-lg border border-slate-100">{result.diagnosis.cause}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Recommended Solution</h3>
                  <div className="flex gap-3 items-start bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <CheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={20} />
                    <p className="text-emerald-900 font-medium">{result.diagnosis.suggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50/50">
              <Search size={48} className="mb-4 text-slate-300" />
              <p className="text-lg">Select parameters and run diagnostics to see the analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnose;
