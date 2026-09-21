"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Share2, 
  Bookmark, 
  Clock, 
  Calendar, 
  User, 
  Check, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export interface BlogArticle {
  id: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  category: string;
  content?: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'design-systems-scale',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    author: 'Ava Mitchell',
    date: '2025-08-25',
    readTime: '7 min read',
    title: 'Design Systems That Scale',
    description: 'Learn how to build and maintain scalable design systems that empower teams to move faster while staying consistent.',
    category: 'Design Systems',
    content: [
      "A scalable design system is more than just a component library or a UI kit in Figma. It is a shared vocabulary that aligns design, engineering, product, and leadership under a unified standard of quality and coherence.",
      "As organizations scale from dozens to hundreds of engineers and designers, maintaining consistency becomes exponentially harder. Without strict governance, clear token architecture, and robust automated testing, systems degrade into fragmented forks.",
      "In this article, we break down the foundational principles of token-driven architectures, automated regression testing for design systems, and strategies for fostering cross-disciplinary adoption across global enterprise teams."
    ]
  },
  {
    id: 'psychology-color-ui',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    author: 'Liam Carter',
    date: '2025-07-14',
    readTime: '5 min read',
    title: 'The Psychology of Color in UI',
    description: 'Explore how different colors influence user perception, emotion, and conversion in digital product design.',
    category: 'UI & Cognition',
    content: [
      "Color is one of the quickest visual cues processed by the human brain. Long before a user reads a headline or identifies an icon, color establishes emotional tone, brand credibility, and perceived trust.",
      "Different cultures and operational contexts assign varied semantic meanings to specific hues. In financial and institutional platforms, cool blues and emerald greens signal stability, security, and precision, whereas warm accents guide decisive action.",
      "We explore the optical science of perceived brightness, luminance contrast standards (WCAG AA/AAA), and how to formulate systematic 10-step color scales that perform seamlessly in both high-key light and deep dark modes."
    ]
  },
  {
    id: 'microinteractions-delight',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    author: 'Sophia Kim',
    date: '2025-06-30',
    readTime: '6 min read',
    title: 'Microinteractions That Delight',
    description: 'Discover how subtle animations and interactions can enhance usability and bring joy to your users.',
    category: 'Interactions',
    content: [
      "The difference between a mechanical product and an exceptional product lives in the microinteractions: the gentle spring of a toggle, the subtle haptic tap on confirmation, the spatial continuity of an opening panel.",
      "When thoughtfully implemented, microinteractions reduce cognitive load by providing instantaneous tactile and visual feedback. They acknowledge user input and validate system state transitions without unnecessary modal interruptions.",
      "Discover the choreography of physics-based spring curves (using stiffness and damping rather than linear durations) to make every click and tap feel tactile, responsive, and purposeful."
    ]
  },
  {
    id: 'accessibility-beyond-compliance',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    author: 'Ethan Rodriguez',
    date: '2025-06-18',
    readTime: '8 min read',
    title: 'Accessibility Beyond Compliance',
    description: 'Practical steps to make your UI accessible, not just legally compliant, but genuinely inclusive for everyone.',
    category: 'Inclusion & a11y',
    content: [
      "Accessibility is frequently treated as a compliance checklist item to pass audit regulations. However, genuine digital accessibility is a core engineering discipline centered on human dignity and universal usability.",
      "Designing accessible experiences means considering cognitive variations, situational disabilities (such as high-glare sunlight or noisy environments), motor limitations, and full keyboard navigation autonomy.",
      "We share concrete techniques for building robust ARIA live regions, semantic landmark structures, focus trapping mechanisms, and screen-reader test harnesses directly inside your CI/CD deployment pipelines."
    ]
  },
  {
    id: 'dark-mode-done-right',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    author: 'Maya Chen',
    date: '2025-05-20',
    readTime: '4 min read',
    title: 'Dark Mode Done Right',
    description: 'Tips and tricks to design beautiful and functional dark mode experiences that users will love.',
    category: 'Visual Design',
    content: [
      "Crafting an exemplary dark mode requires far more than inverting a color palette or replacing pure white with pitch-black #000000. Pure black creates stark halation and optical vibration that exhausts the eye during extended sessions.",
      "High-performance dark interfaces utilize carefully calibrated dark neutrals infused with subtle warm or cool undertones (<5% saturation) and layered elevation surfaces where closer Z-index planes receive lighter surface illumination.",
      "Learn how to manage saturation attenuation on vibrant accent colors, handle translucent elevation materials, and balance contrast so text remains effortlessly legible under varied ambient lighting."
    ]
  },
  {
    id: 'typography-that-speaks',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    author: 'Noah Patel',
    date: '2025-05-02',
    readTime: '9 min read',
    title: 'Typography That Speaks',
    description: 'How to select and pair typefaces that enhance readability, hierarchy, and brand personality.',
    category: 'Typography',
    content: [
      "Typography is the bedrock of interface design. Over 90% of user interface interactions revolve around reading and interpreting written information. The choice of typeface directly dictates voice, authority, and reading cadence.",
      "Pairing an expressive display typeface for high-impact milestones with a balanced, highly legible geometric or humanist sans-serif for dense data tables establishes a rhythmic mathematical hierarchy across all viewport resolutions.",
      "We explore modular type scales, baseline grid alignment, optical sizing features in modern variable fonts, and optimal line length constraints (65-75 characters) to maximize reading retention and speed."
    ]
  }
];

interface PortalBlogSectionProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
  className?: string;
}

export function PortalBlogSection({ onShowToast, className = '' }: PortalBlogSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const handleArticleClick = (article: BlogArticle) => {
    playXboxSound('select');
    setSelectedArticle(article);
  };

  const handleShare = (article: BlogArticle, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playXboxSound('select');
    setCopiedId(article.id);
    navigator.clipboard?.writeText(window.location.href);
    onShowToast?.(`Lien de l'article « ${article.title} » copié.`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleBookmark = (article: BlogArticle, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playXboxSound('select');
    const isCurrentlyBookmarked = bookmarkedIds.includes(article.id);
    if (isCurrentlyBookmarked) {
      setBookmarkedIds(prev => prev.filter(id => id !== article.id));
      onShowToast?.(`Article « ${article.title} » retiré des favoris.`, 'warning');
    } else {
      setBookmarkedIds(prev => [...prev, article.id]);
      onShowToast?.(`Article « ${article.title} » sauvegardé dans vos favoris.`, 'success');
    }
  };

  return (
    <section 
      id="section-actualite-blog"
      aria-label="Section News & Actualités"
      className={`w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-slate-200/80 text-slate-900 transition-all ${className}`}
    >
      {/* ── 1. Header Identique au Pixel Près ── */}
      <div className="w-full flex flex-col items-start text-left">
        {/* Titre avec typographie Monospace exacte du visuel */}
        <h2 className="font-mono font-bold tracking-tight text-3xl sm:text-4xl text-slate-900 leading-tight">
          News &amp; Actualités
        </h2>

        {/* Sous-titre exact du visuel */}
        <p className="text-slate-500 font-normal text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Discover the latest trends and insights in the world of design and technology.
        </p>

        {/* Ligne pointillée séparatrice horizontale exacte */}
        <div className="w-full border-b border-dashed border-slate-200/90 mt-6 mb-8 sm:mb-10" />
      </div>

      {/* ── 2. Grille de 6 Cartes (3 Colonnes x 2 Rangées) ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12">
        {BLOG_ARTICLES.map((article) => {
          const isBookmarked = bookmarkedIds.includes(article.id);

          return (
            <article
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="group flex flex-col cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-2xl"
            >
              {/* Image avec coins arrondis et ratio 16:10 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm border border-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Bouton bookmark discret au survol */}
                <button
                  type="button"
                  onClick={(e) => handleBookmark(article, e)}
                  title={isBookmarked ? "Retirer des favoris" : "Sauvegarder l'article"}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-md ${
                    isBookmarked 
                      ? 'bg-emerald-600 text-white opacity-100 scale-100' 
                      : 'bg-white/90 text-slate-600 hover:text-slate-900 opacity-0 group-hover:opacity-100 hover:bg-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Contenu textuel de la carte */}
              <div className="mt-4 flex flex-col flex-1">
                {/* Métadonnées : by Auteur • Date • Temps de lecture */}
                <div className="text-xs sm:text-[13px] text-slate-500 font-normal flex items-center flex-wrap gap-1.5 mb-1.5">
                  <span className="hover:text-slate-700 transition-colors">
                    by {article.author}
                  </span>
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{article.date}</span>
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Titre de l'article */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-600 transition-colors mt-0.5 mb-1.5">
                  {article.title}
                </h3>

                {/* Description de l'article */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── 3. Modal de lecture de l'article interactif ── */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
            >
              {/* En-tête du modal avec image bannière */}
              <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Bouton de fermeture */}
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('back');
                    setSelectedArticle(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Métadonnées sur la bannière */}
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/90 text-white mb-2">
                    {selectedArticle.category}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Corps de l'article scrollable */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800">
                {/* Barre d'infos auteur et date */}
                <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">{selectedArticle.author}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{selectedArticle.date}</span>
                        <span>•</span>
                        <span>{selectedArticle.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleBookmark(selectedArticle)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(selectedArticle.id) ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                      <span>{bookmarkedIds.includes(selectedArticle.id) ? 'Enregistré' : 'Enregistrer'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(selectedArticle)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                      {copiedId === selectedArticle.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600">Lien copié</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>Partager</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Chapô / Description introductive */}
                <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed italic">
                  "{selectedArticle.description}"
                </p>

                {/* Paragraphes de contenu */}
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                  {selectedArticle.content?.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Pied de page du modal */}
              <div className="p-4 sm:px-8 sm:py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  EGEN Intranet &bull; Blog Actualités
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('back');
                    setSelectedArticle(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Fermer la lecture
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
