import { Ambiente } from "./ambiente";
import { Android } from "./android";
import { Api } from "./api";
import { Ios } from "./ios";
import { Negocio } from "./negocio";
import { Web } from "./web";

export class Chamado{
  id!:string;
  numero!:string;
  descricao!:string;
  ambiente!:Ambiente;
  api!:Api;
  web!:Web;
  ios!:Ios;
  android!:Android;
  negocio!:Negocio;
  chamadoWeb!:string;
  chamadoIos!:string;
  chamadoAndroid!:string;
  ativo!:boolean;
}
