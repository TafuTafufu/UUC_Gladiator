# How to Update K2-PS187 Ship Status via Postman

**IMPORTANT: This guide is for GitHub Pages deployment on `stage-2-test-branch`**

---

## 🎯 How It Works

### The Workflow:
1. **GM updates** → Postman → GitHub API → Updates `shipStatus.json` on GitHub
2. **GitHub Pages rebuilds** → 1-2 minutes
3. **Players type `status`** → Terminal fetches fresh JSON (bypasses cache!)
4. **No page refresh needed!** Players just type the command again

### Cache-Busting Implementation:
- The terminal automatically adds `?t={timestamp}` to every fetch
- This forces browsers to get fresh data instead of using cached files
- GitHub Pages has a 10-minute cache, but we bypass it completely

---

## ⚙️ Setup (One-Time)

### Step 1: Get GitHub Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Set **Note**: "Terminal Status Updates"
4. Set **Expiration**: 90 days (or custom)
5. ✅ Check **`repo`** scope (grants full repository access)
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)

---

### Step 2: Set Up Postman Variables

Create these **Collection Variables** or **Environment Variables**:

| Variable | Value | Type |
|----------|-------|------|
| `github_username` | `TafuTafufu` | default |
| `github_repo` | `UUC_Gladiator` | default |
| `github_token` | `ghp_yourTokenHere` | secret |

**How to add variables:**
1. Click on your Collection/Environment
2. Go to **Variables** tab
3. Add the three variables above
4. Mark `github_token` as **secret** type

---

## 📡 Postman Requests Setup

### Request 1: GET Current Status

**Purpose**: Get the current file's SHA (required before EVERY update)

**Method**: `GET`  
**URL**: 
```
https://api.github.com/repos/{{github_username}}/{{github_repo}}/contents/config/network/K2-PS187/shipStatus.json
```

**Params**:
| Key | Value |
|-----|-------|
| `ref` | `stage-2-test-branch` |

**Headers**:
| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{github_token}}` |
| `Accept` | `application/vnd.github+json` |

**Expected Response (200 OK)**:
```json
{
  "name": "shipStatus.json",
  "path": "config/network/K2-PS187/shipStatus.json",
  "sha": "94afc50037153b99b8d4....",  // ← COPY THIS!
  "size": 684,
  "content": "ewogICJodWxsSW50ZWdyaXR5Ij...",
  ...
}
```

**⚠️ IMPORTANT**: Copy the `sha` value - you'll need it for the PUT request!

---

### Request 2: PUT Update Ship Status

**Purpose**: Push new ship status to GitHub

**Method**: `PUT`  
**URL**: 
```
https://api.github.com/repos/{{github_username}}/{{github_repo}}/contents/config/network/K2-PS187/shipStatus.json
```

**Params**:
| Key | Value |
|-----|-------|
| `ref` | `stage-2-test-branch` |

**Headers**:
| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{github_token}}` |
| `Accept` | `application/vnd.github+json` |
| `Content-Type` | `application/json` |

**Pre-request Script** (Scripts tab):
```javascript
// Edit your ship status here (normal JSON!)
const shipStatus = {
  "hullIntegrity": {
    "value": 30,  // ← CHANGE THIS VALUE!
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
    "color": "#96b38a"
  },
  "coreAI": {
    "status": "在线 (K2-PS187 神经核心)",
    "color": "#96b38a"
  },
  "warnings": [
    "警告：检测到多处结构性损伤",
    "建议：立即进行紧急维修"
  ]
};

// Auto-convert to Base64 (handles Chinese characters!)
const jsonString = JSON.stringify(shipStatus, null, 2);
const base64Content = btoa(unescape(encodeURIComponent(jsonString)));
pm.environment.set("ship_status_content", base64Content);
```

**Body** (raw JSON):
```json
{
  "message": "Update ship status from Postman",
  "content": "{{ship_status_content}}",
  "sha": "PASTE_SHA_FROM_GET_REQUEST_HERE",
  "branch": "stage-2-test-branch"
}
```

**Expected Response (200 OK)**:
```json
{
  "content": {
    "name": "shipStatus.json",
    "sha": "a1b2c3d4e5f6...",  // ← NEW SHA (save for next update!)
    ...
  },
  "commit": {
    "message": "Update ship status from Postman",
    ...
  }
}
```

---

## 🎮 GM Workflow (During Gameplay)

### Every Time You Want to Update:

**Step 1: GET the current SHA**
1. Open **GET request**
2. Click **Send**
3. Copy the **`sha`** value from response
4. Keep it handy (paste in notepad)

**Step 2: Edit ship values**
1. Open **PUT request**
2. Go to **Scripts** → **Pre-request** tab
3. Edit the values you want to change (e.g., hull from 30% → 45%)
4. Save the script

**Step 3: Update the SHA and send**
1. Go to **Body** tab
2. Paste the SHA from Step 1 into the `"sha"` field
3. Click **Send**
4. You should get **200 OK**

**Step 4: Wait for rebuild**
1. GitHub Pages rebuilds (1-2 minutes)
2. Players type `status` to see new values!

**Step 5: For next update**
1. The response from your PUT request contains a **NEW SHA**
2. Copy that NEW SHA for your next update
3. Repeat from Step 2

---

## 🔧 Available Status Fields

You can change these values in the Pre-request Script:

### Hull Integrity
```javascript
"hullIntegrity": {
  "value": 50,          // Number (0-100)
  "unit": "%",          // Keep as "%"
  "status": "受损",      // Chinese description
  "color": "#ffaa00"    // Hex color
}
```

### System Status (propulsion, lifeSupport, weapons, communications, coreAI)
```javascript
"propulsion": {
  "status": "在线",     // Status text (Chinese/English)
  "color": "#96b38a"   // Hex color
}
```

### Warnings Array
```javascript
"warnings": [
  "警告：推进系统故障",
  "建议：减速至安全速度"
]
```

---

## 🎨 Suggested Color Codes

| Status | Color | Hex Code |
|--------|-------|----------|
| Critical | Red | `#ff4d4d` |
| Severe | Dark Red | `#bd2d2d` |
| Warning | Orange | `#ffaa00` |
| Caution | Yellow | `#ffd700` |
| Operational | Green | `#96b38a` |
| Optimal | Bright Green | `#00ff00` |

---

## ❌ Troubleshooting

### Error: 404 Not Found
- ✅ Check `github_username` variable = `TafuTafufu`
- ✅ Check `github_repo` variable = `UUC_Gladiator`
- ✅ Check `ref` param = `stage-2-test-branch`
- ✅ Verify Authorization token is valid

### Error: 409 Conflict
- ❌ The SHA you're using is outdated
- ✅ Run GET request again to get fresh SHA
- ✅ Every successful PUT changes the SHA!

### Error: 422 Unprocessable Entity
- ❌ Base64 encoding failed (likely Chinese character issue)
- ✅ Make sure Pre-request Script uses `btoa(unescape(encodeURIComponent(...)))`
- ✅ Don't manually edit the `content` field

### Players See Old Data
- ✅ Cache-busting is now implemented (`?t=timestamp`)
- ⏳ GitHub Pages takes 1-2 minutes to rebuild
- ✅ Tell players to type `status` again after 2 minutes

---

## 📋 Quick Reference

### Workflow Summary:
```
GET → Copy SHA → Edit values in Pre-request Script → 
Paste SHA in Body → PUT → 200 OK → Wait 1-2 min → 
Players type 'status' → See new values!
```

### SHA Lifecycle:
```
File v1 (SHA: abc123) → PUT update → 
File v2 (SHA: def456) → PUT update → 
File v3 (SHA: ghi789) → ...
```

**Every update creates a NEW SHA!**

---

## 🚀 Example Scenarios

### Scenario 1: Hull Takes Damage (50% → 25%)
1. GET → Copy SHA
2. Pre-request Script: Change `"value": 50` to `"value": 25`
3. Body: Paste SHA
4. Send → 200 OK
5. Wait 1-2 min
6. Players type `status` → See "25%"

### Scenario 2: Life Support Restored
1. GET → Copy SHA
2. Pre-request Script: 
   ```javascript
   "lifeSupport": {
     "status": "在线",  // Changed from "故障"
     "color": "#96b38a"  // Changed from "#bd2d2d"
   }
   ```
3. Body: Paste SHA
4. Send → 200 OK
5. Players see green "在线" status!

---

## 📝 Notes

- **Branch**: Always use `stage-2-test-branch` for testing
- **Rebuild Time**: GitHub Pages typically rebuilds in 60-120 seconds
- **Cache**: Fully bypassed via timestamp parameter
- **SHA Requirement**: Mandatory for every update (prevents conflicts)
- **Encoding**: Automatic via Pre-request Script
- **Token Expiry**: Check token expiration date regularly

---

**Created for**: UUC Gladiator Tactical Network  
**Server**: K2-PS187 Ghost Ship Mainframe  
**Deployment**: GitHub Pages (`stage-2-test-branch`)  
**Last Updated**: November 11, 2025
