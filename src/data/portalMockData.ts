export interface SiteHeaderData {
  title: string;
  subtitle: string;
  avatarUrl?: string;
  isFollowing: boolean;
  memberCount: number;
  draftStatus: string;
}

export interface NavLinkItem {
  id: string;
  label: string;
  route?: string;
  icon?: string;
  hasChildren?: boolean;
  isExpanded?: boolean;
  children?: { id: string; label: string; route?: string }[];
}

export interface HeroMosaicTile {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  linkText?: string;
  route: string;
  size: 'large' | 'medium';
  position: 'hero-main' | 'mid-top' | 'mid-bottom' | 'right-top' | 'right-bottom';
}

export interface QuickLinkItem {
  id: string;
  title: string;
  iconName: 'megaphone' | 'graduation-cap' | 'briefcase' | 'files' | 'user' | 'calendar' | 'presentation' | 'receipt' | 'bus';
  route: string;
  color?: string;
}

export interface CalendarEventItem {
  id: string;
  month: string;
  day: string;
  weekday: string;
  title: string;
  time: string;
  location?: string;
  category?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'folder' | 'docx' | 'xlsx' | 'pptx' | 'pdf';
  modifiedDate: string;
  author: string;
  size?: string;
}

export const PORTAL_MOCK_DATA = {
  siteHeader: {
    title: "Contoso Electronics",
    subtitle: "Public group | General Purpose",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isFollowing: true,
    memberCount: 13,
    draftStatus: "Draft saved 1/25/2019",
  },
  
  navigation: [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'meet-team', label: 'Meet the team', route: '/annuaire' },
    { id: 'tracker', label: 'Team Tracker', route: '/projets' },
    { 
      id: 'customer-scripts', 
      label: 'Guides & Scripts', 
      hasChildren: true, 
      isExpanded: true,
      children: [
        { id: 'script-1', label: 'Onboarding flows', route: '/ged/sites' },
        { id: 'script-2', label: 'Escalation matrix', route: '/ged/sites' }
      ]
    },
    { id: 'expense-reporting', label: 'Expense reporting', route: '/rh' },
    { id: 'work-guides', label: 'Work@Contoso Guides', route: '/ged/depots' },
    { id: 'calendar', label: 'Calendar', route: '/calendrier' },
    { id: 'documents', label: 'Documents', route: '/ged' },
    { id: 'notebook', label: 'Notebook', route: '/actualites' },
    { id: 'recycle-bin', label: 'Recycle bin', route: '/ged/suivi' },
  ] as NavLinkItem[],

  heroTiles: [
    {
      id: 'hero-main',
      title: 'Communicating Strategic Value',
      category: 'CONTOSO',
      linkText: 'Learn more →',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=85',
      route: '/ged',
      size: 'large',
      position: 'hero-main',
    },
    {
      id: 'mid-top',
      title: 'Nominate a project for the sales leadership award',
      imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=85',
      route: '/actualites',
      size: 'medium',
      position: 'mid-top',
    },
    {
      id: 'mid-bottom',
      title: 'How machine learning can drive retail sales',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=85',
      route: '/ged/recherche',
      size: 'medium',
      position: 'mid-bottom',
    },
    {
      id: 'right-top',
      title: '5 best tips for salespeople',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=85',
      route: '/actualites',
      size: 'medium',
      position: 'right-top',
    },
    {
      id: 'right-bottom',
      title: 'One Million Drones Sold in Q4',
      imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=85',
      route: '/ged/pilotage',
      size: 'medium',
      position: 'right-bottom',
    },
  ] as HeroMosaicTile[],

  quickLinks: [
    { id: 'ql-1', title: 'Global Portal', iconName: 'megaphone', route: '/projets' },
    { id: 'ql-2', title: 'FlySafe e-learning', iconName: 'graduation-cap', route: '/ged/depots' },
    { id: 'ql-3', title: 'Service policies', iconName: 'briefcase', route: '/ged/documentation/salles' },
    { id: 'ql-4', title: 'Consumer reports', iconName: 'files', route: '/ged/pilotage' },
    { id: 'ql-5', title: 'Status reports', iconName: 'user', route: '/suivi' },
    { id: 'ql-6', title: 'Financial calendar', iconName: 'calendar', route: '/calendrier' },
    { id: 'ql-7', title: 'Branded templates', iconName: 'presentation', route: '/ged/sites' },
    { id: 'ql-8', title: 'Expense reporting', iconName: 'receipt', route: '/rh' },
    { id: 'ql-9', title: 'Contoso shuttle', iconName: 'bus', route: '/annuaire' },
  ] as QuickLinkItem[],

  calendarEvents: [
    {
      id: 'ev-1',
      month: 'Mar',
      day: '6',
      weekday: 'Wed',
      title: 'CPS team meeting',
      time: '11:00 AM',
      location: 'Conf Room Stevens',
      category: 'Meeting'
    },
    {
      id: 'ev-2',
      month: 'Mar',
      day: '12',
      weekday: 'Tue',
      title: 'GCM team lunch',
      time: '12:00 PM',
      location: 'Contoso Cafeteria 2F',
      category: 'Social'
    },
    {
      id: 'ev-3',
      month: 'Mar',
      day: '19',
      weekday: 'Thu',
      title: 'Strategy Review & Roadmap Q2',
      time: '02:30 PM',
      location: 'Executive Boardroom',
      category: 'Strategic'
    }
  ] as CalendarEventItem[],

  documents: [
    {
      id: 'doc-1',
      name: 'Email attachments',
      type: 'folder',
      modifiedDate: 'Hier à 16:45',
      author: 'Nestor Wilke',
      size: '4 éléments'
    },
    {
      id: 'doc-2',
      name: 'Contoso Annual Report [Draft].docx',
      type: 'docx',
      modifiedDate: '25 Janv. 2026',
      author: 'Patti Fernandez',
      size: '2.4 MB'
    },
    {
      id: 'doc-3',
      name: 'Contoso Annual Report.docx',
      type: 'docx',
      modifiedDate: '18 Janv. 2026',
      author: 'Henriette de Lamber',
      size: '3.1 MB'
    },
    {
      id: 'doc-4',
      name: 'Contoso Company Goals Q1 - Q4.docx',
      type: 'docx',
      modifiedDate: '10 Janv. 2026',
      author: 'Amour Samuel NZILA NGALA',
      size: '1.8 MB'
    },
    {
      id: 'doc-5',
      name: 'Corporate Overview.pptx',
      type: 'pptx',
      modifiedDate: '05 Janv. 2026',
      author: 'Grady Archie',
      size: '14.2 MB'
    }
  ] as DocumentItem[],
};
