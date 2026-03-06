export function getScoreColor(score) {
    if (score >= 80) return '#00FFB2';
    if (score >= 60) return '#FFD166';
    return '#FF6B6B';
}

export function getVerdict(score) {
    if (score >= 80) return 'Hire';
    if (score >= 60) return 'Maybe';
    return 'Pass';
}

export function getTimeSaved(count) {
    // Time Saved (count × 12min)
    const totalMinutes = count * 12;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}
