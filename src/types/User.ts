import { Recado } from "./Recados";


interface User {
    id:string;
    name:string;
    email:string;
    password:string;
    recados: Recado[];
}
export default User