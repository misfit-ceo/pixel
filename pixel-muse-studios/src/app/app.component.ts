import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ThreeDViewerComponent } from './components/three-d-viewer/three-d-viewer.component';
import { ModelControlsComponent } from './components/model-controls/model-controls.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ThreeDViewerComponent, ModelControlsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pixel-muse-studios';
}

