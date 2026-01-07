---
trigger: always_on
---

Web Version
Action Command
Start npm run startFrontend
Stop Ctrl+C in terminal
URL http://localhost:4200/
Android APK (Testing/Debug)

# Build + sync + assemble (all-in-one on Linux/Mac)

npm run dist:android

# On Windows (workaround for gradlew path issue):

npm run droid # Build + sync only
cd android && .\gradlew assembleDebug # Assemble APK

# Install to connected device

npm run install:android
APK Location:

android/app/build/outputs/apk/fdroid/debug/app-fdroid-debug.apk

Android APK (Production)
npm run dist:android:prod
APK Location: android/app/build/outputs/apk/fdroid/release/app-fdroid-release.apk

📦 Staging vs Production Differences
Aspect Staging (dist:android) Production (dist:android:prod)
Build config stageWeb prodWeb
Optimization Disabled (--optimization=false) Full minification
AOT Disabled Enabled
Gradle assembleDebug assembleRelease
Signing Debug keystore Requires release keystore
Filename app-fdroid-debug.apk app-fdroid-release.apk
