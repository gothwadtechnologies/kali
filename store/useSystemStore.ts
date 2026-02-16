
import { create } from 'zustand';
import { SystemState, WindowState, AppId, FileNode } from '../types';
import { INITIAL_VFS } from '../constants';

interface SystemStore extends SystemState {
  openApp: (appId: AppId, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  setPath: (path: string[]) => void;
  updateVFS: (newVFS: FileNode) => void;
}

export const useSystemStore = create<SystemStore>((set, get) => ({
  user: 'kali',
  hostname: 'kali',
  currentPath: ['home', 'kali'],
  vfs: INITIAL_VFS,
  openWindows: [],
  focusedWindowId: null,
  wallpaper: 'cmatrix',

  openApp: (appId, title) => {
    const { openWindows } = get();
    const id = `${appId}-${Date.now()}`;
    const maxZ = openWindows.length > 0 ? Math.max(...openWindows.map(w => w.zIndex)) : 10;
    
    const newWindow: WindowState = {
      id,
      appId,
      title,
      isMinimized: false,
      zIndex: maxZ + 1,
      position: { x: 100 + openWindows.length * 30, y: 100 + openWindows.length * 30 }
    };

    set({
      openWindows: [...openWindows, newWindow],
      focusedWindowId: id
    });
  },

  closeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.filter((w) => w.id !== id),
    focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
  })),

  minimizeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.map((w) => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    )
  })),

  focusWindow: (id) => set((state) => {
    const maxZ = state.openWindows.length > 0 ? Math.max(...state.openWindows.map(w => w.zIndex)) : 10;
    return {
      focusedWindowId: id,
      openWindows: state.openWindows.map((w) => 
        w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
      )
    };
  }),

  updateWindowPosition: (id, x, y) => set((state) => ({
    openWindows: state.openWindows.map((w) => 
      w.id === id ? { ...w, position: { x, y } } : w
    )
  })),

  setPath: (path) => set({ currentPath: path }),
  updateVFS: (newVFS) => set({ vfs: newVFS }),
}));
