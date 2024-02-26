// ==UserScript==
// @name         Anti-Bot
// @namespace    https://tameprmonkey.net/
// @version      1.0
// @description  Block Bots in Blooket!
// @author       anack
// @match        *://goldquest.blooket.com/*
// @icon         https://www.dropbox.com/scl/fi/88ptsebc8cceobfw8qpfc/250472.jpg?rlkey=06oagykbfmfu23rzyingns1ge&dl=1
// @grant        none
// @downloadURL 
// @updateURL 
// ==/UserScript==

// Extract alphabetic part of the username
function extractAlphabeticPart(username) {
    return username.replace(/\d+/g, ''); // Remove all numbers from the username
}

const maxDuplicatesAllowed = 1; // How many duplicates before kicking

const playerElementsSelector = '.styles__clientBox___3pIbU-camelCase';
const usernameElementSelector = '.styles__clientNameText___TxzCV-camelCase div';

setInterval(() => {
    const playerElements = document.querySelectorAll(playerElementsSelector);
    const usernameCounts = {};

    // Extract usernames and count their occurrences (with safety checks)
    playerElements.forEach(element => {
        const usernameElement = element.querySelector(usernameElementSelector);
        if (usernameElement) {
            const username = usernameElement.textContent.trim();
            const alphabeticUsername = extractAlphabeticPart(username); // Get alphabetic part of username
            usernameCounts[alphabeticUsername] = (usernameCounts[alphabeticUsername] || 0) + 1;
        }
    });

    // Find duplicates exceeding the threshold
    const duplicateUsernames = Object.keys(usernameCounts).filter(username => usernameCounts[username] > maxDuplicatesAllowed);

    // Output detected duplicate usernames to console
    if (duplicateUsernames.length > 0) {
        console.log('Duplicate usernames detected:', duplicateUsernames);
        console.log('All usernames:', Object.keys(usernameCounts));
        console.log('Processed usernames:', Object.keys(usernameCounts).map(username => extractAlphabeticPart(username)));
    }

    // Simulate clicks on each duplicate username (only if duplicates exist)
    if (duplicateUsernames.length > 0) {
        duplicateUsernames.forEach(username => {
            const duplicateElements = [];
            playerElements.forEach(element => {
                const usernameElement = element.querySelector(usernameElementSelector);
                if (usernameElement && extractAlphabeticPart(usernameElement.textContent.trim()) === username) {
                    duplicateElements.push(usernameElement);
                }
            });
            duplicateElements.forEach(element => {
                // Comprehensive click simulation
                const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
                element.dispatchEvent(mouseDownEvent);

                const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
                element.dispatchEvent(mouseUpEvent);

                const clickEvent = new MouseEvent('click', { bubbles: true });
                element.dispatchEvent(clickEvent);
            });
        });
    }
}, 1000); // Check every second
