# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Applicatiom

You need an android device or emulator running to run this project.

You can install android studio and start a device.

To run the application you need to start the application with 'npm run android'
this will start the metro server and another cmd will open where you need to select
android

Theapplication will run

## The code

### Dependencies

Basic dependencies include
"@react-navigation/native": "^6.1.16",
"@react-navigation/native-stack": "^6.9.25",
"@react-navigation/stack": "^6.3.28",
"graphql": "^16.8.1",
"graphql-request": "^6.1.0",
"react": "18.2.0",
"react-native": "0.73.6",
"react-native-paper": "^5.12.3",
"react-native-safe-area-context": "^4.9.0",
"react-native-screens": "^3.29.0"

### Context API

To manage the state of the application

### 3 screens

#### Home

#### Details

#### Faviroutes

### custom hook

Custom hook to that accepts

1. Custom url,
2. Query
3. A dependency string (can be random, to force hook to run afain)
####  and returns 3 states.
1. loading when request is not completed
2. data if request is success
3. Error if there was an error

### card container and custom card

Card container accepts an array and passes the values to custom card that would display the values

### constan

To store constants

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!
