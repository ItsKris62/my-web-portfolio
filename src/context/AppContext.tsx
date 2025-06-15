import { createContext, ReactNode, useContext, useState } from 'react'

interface AppContextType { locale: string; setLocale: (loc: string) => void }
const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')
  return <AppContext.Provider value={{ locale, setLocale }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}