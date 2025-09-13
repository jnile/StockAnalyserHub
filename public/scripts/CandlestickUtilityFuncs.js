/**
 * Calculates what percentage the bar is relative to the candlestick
 * @param {number} open 
 * @param {number} high 
 * @param {number} low 
 * @param {number} close 
 * @returns {number} Percentage
 */
export function calculateBarPerc(open, high, low, close) {
    let barHeight = Math.abs(close - open)
    let lineHeight = high - low
    
    return barHeight / lineHeight * 100
}

/**
 * Calculates what percentage the given point is at on the candlestick
 * @param {number} point 
 * @param {number} low 
 * @param {number} high 
 * @returns {number} Percentage
 */
export function calculateValueOnLine(point, low, high) {
    let range = high - low
    return (point - low) / range * 100
}

/**
 * Calculate at the value at a percentage of a range
 * @param {number} perc At what percentage of the range to calculate the value from the bottom
 * @param {number} low The lower boundary of the range (inclusive)
 * @param {number} high The higher boundary of the range (inclusive)
 * @returns {number} Value at respective percentage of the range 
*/
export function getValAtPerBetween(perc, low, high) {
    let range = high - low
    return (range * perc / 100) + low
}