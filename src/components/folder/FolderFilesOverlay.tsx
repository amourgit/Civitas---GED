"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Grid3X3, 
  Layers, 
  LayoutList, 
  X, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Table, 
  Music, 
  Archive 
} from "lucide-react"
import { FolderItem } from "../../types/document"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  folder?: FolderItem | null
  folderName?: string
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
  isOpen?: boolean
  onClose?: () => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

function getFileIcon(type?: string) {
  switch (type) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-400" />
    case 'image':
      return <ImageIcon className="h-5 w-5 text-cyan-400" />
    case 'video':
      return <Video className="h-5 w-5 text-blue-400" />
    case 'sheet':
      return <Table className="h-5 w-5 text-emerald-400" />
    case 'audio':
      return <Music className="h-5 w-5 text-amber-400" />
    case 'zip':
    case 'archive':
      return <Archive className="h-5 w-5 text-amber-500" />
    case 'doc':
    default:
      return <FileText className="h-5 w-5 text-indigo-400" />
  }
}

export function folderToCardData(folder: FolderItem): CardData[] {
  if (folder.filesInside && folder.filesInside.length > 0) {
    return folder.filesInside.map((file) => ({
      id: file.id,
      title: file.name,
      description: `${file.size || '3.5 Mo'} • Mis à jour ${file.updatedAt || 'Récemment'}`,
      icon: getFileIcon(file.type),
    }))
  }

  if (folder.photos && folder.photos.length > 0) {
    return folder.photos.map((p, i) => ({
      id: `p-${p.id || i}`,
      title: p.title || `Photo_${i + 1}.jpg`,
      description: `${p.size || '4.2 Mo'} • Mis à jour ${folder.updatedAt}`,
      icon: <ImageIcon className="h-5 w-5 text-cyan-400" />,
    }))
  }

  // Fallback files for rich demonstration
  return [
    { id: 'f-1', title: `${folder.name}_Synthese.pdf`, description: '4.8 Mo • Mis à jour Aujourd’hui, 11:20', icon: <FileText className="h-5 w-5 text-red-400" /> },
    { id: 'f-2', title: 'Rapport_Detaillé.docx', description: '2.3 Mo • Mis à jour Hier, 15:45', icon: <FileText className="h-5 w-5 text-indigo-400" /> },
    { id: 'f-3', title: 'Enregistrement_Reunion.mp4', description: '48.5 Mo • Mis à jour 06 Sept. 2025', icon: <Video className="h-5 w-5 text-blue-400" /> },
    { id: 'f-4', title: 'Tableau_Metriques.xlsx', description: '1.7 Mo • Mis à jour 04 Sept. 2025', icon: <Table className="h-5 w-5 text-emerald-400" /> },
    { id: 'f-5', title: 'Visuel_Presentation.png', description: '8.2 Mo • Mis à jour 03 Sept. 2025', icon: <ImageIcon className="h-5 w-5 text-cyan-400" /> },
    { id: 'f-6', title: 'Audio_Briefing.mp3', description: '14.1 Mo • Mis à jour 02 Sept. 2025', icon: <Music className="h-5 w-5 text-amber-400" /> },
    { id: 'f-7', title: 'Archive_Complet.zip', description: '85 Mo • Mis à jour 28 Août 2025', icon: <Archive className="h-5 w-5 text-amber-500" /> },
  ]
}

export function Component({
  cards: propCards,
  folder,
  folderName: propFolderName,
  className,
  defaultLayout = "stack",
  onCardClick,
  isOpen = true,
  onClose,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Listen to Escape key to close overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const cards = useMemo<CardData[]>(() => {
    if (propCards && propCards.length > 0) {
      return propCards
    }
    if (folder) {
      return folderToCardData(folder)
    }
    return []
  }, [propCards, folder])

  const title = propFolderName || folder?.name || 'Répertoire'

  if (!isOpen || !cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-64 w-64",
    grid: "grid grid-cols-2 gap-3 w-full max-w-lg",
    list: "flex flex-col gap-3 w-full max-w-lg",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-black/70 backdrop-blur-xl select-none overflow-hidden",
        className
      )}
    >
      {/* Barre de contrôle toujours en haut de la page */}
      <div className="w-full shrink-0 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md z-50">
        {/* Titre / contexte du dossier */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            📁
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white truncate drop-shadow-sm">
              {title}
            </h2>
            <p className="text-[11px] text-white/50 truncate">
              {cards.length} fichier{cards.length > 1 ? 's' : ''} chargé{cards.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Layout Toggle - Les trois boutons de contrôle sont TOUJOURS en haut de la page */}
        <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
          {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
            const Icon = layoutIcons[mode]
            return (
              <button
                key={mode}
                onClick={() => setLayout(mode)}
                className={cn(
                  "rounded-md p-2 transition-all cursor-pointer",
                  layout === mode
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
                aria-label={`Switch to ${mode} layout`}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        </div>

        {/* Bouton de fermeture */}
        <div className="flex items-center justify-end">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
              aria-label="Fermer"
              title="Fermer (Échap)"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Cards Container - Zone centrale scrollable si grille/liste */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center min-h-0">
        <LayoutGroup>
          <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
            <AnimatePresence mode="popLayout">
              {displayCards.map((card) => {
                const styles = getLayoutStyles(card.stackPosition)
                const isExpanded = expandedCard === card.id
                const isTopCard = layout === "stack" && card.stackPosition === 0

                return (
                  <motion.div
                    key={card.id}
                    layoutId={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isExpanded ? 1.05 : 1,
                      x: 0,
                      ...styles,
                    }}
                    exit={{ opacity: 0, scale: 0.8, x: -200 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    drag={isTopCard ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                    onClick={() => {
                      if (isDragging) return
                      setExpandedCard(isExpanded ? null : card.id)
                      onCardClick?.(card)
                    }}
                    className={cn(
                      "cursor-pointer rounded-xl border border-border bg-card p-4",
                      "hover:border-primary/50 transition-colors",
                      layout === "stack" && "absolute w-56 h-48",
                      layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                      layout === "grid" && "w-full aspect-square",
                      layout === "list" && "w-full",
                      isExpanded && "ring-2 ring-primary",
                    )}
                    style={{
                      backgroundColor: card.color || undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {card.icon && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                          {card.icon}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-card-foreground truncate">{card.title}</h3>
                        <p
                          className={cn(
                            "text-sm text-muted-foreground mt-1",
                            layout === "stack" && "line-clamp-3",
                            layout === "grid" && "line-clamp-2",
                            layout === "list" && "line-clamp-1",
                          )}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {isTopCard && (
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-xs text-muted-foreground/50">Swipe to navigate</span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {layout === "stack" && cards.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all cursor-pointer",
                  index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { Component as MorphingCardStack, Component as FolderFilesOverlay }
export default Component
