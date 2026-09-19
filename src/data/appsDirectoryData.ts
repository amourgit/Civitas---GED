export interface AppServiceItem {
  id: string;
  name: string;
  category: 'person' | 'enterprise';
  iconType: string;
  color?: string;
  badge?: string;
  description?: string;
  route?: string;
}

export const APPS_DIRECTORY: {
  personal: AppServiceItem[];
  enterprise: AppServiceItem[];
} = {
  personal: [
    { id: 'gdrive', name: 'Google Drive', category: 'person', iconType: 'gdrive' },
    { id: 'gdrive-shared', name: 'Partagé avec moi', category: 'person', iconType: 'gdrive-shared' },
    { id: 'onedrive', name: 'OneDrive', category: 'person', iconType: 'onedrive' },
    { id: 'dropbox', name: 'Dropbox', category: 'person', iconType: 'dropbox' },
    { id: 'icloud-photos', name: 'Photos iCloud', category: 'person', iconType: 'icloud-photos' },
    { id: 'mega', name: 'MEGA', category: 'person', iconType: 'mega' },
    { id: 'google-photos', name: 'Google Photos', category: 'person', iconType: 'google-photos' },
    { id: 'ftp', name: 'FTP', category: 'person', iconType: 'ftp' },
    { id: 'box', name: 'box', category: 'person', iconType: 'box' },
    { id: 'pcloud', name: 'pCloud', category: 'person', iconType: 'pcloud' },
    { id: 'baidu', name: 'BaiDu', category: 'person', iconType: 'baidu' },
    { id: 'sharepoint', name: 'SharePoint Online', category: 'person', iconType: 'sharepoint', badge: 'Recommandé' },
    { id: 'flickr', name: 'Flickr', category: 'person', iconType: 'flickr' },
    { id: 'hidrive', name: 'HiDrive', category: 'person', iconType: 'hidrive' },
    { id: 'yandex', name: 'Yandex', category: 'person', iconType: 'yandex' },
    { id: 'nas', name: 'NAS', category: 'person', iconType: 'nas' },
    { id: 'mediafire', name: 'MediaFire', category: 'person', iconType: 'mediafire' },
    { id: 'icloud-drive', name: 'iCloud Drive', category: 'person', iconType: 'icloud-drive' },
    { id: 'webdav', name: 'WebDAV', category: 'person', iconType: 'webdav' },
    { id: '4shared', name: '4shared', category: 'person', iconType: '4shared' },
    { id: 'icedrive', name: 'Icedrive', category: 'person', iconType: 'icedrive' },
    { id: 'evernote', name: 'Evernote', category: 'person', iconType: 'evernote' },
    { id: 'wasabi', name: 'Wasabi', category: 'person', iconType: 'wasabi' },
    { id: 'amazon-s3', name: 'Amazon S3', category: 'person', iconType: 'amazon-s3', badge: 'AWS' },
    { id: 'mysql', name: 'MySQL', category: 'person', iconType: 'mysql' },
    { id: 'egnyte', name: 'EGNYTE', category: 'person', iconType: 'egnyte' },
    { id: 'idrive', name: 'IDrive e2', category: 'person', iconType: 'idrive' },
    { id: 'putio', name: 'PUT.IO', category: 'person', iconType: 'putio' },
    { id: 'adrive', name: 'ADrive', category: 'person', iconType: 'adrive' },
    { id: 'backblaze', name: 'Backblaze B2', category: 'person', iconType: 'backblaze' },
    { id: 'sugarsync', name: 'SugarSync', category: 'person', iconType: 'sugarsync' },
    { id: 'hubic', name: 'HubiC', category: 'person', iconType: 'hubic' }
  ],
  enterprise: [
    { id: 'google-workspace', name: 'Google Workspace', category: 'enterprise', iconType: 'google-workspace' },
    { id: 'drive-partage', name: 'Drive partagé', category: 'enterprise', iconType: 'drive-partage' },
    { id: 'onedrive-business', name: 'OneDrive for Business', category: 'enterprise', iconType: 'onedrive' },
    { id: 'dropbox-business', name: 'Dropbox Business', category: 'enterprise', iconType: 'dropbox' },
    { id: 'box-business', name: 'box for Business', category: 'enterprise', iconType: 'box' },
    { id: 'sharepoint-business', name: 'SharePoint Enterprise', category: 'enterprise', iconType: 'sharepoint' },
    { id: 'alfresco-sgai', name: 'Alfresco SGAI (EGEN)', category: 'enterprise', iconType: 'alfresco', route: '/ged/sites' }
  ]
};
