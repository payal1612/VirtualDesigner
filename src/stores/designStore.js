import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDesignStore = create()(
  persist(
    (set, get) => ({
      currentDesign: null,
      savedDesigns: [],
      templates: [
        {
          id: 'template_1',
          name: 'Modern Living Room',
          description: 'A contemporary living space with clean lines and minimalist furniture',
          elements: [
            {
              id: 'wall_1',
              type: 'wall',
              x: 50,
              y: 50,
              width: 300,
              height: 20,
              rotation: 0,
              color: '#E5E7EB',
              name: 'North Wall',
              opacity: 1,
              locked: false
            },
            {
              id: 'wall_2',
              type: 'wall',
              x: 50,
              y: 250,
              width: 300,
              height: 20,
              rotation: 0,
              color: '#E5E7EB',
              name: 'South Wall',
              opacity: 1,
              locked: false
            },
            {
              id: 'sofa_1',
              type: 'furniture',
              x: 150,
              y: 200,
              width: 120,
              height: 60,
              rotation: 0,
              color: '#8B5CF6',
              name: 'Main Sofa',
              opacity: 1,
              locked: false
            },
            {
              id: 'table_1',
              type: 'furniture',
              x: 180,
              y: 150,
              width: 60,
              height: 40,
              rotation: 0,
              color: '#92400E',
              name: 'Coffee Table',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_1',
              type: 'plant',
              x: 280,
              y: 180,
              width: 30,
              height: 30,
              rotation: 0,
              color: '#16A34A',
              name: 'Corner Plant',
              opacity: 1,
              locked: false
            }
          ],
          category: 'living',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.8,
          downloads: 342
        },
        {
          id: 'template_2',
          name: 'Cozy Bedroom',
          description: 'A warm and inviting bedroom layout with essential furniture',
          elements: [
            {
              id: 'bed_1',
              type: 'bed',
              x: 100,
              y: 150,
              width: 140,
              height: 80,
              rotation: 0,
              color: '#059669',
              name: 'Queen Bed',
              opacity: 1,
              locked: false
            },
            {
              id: 'nightstand_1',
              type: 'furniture',
              x: 250,
              y: 160,
              width: 40,
              height: 30,
              rotation: 0,
              color: '#92400E',
              name: 'Nightstand',
              opacity: 1,
              locked: false
            },
            {
              id: 'window_1',
              type: 'window',
              x: 200,
              y: 50,
              width: 80,
              height: 20,
              rotation: 0,
              color: '#3B82F6',
              name: 'Bedroom Window',
              opacity: 1,
              locked: false
            },
            {
              id: 'dresser_1',
              type: 'furniture',
              x: 50,
              y: 100,
              width: 80,
              height: 40,
              rotation: 0,
              color: '#7C2D12',
              name: 'Dresser',
              opacity: 1,
              locked: false
            }
          ],
          category: 'bedroom',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.6,
          downloads: 289
        },
        {
          id: 'template_3',
          name: 'Minimalist Office',
          description: 'Clean and productive workspace design for maximum focus',
          elements: [
            {
              id: 'desk_1',
              type: 'desk',
              x: 100,
              y: 100,
              width: 120,
              height: 60,
              rotation: 0,
              color: '#7C2D12',
              name: 'Work Desk',
              opacity: 1,
              locked: false
            },
            {
              id: 'chair_1',
              type: 'furniture',
              x: 130,
              y: 180,
              width: 50,
              height: 50,
              rotation: 0,
              color: '#374151',
              name: 'Office Chair',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_1',
              type: 'plant',
              x: 250,
              y: 120,
              width: 30,
              height: 30,
              rotation: 0,
              color: '#16A34A',
              name: 'Desk Plant',
              opacity: 1,
              locked: false
            },
            {
              id: 'bookshelf_1',
              type: 'furniture',
              x: 50,
              y: 80,
              width: 40,
              height: 120,
              rotation: 0,
              color: '#92400E',
              name: 'Bookshelf',
              opacity: 1,
              locked: false
            }
          ],
          category: 'office',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.9,
          downloads: 156
        },
        {
          id: 'template_4',
          name: 'Luxury Kitchen',
          description: 'High-end kitchen with island and premium appliances',
          elements: [
            {
              id: 'island_1',
              type: 'kitchen',
              x: 150,
              y: 150,
              width: 120,
              height: 80,
              rotation: 0,
              color: '#DC2626',
              name: 'Kitchen Island',
              opacity: 1,
              locked: false
            },
            {
              id: 'counter_1',
              type: 'kitchen',
              x: 50,
              y: 50,
              width: 200,
              height: 60,
              rotation: 0,
              color: '#92400E',
              name: 'Main Counter',
              opacity: 1,
              locked: false
            },
            {
              id: 'fridge_1',
              type: 'kitchen',
              x: 280,
              y: 60,
              width: 50,
              height: 40,
              rotation: 0,
              color: '#6B7280',
              name: 'Refrigerator',
              opacity: 1,
              locked: false
            },
            {
              id: 'stove_1',
              type: 'kitchen',
              x: 100,
              y: 60,
              width: 60,
              height: 40,
              rotation: 0,
              color: '#374151',
              name: 'Stove',
              opacity: 1,
              locked: false
            }
          ],
          category: 'kitchen',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.7,
          downloads: 203
        }
      ],
      selectedElement: null,
      viewMode: '2d',
      isLoading: false,

      createNewDesign: (name) => {
        const newDesign = {
          id: `design_${Date.now()}`,
          name,
          description: '',
          elements: [],
          isTemplate: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        set({ currentDesign: newDesign, selectedElement: null });
      },

      // Add element to current design
      addElement: (element) => {
        const { currentDesign } = get();
        if (!currentDesign) return;

        const newElement = {
          ...element,
          id: `element_${Date.now()}`,
          opacity: element.opacity || 1,
          locked: element.locked || false
        };

        const updatedDesign = {
          ...currentDesign,
          elements: [...currentDesign.elements, newElement],
          updatedAt: new Date()
        };

        set({ currentDesign: updatedDesign });
      },

      // Update element properties
      updateElement: (id, updates) => {
        const { currentDesign, selectedElement } = get();
        if (!currentDesign) return;

        const updatedElements = currentDesign.elements.map(el =>
          el.id === id ? { ...el, ...updates } : el
        );

        const updatedDesign = {
          ...currentDesign,
          elements: updatedElements,
          updatedAt: new Date()
        };

        const updatedSelectedElement = selectedElement?.id === id 
          ? { ...selectedElement, ...updates }
          : selectedElement;

        set({ 
          currentDesign: updatedDesign,
          selectedElement: updatedSelectedElement
        });
      },

      // Delete element from design
      deleteElement: (id) => {
        const { currentDesign, selectedElement } = get();
        if (!currentDesign) return;

        const updatedElements = currentDesign.elements.filter(el => el.id !== id);
        const updatedDesign = {
          ...currentDesign,
          elements: updatedElements,
          updatedAt: new Date()
        };

        set({ 
          currentDesign: updatedDesign,
          selectedElement: selectedElement?.id === id ? null : selectedElement
        });
      },

      // Select element for editing
      selectElement: (id) => {
        const { currentDesign } = get();
        if (!currentDesign) return;

        const element = id ? currentDesign.elements.find(el => el.id === id) || null : null;
        set({ selectedElement: element });
      },

      // Save current design to saved designs
      saveCurrentDesign: () => {
        const { currentDesign, savedDesigns } = get();
        if (!currentDesign) return;

        const updatedDesign = {
          ...currentDesign,
          updatedAt: new Date()
        };

        const existingIndex = savedDesigns.findIndex(d => d.id === currentDesign.id);
        let updatedSavedDesigns;

        if (existingIndex >= 0) {
          // Update existing design
          updatedSavedDesigns = [...savedDesigns];
          updatedSavedDesigns[existingIndex] = updatedDesign;
        } else {
          // Add new design
          updatedSavedDesigns = [updatedDesign, ...savedDesigns];
        }

        set({ 
          currentDesign: updatedDesign,
          savedDesigns: updatedSavedDesigns
        });

        return updatedDesign;
      },

      // Load design into current design
      loadDesign: (design) => {
        // Create a deep copy to avoid reference issues
        const designCopy = JSON.parse(JSON.stringify(design));
        set({ currentDesign: designCopy, selectedElement: null });
      },

      // Delete saved design
      deleteDesign: (id) => {
        const { savedDesigns, currentDesign } = get();
        const updatedSavedDesigns = savedDesigns.filter(d => d.id !== id);
        
        // If the deleted design is currently loaded, clear it
        const updatedCurrentDesign = currentDesign?.id === id ? null : currentDesign;
        
        set({ 
          savedDesigns: updatedSavedDesigns,
          currentDesign: updatedCurrentDesign,
          selectedElement: updatedCurrentDesign ? get().selectedElement : null
        });
      },

      // Duplicate existing design
      duplicateDesign: (design) => {
        const { savedDesigns } = get();
        const newDesign = {
          ...design,
          id: `design_${Date.now()}`,
          name: `${design.name} Copy`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        set({ 
          savedDesigns: [newDesign, ...savedDesigns]
        });
        
        return newDesign;
      },

      // Set view mode (2d or 3d)
      setViewMode: (mode) => {
        set({ viewMode: mode });
      },

      fetchSavedDesigns: () => {
        // This would normally fetch from a database
        // For now, designs are persisted in localStorage via zustand persist
      },

      fetchTemplates: () => {
        // Templates are now hardcoded in the store
        // This function exists for compatibility
      },

      // Bulk operations
      deleteMultipleDesigns: (ids) => {
        const { savedDesigns, currentDesign } = get();
        const updatedSavedDesigns = savedDesigns.filter(d => !ids.includes(d.id));
        
        // If the current design is being deleted, clear it
        const updatedCurrentDesign = currentDesign && ids.includes(currentDesign.id) ? null : currentDesign;
        
        set({ 
          savedDesigns: updatedSavedDesigns,
          currentDesign: updatedCurrentDesign,
          selectedElement: updatedCurrentDesign ? get().selectedElement : null
        });
      },

      // Search and filter
      searchDesigns: (query) => {
        const { savedDesigns } = get();
        if (!query.trim()) return savedDesigns;
        
        return savedDesigns.filter(design => 
          design.name.toLowerCase().includes(query.toLowerCase()) ||
          design.description?.toLowerCase().includes(query.toLowerCase())
        );
      },

      // Statistics
      getDesignStats: () => {
        const { savedDesigns } = get();
        return {
          totalDesigns: savedDesigns.length,
          totalElements: savedDesigns.reduce((sum, design) => sum + design.elements.length, 0),
          averageElements: savedDesigns.length > 0 
            ? Math.round(savedDesigns.reduce((sum, design) => sum + design.elements.length, 0) / savedDesigns.length)
            : 0,
          lastUpdated: savedDesigns.length > 0 
            ? new Date(Math.max(...savedDesigns.map(d => new Date(d.updatedAt))))
            : null
        };
      }
    }),
    {
      name: 'design-storage',
      partialize: (state) => ({
        currentDesign: state.currentDesign,
        savedDesigns: state.savedDesigns,
        viewMode: state.viewMode
      })
    }
  )
);