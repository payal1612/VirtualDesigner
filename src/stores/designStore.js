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
          name: 'Scandinavian Living Room',
          description: 'Clean, minimalist design with natural wood and neutral tones',
          thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'wall_1',
              type: 'wall',
              x: 50,
              y: 50,
              width: 300,
              height: 20,
              rotation: 0,
              color: '#F9F5E7',
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
              color: '#F9F5E7',
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
              color: '#EDDBC7',
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
              color: '#F8EAD8',
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
          rating: 4.9,
          downloads: 2847
        },
        {
          id: 'template_2',
          name: 'Modern Master Bedroom',
          description: 'Luxurious master bedroom with walk-in closet and reading nook',
          thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'bed_1',
              type: 'bed',
              x: 100,
              y: 150,
              width: 140,
              height: 80,
              rotation: 0,
              color: '#A7727D',
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
              color: '#F8EAD8',
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
              color: '#EDDBC7',
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
              color: '#F8EAD8',
              name: 'Dresser',
              opacity: 1,
              locked: false
            },
            {
              id: 'chair_1',
              type: 'furniture',
              x: 300,
              y: 100,
              width: 50,
              height: 50,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Reading Chair',
              opacity: 1,
              locked: false
            }
          ],
          category: 'bedroom',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.8,
          downloads: 1923
        },
        {
          id: 'template_3',
          name: 'Home Office Studio',
          description: 'Professional home office with creative workspace and storage',
          thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'desk_1',
              type: 'desk',
              x: 100,
              y: 100,
              width: 120,
              height: 60,
              rotation: 0,
              color: '#F8EAD8',
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
              color: '#A7727D',
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
              color: '#EDDBC7',
              name: 'Bookshelf',
              opacity: 1,
              locked: false
            },
            {
              id: 'storage_1',
              type: 'furniture',
              x: 280,
              y: 80,
              width: 60,
              height: 40,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Storage Cabinet',
              opacity: 1,
              locked: false
            }
          ],
          category: 'office',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.7,
          downloads: 1456
        },
        {
          id: 'template_4',
          name: 'Chef\'s Kitchen',
          description: 'Professional-grade kitchen with large island and premium appliances',
          thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'island_1',
              type: 'kitchen',
              x: 150,
              y: 150,
              width: 120,
              height: 80,
              rotation: 0,
              color: '#A7727D',
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
              color: '#F8EAD8',
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
              color: '#EDDBC7',
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
              color: '#F8EAD8',
              name: 'Stove',
              opacity: 1,
              locked: false
            }
          ],
          category: 'kitchen',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.8,
          downloads: 2103
        },
        {
          id: 'template_5',
          name: 'Industrial Loft Living',
          description: 'Urban loft with exposed elements and modern industrial design',
          thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'sofa_1',
              type: 'furniture',
              x: 120,
              y: 180,
              width: 140,
              height: 70,
              rotation: 0,
              color: '#A7727D',
              name: 'Sectional Sofa',
              opacity: 1,
              locked: false
            },
            {
              id: 'table_1',
              type: 'furniture',
              x: 160,
              y: 130,
              width: 80,
              height: 50,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Industrial Coffee Table',
              opacity: 1,
              locked: false
            },
            {
              id: 'bookshelf_1',
              type: 'furniture',
              x: 50,
              y: 80,
              width: 50,
              height: 150,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Metal Bookshelf',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_1',
              type: 'plant',
              x: 300,
              y: 200,
              width: 40,
              height: 40,
              rotation: 0,
              color: '#16A34A',
              name: 'Large Plant',
              opacity: 1,
              locked: false
            },
            {
              id: 'light_1',
              type: 'light',
              x: 200,
              y: 80,
              width: 30,
              height: 30,
              rotation: 0,
              color: '#F59E0B',
              name: 'Pendant Light',
              opacity: 1,
              locked: false
            }
          ],
          category: 'living',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.6,
          downloads: 1678
        },
        {
          id: 'template_6',
          name: 'Cozy Reading Nook',
          description: 'Perfect corner for reading with comfortable seating and good lighting',
          thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'chair_1',
              type: 'furniture',
              x: 150,
              y: 150,
              width: 80,
              height: 80,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Reading Chair',
              opacity: 1,
              locked: false
            },
            {
              id: 'table_1',
              type: 'furniture',
              x: 200,
              y: 180,
              width: 40,
              height: 40,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Side Table',
              opacity: 1,
              locked: false
            },
            {
              id: 'bookshelf_1',
              type: 'furniture',
              x: 100,
              y: 80,
              width: 40,
              height: 120,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Book Storage',
              opacity: 1,
              locked: false
            },
            {
              id: 'light_1',
              type: 'light',
              x: 180,
              y: 120,
              width: 25,
              height: 25,
              rotation: 0,
              color: '#F59E0B',
              name: 'Reading Lamp',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_1',
              type: 'plant',
              x: 250,
              y: 200,
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
          rating: 4.7,
          downloads: 892
        },
        {
          id: 'template_7',
          name: 'Modern Bathroom Spa',
          description: 'Luxurious spa-like bathroom with modern fixtures and clean lines',
          thumbnail: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'bathtub_1',
              type: 'bathroom',
              x: 100,
              y: 100,
              width: 120,
              height: 60,
              rotation: 0,
              color: '#F9F5E7',
              name: 'Freestanding Tub',
              opacity: 1,
              locked: false
            },
            {
              id: 'vanity_1',
              type: 'bathroom',
              x: 250,
              y: 150,
              width: 80,
              height: 50,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Double Vanity',
              opacity: 1,
              locked: false
            },
            {
              id: 'shower_1',
              type: 'bathroom',
              x: 50,
              y: 200,
              width: 60,
              height: 60,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Walk-in Shower',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_1',
              type: 'plant',
              x: 300,
              y: 100,
              width: 25,
              height: 25,
              rotation: 0,
              color: '#16A34A',
              name: 'Bathroom Plant',
              opacity: 1,
              locked: false
            }
          ],
          category: 'bathroom',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.8,
          downloads: 1234
        },
        {
          id: 'template_8',
          name: 'Kids Playroom',
          description: 'Fun and safe playroom design with storage and play areas',
          thumbnail: 'https://images.pexels.com/photos/6444/pencil-crayon-color-colorful.jpg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'toy_storage_1',
              type: 'furniture',
              x: 80,
              y: 80,
              width: 100,
              height: 40,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Toy Storage',
              opacity: 1,
              locked: false
            },
            {
              id: 'play_table_1',
              type: 'furniture',
              x: 200,
              y: 150,
              width: 80,
              height: 60,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Play Table',
              opacity: 1,
              locked: false
            },
            {
              id: 'bookshelf_1',
              type: 'furniture',
              x: 50,
              y: 150,
              width: 40,
              height: 80,
              rotation: 0,
              color: '#F9F5E7',
              name: 'Book Shelf',
              opacity: 1,
              locked: false
            },
            {
              id: 'chair_1',
              type: 'furniture',
              x: 220,
              y: 220,
              width: 40,
              height: 40,
              rotation: 0,
              color: '#A7727D',
              name: 'Kids Chair',
              opacity: 1,
              locked: false
            }
          ],
          category: 'child',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.5,
          downloads: 756
        },
        {
          id: 'template_9',
          name: 'Dining Room Elegance',
          description: 'Elegant dining room perfect for entertaining guests',
          thumbnail: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'dining_table_1',
              type: 'furniture',
              x: 150,
              y: 150,
              width: 120,
              height: 80,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Dining Table',
              opacity: 1,
              locked: false
            },
            {
              id: 'chair_1',
              type: 'furniture',
              x: 130,
              y: 120,
              width: 40,
              height: 40,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Dining Chair 1',
              opacity: 1,
              locked: false
            },
            {
              id: 'chair_2',
              type: 'furniture',
              x: 190,
              y: 120,
              width: 40,
              height: 40,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Dining Chair 2',
              opacity: 1,
              locked: false
            },
            {
              id: 'cabinet_1',
              type: 'furniture',
              x: 80,
              y: 200,
              width: 80,
              height: 50,
              rotation: 0,
              color: '#A7727D',
              name: 'Sideboard',
              opacity: 1,
              locked: false
            },
            {
              id: 'light_1',
              type: 'light',
              x: 180,
              y: 100,
              width: 30,
              height: 30,
              rotation: 0,
              color: '#F59E0B',
              name: 'Chandelier',
              opacity: 1,
              locked: false
            }
          ],
          category: 'dining',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.6,
          downloads: 1345
        },
        {
          id: 'template_10',
          name: 'Outdoor Patio Paradise',
          description: 'Beautiful outdoor living space with seating and dining areas',
          thumbnail: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
          elements: [
            {
              id: 'outdoor_sofa_1',
              type: 'furniture',
              x: 100,
              y: 180,
              width: 120,
              height: 60,
              rotation: 0,
              color: '#EDDBC7',
              name: 'Outdoor Sofa',
              opacity: 1,
              locked: false
            },
            {
              id: 'outdoor_table_1',
              type: 'furniture',
              x: 140,
              y: 130,
              width: 60,
              height: 40,
              rotation: 0,
              color: '#F8EAD8',
              name: 'Coffee Table',
              opacity: 1,
              locked: false
            },
            {
              id: 'dining_set_1',
              type: 'furniture',
              x: 250,
              y: 100,
              width: 80,
              height: 80,
              rotation: 0,
              color: '#A7727D',
              name: 'Outdoor Dining Set',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_1',
              type: 'plant',
              x: 80,
              y: 100,
              width: 35,
              height: 35,
              rotation: 0,
              color: '#16A34A',
              name: 'Outdoor Plant',
              opacity: 1,
              locked: false
            },
            {
              id: 'plant_2',
              type: 'plant',
              x: 320,
              y: 200,
              width: 30,
              height: 30,
              rotation: 0,
              color: '#16A34A',
              name: 'Corner Plant',
              opacity: 1,
              locked: false
            }
          ],
          category: 'outdoor',
          isTemplate: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4.7,
          downloads: 987
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