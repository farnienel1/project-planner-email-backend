# Quick MFA Setup for Microsoft 365

## Step 1: Sign in to Microsoft 365 Admin Center
1. Go to: https://admin.microsoft.com
2. Sign in with your admin account

## Step 2: Enable MFA Security Defaults

1. Click the **Settings** icon (gear) in the top right
2. Go to **Security & Privacy**
3. Click **Add more security to your account** or go to https://admin.microsoft.com/AdminPortal/Home#/Security
4. Click on **Azure AD** (or **Microsoft Entra ID**)
5. Click **Properties**
6. Under **Security defaults**, click **Enable**
7. Click **Save**

## Step 3: Create App Password

1. Go to: https://account.microsoft.com/security
2. Sign in
3. Click **Additional security options**
4. Click **App passwords**
5. Click **Create new app password**
6. Name: "Project Planner Backend"
7. Click **Create**
8. **Copy the password** - it looks like: `abcd-efgh-ijkl-mnop`

## Step 4: Update .env File

Edit the file: `backend/.env`

Change it to:
```env
EMAIL_USER=info@projectplanner.us
EMAIL_PASSWORD=YOUR_APP_PASSWORD_HERE
PORT=3000
```

Replace `YOUR_APP_PASSWORD_HERE` with the app password you copied.

## Step 5: Test

1. Restart backend: `npm start` (in the backend directory)
2. Test email: `curl -X POST http://localhost:3000/test-email -H "Content-Type: application/json" -d '{"testEmail": "your-email@example.com"}'`
3. Check your email inbox!

Done! Email should now work. 🎉











