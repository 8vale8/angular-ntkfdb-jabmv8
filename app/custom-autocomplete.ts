import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { map } from "rxjs/operators";
import { Service } from "./autocomplete-simple-example";

@Component({
  selector: "custom-autocomplete",
  templateUrl: "custom-autocomplete.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomAutocomplete),
      multi: true
    }
  ]
})
export class CustomAutocomplete implements ControlValueAccessor {
  jokes;

  currentJoke = "";

  onChange = (rating: string) => {};
  onTouched = () => {};

  registerOnChange(fn: (rating: string) => void): void {
    this.onChange = fn;
  }

  @Input()
  required: boolean;

  constructor(private service: Service) {}

  writeValue(obj: any): void {
    console.log("write value");
    this.onChange(obj);
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {}

  doFilter() {
    console.log("do filter");
    this.jokes = this.service.getData().pipe(map(jokes => this.filter(jokes)));
    console.log("Filtered jokes" + this.jokes);
  }

  doChange(value: string) {
    console.log("on change");
    this.onChange(value);
  }

  filter(values) {
    console.log(values);
    return values.filter(joke => joke.toLowerCase().includes(this.currentJoke));
  }
}
