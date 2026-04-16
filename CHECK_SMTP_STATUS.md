# Check SMTP Status - What You'll See

## The Error Means:
- `SmtpClientAuthentication is disabled for the Tenant` = SMTP AUTH is **OFF** (disabled)
- You checked "Turn off SMTP auth only" box, but **it may not have propagated yet**
- OR the checkbox needs to be checked globally, not just per-user

## What We Need To Do:

### Option 1: Wait More Time
Microsoft says changes can take **15-60 minutes**. You checked the box ~30 minutes ago. It might just need more time.

### Option 2: Enable SMTP AUTH via PowerShell
This is the **most reliable way**. We need to run this PowerShell command:

```powershell
Set-CASMailbox -Identity 'info@projectplanner.us' -SmtpClientAuthenticationDisabled $false
```

This **definitely enables** SMTP authentication.

## Next Steps:
1. If you have Windows or can access Windows:
   - Open PowerShell
   - Connect to Microsoft 365
   - Run the command above

2. If you only have Mac:
   - We can guide you through the exact admin center steps
   - Or use SendGrid as a reliable alternative

Let me know which you prefer!











