import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// TODO: Make internalization
@Component({
  selector: 'math-handbook-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styles: [`
        :host {
            height: 100%;
            display: block;
        }
  `],
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Math Handbook';
}
