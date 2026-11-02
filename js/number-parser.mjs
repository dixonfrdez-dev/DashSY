/** Parse Spanish and international number formats without losing thousands. */
export function parseLocalizedNumber(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    const raw = String(value ?? '').trim().replace(/[\s\u00a0\u202f]/g, '');
    if (!raw) return null;
    const comma = raw.lastIndexOf(',');
    const dot = raw.lastIndexOf('.');
    let normalized = raw;
    if (comma !== -1 && dot !== -1) {
        normalized = comma > dot
            ? raw.replace(/\./g, '').replace(',', '.')
            : raw.replace(/,/g, '');
    } else if (comma !== -1) {
        normalized = raw.replace(',', '.');
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
}
