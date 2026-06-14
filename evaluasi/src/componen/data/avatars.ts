export type AvatarId = 'lion' | 'tiger' | 'fox' | 'panda' | 'owl' | 'monkey' | 'frog' | 'dragon';

export interface AvatarInfo {
  id: AvatarId;
  label: string;
}

export const avatars: AvatarInfo[] = [
  { id: 'lion', label: 'Lion' },
  { id: 'tiger', label: 'Tiger' },
  { id: 'fox', label: 'Fox' },
  { id: 'panda', label: 'Panda' },
  { id: 'owl', label: 'Owl' },
  { id: 'monkey', label: 'Monkey' },
  { id: 'frog', label: 'Frog' },
  { id: 'dragon', label: 'Dragon' },
];

export const groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'] as const;
export type GroupId = typeof groups[number];
