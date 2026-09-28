import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../services/historyService';
import { Trash2, Package, Activity, RefreshCw } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const getIcon = (type) => {
    if (type === 'recommendation') return <Package className="text-brand-600" size={20} />;
    if (type === 'diagnosis') return <Activity className="text-rose-600" size={20} />;
    if (type === 'redesign') return <RefreshCw className="text-emerald-600" size={20} />;
    return <Package size={20} />;
  };

  const getTitle = (item) => {
    if (item.type === 'recommendation') return `Recommendation: ${item.formData.foodName}`;
    if (item.type === 'diagnosis') return `Diagnosis: ${item.diagnosis.issue}`;
    if (item.type === 'redesign') return `Redesign: ${item.formData.currentMaterial}`;
    return 'Unknown Activity';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activity History</h1>
          <p className="mt-2 text-slate-600">Your recent packaging analyses and recommendations.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors border border-rose-200 bg-white"
          >
            <Trash2 size={18} /> Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
          <Package size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-lg">No history found.</p>
          <p className="text-sm mt-2">Run a new recommendation or diagnosis to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  item.type === 'recommendation' ? 'bg-brand-50' : 
                  item.type === 'diagnosis' ? 'bg-rose-50' : 'bg-emerald-50'
                }`}>
                  {getIcon(item.type)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{getTitle(item)}</h3>
                  <p className="text-sm text-slate-500">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md uppercase tracking-wide">
                {item.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
