import { scrapeTeeTimesForDate } from './teeScraper';

/**
 * Parse command line arguments in the format --key=value or --key value
 * @returns Object with parsed arguments
 */
function parseArgs(): { [key: string]: string } {
    const args = process.argv.slice(2);
    const result: { [key: string]: string } = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        // Handle --key=value format
        if (arg.startsWith('--') && arg.includes('=')) {
            const [key, value] = arg.slice(2).split('=');
            result[key] = value;
        }
        // Handle --key value format
        else if (arg.startsWith('--') && i + 1 < args.length && !args[i + 1].startsWith('--')) {
            const key = arg.slice(2);
            result[key] = args[i + 1];
            i++; // Skip the next argument as we've already processed it
        }
        // Handle positional arguments (for backward compatibility)
        else if (!arg.startsWith('--')) {
            // First positional arg is URL, second is date
            if (arg.startsWith('http')) {
                result['url'] = arg;
            } else if (/^\d{4}-\d{2}-\d{2}$/.test(arg)) {
                result['date'] = arg;
            }
        }
    }

    return result;
}

async function main() {
    // Parse command line arguments
    const parsedArgs = parseArgs();

    // Set defaults and override with provided arguments
    let url = parsedArgs['url'] || 'https://commonground-golf-course.book.teeitup.com/';
    let date = parsedArgs['date'] || new Date().toISOString().split('T')[0]; // Default to today

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.error('Invalid date format. Please use YYYY-MM-DD');
        process.exit(1);
    }

    try {
        console.log(`Scraping tee times from ${url} for date ${date}...`);
        const teeTimes = await scrapeTeeTimesForDate(url, date);
        console.log(JSON.stringify(teeTimes, null, 2));
        console.log(`Successfully scraped ${teeTimes.length} tee times.`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Display help if requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Usage: node teeScraperCli.js [options]

Options:
  --url=URL           URL of the golf course website
  --date=YYYY-MM-DD   Date to scrape tee times for (defaults to today)
  --help, -h          Show this help message

Examples:
  node teeScraperCli.js
  node teeScraperCli.js --date=2023-06-15
  node teeScraperCli.js --url=https://example-golf.com --date=2023-06-15
  node teeScraperCli.js https://example-golf.com 2023-06-15  (legacy format)
`);
    process.exit(0);
}

main().catch(console.error);
