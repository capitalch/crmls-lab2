// GlobalContext is used in /pages/Main.tsx
import { createContext } from 'react'

export type GlobalContextType = {
  office: {
    standardSelect: {
      [key: string]: (crit?: any) => void
    }
    isReadOnly: boolean
  }
  app: {
    aorID: string | undefined
  }
  contact: {
    isReadOnly: boolean
  }
  member: {
    isReadOnly: boolean
  }
}

export const GlobalContext = createContext<GlobalContextType>({
  office: {
    standardSelect: {
      brandID: () => {},
      dbaid: () => {}
    },
    isReadOnly: false
  },
  app: {
    aorID: undefined
  },
  contact: {
    isReadOnly: false
  },
  member: {
    isReadOnly: false
  }
})

export const GlobalContextInitialValue: GlobalContextType = {
  office: {
    standardSelect: {
      brandID: () => {},
      dbaid: () => {}
    },
    isReadOnly: false
  },
  app: {
    aorID: undefined
  },
  contact: {
    isReadOnly: false
  },
  member: {
    isReadOnly: false
  }
}
