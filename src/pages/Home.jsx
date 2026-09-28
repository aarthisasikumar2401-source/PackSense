import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight, ShieldCheck, Zap, Leaf } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 text-brand-600">
              <Package className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-slate-900">PackSense</span>
            </div>
            <button 
              onClick={() => navigate('/app')}
              className="bg-brand-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Intelligent Food Packaging <br />
            <span className="text-brand-600">Recommendation System</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Discover the optimal packaging materials for your food products based on scientific parameters, 
            sustainability goals, and cost priorities—instantly and accurately.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/app')}
              className="flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/30"
            >
              Open Application <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How PackSense Works</h2>
            <p className="mt-4 text-lg text-slate-600">Advanced analysis simplified into three easy steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-brand-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Enter Parameters</h3>
              <p className="text-slate-600">Input your food product details, required shelf life, and storage conditions.</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Smart Analysis</h3>
              <p className="text-slate-600">Our engine analyzes barrier requirements, matching them against material properties.</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Get Recommendations</h3>
              <p className="text-slate-600">Receive ranked material suggestions optimized for cost, performance, and sustainability.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="flex items-center justify-center gap-2 text-white mb-4">
          <Package className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">PackSense</span>
        </div>
        <p>PackSense — Intelligent Food Packaging Recommendation System</p>
      </footer>
    </div>
  );
};

export default Home;
