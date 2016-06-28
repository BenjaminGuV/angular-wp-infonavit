import { Component, Input, OnInit } from 'angular2/core';
import { Deuda } from './models/deuda.model';
import { DeudaService } from './services/deudas.service';

@Component({
  selector: 'tabla-infonavit',
  templateUrl: 'app/html/tabla-deuda.html',
  providers: [ DeudaService ]
})

export class DeudaComponent {
	@Input() edeudas: Deuda[];
	temp:any = [];

	constructor(private deudaService: DeudaService) {
		this.deudaService = deudaService;
	}

	getDeudas() {
		this.temp    = this.deudaService.getDeudas();
		this.edeudas = this.temp;

		return this.temp;
	}

	setDeudas( datos ) {
		this.deudaService.setDeudas( datos );
		this.getDeudas()
	}

	clearDeudas(){

		for (var i = 0; i < this.edeudas.length; ++i) {
			delete this.edeudas[i];
		}

		this.edeudas = new Array();

	}

	ngOnInit() {
		this.getDeudas();
	}

}