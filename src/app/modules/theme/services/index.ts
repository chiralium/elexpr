export class ThemeServices {
    public changeColorTheme = (theme: 'alt' | 'default') => {
        if (theme === 'alt') {
            document.documentElement.setAttribute('data-theme', 'alt');
            return;
        }

        document.documentElement.removeAttribute('data-theme');
    }
}
