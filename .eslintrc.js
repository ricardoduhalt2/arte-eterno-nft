module.exports = {
  extends: ['react-app'],
  rules: {
    'no-unused-vars': 'warn', // Downgrade from error to warning
    'react-hooks/exhaustive-deps': 'warn' // Downgrade from error to warning
  },
  overrides: [
    {
      files: ['src/components/NFTCard.js', 'src/components/NFTMarketplace.js'],
      rules: {
        'no-unused-vars': 'off', // Turn off for these specific files
        'react-hooks/exhaustive-deps': 'off' // Turn off for these specific files
      }
    }
  ]
};