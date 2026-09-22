"use client";

import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Check, 
  Eye, 
  Users, 
  ChevronDown, 
  Building2, 
  FileText, 
  Layers, 
  X,
  Mail,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

export type Contributor = {
  name: string;
  email: string;
  avatar: string;
  role: string;
  status?: string;
};

export type GroupTeam = {
  id: string;
  title: string;
  code: string;
  service: string;
  status: "Actif" | "Inactif" | "En cours";
  tech: string;
  dossiersCount: number;
  createdAt: string;
  members: Contributor[];
};

const defaultData: GroupTeam[] = [
  {
    id: "1",
    title: "Pôle GED & Archivage Numérique",
    code: "POL-GED-01",
    service: "Direction GED & Numérique",
    status: "Actif",
    tech: "Alfresco • OCR • Traçabilité",
    dossiersCount: 248,
    createdAt: "2024-01-15",
    members: [
      {
        name: "M. Jean-Luc BIKANGA",
        email: "j.bikanga@egen.cd",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        role: "Directeur DSI & Lead Systèmes",
        status: "En ligne",
      },
      {
        name: "Mme Marie-Claire MBUYI",
        email: "mc.mbuyi@egen.cd",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
        role: "Chef de Projet GED",
        status: "En réunion",
      },
      {
        name: "Ing. Samuel NZILA",
        email: "s.nzila@egen.cd",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        role: "Architecte GED & Microservices",
        status: "En ligne",
      },
    ],
  },
  {
    id: "2",
    title: "Unité Infrastructures & Datacenter",
    code: "UNI-INF-02",
    service: "DSI Central",
    status: "Actif",
    tech: "Docker • Kubernetes • Datacenter R-01",
    dossiersCount: 185,
    createdAt: "2024-02-10",
    members: [
      {
        name: "Ing. Serge KABEYA",
        email: "s.kabeya@egen.cd",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        role: "Admin Réseaux & Sécurité",
        status: "En ligne",
      },
      {
        name: "M. Joseph LUKUSA",
        email: "j.lukusa@egen.cd",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
        role: "Expert Cyber-Sécurité",
        status: "Occupé",
      },
      {
        name: "Mme Clarisse KANZA",
        email: "c.kanza@egen.cd",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
        role: "Ingénieur Cloud DevOps",
        status: "Disponible",
      },
    ],
  },
  {
    id: "3",
    title: "Cellule Numérisation & OCR Avancé",
    code: "CEL-NUM-03",
    service: "Gestion Documentaire",
    status: "En cours",
    tech: "Tesseract OCR • Scanners HD • PDF/A",
    dossiersCount: 320,
    createdAt: "2024-03-22",
    members: [
      {
        name: "Mme Patricia TSHILOMBA",
        email: "p.tshilomba@egen.cd",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        role: "Chef d'Unité Numérisation",
        status: "Disponible",
      },
      {
        name: "M. Alain MUKENDI",
        email: "a.mukendi@egen.cd",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
        role: "Superviseur Numérisation",
        status: "Occupé",
      },
    ],
  },
  {
    id: "4",
    title: "Pôle Support & Assistance Utilisateurs",
    code: "POL-SUP-04",
    service: "Assistance Informatique",
    status: "Actif",
    tech: "Helpdesk ITIL v4 • Ticketing",
    dossiersCount: 95,
    createdAt: "2024-04-05",
    members: [
      {
        name: "M. Marc KALALA",
        email: "m.kalala@egen.cd",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
        role: "Responsable Support N2/N3",
        status: "En ligne",
      },
      {
        name: "Mme Grace ILUNGA",
        email: "g.ilunga@egen.cd",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150",
        role: "Technicienne Helpdesk",
        status: "En ligne",
      },
    ],
  },
  {
    id: "5",
    title: "Cellule Dématérialisation RH & Paie",
    code: "CEL-RH-05",
    service: "Ressources Humaines",
    status: "Actif",
    tech: "SIRH • Signature Électronique PKI",
    dossiersCount: 410,
    createdAt: "2024-04-18",
    members: [
      {
        name: "Mme Chantal NGANDU",
        email: "c.ngandu@egen.cd",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150",
        role: "Gestionnaire SIRH",
        status: "Disponible",
      },
    ],
  },
  {
    id: "6",
    title: "Pôle Audit & Gouvernance des Données",
    code: "POL-AUD-06",
    service: "Secrétariat Général",
    status: "Actif",
    tech: "ISO 27001 • Conformité & PGD",
    dossiersCount: 112,
    createdAt: "2024-05-02",
    members: [
      {
        name: "M. Eric TSHIBANGU",
        email: "e.tshibangu@egen.cd",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150",
        role: "Auditeur Interne GED",
        status: "En réunion",
      },
      {
        name: "Mme Sandrine KABANGO",
        email: "s.kabango@egen.cd",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
        role: "DPO & Conformité RGPD",
        status: "En ligne",
      },
    ],
  },
  {
    id: "7",
    title: "Unité Développement & APIs Interministérielles",
    code: "UNI-DEV-07",
    service: "Applications Métier",
    status: "En cours",
    tech: "Node.js • React • REST API & GraphQL",
    dossiersCount: 78,
    createdAt: "2024-05-19",
    members: [
      {
        name: "M. Nathan BAMBA",
        email: "n.bamba@egen.cd",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
        role: "Lead Développeur Fullstack",
        status: "En ligne",
      },
      {
        name: "Mme Dorcas MPONGO",
        email: "d.mpongo@egen.cd",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150",
        role: "UI/UX Designer",
        status: "Disponible",
      },
    ],
  },
  {
    id: "8",
    title: "Cellule Sécurité IAM & Accréditations",
    code: "CEL-IAM-08",
    service: "Direction de la Sécurité",
    status: "Actif",
    tech: "OAuth2 • Keycloak • RBAC • SSO",
    dossiersCount: 160,
    createdAt: "2024-06-01",
    members: [
      {
        name: "M. Fabrice MUTEBA",
        email: "f.muteba@egen.cd",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150",
        role: "Admin IAM & Jetons",
        status: "En ligne",
      },
    ],
  },
];

const allColumns = [
  "Pôle / Groupe",
  "Code Réf.",
  "Direction / Service",
  "Domaine & Techno",
  "Créé Le",
  "Dossiers Traités",
  "Membres de l'Équipe",
  "Statut",
  "Actions",
] as const;

export function ServicesMembresTab() {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([...allColumns]);
  const [statusFilter, setStatusFilter] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [selectedGroupModal, setSelectedGroupModal] = useState<GroupTeam | null>(null);
  const [activeTooltipMember, setActiveTooltipMember] = useState<{
    member: Contributor;
    x: number;
    y: number;
  } | null>(null);

  const filteredData = defaultData.filter((group) => {
    const matchesStatus = !statusFilter || group.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTech = !techFilter || group.tech.toLowerCase().includes(techFilter.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.members.some((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesTech && matchesSearch;
  });

  const toggleColumn = (col: string) => {
    playXboxSound('select');
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="w-full space-y-5">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            <span>Groupes, Pôles & Équipes des Services</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Vue d'ensemble des structures organisationnelles, des membres affectés et de leurs expertises.
          </p>
        </div>

        <div className="text-xs text-teal-300 font-semibold px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/20 self-start sm:self-auto flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>{filteredData.length} Groupes répertoriés</span>
        </div>
      </div>

      {/* FILTER & COLUMN TOGGLE TOOLBAR */}
      <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* SEARCH & FILTERS */}
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
            {/* Main Search Input */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Rechercher groupe, code, membre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-teal-400/50 transition-colors"
              />
            </div>

            {/* Filter by Tech / Domaine */}
            <input
              type="text"
              placeholder="Filtrer par techno / domaine..."
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="w-40 sm:w-48 bg-slate-950/80 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-teal-400/50 transition-colors"
            />

            {/* Filter by Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950/80 text-white text-xs px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-teal-400/50 cursor-pointer"
            >
              <option value="">Tous les statuts</option>
              <option value="Actif">Actif</option>
              <option value="En cours">En cours</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>

          {/* COLUMNS DROPDOWN TOGGLE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                playXboxSound('select');
                setIsColumnDropdownOpen((prev) => !prev);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-white/15 text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
              <span>Colonnes ({visibleColumns.length})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu Box */}
            {isColumnDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsColumnDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1">
                    Affichage des colonnes
                  </div>
                  <div className="space-y-0.5">
                    {allColumns.map((col) => {
                      const isChecked = visibleColumns.includes(col);
                      return (
                        <button
                          key={col}
                          type="button"
                          onClick={() => toggleColumn(col)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            isChecked
                              ? 'bg-teal-500/15 text-teal-300 font-semibold'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          <span>{col}</span>
                          {isChecked && <Check className="w-3.5 h-3.5 text-teal-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDED TABLE VIEW */}
      <div className="w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            {/* TABLE HEADER */}
            <thead>
              <tr className="bg-slate-950/70 text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-white/10">
                {visibleColumns.includes("Pôle / Groupe") && (
                  <th className="py-3.5 px-4 min-w-[200px]">Pôle / Groupe</th>
                )}
                {visibleColumns.includes("Code Réf.") && (
                  <th className="py-3.5 px-4 min-w-[120px]">Code Réf.</th>
                )}
                {visibleColumns.includes("Direction / Service") && (
                  <th className="py-3.5 px-4 min-w-[160px]">Direction / Service</th>
                )}
                {visibleColumns.includes("Domaine & Techno") && (
                  <th className="py-3.5 px-4 min-w-[200px]">Domaine & Techno</th>
                )}
                {visibleColumns.includes("Créé Le") && (
                  <th className="py-3.5 px-4 min-w-[110px]">Créé Le</th>
                )}
                {visibleColumns.includes("Dossiers Traités") && (
                  <th className="py-3.5 px-4 min-w-[130px]">Dossiers Traités</th>
                )}
                {visibleColumns.includes("Membres de l'Équipe") && (
                  <th className="py-3.5 px-4 min-w-[170px]">Membres de l'Équipe</th>
                )}
                {visibleColumns.includes("Statut") && (
                  <th className="py-3.5 px-4 min-w-[110px]">Statut</th>
                )}
                {visibleColumns.includes("Actions") && (
                  <th className="py-3.5 px-4 min-w-[100px] text-right">Actions</th>
                )}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredData.length ? (
                filteredData.map((group) => (
                  <tr
                    key={group.id}
                    className="hover:bg-slate-800/50 transition-colors group/row"
                  >
                    {/* Groupe Title */}
                    {visibleColumns.includes("Pôle / Groupe") && (
                      <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-bold">
                            {group.title.charAt(0)}
                          </div>
                          <div>
                            <span className="group-hover/row:text-teal-300 transition-colors block">
                              {group.title}
                            </span>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* Code Ref */}
                    {visibleColumns.includes("Code Réf.") && (
                      <td className="py-4 px-4 font-mono text-[11px] text-teal-400/90 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20">
                          {group.code}
                        </span>
                      </td>
                    )}

                    {/* Service */}
                    {visibleColumns.includes("Direction / Service") && (
                      <td className="py-4 px-4 text-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{group.service}</span>
                        </div>
                      </td>
                    )}

                    {/* Tech & Domaine */}
                    {visibleColumns.includes("Domaine & Techno") && (
                      <td className="py-4 px-4 text-slate-300 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/10 text-xs font-medium text-slate-200">
                          {group.tech}
                        </span>
                      </td>
                    )}

                    {/* Date */}
                    {visibleColumns.includes("Créé Le") && (
                      <td className="py-4 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{group.createdAt}</span>
                        </div>
                      </td>
                    )}

                    {/* Dossiers Count */}
                    {visibleColumns.includes("Dossiers Traités") && (
                      <td className="py-4 px-4 font-semibold text-cyan-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{group.dossiersCount} dossiers</span>
                        </div>
                      </td>
                    )}

                    {/* Contributors / Team Members with overlapping avatars & Hover Tooltip */}
                    {visibleColumns.includes("Membres de l'Équipe") && (
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center -space-x-2">
                          {group.members.map((member, idx) => (
                            <div
                              key={idx}
                              className="relative group/avatar cursor-pointer"
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setActiveTooltipMember({
                                  member,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top - 8,
                                });
                              }}
                              onMouseLeave={() => setActiveTooltipMember(null)}
                            >
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-900 hover:ring-teal-400 hover:scale-110 transition-all z-10"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    )}

                    {/* Status Badge */}
                    {visibleColumns.includes("Statut") && (
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            group.status === "Actif"
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                              : group.status === "En cours"
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "bg-slate-500/15 text-slate-300 border-slate-500/30"
                          }`}
                        >
                          ● {group.status}
                        </span>
                      </td>
                    )}

                    {/* Actions */}
                    {visibleColumns.includes("Actions") && (
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            playXboxSound('select');
                            setSelectedGroupModal(group);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                          title="Voir la fiche détaillée"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Fiche</span>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={visibleColumns.length}
                    className="text-center py-12 text-slate-400 space-y-2"
                  >
                    <Users className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-sm font-semibold">Aucun groupe ou équipe trouvé.</p>
                    <p className="text-xs text-slate-500">
                      Essayez de modifier vos critères de recherche ou de filtre.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FLOATING HOVER TOOLTIP FOR MEMBERS */}
      {activeTooltipMember && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-slate-900/95 backdrop-blur-2xl border border-teal-400/30 text-white rounded-2xl p-3 shadow-2xl space-y-1 text-xs animate-in fade-in zoom-in-95 duration-150 min-w-[200px]"
          style={{
            left: `${activeTooltipMember.x}px`,
            top: `${activeTooltipMember.y}px`,
          }}
        >
          <div className="flex items-center gap-2">
            <img
              src={activeTooltipMember.member.avatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover border border-teal-400/40"
            />
            <div>
              <p className="font-bold text-white leading-tight">
                {activeTooltipMember.member.name}
              </p>
              <p className="text-[10px] text-teal-300 italic">
                {activeTooltipMember.member.role}
              </p>
            </div>
          </div>
          <div className="pt-1.5 border-t border-white/10 space-y-0.5 text-[11px] text-slate-300">
            <p className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{activeTooltipMember.member.email}</span>
            </p>
            {activeTooltipMember.member.status && (
              <p className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span>Statut : {activeTooltipMember.member.status}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL FICHE DÉTAILLÉE DU GROUPE */}
      {selectedGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-6 text-white relative overflow-hidden">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-md border border-teal-500/20">
                  {selectedGroupModal.code}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedGroupModal.title}
                </h3>
                <p className="text-xs text-slate-400">{selectedGroupModal.service}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playXboxSound('back');
                  setSelectedGroupModal(null);
                }}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
                <div>
                  <span className="text-slate-400 text-[10px] block">Technologies & Métier</span>
                  <span className="font-semibold text-slate-200">{selectedGroupModal.tech}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Dossiers gérés</span>
                  <span className="font-semibold text-cyan-300">{selectedGroupModal.dossiersCount} dossiers en GED</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span>Membres du groupe ({selectedGroupModal.members.length})</span>
                </h4>
                <div className="space-y-2">
                  {selectedGroupModal.members.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={m.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400/30"
                        />
                        <div>
                          <p className="font-bold text-white">{m.name}</p>
                          <p className="text-xs text-teal-300">{m.role}</p>
                          <p className="text-[11px] text-slate-400">{m.email}</p>
                        </div>
                      </div>

                      {m.status && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {m.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  playXboxSound('back');
                  setSelectedGroupModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
