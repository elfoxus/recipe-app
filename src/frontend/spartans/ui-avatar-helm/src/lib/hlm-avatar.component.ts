import {ChangeDetectionStrategy, Component, computed, Input, input, signal, ViewEncapsulation} from '@angular/core';
import {BrnAvatarComponent} from '@spartan-ng/ui-avatar-brain';
import {hlm} from '@spartan-ng/ui-core';
import {cva, type VariantProps} from 'class-variance-authority';
import type {ClassValue} from 'clsx';

export const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    variant: {
      small: 'h-6 w-6 text-xs',
      medium: 'h-10 w-10',
      large: 'h-14 w-14 text-lg',
    },
  },
  defaultVariants: {
    variant: 'medium',
  },
});

type AvatarVariants = VariantProps<typeof avatarVariants>;

@Component({
  selector: 'hlm-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  template: `
		@if (image?.canShow()) {
			<ng-content select="[hlmAvatarImage],[brnAvatarImage]" />
		} @else {
			<ng-content select="[hlmAvatarFallback],[brnAvatarFallback]" />
		}
	`,
})
export class HlmAvatarComponent extends BrnAvatarComponent {
  public readonly userClass = input<ClassValue>('', {alias: 'class'});
  private readonly _variant = signal<AvatarVariants['variant']>('medium');
  protected readonly _computedClass = computed(() =>
    hlm(avatarVariants({variant: this._variant()}), this.userClass()),
  );

  @Input()
  set variant(variant: AvatarVariants['variant']) {
    this._variant.set(variant);
  }
}
