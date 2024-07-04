'use client';

import '@/styles/react-toastify.css';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: ReactNode;
}

export default function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <ToastContainer autoClose={2500} hideProgressBar newestOnTop />
    </>
  );
}
