import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Activity, 
  RefreshCw, 
  Layers, 
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'New Recommendation',
      description: 'Get AI-driven packaging recommendations for new food products.',
      icon: <PlusCircle className="h-8 w-8 text-brand-600" />,
      path: '/app/recommend',
      color: 'bg-brand-50',
    },
    {
      title: 'Diagnose Packaging',
      description: 'Identify issues with existing packaging and find solutions.',
      icon: <Activity className="h-8 w-8 text-rose-600" />,
      path: '/app/diagnose',
      color: 'bg-rose-50',
    },
    {
      title: 'Redesign Packaging',
      description: 'Optimize current packaging for cost or sustainability.',
      icon: <RefreshCw className="h-8 w-8 text-emerald-600" />,
      path: '/app/redesign',
      color: 'bg-emerald-50',
    },
    {
      title: 'Compare Materials',
      description: 'Analyze different packaging materials side by side.',
      icon: <Layers className="h-8 w-8 text-indigo-600" />,
      path: '/app/compare',
      color: 'bg-indigo-50',
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to PackSense</h1>
        <p className="mt-2 text-slate-600">Intelligent Food Packaging Recommendation System</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            onClick={() => navigate(feature.path)}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-slate-600 mb-4">{feature.description}</p>
            <div className="flex items-center text-sm font-semibold text-brand-600">
              Get Started <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
