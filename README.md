# Nowsta Worker App

## Get Started

**Install dependencies with [Yarn](https://yarnpkg.com)**:

```sh
$ yarn
```

### Android

We support latest features on Android and it requires to have several build for different Android SDK version.
Variants (Flavors) used to support such builds. Generic `$ react-native run-android` doesn't work.

At first you'll need to run React Native packager (skip it, if you're building release):

```sh
$ yarn start
```

After you have packager running, all you need is to run gradle task with package.json command.

```sh
$ # Debug build
$ android:install:debug

$ # Release build
$ android:install:release
```

### iOS

Open project in XCode and press _Run_:

```sh
$ open ios/NowstaWorkerApp.xcodeproj
```

Set _Legacy Build System_:

```xCode
File > Project Settings... > Shared Project Settings > Build System > Legacy Build System
```

## Release Beta Testing

Configure `.env.|staging|development|production|` based on `.env.example` from root project directory

### Test Flight

Run next lane for `Production`:

```sh
$ fastlane ios beta --env production
```

Run next lane for `Staging`:

```sh
$ fastlane ios staging --env staging
```

### Play Store (Alpha)

Run next lane for `Production`:

```sh
$ fastlane android alpha --env production
```

Run next lane for `Staging`:

```sh
$ fastlane android staging --env staging
```

## Code Push Release

### iOS

Production:

```sh
$ fastlane ios code_push --env production beta:true
```

Staging

```sh
$ fastlane ios code_push --env staging staging:true
```

### Android

Production:

```sh
$ fastlane android code_push --env production alpha:true
```

Staging

```sh
$ fastlane android code_push --env staging staging:true
```


## Storybook

Storybook used for UI kit prototyping and testing.

Before running storybook, make sure that react native bundler isn't running:

`$ yarn storybook`
