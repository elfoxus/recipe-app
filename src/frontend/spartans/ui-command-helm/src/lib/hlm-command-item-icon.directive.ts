import {computed, Directive, inject, input} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import {HlmIconComponent} from '@spartan-ng/ui-icon-helm';
import type {ClassValue} from 'clsx';

@Directive({
  selector: '[hlmCmdIcon]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCommandItemIconDirective {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  protected _computedClass = computed(() => hlm('mr-2 h-4 w-4', this.userClass()));
  private _menuIcon = inject(HlmIconComponent, {host: true, optional: true});

  constructor() {
    if (!this._menuIcon) return;
    this._menuIcon.size = 'none';
  }
}