import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRecommendation } from '../services/recommendationService';
import { ArrowRight, Info } from 'lucide-react';

const NewRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: '',
    category: 'snacks',
    oxygenSensitivity: 'medium',
    moistureSensitivity: 'medium',
    shelfLife: '180',
    shelfLifeUnit: 'days',
    storageCondition: 'ambient',
    costPriority: 'medium',
    sustainabilityPriority: 'medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foodName) return;
    const result = generateRecommendation(formData);
    navigate('/app/result', { state: { result } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">New Recommendation</h1>
        <p className="mt-2 text-slate-600">Enter product parameters to generate packaging recommendations.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Food Information */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">Food Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Food / Product Name</label>
              <input 
                type="text" 
                name="foodName"
                required
                value={formData.foodName}
                onChange={handleChange}
                placeholder="e.g., Potato Chips"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Food Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
              >
                <option value="snacks">Snacks & Confectionery</option>
                <option value="fresh">Fresh Produce</option>
                <option value="meat">Meat & Poultry</option>
                <option value="dairy">Dairy Products</option>
                <option value="beverage">Beverages</option>
                <option value="bakery">Bakery</option>
                <option value="frozen">Frozen Food</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Oxygen Sensitivity</label>
              <select name="oxygenSensitivity" value={formData.oxygenSensitivity} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Moisture Sensitivity</label>
              <select name="moistureSensitivity" value={formData.moistureSensitivity} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </section>

        {/* Storage & Shelf Life */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">Storage & Shelf Life</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Storage Condition</label>
              <select name="storageCondition" value={formData.storageCondition} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                <option value="ambient">Ambient (Room Temperature)</option>
                <option value="refrigerated">Refrigerated</option>
                <option value="frozen">Frozen</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Required Shelf Life</label>
                <input type="number" name="shelfLife" value={formData.shelfLife} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                <select name="shelfLifeUnit" value={formData.shelfLifeUnit} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Priorities */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">Project Priorities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cost Priority</label>
              <select name="costPriority" value={formData.costPriority} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                <option value="low">Low (Premium packaging allowed)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Must be cost-effective)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sustainability Priority</label>
              <select name="sustainabilityPriority" value={formData.sustainabilityPriority} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High (Recyclable/Compostable preferred)</option>
              </select>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors shadow-md"
          >
            Generate Recommendation <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRecommendation;
