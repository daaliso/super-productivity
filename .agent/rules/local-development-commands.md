---
trigger: always_on
---

# Local Development Commands

## Web (Development)

```bash
npm run startFrontend   # Start dev server at http://localhost:4200/
```

---

## Android Debug APK

```bash
npm run droid                           # Build + sync
cd android && .\gradlew assembleDebug   # Assemble APK
```

**Output:** `android/app/build/outputs/apk/fdroid/debug/app-fdroid-debug.apk`

---

## Android Release APK (Production)

```bash
cd android && build-release.bat
```

**Output:** `android/app/build/outputs/apk/fdroid/release/app-fdroid-release.apk`

> **Note:** The `build-release.bat` script sets the required keystore environment variables automatically.

---

## Install APK to Device

```bash
npm run install:android
```
