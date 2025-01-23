import * as migration_20250123_182014_ini from './20250123_182014_ini';
import * as migration_20250123_184945_vinyls from './20250123_184945_vinyls';

export const migrations = [
  {
    up: migration_20250123_182014_ini.up,
    down: migration_20250123_182014_ini.down,
    name: '20250123_182014_ini',
  },
  {
    up: migration_20250123_184945_vinyls.up,
    down: migration_20250123_184945_vinyls.down,
    name: '20250123_184945_vinyls'
  },
];
