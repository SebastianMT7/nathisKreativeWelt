import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, HeaderComponent , FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nathisKreativeWelt';
}
