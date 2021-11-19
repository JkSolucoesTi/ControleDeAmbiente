import { Android } from "./android";
import { Web } from "./web";
import { Ios } from "./ios";
import { Negocio } from "./negocio";

export class Ambiente{
  id!:string;
  nome!:string;
  chamado!:string;
  descricao!:string;
  web!:Web;
  ios!:Ios;
  android!:Android;
  negocio!:Negocio;
}
