import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';
import { DemoAuth } from './services/demo-auth';

@Component({
  imports: [AppHeader, CommonModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  constructor(readonly auth: DemoAuth) {}
}
