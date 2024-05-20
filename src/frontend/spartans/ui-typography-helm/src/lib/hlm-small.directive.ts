import {computed, Directive, input} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

export const hlmSmall = 'text-sm font-medium leading-none';

@Directive({
  selector: '[hlmSmall]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSmallDirective {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  protected _computedClass = computed(() => hlm(hlmSmall, this.userClass()));
}
