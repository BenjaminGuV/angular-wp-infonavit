import { Injectable } from 'angular2/core';
import { Deuda } from '../models/deuda.model';

@Injectable()
export class DeudaService {
	deuda = DEUDAS;

	getDeudas() {
		return this.deuda;
	};

	setDeudas( datos ){
		this.deuda.push( datos );
	}

	clearDeudas(){
		this.deuda = [];
	}

}


export var DEUDAS: Deuda[] = [];