import {Component, Input} from 'angular2/core';

@Component({
  selector: 'my-hero-detail',
  template: `
    <table class="table">
		<tr>
			<th>Año</th>
			<th>Deuda</th>
			<th>Pago a Capital</th>
			<th>Pago a Interés</th>
		</tr>
		<tr *ngFor="let deuda of deudas">
			<td>{{ deuda.anio }}</td>
			<td>{{ deuda.total }}</td>
			<td>{{ deuda.capital }}</td>
			<td>{{ deuda.interes }}</td>
		</tr>
	</table>
  `
})


export class DeudaComponent {
	@Input() deudas: any;

	constructor(){
		console.log("sada", this.deudas);
	}

}
