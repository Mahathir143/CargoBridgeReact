import React from 'react';
import { usePWAInstallPrompt } from '../hooks/usePWAInstallPrompt';

const InstallPWAButton = () => {
    const {
        isInstallable,
        isIOS,
        showiOSBanner,
        promptInstall,
        dismissiOSBanner,
    } = usePWAInstallPrompt();

    return (
        <>
            {/* Android Install Button */}
            {isInstallable && (
                <button
                    className="btn btn-primary position-fixed bottom-0 end-0 m-3 shadow"
                    onClick={promptInstall}
                >
                    📲 Install App
                </button>
            )}

            {/* iOS Install Tip Banner */}
            {isIOS && showiOSBanner && (
                <div className="alert alert-info position-fixed bottom-0 start-0 end-0 m-3 shadow d-flex justify-content-between align-items-center">
                    <div>
                        📱 To install this app, tap the <strong>Share</strong> icon and select <strong>Add to Home Screen</strong>.
                    </div>
                    <button className="btn btn-sm btn-outline-secondary ms-2" onClick={dismissiOSBanner}>
                        ×
                    </button>
                </div>
            )}
        </>
    );
};

export default InstallPWAButton;
