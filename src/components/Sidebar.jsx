import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  Activity, 
  RefreshCw, 
  Layers, 
  History, 
  ShieldCheck, 
  MessageSquare,
  Package
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/app', icon: <Home size={20} />, exact: true },
    { name: 'New Recommendation', path: '/app/recommend', icon: <PlusCircle size={20} /> },
    { name: 'Diagnose Packaging', path: '/app/diagnose', icon: <Activity size={20} /> },
    { name: 'Redesign Packaging', path: '/app/redesign', icon: <RefreshCw size={20} /> },
    { name: 'Compare Materials', path: '/app/compare', icon: <Layers size={20} /> },
    { name: 'History', path: '/app/history', icon: <History size={20} /> },
    { name: 'Traceability', path: '/app/traceability', icon: <ShieldCheck size={20} /> },
    { name: 'PackSense Chat', path: '/app/chat', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 text-brand-600">
          <Package className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-slate-900">PackSense</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-brand-50 text-brand-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
        PackSense — Intelligent Food Packaging
      </div>
    </div>
  );
};

export default Sidebar;
