export type Capability<Payload = unknown, Id extends string = string> = {
  requires?: Id[];
  perform: (payload: Payload, ctx: CapabilityContext) => void | Promise<void>;
};

export type ClarificationRequest = {
  capabilityId: string;
  question: string;
  options?: string[];
};

export type Effect =
  | { type: "SET_THEME"; theme: "light" | "dark" }
  | { type: "ENABLE_ANIMATIONS"; value: boolean }
  | { type: "TRACK_EVENT"; name: string; payload?: any };

// export type CapabilityContext = {
//   router: {
//     push: (path: string) => void;
//   };
//   preferences: {
//     setTheme: (theme: "light" | "dark") => void;
//   };
//   ui: {
//     applyTheme: (theme: "light" | "dark") => void;
//   };
//   ai: {
//     requestClarification: (req: ClarificationRequest) => void;
//   };
// };

export type CapabilityContext = {
  router: {
    push: (path: string) => void;
  };
  preferences: {
    setTheme: (theme: "light" | "dark") => void;
    setAnimationsEnabled: (value: boolean) => void;
    getTheme: () => "light" | "dark";
  };

  ui: {
    applyTheme: (theme: "light" | "dark") => void;
  };

  effects?: {
    dispatch: (effect: Effect) => void;
  };

  ai: {
    requestClarification: (req: ClarificationRequest) => void;
  };
};
