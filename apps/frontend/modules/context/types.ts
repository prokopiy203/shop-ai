export type CapabilityContext = {
  router: {
    push: (path: string) => void;
  };
  preferences: {
    setTheme: (theme: "light" | "dark") => void;
    setAnimationsEnabled: (value: boolean) => void;
  };
  ui: {
    applyTheme: (theme: "light" | "dark") => void;
  };
};
