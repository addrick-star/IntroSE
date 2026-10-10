# ResQTh — M3 Prototype

This prototype demonstrates the main user flows of ResQTh, an emergency support system designed to help users in Thailand find the appropriate emergency information based on their province and situation.

The prototype covers the main functions defined in the SRS, including:

- detecting or manually selecting a province
- selecting an emergency category
- displaying high-urgency or low-urgency responses
- entering a situation using natural language
- reviewing and correcting the interpreted result
- showing a national fallback when local information is unavailable
- demonstrating offline emergency information
- recording temporary incident notes for low-urgency situations

The prototype is built using HTML, CSS, and JavaScript and does not use a real backend or database. Some functions, such as location detection, AI interpretation, emergency calling, GPS sharing, routing, and offline caching, are simulated for demonstration purposes.

## How to Open

Open `index.html` in a web browser.

## Suggested Demo Flow

1. Set or detect a province.
2. Select an emergency category.
3. View either the high-urgency or low-urgency response.
4. Try the natural-language input, for example:
   `I lost my passport in Phuket`
5. Review and correct the interpreted result if needed.
6. Try the fallback and offline demonstration states.