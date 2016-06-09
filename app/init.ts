/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import { DeudaComponent } from './deuda.component';

@Component({
    selector: 'hello-app',
    template: `
        <h1>Calculo de Infonavit</h1>
		<p>Ingrese una tasa anual: {{tasa}} %</p>
        Tasa anual: <input name="tasa" [value]="tasa" (keyup)="onKey($event)" (input)="tasa = $event.target.value">
		<p>Ingrese su pago anual: $ {{anual}} MXN</p>
		Pago anual: <input name="anual" [value]="anual" (keyup)="onKey($event)" (input)="anual = $event.target.value">
		<p>Monto total a pagar al infonavit</p>
		Monto a pagar: <input name="monto_total" [value]="monto_total" (keyup)="onKey($event)" (input)="monto_total = $event.target.value">
		<button (click)="onCalc()">Calcular</button>

		<my-hero-detail [deudas]="deudas"></my-hero-detail>

    `,
	directives: [DeudaComponent]
})
export class HelloApp {
	tasa: number        = 7;
	anual: number       = 24000;
	total: number       = 0;
	valor: number       = 0;
	monto_total: number = 200000;
	temp: number        = 0;
	anio: number = 0;

	deudas = DEUDAS;

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
		var obj_temp    : {
			anio: number;
			total: number;
			capital: number;
			interes: number;
		}[];

		console.log( this.temp );

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
			console.log("datos", this.anio, deuda, pago_capital, pago_intereses);

			DEUDAS.push({
				anio: this.anio,
				total: deuda,
				capital: pago_capital,
				interes: pago_intereses
			});


			ant_deuda   = deuda;
			ant_capital = pago_capital;

			this.temp = deuda - pago_capital;

			this.anio++;

		} while (this.temp > 0);

		console.log( DEUDAS );

		return this.total;
	}

	onKey( event:any ){
		this.valor = parseFloat( event.target.value );
		
		if ( event.target.name == "anual" ) {
			this.setAnual(this.valor);
		}

		if ( event.target.name == "tasa" ) {
			this.setTasa(this.valor);
		}

		if ( event.target.name == "monto_total" ) {
			this.setMontoTotal(this.valor);
		}

		this.onCalc();

	}

}

//datos infonavit

export class Deuda {
	anio: number;
	total: number;
	capital: number;
	interes: number;

	/*constructor(anio: number, total: number, capital: number, interes: number) {
		this.anio    = anio;
		this.total   = total;
		this.capital = capital;
		this.interes = interes;
    }

	add(deuda: Deuda) {
        return new Deuda( deuda.anio, deuda.total, deuda.capital, deuda.interes );
    }*/


}

var DEUDAS: Deuda[] = [];

bootstrap(HelloApp);