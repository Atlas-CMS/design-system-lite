import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';
import { createContext } from './helpers/context';

import { useState } from 'react';

const DEFAULT_LOCALE = 'en-EN';

const getDefaultLocale = () => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  if (navigator.language) {
    return navigator.language;
  }

  return DEFAULT_LOCALE;
};
interface StrapiDesignSystemContextValue {
  locale: string;
}

type DesignSystemContextValue = StrapiDesignSystemContextValue & {
  setGlobalLoading: (loading: boolean) => void;
  globalLoading: boolean;
};

const [Provider, useDesignSystem] = createContext<DesignSystemContextValue>('StrapiDesignSystem', {
  locale: getDefaultLocale(),
  setGlobalLoading: () => {},
  globalLoading: false,
});

interface DesignSystemProviderProps extends ThemeProviderProps, Partial<DesignSystemContextValue> {}

const DesignSystemProvider = ({ locale = getDefaultLocale(), ...restProps }: DesignSystemProviderProps) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  const stateProps = {
    setGlobalLoading,
    globalLoading,
  };

  return (
    <Provider locale={locale} {...stateProps}>
      <ThemeProvider {...restProps} />
    </Provider>
  );
};

export { useDesignSystem, DesignSystemProvider };
export type { DesignSystemProviderProps, DesignSystemContextValue };
