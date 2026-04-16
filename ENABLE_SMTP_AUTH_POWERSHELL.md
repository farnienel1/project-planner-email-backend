# Enable SMTP Authentication via PowerShell

If you have PowerShell access to Microsoft 365, you can enable SMTP auth with these commands:

## Step 1: Connect to Microsoft 365
```powershell
Connect-ExchangeOnline
```

## Step 2: Enable SMTP Auth for All Users
```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

## Step 3: Enable SMTP Auth for Specific User
```powershell
Set-CASMailbox -Identity "info@projectplanner.us" -SmtpClientAuthenticationDisabled $false
```

## Step 4: Verify It Worked
```powershell
Get-CASMailbox -Identity "info@projectplanner.us" | Select SmtpClientAuthenticationDisabled
```

This should return: `False` (meaning SMTP auth is enabled)

## Full Example Session
```powershell
# Connect to Exchange Online
Connect-ExchangeOnline

# Enable SMTP auth for the tenant
Set-TransportConfig -SmtpClientAuthenticationDisabled $false

# Enable SMTP auth for specific user
Set-CASMailbox -Identity "info@projectplanner.us" -SmtpClientAuthenticationDisabled $false

# Verify
Get-CASMailbox -Identity "info@projectplanner.us" | Select SmtpClientAuthenticationDisabled

# Should return: False
```

## After Running These Commands

1. Wait 5-15 minutes for changes to propagate
2. Restart your backend (if running)
3. Test the email again











