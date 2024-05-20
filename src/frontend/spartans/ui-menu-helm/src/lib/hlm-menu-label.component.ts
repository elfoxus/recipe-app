import {booleanAttribute, Component, computed, Input, input, signal} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

@Component({
  selector: 'hlm-menu-label',
  standalone: true,
  template: `
		<ng-content />
	`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMenuLabelComponent {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  private readonly _inset = signal<ClassValue>(false);
  protected _computedClass = computed(() =>
    hlm('block px-2 py-1.5 text-sm font-semibold', this._inset() && 'pl-8', this.userClass()),
  );

  @Input({transform: booleanAttribute})
  set inset(value: boolean) {
    this._inset.set(value);
  }
}
