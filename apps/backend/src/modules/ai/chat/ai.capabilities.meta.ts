export type CapabilityMeta = {
  id: string;
  description: string;
  payloadSchema: Record<string, any> | null;
};

export const capabilityMeta: CapabilityMeta[] = [
  {
    id: 'openSettings',
    description: 'Navigate to the admin settings page.',
    payloadSchema: null,
  },
  {
    id: 'openProducts',
    description: 'Navigate to the products page.',
    payloadSchema: null,
  },
  {
    id: 'changeTheme',
    description: 'Change the admin UI theme.',
    payloadSchema: {
      theme: ['light', 'dark'],
    },
  },
  {
    id: 'enabledAnimation',
    description: 'Change the admin UI animated Background',
    payloadSchema: {
      enabledAnimations: 'boolean',
    },
  },
];
