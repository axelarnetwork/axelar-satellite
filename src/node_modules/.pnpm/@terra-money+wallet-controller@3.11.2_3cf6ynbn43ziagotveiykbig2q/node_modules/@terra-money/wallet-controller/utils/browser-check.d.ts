export declare const isMobile: () => boolean;
export declare const isDesktopChrome: (isChromeExtensionCompatibleBrowser: boolean) => boolean;
export declare const getDesktopBrowserType: (userAgent: string) => 'chrome' | 'edge' | 'firefox' | 'safari' | null;
