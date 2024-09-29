// Replace with your Google Apps Script Web App URL
const googleSheetUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

let walletAddress = null;

// Function to handle wallet connection
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            walletAddress = accounts[0];
            document.getElementById('walletStatus').innerText = `Connected: ${walletAddress}`;
            document.getElementById('claimButton').disabled = false;
            document.getElementById('message').innerText = '';
        } catch (error) {
            document.getElementById('message').innerText = 'Connection failed. Please try again.';
        }
    } else {
        document.getElementById('message').innerText = 'MetaMask is not installed.';
    }
}

// Function to submit wallet address to Google Sheets
async function submitWalletAddress() {
    if (!walletAddress) return;

    try {
        const response = await fetch(googleSheetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress }),
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Airdrop successfully claimed!';
        } else {
            document.getElementById('message').innerText = 'Failed to claim airdrop. Try again later.';
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Error submitting wallet address.';
    }
}

// Attach event listeners
document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('claimButton').addEventListener('click', submitWalletAddress);
