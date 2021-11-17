import { Android } from "./android";
import { Api } from "./api";
import { Ios } from "./ios";
import { Negocio } from "./negocio";

export class Ambiente{
  id!:string;
  nome!:string;
  chamado!:string;
  descricao!:string;
  api!:Api;
  ios!:Ios;
  android!:Android;
  negocio!:Negocio;
}
