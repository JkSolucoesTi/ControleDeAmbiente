import { Android } from "./android";
import { Web } from "./web";
import { Ios } from "./ios";
import { Negocio } from "./negocio";
import { Api } from "./api";

export class Ambiente{
  id!:string;
  nome!:string;
  chamado!:string;
  descricao!:string;
  api!:Api;
  web!:Web;
  ios!:Ios;
  android!:Android;
  negocio!:Negocio;
}
