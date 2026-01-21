# AWS Cognito Sample - React Authentication App

A React application with AWS Cognito authentication featuring Google and Facebook social sign-in.

## Features

- 🔐 AWS Cognito authentication
- 🔵 Google OAuth sign-in
- 🔷 Facebook OAuth sign-in
- ⚛️ React with TypeScript
- 🎨 Modern, responsive UI
- 🔒 Protected routes
- 👤 User profile display

## Tech Stack

- React 18 + TypeScript
- Vite
- AWS Amplify
- AWS Cognito

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- AWS Account
- Google Cloud Console account
- Facebook Developer account

### Setup Instructions

For detailed setup instructions, please see [cognito-app/SETUP.md](cognito-app/SETUP.md)

Quick start:

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/cognito-sample.git
   cd cognito-sample/cognito-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure AWS Cognito
   - Create a Cognito User Pool
   - Set up Google OAuth provider
   - Set up Facebook OAuth provider
   - Update `src/aws-config.ts` with your credentials

4. Run the app
   ```bash
   npm run dev
   ```

## Project Structure

```
cognito-app/
├── src/
│   ├── components/
│   │   ├── Login.tsx       # Login page with social buttons
│   │   ├── Login.css
│   │   ├── Home.tsx        # Protected home page
│   │   └── Home.css
│   ├── aws-config.ts       # AWS Amplify configuration
│   ├── App.tsx             # Main app with auth logic
│   └── main.tsx
├── SETUP.md                # Detailed setup guide
└── package.json
```

## Configuration

Update the following values in `src/aws-config.ts`:

- `userPoolId` - Your Cognito User Pool ID
- `userPoolClientId` - Your App Client ID
- `domain` - Your Cognito domain

## Screenshots

### Login Page
Modern login interface with Google and Facebook sign-in buttons.

### Home Page
Protected page displaying user information after authentication.

## License

MIT

## Author

Created with AWS Cognito, React, and AWS Amplify
