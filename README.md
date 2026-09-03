# NFT Marketplace

A React Native NFT marketplace app showcasing NFT collections, bidding, and discovery. Built with Expo and React Navigation.

## Author

Built and maintained by **Amirsali** (Amir, amir singlife).

- GitHub: https://github.com/muhallimir
- Portfolio: https://github.com/muhallimir/portfolio-v3

## Tech Stack

- Expo SDK 54
- React Native 0.81 with React 19
- React Navigation v7 (stack navigator)
- react-native-web for browser support
- Custom font system (Inter family)
- Animated heroicons via `react-native-heroicons`

## Features

- Home feed of NFT cards with image, creator, current ETH price
- Detail view with bid history and full description
- Search bar in the header that filters the home feed
- Custom status bar that adapts to the background
- Circular back and favorite buttons
- Responsive sizing via the centralized `theme.js` constants

## Project Structure

```
App.js                   Navigation container, theme, font loading
screens/                 HomeScreen, DetailsScreen
components/              NFTCard, HomeHeader, FocusedStatusBar, Button, SubInfo, DetailsBid, DetailsDesc
constants/               theme, fonts, assets, demo NFT data
assets/                  images, fonts, icons
```

## Running

```bash
npm install
npx expo start         # dev server
npx expo start --web   # dev server in browser
npm run build:web      # static web bundle into ./dist
```

## Building for Stores

This project does not commit native `android/` or `ios/` folders. Generate them with `npx expo prebuild` and then run `npx expo run:android` or `npx expo run:ios`.

## License

MIT, by Amirsali.
