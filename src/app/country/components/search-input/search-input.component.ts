import {Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',

})
export class SearchInputComponent {

  placeholder = input.required<string>()
  value = output<string>();
  initialValue = input<string>();

  // Sirve para inicializar una señal que vive de un proceso y despues cambia a una normal
  inputValue = linkedSignal<string>( () => this.initialValue() ?? '');

  
  // onSearch(value : string){
  //   console.log(value);
  // }

  debounceEffect = effect((onCleanup) =>{
    const value = this.inputValue();
    // cuando angular detecta que inputValue es una señal y esta cambia se activara el efecto
    const timeOut = setTimeout(() => {
      this.value.emit(value)
    }, 500);
    onCleanup( () =>{
      clearTimeout(timeOut);
    })
  })
 }
