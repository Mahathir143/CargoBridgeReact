import { useEffect, useState } from 'react';

export function usePWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showiOSBanner, setShowiOSBanner] = useState(false);

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        const isInStandalone = 'standalone' in window.navigator && window.navigator.standalone;

        setIsIOS(isIOSDevice);

        if (isIOSDevice && !isInStandalone) {
            setShowiOSBanner(true);
        }

        // Detect Android install prompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault(); // Prevent the automatic prompt
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const promptInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setIsInstallable(false);
        return result;
    };

    const dismissiOSBanner = () => setShowiOSBanner(false);

    return {
        isInstallable,
        isIOS,
        showiOSBanner,
        promptInstall,
        dismissiOSBanner,
    };
}
