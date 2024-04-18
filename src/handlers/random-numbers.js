/**
 * Generate random number in range [min, max].
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
export function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}
