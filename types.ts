
export type AppId = 'terminal' | 'fileExplorer' | 'browser' | 'settings' | 'metasploit';

export interface FileNode {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  children?: FileNode[];
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface SystemState {
  user: string;
  hostname: string;
  currentPath: string[];
  vfs: FileNode;
  openWindows: WindowState[];
  focusedWindowId: string | null;
  wallpaper: string;
}
