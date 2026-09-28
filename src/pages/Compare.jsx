import React, { useState } from 'react';
import { materials } from '../data/materials';
import { Layers, X } from 'lucide-react';

const Compare = () => {
  const [selectedIds, setSelectedIds] = useState(['mat_1', 'mat_3']);

  const toggleMaterial = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedMaterials = materials.filter(m => selectedIds.includes(m.id));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Compare Materials</h1>
        <p className="mt-2 text-slate-600">Select up to 3 materials to compare their properties side-by-side.</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {materials.map(mat => (
          <button
            key={mat.id}
            onClick={() => toggleMaterial(mat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedIds.includes(mat.id) 
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
            }`}
          >
            {mat.name}
          </button>
        ))}
      </div>

      {selectedMaterials.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50 font-semibold text-slate-500 w-1/4">Property</th>
                {selectedMaterials.map(mat => (
                  <th key={mat.id} className="p-4 border-b border-l border-slate-200 bg-slate-50 w-1/4 relative">
                    <div className="font-bold text-slate-900 text-lg">{mat.name}</div>
                    <button 
                      onClick={() => toggleMaterial(mat.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-500"
                    >
                      <X size={16} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Oxygen Barrier (OTR)</td>
                {selectedMaterials.map(mat => <td key={mat.id} className="p-4 border-b border-l border-slate-100">{mat.otr}</td>)}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Moisture Barrier (WVTR)</td>
                {selectedMaterials.map(mat => <td key={mat.id} className="p-4 border-b border-l border-slate-100">{mat.wvtr}</td>)}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Relative Cost</td>
                {selectedMaterials.map(mat => (
                  <td key={mat.id} className="p-4 border-b border-l border-slate-100">
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${mat.costLevel * 10}%` }}></div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Sustainability</td>
                {selectedMaterials.map(mat => (
                  <td key={mat.id} className="p-4 border-b border-l border-slate-100">
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${mat.sustainabilityLevel * 10}%` }}></div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Sealability</td>
                {selectedMaterials.map(mat => <td key={mat.id} className="p-4 border-b border-l border-slate-100">{mat.sealability}/10</td>)}
              </tr>
              <tr>
                <td className="p-4 border-slate-100 font-medium text-slate-700">Typical Applications</td>
                {selectedMaterials.map(mat => (
                  <td key={mat.id} className="p-4 border-l border-slate-100">
                    <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                      {mat.typicalApplications.map((app, i) => <li key={i}>{app}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          <Layers size={48} className="mx-auto mb-4 text-slate-300" />
          <p>Select materials above to compare.</p>
        </div>
      )}
    </div>
  );
};

export default Compare;
