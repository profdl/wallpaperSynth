export type WallpaperPattern =
  | 'p1'
  | 'p2'
  | 'pm'
  | 'pg'
  | 'cm'
  | 'pmm'
  | 'pmg'
  | 'pgg'
  | 'cmm'
  | 'p4'
  | 'p4m'
  | 'p4g'
  | 'p3'
  | 'p3m1'
  | 'p31m'
  | 'p6'
  | 'p6m';

export const patterns = [
  { type: 'p1', description: 'Most basic, only translations' },
  { type: 'p2', description: '180° rotation centers' },
  { type: 'pm', description: 'Reflection lines, parallel' },
  { type: 'pg', description: 'Glide reflections, no reflections' },
  { type: 'cm', description: 'Reflection lines, parallel with glide reflection between them' },
  { type: 'pmm', description: 'Two perpendicular reflection lines' },
  { type: 'pmg', description: 'Reflection lines and perpendicular glide reflections' },
  { type: 'pgg', description: 'Perpendicular glide reflections, no reflections' },
  { type: 'cmm', description: 'Two perpendicular reflection lines with 180° rotations' },
  { type: 'p4', description: '90° rotations' },
  { type: 'p4m', description: '90° rotations with reflections' },
  { type: 'p4g', description: '90° rotations with glide reflections' },
  { type: 'p3', description: '120° rotations' },
  { type: 'p3m1', description: '120° rotations with reflections (triangular)' },
  { type: 'p31m', description: '120° rotations with reflections (rhombic)' },
  { type: 'p6', description: '60° rotations' },
  { type: 'p6m', description: '60° rotations with reflections' },
] as const;