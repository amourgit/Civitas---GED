import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Scroll, 
  Building, 
  Landmark, 
  Users, 
  ShieldCheck, 
  Wrench, 
  Archive,
  ArrowRight, 
  Star, 
  FolderOpen,
  Plus,
  Layers,
  ChevronRight,
  FileText
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { 
  INITIAL_ALFRESCO_SITES, 
  ALFRESCO_ROLES_META, 
  AlfrescoSiteItem 
} from '../../data/alfrescoSitesData';

interface MySitesSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToSites?: () => void;
}

export function MySitesSection({
  activeCardId,
  setActiveCardId,
  onNavigateToSites
}: MySitesSectionProps) {
  const navigate = useNavigate();

  // Pick top 4 joined/favorite sites for the dashboard carousel slide
  const displaySites = useMemo(() => {
    // Favor joined and favorite sites
    const joined = INITIAL_ALFRESCO_SITES.filter(s => s.isJoined);
    return joined.length >= 4 ? joined.slice(0, 4) : INITIAL_ALFRESCO_SITES.slice(0, 4);
  }, []);

  const handleSelectSite = (site: AlfrescoSiteItem) => {
    playXboxSound('select');
    setActiveCardId(`site-${site.id}`);
    if (onNavigateToSites) {
      onNavigateToSites();
    } else {
      navigate(`/sites/${site.id}`);
    }
  };

  const handleGoToAllSites = (e: React.MouseEvent) => {
    e.stopPropagation();
    playXboxSound('select');
    navigate('/sites');
  };

  const renderIcon = (iconName: string, className = "w-3.5 h-3.5") => {
    switch (iconName) {
      case 'Scroll': return <Scroll className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      case 'Users': return <Users className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Archive': return <Archive className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  return (
    <section className="w-full flex flex-col justify-center select-none">
      {/* Grid of 4 Alfresco Sites */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 items-stretch">
        {displaySites.map((site) => {
          const isSelected = activeCardId === `site-${site.id}`;
          const roleMeta = ALFRESCO_ROLES_META[site.currentUserRole];

          return (
            <div
              key={site.id}
              onClick={() => handleSelectSite(site)}
              onMouseEnter={() => {
                playXboxSound('hover');
                setActiveCardId(`site-${site.id}`);
              }}
              className={`p-2 sm:p-2.5 md:p-3 rounded-[3px] bg-gradient-to-b from-[#0e1d30]/90 via-[#0a1422]/95 to-[#040810]/98 backdrop-blur-md cursor-pointer transition-all duration-150 flex flex-col justify-between h-28 sm:h-32 md:h-36 ${
                isSelected
                  ? 'border-2 border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.4)] ring-1 ring-sky-400/50'
                  : 'border border-white/10 hover:border-sky-400/80 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]'
              }`}
            >
              {/* Header row: Icon, shortName, Visibility and Star */}
              <div className="flex items-start justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xs flex items-center justify-center border ${site.badgeColor} shrink-0`}>
                    {renderIcon(site.icon, "w-3.5 h-3.5")}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[9px] font-mono text-white/50 block truncate">
                      /{site.shortName}
                    </span>
                    <span className={`text-[7px] sm:text-[8px] font-mono px-1 py-0.2 rounded-xs border inline-block ${
                      site.visibility === 'PUBLIC'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : site.visibility === 'MODERATED'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}>
                      {site.visibilityLabel}
                    </span>
                  </div>
                </div>

                {site.isFavorite && (
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  </div>
                )}
              </div>

              {/* Title and user role */}
              <div className="my-0.5">
                <h4 className="text-white font-bold text-[11px] sm:text-xs tracking-tight line-clamp-1 group-hover:text-sky-200 transition-colors">
                  {site.title}
                </h4>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-xs border font-medium truncate ${roleMeta.badgeClass}`}>
                    {roleMeta.label}
                  </span>
                </div>
              </div>

              {/* Footer row: Members, Docs and Accéder */}
              <div className="pt-1 border-t border-white/[0.08] flex items-center justify-between text-[8px] sm:text-[9px] text-white/60 font-mono">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5" title="Membres du site">
                    <Users className="w-2.5 h-2.5 text-sky-400" />
                    <span>{site.memberCount}</span>
                  </span>
                  <span className="flex items-center gap-0.5" title="Dossiers documentaires">
                    <FileText className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{site.serviceData.dossiers.length}</span>
                  </span>
                </div>

                <span className="text-sky-300 group-hover:underline flex items-center gap-0.5">
                  <span>Ouvrir</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
