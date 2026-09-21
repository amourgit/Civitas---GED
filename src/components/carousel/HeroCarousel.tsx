"use client"

// A full-bleed editorial hero driven by a filmstrip.
//
// Every card shares one top edge. The focused card unfurls to full height while
// its neighbours stay clipped to half, so the strip reads as a row of cropped
// heads with one complete portrait standing in the middle of it. Changing the
// focus re-grades the whole background to that image.
//
// Geometry is measured, never hard-coded: one ResizeObserver reads the stage and
// every size below is a ratio of it, so the same component is pixel-identical in
// a 600px preview box and on a 4K display.
import * as React from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion"
import { LayoutGrid } from "lucide-react"

import { cn } from "../../lib/utils"
import { ToolDock, ToolDockItem, ToolDockTile } from "../ui/ToolDock"

export interface HeroCarouselItem {
  /** Stable key; falls back to the index. @default undefined */
  id?: string | number
  /** Specific section title shown on top of the slide representation card */
  sectionName?: string
  /** Headline for the active slide. Newlines become separate reveal lines. */
  title: string
  /** Image URL, used both in the card and as the graded background. */
  image: string
  /** Representative icon component for the slide indicator */
  icon?: React.ComponentType<{ className?: string }>
  /** Byline printed beside the headline, e.g. "BY AURELIA STUDIO." @default undefined */
  credit?: string
  /** Right-aligned facts, e.g. ["SAT NOV 15", "5-10 PM", "MIAMI"]. @default undefined */
  meta?: string[]
  /**
   * CSS colour the background is graded to. The photo keeps its luminance and
   * takes this hue, which is what makes the backdrop swing on every change.
   * @default "#8a8a8a"
   */
  accent?: string
}

export interface HeroCarouselProps {
  /** Slides, in strip order. */
  items: HeroCarouselItem[]
  /** Focused slide when controlled. Leave unset for internal state. @default undefined */
  index?: number
  /** Focused slide on mount when uncontrolled. @default 0 */
  defaultIndex?: number
  /** Fires on every focus change, from any input. @default undefined */
  onIndexChange?: (index: number) => void
  /** Wordmark in the middle of the top bar. @default undefined */
  brand?: React.ReactNode
  /** Renders the "Back" control when provided. @default undefined */
  onBack?: () => void
  /** Renders the "Menu" control when provided. @default undefined */
  onMenu?: () => void
  /** Advance on a timer. Pauses on hover, drag and focus. @default false */
  autoplay?: boolean
  /** Milliseconds between autoplay steps. @default 4000 */
  autoplayDelay?: number
  /** Extra classes for the stage. @default undefined */
  className?: string
  /** Content rendered in the middle of the screen for the active section */
  children?: React.ReactNode
}

/* Ratios lifted from the reference layout, all relative to the stage box. */
const CARD_H = 0.12 // active card height ÷ stage height (compact at bottom to give maximum space to middle section)
const CARD_AR = 1.25 // card width-to-height ratio for readable top labels
const GAP = 0.038 // gap ÷ card width
const TITLE = 0.042 // headline cap size ÷ stage height
const LABEL = 0.0103 // small mono label ÷ stage height
const PAD = 0.017 // page gutter ÷ stage width
const RAIL = 0.2 // progress rail width ÷ stage width

/* Film grain, as a self-contained SVG so the component carries no assets. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  brand,
  onBack,
  onMenu,
  autoplay = false,
  autoplayDelay = 4000,
  className,
  children,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState({ w: 0, h: 0 })
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const [paused, setPaused] = React.useState(false)
  const reduced = useReducedMotion()

  const last = items.length - 1
  const index = clamp(controlled ?? uncontrolled, 0, Math.max(0, last))

  const go = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, last))
      if (controlled === undefined) setUncontrolled(clamped)
      if (clamped !== index) onIndexChange?.(clamped)
    },
    [controlled, index, last, onIndexChange]
  )

  // One observer feeds every measurement below.
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const read = () =>
      setBox({ w: stage.clientWidth, h: stage.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  const pad = Math.max(16, Math.round(box.w * PAD))
  const label = Math.max(9, Math.round(box.h * LABEL))

  const swing = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeOut" as const }
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.9 }

  React.useEffect(() => {
    if (!autoplay || paused || items.length < 2) return
    const id = window.setTimeout(
      () => go(index === last ? 0 : index + 1),
      autoplayDelay
    )
    return () => window.clearTimeout(id)
  }, [autoplay, autoplayDelay, go, index, items.length, last, paused])

  const active = items[index]
  if (!active) return null

  const lines = active.title.split("\n")
  const accent = active.accent ?? "#8a8a8a"

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured looks"
      onKeyDown={(e) => {
        const keys: Record<string, number> = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        }
        if (!(e.key in keys)) return
        e.preventDefault()
        go(keys[e.key]!)
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "relative h-full w-full overflow-hidden bg-transparent text-white select-none flex flex-col justify-between",
        "outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-inset",
        className
      )}
    >
      {/* ── Top bar: centred brand only (no top navigation buttons) ── */}
      {brand ? (
        <div
          className="relative z-30 flex items-center justify-center shrink-0"
          style={{ paddingTop: Math.max(10, box.h * 0.014) }}
        >
          <div
            className="font-semibold tracking-[0.06em]"
            style={{ fontSize: label * 1.35 }}
          >
            {brand}
          </div>
        </div>
      ) : null}

      {/* ── Headline block (compact, at top) ── */}
      <div
        className="relative z-20 w-full shrink-0"
        style={{
          paddingLeft: pad,
          paddingRight: pad,
          paddingTop: Math.max(8, Math.round(box.h * 0.01)),
          paddingBottom: Math.max(4, Math.round(box.h * 0.008)),
        }}
      >
        <div className="flex w-full flex-wrap items-end justify-between gap-x-6 gap-y-2 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h2
              key={index}
              className="font-semibold leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: Math.max(18, Math.min(32, Math.round(box.h * TITLE))) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.62, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </AnimatePresence>

          <div className="flex items-center gap-4 ml-auto">
            {active.credit ? (
              <motion.p
                key={`credit-${index}`}
                className="font-mono uppercase tracking-[0.14em] opacity-80"
                style={{ fontSize: label }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {active.credit}
              </motion.p>
            ) : null}

            {active.meta?.length ? (
              <div
                className="flex items-center"
                style={{ gap: `${Math.max(8, box.w * 0.018)}px` }}
              >
                {active.meta.map((fact, i) => (
                  <motion.span
                    key={`${index}-${fact}`}
                    className="font-mono whitespace-nowrap uppercase tracking-[0.14em] opacity-80 bg-white/10 px-2 py-0.5 rounded-[2px]"
                    style={{ fontSize: label }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={
                      reduced ? { duration: 0 } : { duration: 0.45, delay: 0.12 + i * 0.06 }
                    }
                  >
                    {fact}
                  </motion.span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Middle Section Content: les sections sont au milieu (strictly no Y scroll) ── */}
      <div
        className="relative z-20 flex-1 min-h-0 w-full flex flex-col justify-center items-center overflow-hidden"
        style={{
          paddingLeft: pad,
          paddingRight: pad,
          paddingTop: Math.max(2, Math.round(box.h * 0.004)),
          paddingBottom: Math.max(4, Math.round(box.h * 0.008)),
        }}
      >
        <div
          className="w-full h-full max-w-7xl mx-auto overflow-hidden select-auto flex flex-col justify-center"
        >
          {children}
        </div>
      </div>

      {/* ── Slide Navigation Dock (Exact ToolDock implementation) ── */}
      <div
        className="relative z-20 w-full shrink-0 flex flex-col items-center justify-center pointer-events-auto"
        style={{
          paddingLeft: pad,
          paddingRight: pad,
          marginBottom: Math.max(14, Math.round(box.h * 0.016)),
        }}
      >
        <ToolDock
          items={items.map((item, i) => {
            const IconComp = item.icon || LayoutGrid;
            const itemAccent = item.accent || "#22c55e";
            const isActive = i === index;

            return {
              label: item.sectionName ?? item.title.split('\n')[0],
              accent: itemAccent,
              icon: (
                <ToolDockTile
                  className={cn(
                    "transition-all duration-300",
                    isActive
                      ? "bg-slate-900 border-2 shadow-[0_0_22px_rgba(34,197,94,0.45)] ring-1 ring-white/20"
                      : "bg-slate-950/80 border border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                  )}
                  style={{
                    borderColor: isActive ? itemAccent : undefined,
                    boxShadow: isActive ? `0 0 20px ${itemAccent}60, 0 4px 12px rgba(0,0,0,0.6)` : undefined,
                  }}
                >
                  <IconComp
                    className={cn(
                      "size-[52%] transition-all duration-200",
                      isActive
                        ? "text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        : "text-slate-300 group-hover:text-white"
                    )}
                  />
                </ToolDockTile>
              ),
            };
          })}
          activeIndex={index}
          onSelect={(newIndex) => go(newIndex)}
          size={Math.max(46, Math.min(58, Math.round(box.h * 0.078)))}
          overlap={0.12}
          magnification={0.32}
          tilt={true}
          label="Navigation des modules"
          className="w-full max-w-3xl"
        />
      </div>

      {/* ── Position rail discreet at bottom left ── */}
      <div
        className="absolute z-20 hidden md:block"
        style={{ left: pad, bottom: Math.max(8, box.h * 0.01), width: box.w * 0.14 }}
      >
        <div
          className="flex justify-between font-mono tabular-nums opacity-60 text-[10px]"
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
        <div className="relative mt-1 h-0.5 w-full bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 rounded-full"
            style={{ 
              width: `${100 / items.length}%`,
              backgroundColor: active.accent ?? "#22c55e"
            }}
            animate={{ left: `${(index / items.length) * 100}%` }}
            transition={spring}
          />
        </div>
      </div>
    </div>
  )
}
