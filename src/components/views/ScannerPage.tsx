import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Check, 
  RotateCcw, 
  Zap, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Layers,
  FileCheck,
  Sliders,
  Settings2,
  Activity,
  Crop,
  RefreshCw,
  Camera,
  CameraOff,
  Gauge,
  Focus,
  Sun,
  Maximize2
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { IngestionDocument } from '../../types/ingestion';
import { initialIngestionSession } from '../../data/mockIngestion';

interface ScannerPageProps {
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onAddCapturedDocsToSession?: (docs: IngestionDocument[]) => void;
}

interface CapturedItem {
  id: string;
  title: string;
  thumbnail: string;
  timestamp: string;
  cropped?: boolean;
}

const SAMPLE_DOCS = [
  {
    id: 'doc-facture',
    title: 'Facture_Fournisseur_2026_09.pdf',
    type: 'Facture Commerciale',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&auto=format&fit=crop&q=80',
    tags: ['A4', 'OCR HD'],
    pages: 1
  },
  {
    id: 'doc-contrat',
    title: 'Contrat_Partenariat_EGEN.pdf',
    type: 'Contrat Juridique',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1600&auto=format&fit=crop&q=80',
    tags: ['PDF/A', 'Signé'],
    pages: 3
  },
  {
    id: 'doc-rh',
    title: 'Bulletin_Paie_Septembre_2026.pdf',
    type: 'Document RH',
    thumbnail: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&auto=format&fit=crop&q=80',
    tags: ['RH', 'Fiche Paie'],
    pages: 1
  }
];

export function ScannerPage({ onShowToast, onAddCapturedDocsToSession }: ScannerPageProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const analysisCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Track actual detected document crop bounds in real time to pre-populate crop frame on capture
  const detectedCropRef = useRef<{ top: number; bottom: number; left: number; right: number }>({
    top: 15,
    bottom: 15,
    left: 15,
    right: 15
  });

  // Camera & Audio States
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  
  // Settings modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [ocrResolution, setOcrResolution] = useState<string>('300 DPI (Ultra-HD)');
  const [autoEnhance, setAutoEnhance] = useState<boolean>(true);

  // Scanning state: 'scanning' | 'captured'
  const [scanState, setScanState] = useState<'scanning' | 'captured'>('scanning');
  const [lockProgress, setLockProgress] = useState<number>(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentDocTitle, setCurrentDocTitle] = useState<string>('Facture_Fournisseur_2026.pdf');

  // Real Computer Vision feedback scores
  const [cvScores, setCvScores] = useState({
    contrast: 0,
    readability: 0,
    cadrage: 0,
    statusMessage: "Initialisation du moteur de vision..."
  });

  // Interactive Crop Box Bounds (percentages)
  const [cropBounds, setCropBounds] = useState<{ top: number; bottom: number; left: number; right: number }>({
    top: 15,
    bottom: 15,
    left: 15,
    right: 15
  });

  // Session Captured List (All documents in current session that are pending validation)
  const [sessionDocsList, setSessionDocsList] = useState<CapturedItem[]>(() => {
    return initialIngestionSession.documents.map((d) => ({
      id: d.id,
      title: d.filename,
      thumbnail: d.thumbnailUrl,
      timestamp: 'Session Active',
      cropped: true
    }));
  });

  // Flash effect on capture
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  // Request & Initialize Real WebCam stream
  const requestCameraAccess = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: { ideal: 'environment' }, 
            width: { ideal: 1920 }, 
            height: { ideal: 1080 } 
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play().catch(() => {});
        }
        setHasCamera(true);
        setCameraError(null);
        if (onShowToast) onShowToast("Moteur de vision connecté à la caméra réelle !", "success");
      } else {
        setCameraError("Support caméra non détecté sur ce navigateur.");
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      setHasCamera(false);
      setCameraError(err?.message || "Accès caméra non accordé ou indisponible.");
    }
  };

  useEffect(() => {
    requestCameraAccess();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // REAL-TIME COMPUTER VISION PROCESSING LOOP (runs at 60 FPS)
  useEffect(() => {
    if (scanState !== 'scanning') return;

    let active = true;
    let animationFrameId: number;

    const currentSample = SAMPLE_DOCS[selectedSampleIndex];

    // Preload current fallback image to run pixel math on it when camera is offline
    const fallbackImg = new Image();
    fallbackImg.crossOrigin = "anonymous";
    fallbackImg.src = currentSample.thumbnail;

    const processFrame = () => {
      if (!active) return;

      const video = videoRef.current;
      const analysisCanvas = analysisCanvasRef.current;
      const overlayCanvas = overlayCanvasRef.current;

      let sourceWidth = 0;
      let sourceHeight = 0;
      let sourceElement: HTMLVideoElement | HTMLImageElement | null = null;

      if (hasCamera && video && video.readyState >= 2) {
        sourceWidth = video.videoWidth;
        sourceHeight = video.videoHeight;
        sourceElement = video;
      } else if (fallbackImg.complete && fallbackImg.naturalWidth > 0) {
        sourceWidth = fallbackImg.naturalWidth;
        sourceHeight = fallbackImg.naturalHeight;
        sourceElement = fallbackImg;
      }

      if (analysisCanvas && overlayCanvas && sourceElement && sourceWidth > 0 && sourceHeight > 0) {
        const ctx = analysisCanvas.getContext('2d');
        const overlayCtx = overlayCanvas.getContext('2d');

        if (ctx && overlayCtx) {
          // Set analysis canvas size (downscaled to 160x120 for rapid 60fps processing)
          const sw = 160;
          const sh = 120;
          analysisCanvas.width = sw;
          analysisCanvas.height = sh;

          // Draw frame to analyze
          ctx.drawImage(sourceElement, 0, 0, sw, sh);

          // Get raw pixels
          const imgData = ctx.getImageData(0, 0, sw, sh);
          const data = imgData.data;

          // 1. CALCULATE LUMINANCE & CONTRAST (Standard Deviation)
          let totalL = 0;
          let minL = 255;
          let maxL = 0;
          const lums = new Uint8Array(sw * sh);

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            // Standard luminance weights
            const l = Math.floor(0.299 * r + 0.587 * g + 0.114 * b);
            lums[i/4] = l;
            totalL += l;
            if (l < minL) minL = l;
            if (l > maxL) maxL = l;
          }

          const avgL = totalL / (sw * sh);

          let sumSquares = 0;
          for (let i = 0; i < lums.length; i++) {
            const diff = lums[i] - avgL;
            sumSquares += diff * diff;
          }
          const stdDev = Math.sqrt(sumSquares / (sw * sh));

          // Normalize contrast score (we aim for stdDev of at least 30)
          const contrastScore = Math.min(100, Math.max(0, Math.floor((stdDev / 50) * 100)));

          // 2. CALCULATE HIGH-FREQUENCY EDGES (TEXT READABILITY)
          let edgeTransitions = 0;
          for (let y = 1; y < sh - 1; y++) {
            for (let x = 1; x < sw - 1; x++) {
              const idx = y * sw + x;
              const val = lums[idx];
              const right = lums[idx + 1];
              const bottom = lums[idx + sw];
              
              const dx = Math.abs(right - val);
              const dy = Math.abs(bottom - val);
              
              if (dx + dy > 25) {
                edgeTransitions++;
              }
            }
          }

          const edgeDensity = edgeTransitions / (sw * sh);
          // Standard text document on dark background has edge density around 6% to 15%
          const readabilityScore = Math.min(100, Math.max(0, Math.floor((edgeDensity / 0.11) * 100)));

          // 3. DETECT RECTANGULAR DOCUMENT BOUNDS
          // We threshold at avgL + 12 to find the brighter white paper document region
          const thresholdL = avgL + 12;
          let minX = sw;
          let maxX = 0;
          let minY = sh;
          let maxY = 0;
          let paperPixelCount = 0;

          for (let y = 0; y < sh; y++) {
            for (let x = 0; x < sw; x++) {
              const idx = y * sw + x;
              if (lums[idx] > thresholdL && lums[idx] > 60) {
                paperPixelCount++;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }

          // Convert to crop percentages (pad by 3% for a safer border)
          const padPercentX = 3;
          const padPercentY = 3;
          let docLeft = Math.max(2, Math.floor((minX / sw) * 100) - padPercentX);
          let docRight = Math.max(2, 100 - Math.floor((maxX / sw) * 100) - padPercentX);
          let docTop = Math.max(2, Math.floor((minY / sh) * 100) - padPercentY);
          let docBottom = Math.max(2, 100 - Math.floor((maxY / sh) * 100) - padPercentY);

          // Safe defaults if no robust paper detected
          if (paperPixelCount < 150) {
            docLeft = 18; docRight = 18; docTop = 15; docBottom = 15;
          }

          const docWidth = 100 - docLeft - docRight;
          const docHeight = 100 - docTop - docBottom;
          const docArea = docWidth * docHeight;

          // Cadrage evaluation
          let cadrageScore = 0;
          let statusMessage = "Recherche de document...";

          const isCutOff = docLeft <= 4 || docRight <= 4 || docTop <= 4 || docBottom <= 4;
          
          if (paperPixelCount < 180) {
            cadrageScore = 10;
            statusMessage = "🔍 Présentez un document devant l'objectif";
          } else if (isCutOff) {
            cadrageScore = 30;
            statusMessage = "⚠️ Hors cadre ! Centrez le document";
          } else if (docArea < 1500) {
            cadrageScore = 40;
            statusMessage = "⚠️ Trop loin ! Rapprochez le document";
          } else if (docArea > 8500) {
            cadrageScore = 45;
            statusMessage = "⚠️ Trop près ! Reculez légèrement";
          } else {
            // Well placed
            const centeringX = Math.abs(docLeft - docRight);
            const centeringY = Math.abs(docTop - docBottom);
            const centerScore = Math.max(0, 100 - (centeringX + centeringY) * 1.5);
            cadrageScore = Math.floor(70 + centerScore * 0.3);
            statusMessage = "⚡ Tenez bon ! Alignement optimal...";
          }

          // Evaluate thresholds
          const contrastThreshold = 45;
          const readabilityThreshold = 35;
          const cadrageThreshold = 50;

          const isContrastOk = contrastScore >= contrastThreshold;
          const isReadabilityOk = readabilityScore >= readabilityThreshold;
          const isCadrageOk = cadrageScore >= cadrageThreshold;
          const allConditionsMet = isContrastOk && isReadabilityOk && isCadrageOk;

          if (!isContrastOk) {
            statusMessage = "⚠️ Contraste insuffisant ! Améliorez l'éclairage";
          } else if (!isReadabilityOk) {
            statusMessage = "⚠️ Document flou ou vide ! Stabilisez pour l'OCR";
          }

          // Update CV scores
          setCvScores({
            contrast: contrastScore,
            readability: readabilityScore,
            cadrage: cadrageScore,
            statusMessage
          });

          // Store current detected crop bounds to apply them precisely at auto-lock
          detectedCropRef.current = {
            top: docTop,
            bottom: docBottom,
            left: docLeft,
            right: docRight
          };

          // Render Live bounds on overlay canvas
          overlayCanvas.width = overlayCanvas.clientWidth;
          overlayCanvas.height = overlayCanvas.clientHeight;
          const ow = overlayCanvas.width;
          const oh = overlayCanvas.height;

          // Keep canvas clean and empty to avoid physical lines or boxes outside of the document in the live interface
          overlayCtx.clearRect(0, 0, ow, oh);

          // Update lock progression ONLY if all conditions are fully met
          if (allConditionsMet) {
            setLockProgress((prev) => {
              const next = prev + 6; // ~300ms to lock stably
              return next >= 100 ? 100 : next;
            });
          } else {
            // Decay lock progress instantly if conditions drop
            setLockProgress((prev) => Math.max(0, prev - 15));
          }
        }
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    animationFrameId = requestAnimationFrame(processFrame);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [scanState, hasCamera, selectedSampleIndex]);

  // Handle Capture Action
  const handleAutoCapture = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    if (audioEnabled) {
      playXboxSound('achievement');
    }

    let realSnapshotUrl: string | null = null;
    if (hasCamera && videoRef.current) {
      try {
        const video = videoRef.current;
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            realSnapshotUrl = canvas.toDataURL('image/jpeg', 0.95);
          }
        }
      } catch (err) {
        console.warn("Error grabbing video frame:", err);
      }
    }

    const currentSample = SAMPLE_DOCS[selectedSampleIndex];
    const finalImage = realSnapshotUrl || currentSample.thumbnail;
    const finalTitle = realSnapshotUrl ? `Capture_Caméra_${Date.now().toString().slice(-4)}.jpg` : currentSample.title;

    setCapturedImage(finalImage);
    setCurrentDocTitle(finalTitle);
    
    // Apply exact bounding box detected by computer vision to pre-populate crop bounds!
    setCropBounds({
      top: detectedCropRef.current.top,
      bottom: detectedCropRef.current.bottom,
      left: detectedCropRef.current.left,
      right: detectedCropRef.current.right
    });

    setScanState('captured');

    if (onShowToast) {
      onShowToast(realSnapshotUrl ? `Photo réelle capturée ! Ajustez le cadrage.` : `Document détecté : ${currentSample.title}`, 'success');
    }
  };

  // Trigger capture when lock progress reaches 100%
  useEffect(() => {
    if (lockProgress >= 100 && scanState === 'scanning') {
      handleAutoCapture();
    }
  }, [lockProgress, scanState]);

  // Action: Réessayer
  const handleRetry = () => {
    if (audioEnabled) playXboxSound('toggle');
    setScanState('scanning');
    setLockProgress(0);
    setCapturedImage(null);
    setSelectedSampleIndex((prev) => (prev + 1) % SAMPLE_DOCS.length);
  };

  // Action: Reset Crop Corners
  const handleResetCrop = () => {
    if (audioEnabled) playXboxSound('select');
    setCropBounds({ top: 15, bottom: 15, left: 15, right: 15 });
  };

  // Action: Valider & Continuer OR Valider et Quitter
  const handleValidate = (andQuit: boolean = false) => {
    if (audioEnabled) playXboxSound('toastSuccess');
    
    const currentSample = SAMPLE_DOCS[selectedSampleIndex];
    const finalThumbnail = capturedImage || currentSample.thumbnail;
    const finalTitle = currentDocTitle || currentSample.title;

    const newDoc: IngestionDocument = {
      id: `scan-${Date.now()}`,
      filename: finalTitle,
      size: `${(Math.random() * 2 + 0.8).toFixed(1)} MB`,
      format: 'pdf',
      formatBadge: 'SCAN',
      thumbnailUrl: finalThumbnail,
      metadata: {
        nom: finalTitle,
        date: new Date().toLocaleDateString('fr-FR'),
        auteur: 'Scanner Live Fullscreen',
        pages: 1,
        departement: 'Numérisation Moteur Réel'
      },
      status: 'pending',
      extractedData: {
        rawText: `Scan Live Moteur Réel.\nRognage géométrique personnalisé appliqué (${100 - cropBounds.left - cropBounds.right}% x ${100 - cropBounds.top - cropBounds.bottom}%).\nType: ${currentSample.type}`,
        structured: { 
          "Moteur": "Vision Réelle v2", 
          "Source": hasCamera ? "Caméra Directe" : "Calcul Démo Intelligente",
          "Rognage": "Cadre Réglé",
          "Qualité OCR": ocrResolution 
        },
        entities: [{ label: "Type", value: currentSample.type, confidence: 0.99 }],
        tags: [...currentSample.tags, 'Rogné HD', 'Moteur Réel'],
        classification: currentSample.type,
        ocrConfidence: 99.4
      }
    };

    const newItem: CapturedItem = {
      id: newDoc.id,
      title: finalTitle,
      thumbnail: finalThumbnail,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      cropped: true
    };

    setSessionDocsList((prev) => [newItem, ...prev]);

    if (onAddCapturedDocsToSession) {
      onAddCapturedDocsToSession([newDoc]);
    }

    if (andQuit) {
      if (onShowToast) {
        onShowToast(`« ${finalTitle} » rogné et validé ! Retour à la session.`, 'success');
      }
      navigate('/ingestion');
    } else {
      if (onShowToast) {
        onShowToast(`« ${finalTitle} » rogné et ajouté. Prêt pour le suivant !`, 'success');
      }
      handleRetry();
    }
  };

  const handleClose = () => {
    if (audioEnabled) playXboxSound('back');
    navigate('/ingestion');
  };

  const currentSample = SAMPLE_DOCS[selectedSampleIndex];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black text-white z-[9999] overflow-hidden select-none">
      
      {/* Hidden processing canvas used by Computer Vision */}
      <canvas ref={analysisCanvasRef} style={{ display: 'none' }} />

      {/* Screen Flash Effect on Capture */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white/60 z-50 pointer-events-none animate-ping" />
      )}

      {/* 1. FULLSCREEN FEED */}
      <div className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center">
        {hasCamera && scanState === 'scanning' ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
        ) : scanState === 'captured' && capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Capture Réelle"
            className="w-full h-full object-cover brightness-105 contrast-105 animate-in fade-in duration-300"
          />
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={currentSample.thumbnail} 
              alt="Flux Caméra"
              className="w-full h-full object-cover brightness-95"
            />
          </div>
        )}

        {/* Real-time Glowing Vector Bounding Box Overlay Canvas (Clear/Empty per user request to have no physical bounding box during live scan) */}
        {scanState === 'scanning' && (
          <canvas 
            ref={overlayCanvasRef} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-30"
          />
        )}

        {/* Camera Vignette & Subtle Scan Grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10" />
      </div>

      {/* 2. FLEXIBLE TOPBAR (ONLY PARAMETERS & MINI CARDS ON LEFT, EMPTY CENTER & RIGHT) */}
      <header className="absolute top-0 left-0 right-0 h-16 z-40 px-4 sm:px-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-auto">
        
        {/* LEFT SECTION: ONLY Settings Button + Subtle Close + Mini Session Cards */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Close Scanner Button */}
          <button
            type="button"
            onClick={handleClose}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer shadow-lg hover:scale-105 backdrop-blur-md"
            title="Quitter le scanner"
          >
            <X className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Settings / Parameters Icon Button */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('toggle');
              setIsSettingsOpen(true);
            }}
            className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-105 backdrop-blur-md"
            title="Paramètres du scanner (OCR, Calibrage, Filtres)"
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Mini Cards: Primary Session Info */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1.5 rounded-xl bg-black/60 border border-emerald-500/30 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{initialIngestionSession.id}</span>
            </div>

            <div className="hidden sm:flex px-2.5 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-white/70 items-center gap-1.5 shadow-md">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>{ocrResolution}</span>
            </div>

            <div className="px-2.5 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-white/80 flex items-center gap-1.5 shadow-md">
              <Layers className="w-3 h-3 text-emerald-400" />
              <span>{sessionDocsList.length} doc(s)</span>
            </div>
          </div>

        </div>

        {/* CENTER SECTION: NOTHING (Strictly empty as requested) */}
        <div className="flex-1" />

        {/* RIGHT SECTION: NOTHING (Strictly empty as requested) */}
        <div className="flex items-center gap-2" />

      </header>

      {/* 3. LIVE GUIDING HUD IN THE CENTER (Displays real-time instructions and progressive locks) */}
      {scanState === 'scanning' && (
        <div className="absolute inset-x-0 top-1/3 z-30 pointer-events-none flex flex-col items-center justify-center text-center px-6">
          <div className="p-3.5 px-5 rounded-2xl bg-black/75 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center gap-2 max-w-sm">
            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${lockProgress > 0 ? 'text-emerald-400 animate-pulse' : 'text-white/40'}`}>
              {lockProgress > 0 ? `Verrouillage en cours : ${lockProgress}%` : "Analyse du Flux Live"}
            </span>
            <p className="text-xs font-semibold text-white/90">
              {cvScores.statusMessage}
            </p>
            {lockProgress > 0 && (
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-75 shadow-[0_0_10px_#22c55e]"
                  style={{ width: `${lockProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3b. CONTINUOUS SCANNING LASER BEAM (Defiles top to bottom across entire screen) */}
      {scanState === 'scanning' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_35px_#22c55e,0_0_15px_#22c55e] animate-[fullscreenScan_3s_ease-in-out_infinite]">
            <div className="w-full h-36 bg-gradient-to-b from-emerald-500/25 via-emerald-500/05 to-transparent transform -translate-y-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_20px_#22c55e]" />
          </div>
        </div>
      )}

      {/* 4. INTERACTIVE AUTO-BOUNDING & CROPPING OVERLAY (CADRE DE ROGNAGE) */}
      {scanState === 'captured' && (
        <div className="absolute inset-0 z-30 pointer-events-auto flex items-center justify-center">
          
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none" />

          {/* Dynamic Interactive Crop Frame */}
          <div 
            className="absolute transition-all duration-150 border-2 border-emerald-400 shadow-[0_0_25px_rgba(34,197,94,0.8)] pointer-events-auto"
            style={{
              top: `${cropBounds.top}%`,
              bottom: `${cropBounds.bottom}%`,
              left: `${cropBounds.left}%`,
              right: `${cropBounds.right}%`,
            }}
          >
            {/* Rule of Thirds Grid inside Crop Box */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-emerald-400/20" />
              <div className="border-r border-b border-emerald-400/20" />
              <div className="border-b border-emerald-400/20" />
              <div className="border-r border-b border-emerald-400/20" />
              <div className="border-r border-b border-emerald-400/20" />
              <div className="border-b border-emerald-400/20" />
              <div className="border-r border-emerald-400/20" />
              <div className="border-r border-emerald-400/20" />
              <div className="" />
            </div>

            {/* Top Crop Dimensions Indicator */}
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-emerald-400 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-md shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Crop className="w-3 h-3 text-emerald-400" />
              <span>Cadre de Rognage : ({Math.round(100 - cropBounds.left - cropBounds.right)}% x {Math.round(100 - cropBounds.top - cropBounds.bottom)}%)</span>
              <button
                type="button"
                onClick={handleResetCrop}
                className="ml-1 text-white/50 hover:text-white transition-colors"
                title="Réinitialiser les coins"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Corner Handles */}
            <div 
              onClick={() => setCropBounds((p) => ({ ...p, top: Math.max(5, p.top - 2), left: Math.max(5, p.left - 2) }))}
              className="absolute -top-3 -left-3 w-6 h-6 rounded-md bg-emerald-400 border-2 border-white shadow-[0_0_12px_#22c55e] cursor-nwse-resize flex items-center justify-center group hover:scale-125 transition-transform"
              title="Ajuster Coin Supérieur Gauche"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>

            <div 
              onClick={() => setCropBounds((p) => ({ ...p, top: Math.max(5, p.top - 2), right: Math.max(5, p.right - 2) }))}
              className="absolute -top-3 -right-3 w-6 h-6 rounded-md bg-emerald-400 border-2 border-white shadow-[0_0_12px_#22c55e] cursor-nesw-resize flex items-center justify-center group hover:scale-125 transition-transform"
              title="Ajuster Coin Supérieur Droit"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>

            <div 
              onClick={() => setCropBounds((p) => ({ ...p, bottom: Math.max(5, p.bottom - 2), left: Math.max(5, p.left - 2) }))}
              className="absolute -bottom-3 -left-3 w-6 h-6 rounded-md bg-emerald-400 border-2 border-white shadow-[0_0_12px_#22c55e] cursor-nesw-resize flex items-center justify-center group hover:scale-125 transition-transform"
              title="Ajuster Coin Inférieur Gauche"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>

            <div 
              onClick={() => setCropBounds((p) => ({ ...p, bottom: Math.max(5, p.bottom - 2), right: Math.max(5, p.right - 2) }))}
              className="absolute -bottom-3 -right-3 w-6 h-6 rounded-md bg-emerald-400 border-2 border-white shadow-[0_0_12px_#22c55e] cursor-nwse-resize flex items-center justify-center group hover:scale-125 transition-transform"
              title="Ajuster Coin Inférieur Droit"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>

            {/* Edge Handles */}
            <div 
              onClick={() => setCropBounds((p) => ({ ...p, top: Math.max(5, p.top - 2) }))}
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-emerald-400/90 border border-white cursor-ns-resize shadow-[0_0_8px_#22c55e]"
            />
            <div 
              onClick={() => setCropBounds((p) => ({ ...p, bottom: Math.max(5, p.bottom - 2) }))}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-emerald-400/90 border border-white cursor-ns-resize shadow-[0_0_8px_#22c55e]"
            />
            <div 
              onClick={() => setCropBounds((p) => ({ ...p, left: Math.max(5, p.left - 2) }))}
              className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-10 rounded-full bg-emerald-400/90 border border-white cursor-ew-resize shadow-[0_0_8px_#22c55e]"
            />
            <div 
              onClick={() => setCropBounds((p) => ({ ...p, right: Math.max(5, p.right - 2) }))}
              className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-10 rounded-full bg-emerald-400/90 border border-white cursor-ew-resize shadow-[0_0_8px_#22c55e]"
            />

          </div>

        </div>
      )}

      {/* 5. TRANSLUCENT DISCRET RIGHT-SIDE SESSION DOCUMENTS LIST */}
      <aside className="fixed right-4 top-20 bottom-36 w-32 sm:w-40 z-40 flex flex-col gap-2 p-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 opacity-50 hover:opacity-100 transition-opacity duration-300 pointer-events-auto overflow-y-auto scrollbar-none shadow-2xl">
        <div className="flex items-center justify-between px-1 pb-1 border-b border-white/10">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Session ({sessionDocsList.length})
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {sessionDocsList.map((item, idx) => (
            <div 
              key={item.id}
              className="group relative flex flex-col p-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-emerald-500/25 transition-all animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <div className="relative w-full h-16 rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-emerald-300 font-bold border border-emerald-500/40">
                  #{sessionDocsList.length - idx}
                </div>
              </div>
              <span className="text-[10px] font-semibold text-white/90 truncate mt-1">
                {item.title}
              </span>
              <span className="text-[9px] text-white/40 font-mono">
                {item.timestamp}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* 6. BOTTOM-LEFT CORNER: REAL-TIME TECHNICAL METRICS & INTEL STATS */}
      <div className="absolute bottom-5 left-5 z-40 max-w-xs p-3.5 rounded-2xl bg-black/35 border border-white/10 hover:border-emerald-500/40 text-white/60 hover:text-white backdrop-blur-md opacity-45 hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl flex flex-col gap-2 font-mono text-[10px]">
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Moteur de Vision v2</span>
          </div>
          <span className="text-emerald-400 font-bold">60 FPS</span>
        </div>

        {/* Real dynamic computer vision scores */}
        <div className="flex flex-col gap-1 text-white/70">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-400" /> Contraste/Lum:</span>
            <span className={`font-bold ${cvScores.contrast >= 45 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
              {cvScores.contrast}% {cvScores.contrast >= 45 ? '✓' : '(Min 45%)'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1"><Focus className="w-3 h-3 text-emerald-400" /> Lisibilité/Texte:</span>
            <span className={`font-bold ${cvScores.readability >= 35 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
              {cvScores.readability}% {cvScores.readability >= 35 ? '✓' : '(Min 35%)'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3 text-teal-400" /> Cadrage/Align:</span>
            <span className={`font-bold ${cvScores.cadrage >= 50 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
              {cvScores.cadrage}% {cvScores.cadrage >= 50 ? '✓' : '(Min 50%)'}
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-1.5 mt-0.5 grid grid-cols-2 gap-x-2 text-[9px] text-white/40">
          <div>• Mode: <span className="text-white/60 font-semibold">{hasCamera ? 'Caméra' : 'Simulation CV'}</span></div>
          <div>• Résol: <span className="text-white/60 font-semibold">1080p HD</span></div>
        </div>
      </div>

      {/* 7. ACTION CONTROLS AT BOTTOM (RÉESSAYER | VALIDER | VALIDER ET QUITTER) */}
      {scanState === 'captured' && (
        <div className="absolute inset-x-0 bottom-6 z-50 flex flex-col items-center gap-3 px-4 sm:px-6 animate-in slide-in-from-bottom-6 duration-200">
          
          <div className="px-4 py-1.5 rounded-full bg-black/80 border border-emerald-400/60 backdrop-blur-md text-xs font-bold text-emerald-300 shadow-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>Document verrouillé & cadre de rognage prêt : {currentDocTitle}</span>
          </div>

          {/* THREE BUTTONS CONTROL BAR */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 w-full max-w-2xl flex-wrap sm:flex-nowrap">
            
            {/* 1. BUTTON RÉESSAYER */}
            <button
              type="button"
              onClick={handleRetry}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3.5 px-4 sm:px-5 rounded-2xl bg-black/80 hover:bg-black/90 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-xl shadow-2xl transition-all cursor-pointer hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Réessayer</span>
            </button>

            {/* 2. BUTTON VALIDER */}
            <button
              type="button"
              onClick={() => handleValidate(false)}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 px-4 sm:px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all cursor-pointer hover:scale-105"
            >
              <Check className="w-4 h-4 text-black stroke-[3]" />
              <span>Valider</span>
            </button>

            {/* 3. BUTTON VALIDER ET QUITTER */}
            <button
              type="button"
              onClick={() => handleValidate(true)}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3.5 px-4 sm:px-5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-black font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(45,212,191,0.6)] transition-all cursor-pointer hover:scale-105"
            >
              <FileCheck className="w-4 h-4 text-black" />
              <span>Valider et quitter</span>
            </button>

          </div>

        </div>
      )}

      {/* 8. SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#081512] border border-emerald-500/40 text-white shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col gap-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Settings2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">Paramètres du Scanner Live</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 font-semibold">Résolution d'analyse OCR</label>
                <select
                  value={ocrResolution}
                  onChange={(e) => setOcrResolution(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white outline-none focus:border-emerald-400"
                >
                  <option value="300 DPI (Ultra-HD)">300 DPI (Ultra-HD Haute Précision)</option>
                  <option value="200 DPI (Standard)">200 DPI (Standard)</option>
                  <option value="150 DPI (Rapide)">150 DPI (Rapide)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-white">Amélioration IA de Contraste</span>
                  <span className="text-[10px] text-white/50">Recadrage et nettoyage de fond automatique</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoEnhance}
                  onChange={(e) => setAutoEnhance(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playXboxSound('select');
                setIsSettingsOpen(false);
                if (onShowToast) onShowToast("Paramètres du scanner enregistrés", "info");
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all cursor-pointer"
            >
              Enregistrer et fermer
            </button>

          </div>
        </div>
      )}

      {/* FULLSCREEN LASER SCAN KEYFRAME */}
      <style>{`
        @keyframes fullscreenScan {
          0% { top: 0%; }
          50% { top: 98%; }
          100% { top: 0%; }
        }
      `}</style>

    </div>
  );
}
