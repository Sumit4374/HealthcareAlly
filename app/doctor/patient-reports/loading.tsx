export default function Loading() {
  return null
}



// lib/blinkit.ts 
/**
 * Opens Blinkit search with the specified medicine name
 * @param medicineName The name of the medicine to search for
 */
export function openBlinkitSearch(medicineName: string) {
  // Clean and encode the medicine name for URL
  const cleanMedicineName = medicineName.trim()
  const encodedSearch = encodeURIComponent(cleanMedicineName)

  // Blinkit search URL - this will search for the specific medicine
  const blinkitUrl = `https://blinkit.com/search?q=${encodedSearch}`

  // Log for debugging
  console.log(`🔍 Searching Blinkit for: "${cleanMedicineName}"`)
  console.log(`🌐 Opening URL: ${blinkitUrl}`)

  // Open in new tab
  window.open(blinkitUrl, "_blank", "noopener,noreferrer")
}

/**
 * Opens Blinkit search with medicine name and dosage for more specific results
 * @param medicineName The name of the medicine
 * @param dosage The dosage information (optional)
 */
export function openBlinkitSearchWithDosage(medicineName: string, dosage?: string) {
  // Combine medicine name with dosage for more specific search
  const searchQuery = dosage ? `${medicineName} ${dosage}` : medicineName
  const cleanSearchQuery = searchQuery.trim()
  const encodedSearch = encodeURIComponent(cleanSearchQuery)

  // Blinkit search URL
  const blinkitUrl = `https://blinkit.com/search?q=${encodedSearch}`

  // Log for debugging
  console.log(`🔍 Searching Blinkit for: "${cleanSearchQuery}"`)
  console.log(`🌐 Opening URL: ${blinkitUrl}`)

  // Open in new tab
  window.open(blinkitUrl, "_blank", "noopener,noreferrer")
}
