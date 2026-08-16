import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TextSizeKey = 'small' | 'standard' | 'large' | 'xlarge';

export const TEXT_SIZES: { key: TextSizeKey; label: string; scale: number }[] =
  [
    { key: 'small', label: 'Small', scale: 0.9 },
    { key: 'standard', label: 'Standard', scale: 1 },
    { key: 'large', label: 'Large', scale: 1.15 },
    { key: 'xlarge', label: 'Extra large', scale: 1.3 },
  ];

const STORAGE_KEY = 'plain-dollar:text-size';

interface TextSizeContextValue {
  sizeKey: TextSizeKey;
  scale: number;
  setSizeKey: (key: TextSizeKey) => void;
}

const TextSizeContext = createContext<TextSizeContextValue>({
  sizeKey: 'standard',
  scale: 1,
  setSizeKey: () => {},
});

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const [sizeKey, setSizeKeyState] = useState<TextSizeKey>('standard');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored && TEXT_SIZES.some((s) => s.key === stored)) {
          setSizeKeyState(stored as TextSizeKey);
        }
      })
      .catch(() => {});
  }, []);

  const setSizeKey = useCallback((key: TextSizeKey) => {
    setSizeKeyState(key);
    AsyncStorage.setItem(STORAGE_KEY, key).catch(() => {});
  }, []);

  const scale = TEXT_SIZES.find((s) => s.key === sizeKey)?.scale ?? 1;

  return (
    <TextSizeContext.Provider value={{ sizeKey, scale, setSizeKey }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  return useContext(TextSizeContext);
}
