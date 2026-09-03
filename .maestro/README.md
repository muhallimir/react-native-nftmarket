# Mobile UI tests (Maestro)

`home-flow.yaml` is a [Maestro](https://maestro.mobile.dev) flow that drives the
app against an iOS simulator and asserts the home view renders correctly.

## Prerequisites

```bash
brew install openjdk
curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH:$HOME/.maestro/bin"
```

If Xcode is installed at a non-standard path, export `DEVELOPER_DIR`:

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
```

`env.sh` in this folder sets both for convenience.

## Building the app

Build a Release configuration so the dev client overlays (red error screen,
warning toasts) are out of the way:

```bash
npx expo prebuild --platform ios --clean
npx expo run:ios --configuration Release
```

## Running the flow

```bash
source .maestro/env.sh
maestro test .maestro/home-flow.yaml
```

The flow clears app state, launches the app, waits for the home view, asserts
the visible text and key features, and screenshots each step.
