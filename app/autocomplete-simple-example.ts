import { FormControl } from "@angular/forms";
import { Component, Injectable, Input } from "@angular/core";
7;
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, startWith, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class Service {
  constructor(private httpClient: HttpClient) {}

  jokes = ["", "Pippo", "Pluto", "Paperino"];

  @Input()
  input: string;

  getData() {
    return this.jokes.length
      ? of(this.jokes)
      : this.httpClient.get<any>("https://api.icndb.com/jokes/random/5").pipe(
          map(data => {
            this.jokes = data.value;
            return this.jokes;
          })
        );
  }
}
/**
 * @title Simple autocomplete
 */
@Component({
  selector: "autocomplete-simple-example",
  templateUrl: "autocomplete-simple-example.html",
  styleUrls: ["autocomplete-simple-example.css"]
})
export class AutocompleteSimpleExample {
  visible = false;

  toggleVisible() {
    this.visible = !this.visible;
  }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
