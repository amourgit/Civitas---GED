"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ArrowLeft,
  Sparkles,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  avatar: string;
  status: 'Disponible' | 'En réunion' | 'En déplacement' | 'En congé';
}

const EMPLOYEES: Employee[] = [
  {
    id: 'emp1',
    name: 'Amour Samuel NZILA NGALA',
    role: 'Chef de Département & Administrateur Principal',
    department: 'Direction des Systèmes d’Information & GED',
    email: 'samuel.nzila@egen.cd',
    phone: '+243 81 000 0001',
    office: 'Bâtiment Principal • Bureau 402',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Disponible',
  },
  {
    id: 'emp2',
    name: 'Sarah MUKENDI',
    role: 'Responsable Archivistique & Conservation Légale',
    department: 'Gestion Documentaire & Conformité',
    email: 'sarah.mukendi@egen.cd',
    phone: '+243 81 000 0002',
    office: 'Salle des Archives S-01 • Bureau 101',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Disponible',
  },
  {
    id: 'emp3',
    name: 'Christian KALONJI',
    role: 'Ingénieur Cloud & Sécurité des Données',
    department: 'Infrastructure & DevOps',
    email: 'christian.kalonji@egen.cd',
    phone: '+243 81 000 0003',
    office: 'Bâtiment Technique • Lab 2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'En réunion',
  },
  {
    id: 'emp4',
    name: 'Grace MBAYA',
    role: 'Directrice des Ressources Humaines',
    department: 'Ressources Humaines & Talents',
    email: 'grace.mbaya@egen.cd',
    phone: '+243 81 000 0004',
    office: 'Bâtiment Principal • Bureau 305',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'Disponible',
  },
  {
    id: 'emp5',
    name: 'Patrick ILUNGA',
    role: 'Contrôleur de Gestion & Audit Interne',
    department: 'Direction Financière',
    email: 'patrick.ilunga@egen.cd',
    phone: '+243 81 000 0005',
    office: 'Bâtiment Principal • Bureau 204',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'En déplacement',
  },
  {
    id: 'emp6',
    name: 'Nathalie TSHITENGE',
    role: 'Responsable Communication Institutionnelle',
    department: 'Communication & Relations Publiques',
    email: 'nathalie.tshitenge@egen.cd',
    phone: '+243 81 000 0006',
    office: 'Bâtiment Principal • Bureau 310',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'Disponible',
  }
];

export function AnnuairePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Tous');

  const filtered = EMPLOYEES.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'Tous' || e.department.includes(departmentFilter);
    return matchSearch && matchDept;
  });

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070e17] text-white flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playXboxSound('back');
              navigate('/');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Retour à l'accueil Intranet"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400">
              <Users className="w-4 h-4" />
              <span>APPLICATION INTRANET : ANNUAIRE & COLLABORATEURS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Trombinoscope & Coordonnées
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un collaborateur, poste..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-purple-400 w-64 sm:w-80"
            />
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((emp) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-black/45 border border-white/10 hover:border-purple-500/40 transition-all backdrop-blur-xl flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img 
                      src={emp.avatar} 
                      alt={emp.name} 
                      className="w-13 h-13 rounded-2xl object-cover border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                    <span 
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#070e17] ${
                        emp.status === 'Disponible' ? 'bg-emerald-500' :
                        emp.status === 'En réunion' ? 'bg-amber-500' : 'bg-slate-400'
                      }`} 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                      {emp.name}
                    </h3>
                    <p className="text-purple-400 text-xs font-medium">
                      {emp.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.office}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <a 
                href={`mailto:${emp.email}`}
                className="flex-1 py-1.5 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Courriel</span>
              </a>
              <a 
                href={`tel:${emp.phone}`}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
