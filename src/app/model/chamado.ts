import { Ambiente } from "./ambiente";
import { Android } from "./android";
import { Api } from "./api";
import { Detalhe } from "./detalhe";
import { Ios } from "./ios";
import { Negocio } from "./negocio";
import { Web } from "./web";

export class Chamado{
  /*Propriedades da api*/
  id!:string;
  numero!:string;
  descricao!:string;
  ambienteId!:Ambiente;
  negocioId!:Negocio;
  detalhes!:Detalhe[];
  ativo!:boolean;

/*Propriedades de Get */

  api!:Api;
  web!:Web;
  ios!:Ios;
  android!:Android;
  chamadoWeb!:string;
  chamadoIos!:string;
  chamadoAndroid!:string;

}
