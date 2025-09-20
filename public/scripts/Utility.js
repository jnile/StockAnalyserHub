export function appendDataToTableRow(tr, data, ...args) {
    let td = document.createElement("td")
    td.innerHTML = data

    args.forEach(x => {
        if (x != "") {
            td.classList.add(x)
        }
    })

    tr.appendChild(td)
}

/**
 * Calculates what percentage inner range is of the outer range
 * @param {number} inner_range_low 
 * @param {number} inner_range_high 
 * @param {number} outer_range_low 
 * @param {number} outer_range_high 
 * @returns {number} Percentage the inner range is of the outer range
 */
export function calculateBarPerc(inner_range_low, inner_range_high, outer_range_low, outer_range_high) {
    let innerRange = Math.abs(inner_range_high - inner_range_low)
    let OuterRange = Math.abs(outer_range_high - outer_range_low)
    
    return innerRange / OuterRange * 100
}

/**
 * Calculates what percentage the given point is on the range
 * @param {number} point
 * @param {number} low
 * @param {number} high
 * @returns {number} Percentage
 */
export function calculateValueOnRange(point, low, high) {
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