# React Native Euricom Memory App

## What you need to know for simulating the Application:

    - This app is made Universal for IPAD and IPHONE but is specifically aimed toward iPad.
    - start with npm install
    - use terminal to navigate to the memory folder and simulate it:
        - For Ipad Retina:  react-native run-ios --simulator "iPad Retina"
        - Other devices are possible when adding --simulator

## what you need to know for building the app on a device

### Development with Development Server:

If you want to simulate the application on a device. proceed with the following steps for IOS:

    - Add the device under your Apple developer account
    - Open xCode
    - open the memory/ios/memory.xcodeproject project
    - OPTION 1 navigate in xcode to AppDelegate.m
        - This is achieved through memory => "Build Phases" tab
        - Compile Sources
        - Right-click on AppDelegate.m and open as Source code
    - OPTION 2 navigate to memory/ios/memory/AppDelegate.m via a texteditor like sublime or atom.
    - under the commented code with OPTION 1 you will find the following code:
    ```
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
    ```
    - replace http://localhost with your ipAddress. ( found with mac System Preferences)
    - save the file
    - link your device to your MAC.
        - the device should now be available as simulator device.
    - Press the build button

The native code still runs under your development machine and isn't bundled to the device. If the connection between your MAC and device is broken, the device will no longer run the code and will throw the Development Server unavailable error.

### Development without Development Server

If you want to deploy the application to a dedicated device without the need of a Development Server, proceed with the following steps for IOS:

    - Add the device under your Apple developer account
    - Open xCode
    - open the memory/ios/memory.xcodeproject project
    - OPTION 1 navigate in xcode to AppDelegate.m
        - This is achieved through memory => "Build Phases" tab
        - Compile Sources
        - Right-click on AppDelegate.m and open as Source code
    - OPTION 2 navigate to memory/ios/memory/AppDelegate.m via a texteditor like sublime or atom.
    - under the commented code with OPTION 2 you will find the following commented code:
    ```
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    ```
    - uncomment this line
    - save the file
    - link your device to your MAC.
        - the device should now be available as simulator device.
    - Press the build button

## Game Mechanics and other things you should know about.

### Game password

The game password is defined in the data.js file.

### Game image shuffle

The shuffle function found under data.js is based on the "Fisher–Yates shuffle" algoritm. This code was taken from
```
http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
```

### Game images

Because of a certain react-native bug the application does only work with static images at this time (code is available under the browseImage component to select images).

Navigate to memory/app/data where you will see a javascript file named data.js and a folder containing all the static images.

#### Add and Edit images

    - Add a new image to the images folder.
    - navigate to the data.js file
    - add the file as import
    - add the import as reference to the images constant.

    edit an existing image
    - if the name remains the same, nothing must be done.
    - if the name changes, the value must be updated in the data.js file.

## UI guide

There are a few things to be known about the app.
