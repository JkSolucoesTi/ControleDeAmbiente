import { Chamado } from "./chamado";
import { Desenvolvedor } from "./desenvolvedor";
import { Negocio } from "./negocio";

export class Detalhe{
    id!:string;
    numero!:string;
    chamado!:Chamado;
    desenvolvedor!:Desenvolvedor;
    negocio!:Negocio;
}