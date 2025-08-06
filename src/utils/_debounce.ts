export function _debounce<T extends (...args: any[]) => void>(
    cb: T,
    delay: number,
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => cb(...args), delay);
    };
}
