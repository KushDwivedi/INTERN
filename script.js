const article = document.querySelector('.article');
const shareMenu = document.querySelector('#shareMenu');
const twitterButton = document.querySelector('#twitterButton');
let isTextSelected = false;

// Event listener for text selection
document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0) {
        isTextSelected = true;

        // Get the position of the selected text
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Position the share menu near the selected text
        shareMenu.style.display = 'block';
        shareMenu.style.left = (rect.left + window.scrollX) + 'px';
        shareMenu.style.top = (rect.bottom + window.scrollY) + 'px';

        // Store the selected text for sharing
        twitterButton.dataset.text = selectedText;
    } else {
        isTextSelected = false;
        shareMenu.style.display = 'none';
    }
});

// Event listener for clicking the Twitter button
twitterButton.addEventListener('click', () => {
    const selectedText = twitterButton.dataset.text;
    if (selectedText) {
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedText)}`;
        window.open(twitterShareUrl, '_blank');
        shareMenu.style.display = 'none';
        isTextSelected = false;
    }
});

// Close the share menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (!shareMenu.contains(e.target) && !isTextSelected) {
        shareMenu.style.display = 'none';
    }
});
