import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultSettings = {
  theme: 'light',
  unit: 'feet',
  gridEnabled: true,
  snapToGrid: true,
  autoSave: true,
};

export const useSettingsStore = create()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme) => set({ theme }),
      setUnit: (unit) => set({ unit }),
      toggleGrid: () => set(state => ({ gridEnabled: !state.gridEnabled })),
      toggleSnapToGrid: () => set(state => ({ snapToGrid: !state.snapToGrid })),
      toggleAutoSave: () => set(state => ({ autoSave: !state.autoSave })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
);