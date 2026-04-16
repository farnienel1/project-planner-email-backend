# Step-by-Step: Enable SMTP Authentication

## Current Status
✅ Email created: `info@projectplanner.us`  
✅ App Password created: `fvhvhqczdzcjnqss`  
✅ Backend configured with correct credentials  
❌ SMTP Authentication is DISABLED (this is what we need to fix)

## The Problem
```
SmtpClientAuthentication is disabled for the Tenant
```

This means Microsoft 365 is blocking SMTP authentication.

---

## SOLUTION: Enable SMTP Authentication

### Method 1: Via Web Admin Center (EASIEST - Try this first)

#### Step 1: Open Exchange Admin Center
1. Go to: https://admin.exchange.microsoft.com
2. Sign in with your Microsoft 365 admin account

#### Step 2: Navigate to Client Authentication Settings
1. In the left sidebar, click **Mail flow**
2. Click **Settings** (or look for "Client authentication settings")
3. Click **Edit** next to "Client authentication settings"

#### Step 3: Enable SMTP AUTH
1. Find the setting: **"SMTP AUTH"** or **"Authenticated SMTP"**
2. Enable it by checking the box or setting to "Enabled"
3. Click **Save**

#### Step 4: Wait 10-15 minutes
Changes take time to propagate.

#### Step 5: Test
```bash
curl -X POST http://localhost:3000/test-email -H "Content-Type: application/json" -d '{"testEmail": "your-email@example.com"}'
```

---

### Method 2: Via Microsoft 365 Admin Center

#### Step 1: Open Admin Center
1. Go to: https://admin.microsoft.com
2. Sign in

#### Step 2: Go to Org Settings
1. Click the **Settings** icon (gear) in the top right
2. Click **Org settings**
3. Click the **Mail** tab

#### Step 3: Enable SMTP AUTH
1. Look for **"SMTP authentication"** or **"Authenticated SMTP"**
2. Check the box: **"Allow users to use SMTP AUTH to send mail"**
3. Click **Save**

#### Step 4: Wait and Test (same as above)

---

### Method 3: Enable Just for Your User

#### Step 1: Open Exchange Admin Center
1. Go to: https://admin.exchange.microsoft.com
2. Sign in

#### Step 2: Find Your User
1. Click **Recipients** in the left sidebar
2. Search for `info@projectplanner.us`
3. Click on it

#### Step 3: Mail Settings
1. Click **Mail** tab (or section)
2. Find **"Client authentication"** or **"SMTP authentication"**
3. Enable **"SMTP AUTH"** or **"Authenticated SMTP"**
4. Click **Save**

---

### Method 4: Using PowerShell

If you have admin access via PowerShell:

```powershell
# Connect to Exchange Online
Connect-ExchangeOnline

# Disable the "SMTP Auth disabled" setting (enabling SMTP auth)
Set-CASMailbox -Identity "info@projectplanner.us" -SmtpClientAuthenticationDisabled $false

# Verify it worked
Get-CASMailbox -Identity "info@projectplanner.us" | Select SmtpClientAuthenticationDisabled
```

Should return: `False` (meaning enabled)

---

## After Enabling SMTP Auth

1. **Wait 10-15 minutes** for changes to propagate
2. **Restart your backend**:
   ```bash
   pkill -f "node server.js"
   cd backend
   npm start
   ```
3. **Test email**:
   ```bash
   curl -X POST http://localhost:3000/test-email -H "Content-Type: application/json" -d '{"testEmail": "farnienel@hotmail.com"}'
   ```

## Success Indicators

✅ **Email should be sent successfully**  
✅ **You'll receive the test email in your inbox**  
✅ **Backend console shows**: `✅ Email sent successfully`

## Troubleshooting

If it still doesn't work after 15 minutes:

1. **Double-check you enabled it**: Go back to settings and verify SMTP auth is enabled
2. **Try enabling for all users**: Instead of just your user
3. **Check if you have the right permissions**: You might need to be a Global Admin
4. **Contact Microsoft Support**: They can enable it for you

---

## Your Current Configuration

**Email**: `info@projectplanner.us`  
**Password**: `fvhvhqczdzcjnqss` (app password)  
**SMTP Server**: `smtp.office365.com`  
**Port**: `587`  
**Status**: Waiting for SMTP auth to be enabled ✅

Good luck! Once SMTP auth is enabled, your emails should work perfectly. 🎉











