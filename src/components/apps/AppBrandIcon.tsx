import React from 'react';
import { 
  HardDrive, 
  Server, 
  Database, 
  Cloud, 
  FolderArchive, 
  Share2, 
  Globe, 
  FileText,
  Layers,
  Cpu
} from 'lucide-react';

interface AppBrandIconProps {
  type: string;
  className?: string;
}

export function AppBrandIcon({ type, className = "w-10 h-10" }: AppBrandIconProps) {
  switch (type) {
    case 'gdrive':
      return (
        <svg viewBox="0 0 87.3 78" className={className}>
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
          <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
          <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
          <path d="M43.65 25h27.5c-1.55-2.7-4.4-4.5-7.65-4.5H23.8c-3.25 0-6.1 1.8-7.65 4.5z" fill="#00832d"/>
          <path d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-13.75-23.8c-.8-1.4-1.95-2.5-3.3-3.3L55.3 45.2z" fill="#ffba00"/>
          <path d="M73.55 76.8c-1.35.8-2.9 1.2-4.5 1.2H18.25c-1.6 0-3.15-.4-4.5-1.2l13.75-23.8h32.3z" fill="#2684fc"/>
        </svg>
      );

    case 'gdrive-shared':
    case 'drive-partage':
      return (
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 87.3 78" className={className}>
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
            <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
            <path d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-13.75-23.8c-.8-1.4-1.95-2.5-3.3-3.3L55.3 45.2z" fill="#ffba00"/>
            <path d="M73.55 76.8c-1.35.8-2.9 1.2-4.5 1.2H18.25c-1.6 0-3.15-.4-4.5-1.2l13.75-23.8h32.3z" fill="#2684fc"/>
          </svg>
          <div className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-0.5 border border-white text-white">
            <Share2 className="w-2.5 h-2.5" />
          </div>
        </div>
      );

    case 'google-workspace':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
        </svg>
      );

    case 'onedrive':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path d="M14.5 12.2c2-2.3 5.4-2.8 7.9-1.2 2.5 1.6 3.6 4.6 2.6 7.4.8.1 1.6.4 2.3.9 1.7 1.2 2.7 3.2 2.7 5.3 0 3.5-2.9 6.4-6.4 6.4H8.4c-4.6 0-8.4-3.8-8.4-8.4 0-4.1 3-7.6 7.1-8.3.9-3.4 3.7-5.9 7.2-6.1.1 0 .2 0 .2 0z" fill="#0078D4"/>
          <path d="M21.5 17.5c2.8 0 5 2.2 5 5s-2.2 5-5 5h-13c-3.3 0-6-2.7-6-6 0-3 2.2-5.5 5.2-5.9.8-2.7 3.3-4.6 6.1-4.6 2.1 0 4 1 5.2 2.7.9-.7 2.1-1.2 3.5-1.2 3 0 5.4 2.3 5.5 5z" fill="#28A8EA"/>
        </svg>
      );

    case 'dropbox':
      return (
        <svg viewBox="0 0 40 40" className={className} fill="#0061FF">
          <path d="M12.5 8.5L20 13.5L12.5 18.5L5 13.5L12.5 8.5ZM27.5 8.5L35 13.5L27.5 18.5L20 13.5L27.5 8.5ZM5 23.5L12.5 28.5L20 23.5L12.5 18.5L5 23.5ZM35 23.5L27.5 18.5L20 23.5L27.5 28.5L35 23.5ZM20 25L12.5 30L20 35L27.5 30L20 25Z"/>
        </svg>
      );

    case 'sharepoint':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#008272] flex items-center justify-center text-white font-bold shadow-xs">
          <span className="text-lg">S</span>
        </div>
      );

    case 'icloud-photos':
      return (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-400 to-sky-400 flex items-center justify-center text-white shadow-xs p-1.5">
          <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5-1.2.7-2 2-2 3.5a4 4 0 0 0 8 0c0-1.5-.8-2.8-2-3.5 1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z"/>
            </svg>
          </div>
        </div>
      );

    case 'mega':
      return (
        <div className="w-10 h-10 rounded-full bg-[#D9272E] flex items-center justify-center text-white font-extrabold text-xl shadow-xs">
          M
        </div>
      );

    case 'google-photos':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#EA4335" d="M12 0a6 6 0 0 0-6 6v6h6a6 6 0 0 0 0-12z"/>
          <path fill="#4285F4" d="M24 12a6 6 0 0 0-6-6h-6v6a6 6 0 0 0 12 0z"/>
          <path fill="#34A853" d="M12 24a6 6 0 0 0 6-6v-6h-6a6 6 0 0 0 0 12z"/>
          <path fill="#FBBC05" d="M0 12a6 6 0 0 0 6 6h6v-6a6 6 0 0 0-12 0z"/>
        </svg>
      );

    case 'ftp':
      return (
        <div className="w-10 h-10 rounded-md bg-[#2B5797] flex flex-col items-center justify-center text-white text-[10px] font-bold shadow-xs">
          <Server className="w-4 h-4 mb-0.5" />
          <span>FTP</span>
        </div>
      );

    case 'box':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#0061D5] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-xs">
          box
        </div>
      );

    case 'pcloud':
      return (
        <div className="w-10 h-10 rounded-full bg-[#18A2B8] flex items-center justify-center text-white font-bold text-base shadow-xs">
          P
        </div>
      );

    case 'baidu':
      return (
        <div className="w-10 h-10 rounded-full bg-[#2932E1] flex items-center justify-center text-white font-bold text-base shadow-xs">
          度
        </div>
      );

    case 'flickr':
      return (
        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center gap-1 shadow-xs">
          <div className="w-3 h-3 rounded-full bg-[#0063DC]" />
          <div className="w-3 h-3 rounded-full bg-[#FF0084]" />
        </div>
      );

    case 'hidrive':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#FF6A00] flex items-center justify-center text-white font-bold shadow-xs">
          <HardDrive className="w-5 h-5" />
        </div>
      );

    case 'yandex':
      return (
        <div className="w-10 h-10 rounded-full bg-[#FC3F1D] flex items-center justify-center text-white font-extrabold text-base shadow-xs">
          Y
        </div>
      );

    case 'nas':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#334155] flex flex-col items-center justify-center text-white font-bold text-[9px] shadow-xs">
          <Database className="w-4 h-4 mb-0.5 text-sky-400" />
          <span>NAS</span>
        </div>
      );

    case 'mediafire':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#0070F0] flex items-center justify-center text-white font-black text-xs shadow-xs">
          <Cloud className="w-5 h-5" />
        </div>
      );

    case 'icloud-drive':
      return (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-xs">
          <Cloud className="w-5 h-5 fill-white text-white" />
        </div>
      );

    case 'webdav':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#1E293B] flex flex-col items-center justify-center text-white text-[9px] font-bold shadow-xs">
          <Globe className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>DAV</span>
        </div>
      );

    case '4shared':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#006699] flex items-center justify-center text-white font-bold text-sm shadow-xs">
          4s
        </div>
      );

    case 'icedrive':
      return (
        <div className="w-10 h-10 rounded-full bg-[#0092E4] flex items-center justify-center text-white font-bold shadow-xs">
          <Cloud className="w-5 h-5" />
        </div>
      );

    case 'evernote':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#00A82D] flex items-center justify-center text-white font-bold shadow-xs">
          <FileText className="w-5 h-5" />
        </div>
      );

    case 'wasabi':
      return (
        <div className="w-10 h-10 rounded-full bg-[#00D084] flex items-center justify-center text-white font-bold shadow-xs">
          <Cpu className="w-5 h-5 text-slate-900" />
        </div>
      );

    case 'amazon-s3':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#232F3E] border border-amber-500/40 flex flex-col items-center justify-center text-amber-400 text-[9px] font-bold shadow-xs">
          <Database className="w-4 h-4 text-amber-400" />
          <span>S3</span>
        </div>
      );

    case 'mysql':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#00758F] flex flex-col items-center justify-center text-white text-[9px] font-bold shadow-xs">
          <Database className="w-4 h-4 text-amber-300" />
          <span>MySQL</span>
        </div>
      );

    case 'egnyte':
      return (
        <div className="w-10 h-10 rounded-md bg-[#009999] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          EGN
        </div>
      );

    case 'idrive':
      return (
        <div className="w-10 h-10 rounded-md bg-[#005599] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          IDrive
        </div>
      );

    case 'putio':
      return (
        <div className="w-10 h-10 rounded-md bg-[#222222] flex items-center justify-center text-amber-400 font-black text-xs shadow-xs">
          PUT
        </div>
      );

    case 'adrive':
      return (
        <div className="w-10 h-10 rounded-md bg-[#1B365D] flex items-center justify-center text-sky-300 font-bold text-xs shadow-xs">
          ADrive
        </div>
      );

    case 'backblaze':
      return (
        <div className="w-10 h-10 rounded-md bg-[#CC0000] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          B2
        </div>
      );

    case 'sugarsync':
      return (
        <div className="w-10 h-10 rounded-md bg-[#84BD00] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          Sugar
        </div>
      );

    case 'hubic':
      return (
        <div className="w-10 h-10 rounded-md bg-[#1A73E8] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          HubiC
        </div>
      );

    case 'alfresco':
      return (
        <div className="w-10 h-10 rounded-lg bg-[#008080] flex items-center justify-center text-white shadow-xs">
          <FolderArchive className="w-5 h-5 text-teal-200" />
        </div>
      );

    default:
      return (
        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shadow-xs">
          <Cloud className="w-5 h-5" />
        </div>
      );
  }
}
