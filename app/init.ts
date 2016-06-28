/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

//importando el componente deuda
import { Deuda } from './models/deuda.model';
import { DeudaService } from './services/deudas.service';
import { DeudaComponent } from './deuda.component';


@Component({
    selector: 'infonavit-app',
    templateUrl: 'app/html/inicio.html',
	directives: [DeudaComponent],
	providers: [ DeudaService, DeudaComponent ]
})

export class InfonavitApp {
	tasa: number        = 7;
	anual: number       = 24000;
	total: number       = 0;
	valor: number       = 0;
	monto_total: number = 200000;
	temp: number        = 0;
	anio: number        = 0;
	deudas: Deuda[];

	constructor(private deudaComponent: DeudaComponent) { }

	getTasa(): number {
		return this.tasa;
	}

	setTasa(tasa:number ): any{
	    this.tasa = tasa;
	}

	getAnual(): number{
		return this.anual;
	}

	setAnual( anual:number ): any{
		this.anual = anual;
	}

	getMontoTotal(): number{
		return this.monto_total;
	}

	setMontoTotal( monto_total: number ): any{
		this.monto_total = monto_total
	}

	suma(a:number, b:number ): number{
		return a + b;
	}

	onCalc(): number{

		this.total = this.suma( this.getTasa(), this.getAnual() );

		this.temp = this.getMontoTotal();

		var ant_deuda   = 0;
		var ant_capital = 0;

		do {
			var pago_intereses = this.temp * (this.getTasa() / 100);
			var pago_capital   = this.getAnual() - pago_intereses;
			var deuda          = 0;

			if( this.anio == 0 ) {
				deuda = this.temp;
			}else{
				deuda = ant_deuda - ant_capital;
			}

			deuda          = Math.round( deuda * 100) / 100;
			pago_capital   = Math.round( pago_capital *  100 ) / 100;
			pago_intereses = Math.round( pago_intereses  * 100 ) / 100;
			//console.log("datos", this.anio, deuda, pago_capital, pago_intereses);

			this.temp = deuda - pago_capital;

			if( deuda > 0 ) {
				this.deudaComponent.setDeudas( {
					anio: this.anio,
					total: deuda,
					capital: pago_capital,
					interes: pago_intereses
				});

				ant_deuda   = deuda;
				ant_capital = pago_capital;

				this.anio++;
				// code...
			}


		} while (this.temp > 0);

		this.temp = 0;
		this.anio = 0;

		//this.deudaComponent.clearDeudas();

		return this.total;
	}

	onKey( event:any ){
		this.valor = parseFloat( event.target.value );

		if ( isNaN( this.valor ) ) {
			this.valor = 0;
		}
		
		if ( event.target.name == "anual" ) {
			this.setAnual(this.valor);
		}

		if ( event.target.name == "tasa" ) {
			this.setTasa(this.valor);
		}

		if ( event.target.name == "monto_total" ) {
			this.setMontoTotal(this.valor);
		}

	}

	onClear(){
		this.deudaComponent.clearDeudas();
	}

}



bootstrap(InfonavitApp);