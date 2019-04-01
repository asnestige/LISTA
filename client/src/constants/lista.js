import Lista from 'lista-api';
import {BaseUrl} from './appConfig';

const lista = () => new Lista({baseURL: BaseUrl});

export default lista;
