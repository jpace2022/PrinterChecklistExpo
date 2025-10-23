# Printer Management App

A complete React Native Expo app for managing printers and maintenance checklists.

## ✨ Features

### 🖨️ Printer Management
- **Add Printers**: Add new printers with name, IP address, and model
- **View Printers**: See all your printers in a list
- **Delete Printers**: Remove printers you no longer need
- **Local Storage**: All data persists using AsyncStorage

### ✅ Maintenance Checklist
- Interactive checklist with 10 common maintenance tasks
- Progress tracking with visual progress bar
- Toggle completion status for each task
- Reset functionality to start fresh
- Visual feedback for completed tasks

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app (for testing on mobile devices)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `w` for web
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 📱 App Structure

```
app/
├── (tabs)/
│   └── index.tsx          # Home tab (redirects to HomeScreen)
├── screens/
│   ├── HomeScreen.tsx     # Main navigation screen
│   ├── AddPrinterScreen.tsx   # Add new printers
│   └── ChecklistScreen.tsx    # Maintenance checklist
├── api/
│   └── printerService.ts  # Data persistence layer
├── types/
│   └── index.ts          # TypeScript interfaces
├── add-printer.tsx       # Route for adding printers
├── printer-list.tsx      # Route for viewing printers
└── checklist.tsx         # Route for maintenance checklist
```

## 🔧 Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **AsyncStorage** - Local data persistence

## 📝 Usage

### Adding a Printer
1. Tap "Add New Printer" from the home screen
2. Enter printer name (e.g., "Office Printer")
3. Enter IP address (e.g., "192.168.1.100")
4. Enter model (e.g., "HP LaserJet Pro")
5. Tap "Add Printer"

### Viewing Printers
1. Tap "View Printers" from the home screen
2. See all your printers with their details
3. Swipe or tap "Delete" to remove a printer

### Using the Checklist
1. Tap "Maintenance Checklist" from the home screen
2. Toggle switches to mark tasks as complete
3. Track your progress with the progress bar
4. Tap "Reset Checklist" to start over

## 🎨 Features to Add (Future)

- [ ] Edit existing printers
- [ ] Printer status monitoring (online/offline)
- [ ] Custom checklist items
- [ ] Export/import printer data
- [ ] Network printer discovery
- [ ] Print test pages
- [ ] Maintenance history
- [ ] Push notifications for maintenance reminders

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and restart
npx expo start -c
```

### TypeScript errors
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P > TypeScript: Restart TS Server
```

### Data not persisting
- Check AsyncStorage permissions
- Try clearing app data and restarting

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
