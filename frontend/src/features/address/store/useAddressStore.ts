import { create } from 'zustand';
import type { Address } from '../types';

type View = 'display' | 'form' | 'selection';

type AddressStoreState = {
  addresses: Address[];
  selectedAddressId: string | null;
  tempSelectedId: string | null;
  view: View;

  setAddresses: (addresses: Address[]) => void;
  selectAddress: (id: string) => void;
  confirmSelection: () => void;
  cancelSelection: () => void;

  showAddressForm: () => void;
  showAddressSelection: () => void;
  showSelectedAddress: () => void;
};

export const useAddressStore = create<AddressStoreState>((set) => ({
  addresses: [],
  selectedAddressId: null,
  tempSelectedId: null,
  view: 'display',

  setAddresses: (addresses) => set({ addresses }),

  selectAddress: (id) =>
    set((state) =>
      state.view === 'selection'
        ? { tempSelectedId: id }
        : { selectedAddressId: id }
    ),

  confirmSelection: () =>
    set((state) => ({
      selectedAddressId: state.tempSelectedId ?? state.selectedAddressId,
      tempSelectedId: null,
      view: 'display',
    })),

  cancelSelection: () => set({ tempSelectedId: null, view: 'display' }),

  showAddressForm: () => set({ view: 'form' }),
  showAddressSelection: () => set({ view: 'selection' }),
  showSelectedAddress: () => set({ view: 'display' }),
}));
