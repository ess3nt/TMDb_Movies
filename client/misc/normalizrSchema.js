import { schema } from 'normalizr';

const films = new schema.Entity('films');
const normalizeFilms = new schema.Array(films);

const genres = new schema.Entity('genres');
const normalizeGenres = new schema.Array(genres);

export { normalizeFilms, normalizeGenres };
