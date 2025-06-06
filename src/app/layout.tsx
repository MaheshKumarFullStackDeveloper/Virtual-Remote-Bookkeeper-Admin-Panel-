"use client";

import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { store,persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import AuthCheck from './store/Provider/AuthProvider'
import {Toaster} from 'react-hot-toast'
import { Provider } from 'react-redux';
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
       
      <Provider store={store} >
    <PersistGate  persistor={persistor}>
    <Toaster/>
    <AuthCheck>
       <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </AuthCheck>
    </PersistGate>
   </Provider>
      
      </body>
    </html>
  );
}
