import {inject, Injectable, OnDestroy, PLATFORM_ID, RendererFactory2} from "@angular/core";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {ReplaySubject, Subject, takeUntil} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService implements OnDestroy {
    private _platformId = inject(PLATFORM_ID);
    private _renderer = inject(RendererFactory2).createRenderer(null, null);
    private _document = inject(DOCUMENT);

    private _theme$ = new ReplaySubject<'light' | 'dark'>(1);
    public theme$ = this._theme$.asObservable();
    private _destroyed$ = new Subject<void>();

    constructor() {
    this.syncThemeFromLocalStorage();
    this.toggleClassOnThemeChange();
    }

    public toggleDarkMode(): void {
        const newTheme = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        this._theme$.next(newTheme);
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public syncThemeFromLocalStorage(): void {
        if (isPlatformBrowser(this._platformId)) {
            this._theme$.next(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
        }
    }

    private toggleClassOnThemeChange(): void {
        this.theme$.pipe(takeUntil(this._destroyed$)).subscribe((theme) => {
            if (theme === 'dark') {
                this._renderer.addClass(this._document.documentElement, 'dark');
            } else {
                if (this._document.documentElement.className.includes('dark')) {
                    this._renderer.removeClass(this._document.documentElement, 'dark');
                }
            }
        });
    }
}

