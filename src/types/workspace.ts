import { NavItem } from '../components/shell/DropdownNavigation';
import { IntranetApp } from '../data/intranetAppsMock';

export type WorkspaceId = 'intranet' | 'extranet' | 'public' | 'personnel' | 'rh';

export interface Workspace {
  id: WorkspaceId;
  name: string;
  subtitle: string;
  badge: string;
  iconName: 'Users' | 'Globe' | 'Radio' | 'User' | 'Briefcase';
  navItems: NavItem[];
  apps: IntranetApp[];
}
