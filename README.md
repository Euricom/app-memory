# React Native Euricom Memory App

## What you need to know for simulating the Application:

    - This app is made Universal for IPAD and IPHONE but is specifically aimed toward iPad.
    - start with npm install
    - use terminal to navigate to the memory folder and simulate it:
        - For Ipad Retina:  react-native run-ios --simulator "iPad Retina"
        - Other devices are possible when adding --simulator

## what you need to know for building the app on a device

### In Development:

If you want to simulate the application on a device. proceed with the following steps for IOS:

    - Add the device under your Apple developer account
    - Open xCode
    - open the memory/ios/memory.xcodeproject project
    - navigate in xcode to AppDelegate.m
        - This is achieved through memory => "Build Phases" tab
        - Compile Sources
        - Right-click on AppDelegate.m and open as Source code
    - under the commented code with OPTION 1 you will find the following code:
    ```
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
    ```
    - here you need to replace the http://localhost with your ipAddress.
    - save the file
    - link your device to your MAC.
        - the device should now be available as simulator device.
    - Press the build button

The native code still runs under your development machine and isn't bundled to the device. If the connection between your MAC and device is broken, the device will no longer run the code and will throw the Development Server unavailable error.

### In deployment

if you want to deploy the application to a dedicated device, proceed with the following steps for IOS:

    - Add the device under your Apple developer account
    - Open xCode
    - open the memory/ios/memory.xcodeproject project
    - navigate in xcode to AppDelegate.m
        - This is achieved through memory => "Build Phases" tab
        - Compile Sources
        - Right-click on AppDelegate.m and open as Source code
    - under the commented code with OPTION 2 you will find the following commented code:
    ```
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    ```
    - uncomment this code.
    - save the file
    - link your device to your MAC.
        - the device should now be available as simulator device.
    - Extra: If you want to build the app in release mode
        - Go to xCode - Product - Scheme - Edit Scheme
        - Go to Run
        - change the build configuration to Release and deactivate Debug Executable.
    - Press the build button
