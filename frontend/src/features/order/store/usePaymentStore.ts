import { create } from 'zustand';

type PaymentOption = 'STRIPE' | 'CASH_ON_DELIVERY';

interface PaymentStore {
  selectedMethod: PaymentOption;
  setPaymentMethod: (method: PaymentOption) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  selectedMethod: 'CASH_ON_DELIVERY',
  setPaymentMethod: (method) => set({ selectedMethod: method }),
}));
