import { Desenvolvedor } from "./desenvolvedor";
import { Servidor } from "./servidor";

export class Ambiente{
  ambienteId!:string;
  nome!:string;
  acesso!:string;
  responsavel!:string;
  link!:string;
  servidor!:Servidor;
  desenvolvedor!:Desenvolvedor;
}
