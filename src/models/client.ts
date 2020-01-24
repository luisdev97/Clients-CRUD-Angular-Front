import { Region } from './Region';
import { Bill } from './bill';

class Client {
    id: number;
    name: string;
    surname: string;
    createAt: string;
    email: string;
    img: string;
    region: Region;
    bills: Array<Bill> = [];
}

export default Client;
