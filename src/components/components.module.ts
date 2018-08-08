import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ColorPicker } from './color-picker/color-picker';
@NgModule({
	declarations: [ProgressBarComponent, ColorPicker],
	imports: [],
	exports: [ProgressBarComponent, ColorPicker]
})
export class ComponentsModule {}
