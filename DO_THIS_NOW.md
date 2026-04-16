# DO THIS NOW - Simple PowerShell Commands

## Install PowerShell (First Time Only)

Open Terminal and run:

```bash
brew install powershell/tap/powershell
```

Or if that doesn't work:

```bash
brew install --cask powershell
```

Wait for it to install.

---

## Run These 3 Commands

Open a new Terminal window and copy/paste these:

### Step 1: Install Exchange Module (First Time Only)

```bash
pwsh -Command "Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser -Force"
```

### Step 2: Connect and Enable SMTP Auth

```bash
pwsh -Command "Connect-ExchangeOnline; Set-CASMailbox -Identity 'info@projectplanner.us' -SmtpClientAuthenticationDisabled \$false; Get-CASMailbox -Identity 'info@projectplanner.us' | Select SmtpClientAuthenticationDisabled"
```

This will:
- Connect you to Microsoft 365
- Enable SMTP auth for your user
- Show you if it worked

### Step 3: Verify (Optional)

```bash
pwsh -Command "Get-CASMailbox -Identity 'info@projectplanner.us' | Select SmtpClientAuthenticationDisabled"
```

**Should show**: `False` ✅ (meaning enabled)

---

## After Running These Commands

### Wait 10 Minutes
Changes need time to propagate.

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

**Success**: You'll receive an email! 🎉

---

## If You Don't Have Admin Access

Ask your Microsoft 365 admin to run this command for you:

```powershell
Set-CASMailbox -Identity "info@projectplanner.us" -SmtpClientAuthenticationDisabled $false
```

Or they can enable it via the web interface.

---

## Quick Summary

1. Install PowerShell: `brew install powershell`
2. Install module: See Step 2 above
3. Run the enable command: See Step 2 above
4. Wait 10 minutes
5. Restart backend
6. Test email

That's it! 🚀











