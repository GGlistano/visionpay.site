export interface User {
  name: string;
  phone: string;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  country: string;
  paymentMethod: PaymentMethod;
  accountDetails: AccountDetails;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: Date;
}

export type PaymentMethod = 'mpesa' | 'emola' | 'mkesh' | 'bci' | 'millennium';

export interface AccountDetails {
  accountNumber: string;
  accountHolder: string;
}

export type TabType = 'home' | 'withdrawal' | 'profile';