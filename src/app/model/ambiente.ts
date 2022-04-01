import { Servidor } from "./servidor";

export class Ambiente{
  ambienteId!:string;
  nome!:string;
  responsavel!:string;
  link!:string;
  servidor!:Servidor;
}
