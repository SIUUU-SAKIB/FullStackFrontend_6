import { createContext, useState, type ReactNode} from "react";


interface ContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  trcNum: string;
  setTrcNum: React.Dispatch<React.SetStateAction<string>>;
}

export const contextApi = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>('');
  const [trcNum, setTrcNum] = useState<string>('');

  const values = {
    userId,
    setUserId,
    trcNum,
    setTrcNum,
  };

  return (
    <contextApi.Provider value={values}>{children}</contextApi.Provider>
  );
};

export default ContextProvider;
