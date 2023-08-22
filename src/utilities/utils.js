import {dirname} from 'path';
import { fileURLToPath } from 'url';


//__dirname
export const __dirname = dirname(fileURLToPath(import.meta.url));
