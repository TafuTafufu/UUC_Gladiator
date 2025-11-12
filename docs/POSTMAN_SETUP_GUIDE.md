# Complete Postman Setup Guide
## Automated Ship Status Updates for UUC Gladiator

This guide walks you through setting up a **single-click ship status update system** in Postman.

---

## What This Does

✅ **Automatically fetches** the latest file SHA from GitHub  
✅ **Allows manual editing** of ship status in plain JSON  
✅ **Automatically encodes** JSON to Base64 (supports Chinese characters)  
✅ **One-click update** - just edit values and click Send!

---

## Prerequisites

Before starting, you need:

1. **GitHub Personal Access Token** with `repo` permissions
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scope: `repo` (full control of private repositories)
   - Copy the token (you'll only see it once!)

2. **Postman Application** installed or web version

---

## Step 1: Create Environment Variables

### 1.1 Create a New Environment

1. Click **Environments** (left sidebar)
2. Click **+** to create new environment
3. Name it: `UUC Gladiator GitHub`

### 1.2 Add Variables

Add these 5 variables:

| Variable | Type | Initial Value | Current Value |
|----------|------|---------------|---------------|
| `github_username` | default | `TafuTafufu` | `TafuTafufu` |
| `github_repo` | default | `UUC_Gladiator` | `UUC_Gladiator` |
| `github_token` | secret | `ghp_your_token_here` | `ghp_your_token_here` |
| `current_sha` | default | *(leave empty)* | *(leave empty)* |
| `ship_status_content` | default | *(leave empty)* | *(leave empty)* |

**Important:** Replace `ghp_your_token_here` with your actual GitHub token!

### 1.3 Save & Select Environment

1. Click **Save**
2. Select "UUC Gladiator GitHub" from environment dropdown (top-right)

---

## Step 2: Create PUT Request

### 2.1 Create New Request

1. Click **New** → **HTTP Request**
2. Name it: `Update Ship Status`
3. Save to a collection (create new if needed)

### 2.2 Configure Request Method & URL

**Method:** `PUT`

**URL:**
```
https://api.github.com/repos/{{github_username}}/{{github_repo}}/contents/config/network/K2-PS187/shipStatus.json
```

### 2.3 Add Headers

Click **Headers** tab and add:

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{github_token}}` |
| `Accept` | `application/vnd.github+json` |

### 2.4 Configure Body

Click **Body** tab:
1. Select **raw**
2. Select **JSON** from dropdown
3. Paste this:

```json
{
  "message": "Update ship status from Postman",
  "content": "{{ship_status_content}}",
  "sha": "{{current_sha}}",
  "branch": "stage-2-test-branch"
}
```

---

## Step 3: Add Pre-request Script

### 3.1 Click **Pre-request Script** Tab

### 3.2 Paste This Complete Script

```javascript
// Step 1: Fetch current file to get latest SHA
const getUrl = `https://api.github.com/repos/${pm.variables.get('github_username')}/${pm.variables.get('github_repo')}/contents/config/network/K2-PS187/shipStatus.json?ref=stage-2-test-branch`;

const getRequest = {
    url: getUrl,
    method: 'GET',
    header: {
        'Authorization': `Bearer ${pm.variables.get('github_token')}`,
        'Accept': 'application/vnd.github+json'
    }
};

pm.sendRequest(getRequest, function (err, response) {
    if (err) {
        console.error('Error fetching SHA:', err);
        return;
    }
    
    const currentSha = response.json().sha;
    console.log('Fetched SHA:', currentSha);
    pm.environment.set('current_sha', currentSha);
    
    // ============================================
    // Step 2: EDIT YOUR SHIP STATUS HERE
    // ============================================
    // Choose a template from SHIP_STATUS_TEMPLATES.md
    // or customize your own values below
    
    const shipStatus = {
        "hullIntegrity": {
            "value": 10,
            "unit": "%",
            "status": "严重受损",
            "color": "#ff4d4d"
        },
        "propulsion": {
            "status": "离线",
            "color": "#ff4d4d"
        },
        "lifeSupport": {
            "status": "故障",
            "color": "#bd2d2d"
        },
        "weapons": {
            "status": "不可用",
            "color": "#bd2d2d"
        },
        "communications": {
            "status": "微弱信号",
            "color": "#bd2d2d"
        },
        "coreAI": {
            "status": "在线 (K2-PS187 神经核心)",
            "color": "#96b38a"
        },
        "warnings": [
            "警告：检测到多处结构性损伤",
            "警告：生命维持系统即将失效",
            "建议：立即撤离舰船"
        ]
    };
    
    // Step 3: Auto-convert to Base64 (handles Chinese characters!)
    const jsonString = JSON.stringify(shipStatus, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonString)));
    pm.environment.set("ship_status_content", base64Content);
});
```

### 3.3 Save the Request

Click **Save** (top-right)

---

## Step 4: Test the Setup

### 4.1 First Test

1. In the Pre-request Script, change hull value to `15`
2. Click **Send**
3. Check response:
   - **Status:** 200 OK ✅
   - **Body:** Should show commit details

### 4.2 Verify Update

**Wait 1-2 minutes** for GitHub Pages to rebuild, then:

1. Go to https://tafutafufu.github.io/UUC_Gladiator/
2. SSH to K2-PS187
3. Type `status`
4. Confirm hull shows 15%

---

## Daily Usage Workflow

### Quick Update (3 Steps):

1. **Choose template** from `SHIP_STATUS_TEMPLATES.md`
2. **Copy & paste** into Pre-request Script (replace `shipStatus` object)
3. **Adjust values** if needed, then click **Send**

### Example Update:

```javascript
// Just change this part in Pre-request Script:
const shipStatus = {
    "hullIntegrity": {
        "value": 63,  // ← Change this!
        "unit": "%",
        "status": "中度损伤",
        "color": "#fbbf24"
    },
    // ... rest stays the same
};
```

Click **Send** → Done! ✅

---

## Timing & Best Practices

### Update Timing:
- **Postman PUT:** Instant (< 1 second)
- **GitHub Pages rebuild:** 1-2 minutes
- **Players see changes:** After typing `status` command

### Best Practices:

✅ **Update between game scenes** - Give GitHub Pages time to rebuild  
✅ **Use templates** - Faster than editing from scratch  
✅ **Test first** - Try one update before the game session  
✅ **Keep Postman open** - Ready for quick updates during gameplay  
✅ **Check console** - Look for "Fetched SHA: ..." to confirm script ran

### Troubleshooting:

**Response 409 Conflict:**
- SHA is outdated
- Script should auto-fetch it (check Console for "Fetched SHA")
- If fails, manually send request again

**Response 401 Unauthorized:**
- Check your GitHub token is correct
- Token may have expired (generate new one)

**Response 404 Not Found:**
- Verify repository name and username
- Check branch name is `stage-2-test-branch`

**Changes don't appear:**
- Wait 1-2 minutes for GitHub Pages
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub repo to confirm file was updated

---

## Advanced: Custom Scenarios

### Example: Mid-Battle Damage

```javascript
const shipStatus = {
    "hullIntegrity": {
        "value": 42,
        "unit": "%",
        "status": "战斗损伤",
        "color": "#ff9500"
    },
    "propulsion": {
        "status": "受损 (60%推力)",
        "color": "#d97706"
    },
    "lifeSupport": {
        "status": "稳定",
        "color": "#96b38a"
    },
    "weapons": {
        "status": "过热",
        "color": "#d97706"
    },
    "communications": {
        "status": "受损信号",
        "color": "#d97706"
    },
    "coreAI": {
        "status": "在线 (K2-PS187 神经核心)",
        "color": "#96b38a"
    },
    "warnings": [
        "警告：武器系统过热",
        "警告：推进器受损",
        "提示：正在重新路由能量"
    ]
};
```

### Example: Repair Progress

```javascript
const shipStatus = {
    "hullIntegrity": {
        "value": 58,
        "unit": "%",
        "status": "维修中",
        "color": "#fbbf24"
    },
    "propulsion": {
        "status": "修复中 (70%推力)",
        "color": "#fbbf24"
    },
    "lifeSupport": {
        "status": "稳定",
        "color": "#96b38a"
    },
    "weapons": {
        "status": "离线维护",
        "color": "#d97706"
    },
    "communications": {
        "status": "正常",
        "color": "#96b38a"
    },
    "coreAI": {
        "status": "在线 (K2-PS187 神经核心)",
        "color": "#96b38a"
    },
    "warnings": [
        "提示：船体修复进行中",
        "提示：推进系统恢复中",
        "预计完成时间：2小时"
    ]
};
```

---

## Security Notes

🔒 **Never commit your GitHub token to the repository**  
🔒 **Use Postman's "secret" variable type for tokens**  
🔒 **Regenerate tokens if exposed**  
🔒 **Limit token scope to only `repo` permissions**

---

## Support

If you encounter issues:
1. Check the Console tab in Postman for error messages
2. Verify all environment variables are set correctly
3. Confirm GitHub token has `repo` permissions
4. Check GitHub repository exists and branch name is correct
