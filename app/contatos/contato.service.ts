
import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService {

    private apiUrl: string = "app/contatos";

    constructor(
        private http: Http
    ){}

    getContatos(): Promise<Contato[]> {
        return this.http.get(this.apiUrl).toPromise()
            .then(response => response.json().data as Contato[]);
        //return Promise.resolve(CONTATOS);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id)
            );
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
        .then(() => {
            console.log("primeiro then");
            return "Curso Angular 2 Plinio Alves";
        })
        .then((param: string) => {
            console.log("Segundo then");
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log("continuando deopis de 4 segundos...");
                    resolve2();
                }, 4000);
            });
        })
        .then(() => {
            console.log("terceiro then");
            return this.getContatos();
        });
    }
}