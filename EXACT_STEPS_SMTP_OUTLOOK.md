# Exact Steps to Enable SMTP Authentication in Microsoft 365

## Current Error
```
SmtpClientAuthentication is disabled for the Tenant
```

## What You Need to Do
Enable SMTP authentication for your Microsoft 365 tenant.

---

## Method 1: Exchange Admin Center (RECOMMENDED - Most Accurate)

### Step 1: Open Exchange Admin Center
1. Go to: **https://admin.exchange.microsoft.com**
2. Sign in with your Microsoft 365 admin credentials

### Step 2: Enable SMTP Auth for Your User
1. In the left sidebar, click **"Recipients"**
2. In the search box at the top, type: **`info@projectplanner.us`**
3. Click on the email address when it appears
4. You'll see user details on the right
5. Click on **"Mail"** tab (under the user's name)
6. Scroll down to find **"Client authentication settings"**
7. Look for **"SMTP AUTH"** or **"Authenticated SMTP"**
8. **Enable it** (check the box or toggle to ON)
9. Click **"Save"** at the top right

---

## Method 2: Enable for Entire Organization (Alternative)

### Step 1: Open Exchange Admin Center
1. Go to: **https://admin.exchange.microsoft.com**
2. Sign in

### Step 2: Organization Settings
1. In the left sidebar, click **"Settings"**
2. Click **"Mail flow"**
3. Look for **"SMTP AUTH"** settings
4. Click **"Edit"** or **"Configure"**
5. Enable SMTP authentication
6. Click **"Save"**

---

## Method 3: PowerShell (Fastest - For Admins)

### If you have PowerShell access:

1. Open PowerShell on your Mac:
   ```bash
   # Install Exchange Online PowerShell module (first time only)
   Install-Module -Name ExchangeOnlineManagement
   ```

2. Connect to Exchange Online:
   ```powershell
   Connect-ExchangeOnline
   # It will prompt you to sign in
   ```

3. Enable SMTP Auth for your user:
   ```powershell
   Set-CASMailbox -Identity "info@projectplanner.us" -SmtpClientAuthenticationDisabled $false
   ```

4. Verify it worked:
   ```powershell
   Get-CASMailbox -Identity "info@projectplanner.us" | Select SmtpClientAuthenticationDisabled
   ```
   
   Should return: **`False`**` (meaning enabled)

---

## Method 4: Classic Exchange Admin Center (If New One Doesn't Work)

### Step 1: Go to Classic Admin Center
1. Go to: **https://admin.microsoft.com**
2. Sign in

### Step 2: Exchange Admin
1. Click **"Admin centers"** (in the left sidebar or bottom left)
2. Click **"Exchange"**
3. This opens **Classic Exchange Admin Center**

### Step 3: Enable SMTP Auth
1. Click **"Recipients"** in the left sidebar
2. Find your user: **info@projectplanner.us**
3. Double-click to edit
4. Click **"Mailbox Features"** tab
5. Find **"Mobile Device"** or **"Client Access"**
6. Look for **"SMTP AUTH"** and enable it
7. Click **"Save"**

---

## What to Look For

When enabling SMTP auth, you might see these options:
- ☐ **"SMTP AUTH"** - Check this box
- ☐ **"Authenticated SMTP"** - Check this box  
- ☐ **"Enable SMTP client authentication"** - Check this box
- Toggle switch: Turn it **ON**

---

## After Enabling

### Wait 10-15 Minutes
Changes take time to propagate through Microsoft's servers.

### Restart Your Backend
```bash
pkill -f "node server.js"
cd backend
npm start
```

### Test Email
```bash
curl -X POST http://localhost:3000/test-email -H "Content-Type: application/json" -d '{"testEmail": "farnienel@hotmail.com"}'
```

### Success!
You should see:
```
✅ Email sent successfully
```

And receive the email in your inbox!

---

## Visual Guide

### Exchange Admin Center Layout
```
┌─────────────────────────────────────────────┐
│ Exchange Admin Center                       │
├─────────────────────────────────────────────┤
│ 👤 Recipients  │  Settings  │  Reports     │
├─────────────────────────────────────────────┤
│ 👤 info@projectplanner.us                   │
│                                              │
│ Tab: [General] [Mail] [Groups] [...]       │
│                                              │
│ Client authentication settings:             │
│ ☑ SMTP AUTH                                  │
│ ☐ POP3                                       │
│ ☐ IMAP                                       │
│                                              │
│                    [Save]                    │
└─────────────────────────────────────────────┘
```

---

## Troubleshooting

### "Can't find SMTP settings"
- Make sure you're looking under **"Mail"** or **"Mailbox Features"** tab
- Some accounts might have it under **"Client Access"**

### "Option is grayed out"
- You might not have admin permissions
- Try logging in as a Global Administrator

### "Changes don't work after 15 minutes"
- Try restarting your backend
- Check that you enabled for the correct user (info@projectplanner.us)
- Verify in PowerShell: `Get-CASMailbox -Identity "info@projectplanner.us"`

---

## Summary

**What**: Enable SMTP AUTH for `info@projectplanner.us`  
**Where**: https://admin.exchange.microsoft.com  
**How**: Recipients → User → Mail tab → Enable SMTP AUTH  
**Wait**: 10-15 minutes  
**Test**: Email should work!

Good luck! 🎉











