export function FullScreen() {
    try {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    } catch {
        console.warn('全屏失效')
    }
}