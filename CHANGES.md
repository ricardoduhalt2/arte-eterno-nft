## [UNRELEASED] - YYYY-MM-DD

## 2025-07-05
### Added
- **UI/UX Enhancements**:
    - Updated main application title, subtitle, and logo in `src/App.js`.
    - Updated footer text in `src/App.js`.
    - Implemented a blinking light blue glow and lift effect on NFT card hover (`src/components/NFTCard.css`).
    - Corrected missing CSS import in `src/components/NFTCard.js` to ensure card styles are applied.
    - Adjusted font sizes for main page title and subtitle in `src/App.css` to be similar and adopted a more modern styling.
    - **NFT Card Refinements (`src/components/NFTCard.js`)**:
        - Reduced overall card width for a more compact look (`maxWidth: '280px'`).
        - Decreased font size of the NFT description text and applied a more subtle color and modern styling (e.g., `fontSize: '0.85em'`, `color: '#666'`, `lineHeight: '1.4'`).
        - Slightly reduced font sizes for price/supply text and claim button for better proportion with smaller cards.

### Changed
- Current functionality is working well.

### Next Steps
- Continue enhancing the look and feel to be super modern.
- Explore further animations and interactivity for other components.
