import React, { useState } from 'react';
import { Search, ShieldCheck, Leaf, Calendar, Thermometer, MapPin, CheckCircle } from 'lucide-react';

const Traceability = () => {
  const [batchId, setBatchId] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!batchId) return;

    // Simulate finding a batch record
    setResult({
      batchId: batchId.toUpperCase(),
      product: 'Premium Organic Potatoes',
      packaging: 'PE Mesh / BOPP Laminate',
      manufactureDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toLocaleDateString(),
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toLocaleDateString(),
      origin: 'Farm Region A, Sector 4',
      status: 'Verified Fresh',
      carbonFootprint: '1.2 kg CO2e / kg',
      coldChainMaintained: true,
      recyclability: 'Category 4 (PE)'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Packaging Traceability</h1>
        <p className="mt-2 text-slate-600">Verify authenticity, origin, and sustainability metrics for your packaging batch.</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2 mb-12">
        <input 
          type="text" 
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Enter Batch ID (e.g. BT-9921)"
          className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 shadow-sm text-lg outline-none"
        />
        <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm">
          <Search size={20} /> Verify
        </button>
      </form>

      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-emerald-600 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck size={32} />
              <div>
                <h2 className="text-xl font-bold">Verified Authentic</h2>
                <div className="opacity-90">Batch: {result.batchId}</div>
              </div>
            </div>
            <div className="bg-emerald-800/40 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-500/30">
              {result.product}
            </div>
          </div>
          
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2 mb-2">
                  <MapPin size={16} /> Origin
                </div>
                <div className="text-lg font-medium text-slate-900 bg-slate-50 p-3 rounded-lg">{result.origin}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2 mb-2">
                    <Calendar size={16} /> Packed On
                  </div>
                  <div className="font-medium text-slate-900">{result.manufactureDate}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-amber-500" /> Best Before
                  </div>
                  <div className="font-medium text-slate-900">{result.expiryDate}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Thermometer className="text-blue-500" size={20} />
                  <span className="font-semibold text-slate-700">Cold Chain Status</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle size={18} /> Maintained continuously below 4°C
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="text-emerald-500" size={20} />
                  <span className="font-semibold text-slate-700">Sustainability Profile</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Material:</span>
                    <span className="font-medium">{result.packaging}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Carbon:</span>
                    <span className="font-medium">{result.carbonFootprint}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Recyclability:</span>
                    <span className="font-medium">{result.recyclability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Traceability;
