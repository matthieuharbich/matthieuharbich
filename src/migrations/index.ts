import * as migration_20250123_182014_ini from './20250123_182014_ini';

export const migrations = [
  {
    up: migration_20250123_182014_ini.up,
    down: migration_20250123_182014_ini.down,
    name: '20250123_182014_ini'
  },
];
