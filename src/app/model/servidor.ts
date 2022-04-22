import { Ambiente } from "./ambiente";

export class Servidor{
    id!: string;
    nome!: string;
    dominio!: string;
    ambientes!:Ambiente[];
}