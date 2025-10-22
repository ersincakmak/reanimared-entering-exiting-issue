## React Native Reanimated Android Animation Issue

### Issue Description
Entering and exiting animations are not working properly on the Android platform with React Native Reanimated.

### Problem Details
- **Built-in entering/exiting animations**: Components do not show at all
- **Custom entering/exiting animations**: Animations play but components disappear immediately after completion

### Expected Behavior
Components should animate in and out smoothly and remain visible after entering animations are complete.

### Screen Record
https://github.com/user-attachments/assets/0bbc50ba-25f0-4064-b889-afaeb6155076

### Environment
- Platform: Android
- React Native Reanimated: 3.19.3
- React Native: 0.81.4
