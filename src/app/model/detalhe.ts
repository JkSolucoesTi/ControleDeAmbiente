import { Chamado } from "./chamado";
import { Desenvolvedor } from "./desenvolvedor";
import { Negocio } from "./negocio";

export class Detalhe{
    id!:string;
    numero!:string;
    chamadoId!:Chamado;
    desenvolvedorId!:string;
    desenvolvedor!:Desenvolvedor;
}