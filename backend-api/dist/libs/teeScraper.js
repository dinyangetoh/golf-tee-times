import puppeteer from 'puppeteer';
import { format } from 'date-fns';
/**
 * Scrapes tee times from a golf course website for a specific date using Puppeteer
 *
 * @param url - The URL of the golf course website (defaults to Common Ground Golf Course)
 * @param date - The date to scrape tee times for (format: YYYY-MM-DD)
 * @returns Promise resolving to an array of TeeTime objects
 */
export async function scrapeTeeTimesForDate(url, date) {
    let browser = null;
    try {
        // Format the date for the request
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        console.log('Scraping from: ', { url, date, formattedDate });
        // For TeeItUp sites, we need to construct the proper URL with the date
        const fullUrl = `${url}${url.endsWith('/') ? '' : '/'}teetimes?date=${formattedDate}`;
        console.log(`Scraping tee times from: ${fullUrl}`);
        // Launch a headless browser
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        // Open a new page
        const page = await browser.newPage();
        // Set viewport size
        await page.setViewport({ width: 1280, height: 800 });
        // Navigate to the URL
        await page.goto(fullUrl, { waitUntil: 'networkidle2' });
        // Wait for the tee time cards to load
        await page.waitForSelector('.MuiCardContent-root', { timeout: 10000 });
        console.log('Tee time cards loaded');
        // Extract tee times from the page
        const teeTimes = await page.evaluate(() => {
            const times = [];
            // Get all tee time cards
            const cards = document.querySelectorAll('.MuiCardContent-root');
            console.log(`Found ${cards.length} tee time cards`);
            cards.forEach((card) => {
                try {
                    // Get all text content from the card to help with extraction
                    const cardText = card.textContent || '';
                    // Extract time - usually the first Typography element
                    const timeElement = card.querySelector('.MuiTypography-root');
                    const timeText = timeElement ? timeElement.textContent?.trim() : '';
                    // Skip if this doesn't look like a time
                    if (!timeText || timeText.toLowerCase().includes('time') || !timeText.match(/\d+:\d+/)) {
                        return;
                    }
                    // Extract price from MuiTypography-body1 elements that contain $ symbol
                    const priceElements = card.querySelectorAll('.MuiTypography-body1');
                    const prices = [];
                    priceElements.forEach((priceEl) => {
                        const priceText = priceEl.textContent || '';
                        if (priceText.includes('$')) {
                            prices.push(parseFloat(priceText.replace('$', '')));
                        }
                    });
                    // Extract player information - handle various formats with constraints
                    let min_players = 1;
                    let max_players = 4;
                    // Format: "1 - 4" or "1-4" (only single digits 1-4)
                    const playerRangeMatch = cardText.match(/([1-4])\s*[-–]\s*([1-4])/i);
                    // Format: "1 or 2" (only single digits 1-4)
                    const playerOrMatch = cardText.match(/([1-4])\s*or\s*([1-4])/i);
                    // Format: Single number "1" (only single digits 1-4)
                    const singlePlayerMatch = cardText.match(/([1-4])\s*player/i);
                    if (playerRangeMatch) {
                        min_players = parseInt(playerRangeMatch[1]);
                        max_players = parseInt(playerRangeMatch[2]);
                    }
                    else if (playerOrMatch) {
                        min_players = parseInt(playerOrMatch[1]);
                        max_players = parseInt(playerOrMatch[2]);
                    }
                    else if (singlePlayerMatch) {
                        min_players = parseInt(singlePlayerMatch[1]);
                        max_players = parseInt(singlePlayerMatch[1]);
                    }
                    // Determine holes value
                    const holes = 18; // Default to 18 holes
                    if (prices.length > 1) {
                        // If we have a price range and holes range, create two separate entries
                        // 9 holes with lower price
                        times.push({
                            time: timeText,
                            price: prices[0],
                            min_players,
                            max_players,
                            holes: 9,
                        });
                        // 18 holes with higher price
                        times.push({
                            time: timeText,
                            price: prices[1],
                            min_players,
                            max_players,
                            holes: 18,
                        });
                        // Skip the rest of the processing for this card
                        return;
                    }
                    else {
                        // Add the tee time to our collection
                        times.push({
                            time: timeText,
                            price: prices[0],
                            min_players,
                            max_players,
                            holes,
                        });
                    }
                }
                catch (error) {
                    console.error('Error processing tee time card:', error);
                }
            });
            return times;
        });
        console.log(`Found ${teeTimes.length} tee times for ${formattedDate}`);
        return teeTimes;
    }
    catch (error) {
        console.error('Error scraping tee times:', error);
        throw new Error(`Failed to scrape tee times: ${error.message}`);
    }
    finally {
        // Always close the browser
        if (browser) {
            await browser.close();
        }
    }
}
/**
 * Example usage:
 */
// async function main() {
//     const teeTimes = await scrapeTeeTimesForDate('https://commonground-golf-course.book.teeitup.com/', '2025-03-11');
//     console.log(teeTimes);
// }
// Comment out to prevent automatic execution when imported
// main().catch(console.error);
//# sourceMappingURL=teeScraper.js.map