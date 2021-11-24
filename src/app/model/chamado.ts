import { Ambiente } from "./ambiente";
import { Android } from "./android";
import { Api } from "./api";
import { Ios } from "./ios";
import { Negocio } from "./negocio";
import { Web } from "./web";

export class Chamado{
  id!:string;
  numer!:string;
  descricao!:string;
  ambiente!:Ambiente;
  api!:Api;
  web!:Web;
  ios!:Ios;
  android!:Android;
  negocio!:Negocio;
}
