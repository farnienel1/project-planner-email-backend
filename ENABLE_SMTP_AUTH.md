# Enable SMTP Authentication for Microsoft 365

## The Error
```
SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

## Solution: Enable SMTP Auth

### Option 1: Via Microsoft 365 Admin Center (Easiest)

1. Go to: https://admin.microsoft.com
2. Sign in with your admin account
3. Go to **Settings** → **Org settings**
4. Click the **Mail** tab
5. Scroll down to **SMTP authentication**
6. Check **Allow users to use SMTP AUTH to send mail**
7. Click **Save**

### Option 2: Via Exchange Admin Center (More Control)

1. Go to: https://admin.exchange.microsoft.com
2. Click **Mail flow** → **Settings**
3. Click **Edit** next to "Client authentication settings"
4. Enable **SMTP AUTH** for:
   - All users, OR
   - Only users who need it (recommended: select specific users)
5. Click **Save**

### Option 3: Enable for Specific User

1. Go to: https://admin.microsoft.com
2. Go to **Users** → **Active users**
3. Select the user (`info@projectplanner.us`)
4. Click **Edit** under "Mail"
5. Enable **SMTP AUTH**
6. Click **Save**

## Important

- Changes can take 15-30 minutes to propagate
- You may need to restart the backend after enabling
- The 16-character password you created is correct: `fvhvhqczdzcjnqss`

## Test Again

After enabling SMTP auth:
```bash
curl -X POST http://localhost:3000/test-email -H "Content-Type: application/json" -d '{"testEmail": "your-email@example.com"}'
```











