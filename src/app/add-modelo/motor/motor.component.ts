import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../services/FormDataService.service';
@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
})
export class MotorComponent implements OnInit {
  motorName: string = '';
  motorPrice: number = 0;
  motorPower: string = '';
  motorFuel: string = '';
  motorConsumption: string = '';
  motorEmission: string = '';
  motorTransmission: string = '';
  motorDescription: string = '';

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.motorName = this.formDataService.getField('inputValue15') || '';
    this.motorPrice = Number(this.formDataService.getField('inputValue17')) || 0;
    this.motorPower = this.formDataService.getField('inputValue18') || '';
    this.motorFuel = this.formDataService.getField('inputValue19') || '';
    this.motorConsumption = this.formDataService.getField('inputValue20') || '';
    this.motorEmission = this.formDataService.getField('inputValue21') || '';
    this.motorTransmission = this.formDataService.getField('inputValue22') || '';
    this.motorDescription = this.formDataService.getField('inputValue23') || '';
  }

  onInputChange15(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue15', inputValue);
  }

  onInputChange17(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue17', inputValue);
  }

  onInputChange18(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue18', inputValue);
  }

  onInputChange19(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue19', inputValue);
  }

  onInputChange20(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue20', inputValue);
  }

  onInputChange21(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue21', inputValue);
  }

  onInputChange22(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue22', inputValue);
  }

  onInputChange23(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue23', inputValue);
  }
}
