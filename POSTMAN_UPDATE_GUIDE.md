# How to Update K2-PS187 Ship Status via Postman

This guide shows you how to update the ship status dynamically using Postman and the GitHub API.

---

## How It Works

**Your Workflow:**
1. You update `shipStatus.json` via Postman → GitHub API
2. GitHub Pages rebuilds (1-2 minutes)
3. Players type `status` command
4. Terminal fetches latest JSON and displays updated values
5. **No page refresh needed!**

---

## Setup (One-Time)

### Step 1: Get GitHub Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Set **Note**: "Terminal Status Updates"
4. Set **Expiration**: 90 days (or custom)
5. Check **repo** scope (grants full repository access)
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)

---

## Postman Collection Setup

### Request 1: Get Current Status (GET)

**Purpose**: Get the current file's SHA (required for updates)

**Method**: `GET`  
**URL**: 
```
https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/config/network/K2-PS187/shipStatus.json
```

**Headers**:
```
Authorization: Bearer YOUR_GITHUB_TOKEN
Accept: application/vnd.github+json
```

**Expected Response**:
```json
{
  "name": "shipStatus.json",
  "path": "config/network/K2-PS187/shipStatus.json",
  "sha": "abc123def456...",
  "content": "BASE64_ENCODED_JSON",
  ...
}
```

**Copy the `sha` value** - you'll need it for updates!

---

### Request 2: Update Ship Status (PUT)

**Purpose**: Push new ship status to GitHub

**Method**: `PUT`  
**URL**: 
```
https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/config/network/K2-PS187/shipStatus.json
```

**Headers**:
```
Authorization: Bearer YOUR_GITHUB_TOKEN
Accept: application/vnd.github+json
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "message": "Update ship status - hull integrity critical",
  "content": "BASE64_ENCODED_CONTENT_HERE",
  "sha": "SHA_FROM_GET_REQUEST"
}
```

---

## Encoding Your Status Update

You need to **Base64 encode** your JSON content before sending it.

### Method 1: Online Encoder
1. Go to https://www.base64encode.org/
2. Paste your JSON (see example below)
3. Click "Encode"
4. Copy the result into the `content` field

### Method 2: Postman Pre-request Script

Add this to your **Pre-request Script** tab:

```javascript
// Define your new status
const statusData = {
  "hullIntegrity": {
    "value": 15,
    "unit": "%",
    "status": "危急 / CRITICAL",
    "color": "#ff0000"
  },
  "propulsion": {
    "status": "离线",
    "color": "#ff4d4d"
  },
  "lifeSupport": {
    "status": "严重故障 / SEVERE MALFUNCTION",
    "color": "#ff0000"
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
    "紧急警告：船体即将解体 / EMERGENCY: HULL BREACH IMMINENT",
    "建议：立即弃船 / RECOMMENDATION: ABANDON SHIP"
  ]
};

// Convert to JSON string
const jsonString = JSON.stringify(statusData, null, 2);

// Base64 encode
const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

// Save to environment variable
pm.environment.set("encodedStatus", base64Content);
```

Then in your **Body**, use:
```json
{
  "message": "Update ship status",
  "content": "{{encodedStatus}}",
  "sha": "{{currentSha}}"
}
```

### Method 3: Node.js / Command Line
```bash
echo '{"hullIntegrity": {"value": 10, "unit": "%", "status": "危急", "color": "#ff0000"}}' | base64
```

---

## Example Status Configurations

### Scenario 1: Critical Damage
```json
{
  "hullIntegrity": {
    "value": 8,
    "unit": "%",
    "status": "危急 / CRITICAL",
    "color": "#ff0000"
  },
  "propulsion": {
    "status": "离线 / OFFLINE",
    "color": "#ff4d4d"
  },
  "lifeSupport": {
    "status": "失效 / FAILED",
    "color": "#ff0000"
  },
  "weapons": {
    "status": "毁坏 / DESTROYED",
    "color": "#ff0000"
  },
  "communications": {
    "status": "中断 / SEVERED",
    "color": "#ff0000"
  },
  "coreAI": {
    "status": "不稳定 (K2-PS187 神经核心) / UNSTABLE",
    "color": "#ff4d4d"
  },
  "warnings": [
    "危急警告：多系统失效 / CRITICAL: MULTIPLE SYSTEM FAILURE",
    "船体解体倒计时：15分钟 / HULL COLLAPSE IN: 15 MINUTES",
    "建议：立即启动逃生舱 / INITIATE ESCAPE POD IMMEDIATELY"
  ]
}
```

### Scenario 2: Repairs in Progress
```json
{
  "hullIntegrity": {
    "value": 45,
    "unit": "%",
    "status": "修复中 / REPAIRING",
    "color": "#ffaa00"
  },
  "propulsion": {
    "status": "重启中 / RESTARTING",
    "color": "#ffaa00"
  },
  "lifeSupport": {
    "status": "稳定 / STABLE",
    "color": "#96b38a"
  },
  "weapons": {
    "status": "离线 / OFFLINE",
    "color": "#ff4d4d"
  },
  "communications": {
    "status": "正常 / NOMINAL",
    "color": "#96b38a"
  },
  "coreAI": {
    "status": "在线 (K2-PS187 神经核心)",
    "color": "#96b38a"
  },
  "warnings": [
    "维修进度：45% / Repair progress: 45%",
    "预计完成时间：2小时 / ETA: 2 hours"
  ]
}
```

### Scenario 3: Fully Operational
```json
{
  "hullIntegrity": {
    "value": 98,
    "unit": "%",
    "status": "优秀 / EXCELLENT",
    "color": "#00ff00"
  },
  "propulsion": {
    "status": "正常 / NOMINAL",
    "color": "#96b38a"
  },
  "lifeSupport": {
    "status": "正常 / NOMINAL",
    "color": "#96b38a"
  },
  "weapons": {
    "status": "就绪 / READY",
    "color": "#96b38a"
  },
  "communications": {
    "status": "强信号 / STRONG SIGNAL",
    "color": "#96b38a"
  },
  "coreAI": {
    "status": "在线 (K2-PS187 神经核心)",
    "color": "#96b38a"
  },
  "warnings": [
    "所有系统正常运行 / All systems operational"
  ]
}
```

---

## Complete Workflow

### Step-by-Step Process

**1. Get Current SHA**
- Open Postman
- Send GET request to get current file
- Copy the `sha` value from response

**2. Prepare Your Update**
- Choose a status scenario or create your own
- Base64 encode the JSON content
- Save the encoded string

**3. Send Update**
- Send PUT request with:
  - Your commit message
  - Base64 encoded content
  - Current SHA from step 1
- You should get a 200 OK response

**4. Wait for GitHub Pages**
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check your repository's Actions tab to see deployment progress

**5. Test In-Game**
- Players type `status` in the terminal
- They see the updated ship status immediately
- **No page refresh needed!**

---

## Postman Environment Variables

Create these environment variables in Postman:

| Variable | Value | Description |
|----------|-------|-------------|
| `github_token` | `ghp_xxxxx...` | Your GitHub personal access token |
| `github_username` | `YourUsername` | Your GitHub username |
| `github_repo` | `your-repo-name` | Repository name |
| `file_sha` | (auto-set) | Current file SHA (from GET request) |
| `encoded_content` | (auto-set) | Base64 encoded JSON |

Then use variables in your requests:
```
https://api.github.com/repos/{{github_username}}/{{github_repo}}/contents/config/network/K2-PS187/shipStatus.json
```

---

## Automation: Pre-request Script

Add this complete script to automate SHA retrieval and encoding:

```javascript
const owner = pm.environment.get("github_username");
const repo = pm.environment.get("github_repo");
const token = pm.environment.get("github_token");
const path = "config/network/K2-PS187/shipStatus.json";

// Step 1: Get current file SHA
pm.sendRequest({
    url: `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    method: 'GET',
    header: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
    }
}, (err, res) => {
    if (!err) {
        const sha = res.json().sha;
        pm.environment.set("file_sha", sha);
        console.log("Current SHA:", sha);
    } else {
        console.error("Error fetching SHA:", err);
    }
});

// Step 2: Prepare your status update
const statusData = {
  "hullIntegrity": {
    "value": 23,
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

// Step 3: Encode to Base64
const jsonString = JSON.stringify(statusData, null, 2);
const base64Content = btoa(unescape(encodeURIComponent(jsonString)));
pm.environment.set("encoded_content", base64Content);
console.log("Content encoded successfully");
```

---

## Troubleshooting

### Error 404: Not Found
**Cause**: File path or repo name incorrect  
**Solution**: Check your URL matches exactly: `config/network/K2-PS187/shipStatus.json`

### Error 401: Unauthorized
**Cause**: Invalid or missing GitHub token  
**Solution**: Regenerate token with `repo` scope

### Error 409: Conflict
**Cause**: SHA mismatch (file was updated since you got the SHA)  
**Solution**: Run GET request again to get latest SHA

### Error 422: Unprocessable Entity
**Cause**: Content not properly Base64 encoded  
**Solution**: Re-encode your JSON content

### Players See Old Data
**Cause**: Browser cache or GitHub Pages hasn't rebuilt yet  
**Solution**: Wait 1-2 minutes, then have players type `status` again

---

## Color Reference

Use these colors for different status severity levels:

| Color | Hex Code | Usage |
|-------|----------|-------|
| 🟢 Green | `#00ff00` | Excellent / Optimal |
| 🟢 Light Green | `#96b38a` | Good / Nominal |
| 🟡 Yellow | `#ffaa00` | Repairing / Warning |
| 🟠 Orange | `#ff8800` | Degraded |
| 🔴 Light Red | `#ff4d4d` | Damaged / Offline |
| 🔴 Red | `#bd2d2d` | Severe / Failed |
| 🔴 Bright Red | `#ff0000` | Critical / Emergency |

---

## Player Experience

**What Players See:**

```
[K2-PS187 Core Access@K2-PS187]$ status
正在加载状态... / Loading status...

===== 褴褛人号舰体状态 / Tatterdemalion Ship Status =====

船体完整性：严重受损 (23%)
推进系统：离线
生命维持：故障
武器系统：不可用
通讯阵列：微弱信号
核心 AI：在线 (K2-PS187 神经核心)

警告：检测到多处结构性损伤
建议：立即进行紧急维修

========================================================
```

**After you update via Postman:**

```
[K2-PS187 Core Access@K2-PS187]$ status
正在加载状态... / Loading status...

===== 褴褛人号舰体状态 / Tatterdemalion Ship Status =====

船体完整性：危急 (8%)
推进系统：离线
生命维持：失效
武器系统：毁坏
通讯阵列：中断
核心 AI：不稳定 (K2-PS187 神经核心)

危急警告：多系统失效 / CRITICAL: MULTIPLE SYSTEM FAILURE
船体解体倒计时：15分钟 / HULL COLLAPSE IN: 15 MINUTES

========================================================
```

---

## Tips for Game Masters

1. **Pre-prepare scenarios**: Create 3-5 status configurations for different story moments
2. **Schedule updates**: Update status between game sessions or during breaks
3. **Test first**: Always test on a copy before updating during live gameplay
4. **Gradual degradation**: Lower hull integrity by 5-10% each update for dramatic tension
5. **Recovery arcs**: Show repairs progressing to reward player actions
6. **Surprise events**: Suddenly change status mid-session for plot twists

---

*End of Guide*
