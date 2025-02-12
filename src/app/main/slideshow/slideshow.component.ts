import { Component, OnInit, OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent implements OnInit, OnDestroy  {

images: string[] = [
  '/img/hero.jpg',
  '/img/kristall-herz.jpg',
  '/img/mini-eule.jpg'
];
currentIndex = 0;          // Aktuell angezeigter Bildindex
intervalId: any;           // Referenz auf den setInterval-Timer
intervalDuration = 5000;   // Dauer in Millisekunden (hier 5000 ms = 5 Sekunden)

ngOnInit(): void {
  this.startSlideshow(); // Diashow starten, wenn die Komponente initialisiert wird
}

ngOnDestroy(): void {
  this.clearSlideshow(); // Timer löschen, um Speicherlecks zu vermeiden
}

// Startet die automatische Diashow
startSlideshow(): void {
  this.intervalId = setInterval(() => {
    this.nextImage();
  }, this.intervalDuration);
}

// Löscht den Intervall-Timer
clearSlideshow(): void {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}

// Wechselt zum nächsten Bild (automatisch oder manuell)
nextImage(): void {
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
}

// Wechselt zum vorherigen Bild
prevImage(): void {
  this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
}

// Manuelle Steuerung: Nächstes Bild + Neustarten des Timers
manualNext(): void {
  this.clearSlideshow();
  this.nextImage();
  this.startSlideshow();
}

// Manuelle Steuerung: Vorheriges Bild + Neustarten des Timers
manualPrev(): void {
  this.clearSlideshow();
  this.prevImage();
  this.startSlideshow();
}
}