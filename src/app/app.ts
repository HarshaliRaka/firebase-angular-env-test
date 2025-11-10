import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('envario');

  protected readonly envVar = signal('Loading...');
  protected readonly secretVar = signal('Loading...');

  constructor() {
    const http = inject(HttpClient);
    http.get<{ envVar: string; mySecret: string }>('/api/vars').subscribe((vars) => {
      this.envVar.set(vars.envVar);
      this.secretVar.set(vars.mySecret);
    });
  }
}
