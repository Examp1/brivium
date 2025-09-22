export async function retry(fn: Function, attempts: number, delayMs: number) {
    for (let i = 0; i < attempts; i++) {
        try {
            const res = await fn();
            return res;
        } catch (error) {
            const lastError = error;
            console.warn(`Попытка ${i} не удалась:`, error);
            if (i < attempts) {
                await delay(delayMs);
            }
            throw lastError;
        }
    }
}
