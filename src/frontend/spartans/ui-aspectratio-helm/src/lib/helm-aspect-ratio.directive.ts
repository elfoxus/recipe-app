import {coerceNumberProperty, type NumberInput} from '@angular/cdk/coercion';
import {type AfterViewInit, computed, Directive, ElementRef, inject, input, Input, signal} from '@angular/core';
import {hlm} from '@spartan-ng/ui-core';
import type {ClassValue} from 'clsx';

const parseDividedString = (value: NumberInput): NumberInput => {
  if (typeof value !== 'string' || !value.includes('/')) return value;
  return value
    .split('/')
    .map((v) => Number.parseInt(v, 10))
    .reduce((a, b) => a / b);
};

@Directive({
  selector: '[hlmAspectRatio]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    '[style.padding-bottom]': '_computedPaddingBottom()',
  },
})
export class HlmAspectRatioDirective implements AfterViewInit {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  protected readonly _computedClass = computed(() => hlm(`relative w-full`, this.userClass()));
  private readonly _ratio = signal(1);
  protected readonly _computedPaddingBottom = computed(() => {
    return `${100 / this._ratio()}%`;
  });
  private readonly _el: HTMLElement = inject(ElementRef).nativeElement;

  @Input()
  set hlmAspectRatio(value: NumberInput) {
    const coerced = coerceNumberProperty(parseDividedString(value));
    this._ratio.set(coerced <= 0 ? 1 : coerced);
  }

  ngAfterViewInit() {
    // support delayed addition of image to dom
    const child = this._el.firstElementChild;
    if (child) {
      child.classList.add('absolute', 'w-full', 'h-full', 'object-cover');
    }
  }
}
