# Ship Status Templates for Game Masters

Quick reference templates for updating ship status via Postman. Copy the appropriate template based on ship health level.

---

## 🔴 CRITICAL (0-25% Hull Integrity)

**Status:** Catastrophic damage, life support failing, imminent destruction

```javascript
{
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
}
```

---

## 🟠 DAMAGED (26-50% Hull Integrity)

**Status:** Heavy damage, systems compromised, limited functionality

```javascript
{
  "hullIntegrity": {
    "value": 38,
    "unit": "%",
    "status": "重度损伤",
    "color": "#ff9500"
  },
  "propulsion": {
    "status": "受损 (50%推力)",
    "color": "#d97706"
  },
  "lifeSupport": {
    "status": "受损",
    "color": "#d97706"
  },
  "weapons": {
    "status": "部分可用",
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
    "警告：船体结构完整性下降",
    "警告：多个系统受损",
    "建议：尽快进行维修"
  ]
}
```

---

## 🟡 OPERATIONAL (51-75% Hull Integrity)

**Status:** Moderate damage, most systems functional, repairs needed

```javascript
{
  "hullIntegrity": {
    "value": 63,
    "unit": "%",
    "status": "中度损伤",
    "color": "#fbbf24"
  },
  "propulsion": {
    "status": "运行中 (80%推力)",
    "color": "#fbbf24"
  },
  "lifeSupport": {
    "status": "稳定",
    "color": "#96b38a"
  },
  "weapons": {
    "status": "在线",
    "color": "#96b38a"
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
    "提示：船体有轻微损伤",
    "建议：在安全时进行维修"
  ]
}
```

---

## 🟢 OPTIMAL (76-100% Hull Integrity)

**Status:** Ship fully operational, all systems nominal

```javascript
{
  "hullIntegrity": {
    "value": 92,
    "unit": "%",
    "status": "良好",
    "color": "#10b981"
  },
  "propulsion": {
    "status": "最佳状态",
    "color": "#10b981"
  },
  "lifeSupport": {
    "status": "最佳状态",
    "color": "#10b981"
  },
  "weapons": {
    "status": "全部在线",
    "color": "#10b981"
  },
  "communications": {
    "status": "强信号",
    "color": "#10b981"
  },
  "coreAI": {
    "status": "在线 (K2-PS187 神经核心)",
    "color": "#10b981"
  },
  "warnings": [
    "状态：所有系统运行正常"
  ]
}
```

---

## Quick Customization Tips

### Hull Values by Tier:
- **Critical:** 1-25%
- **Damaged:** 26-50%
- **Operational:** 51-75%
- **Optimal:** 76-100%

### Common Status Options (Chinese):

**Propulsion:**
- `离线` (Offline)
- `受损 (50%推力)` (Damaged 50% thrust)
- `运行中 (80%推力)` (Running 80% thrust)
- `最佳状态` (Optimal)

**Life Support:**
- `故障` (Malfunction)
- `受损` (Damaged)
- `稳定` (Stable)
- `最佳状态` (Optimal)

**Weapons:**
- `不可用` (Unavailable)
- `部分可用` (Partially available)
- `在线` (Online)
- `全部在线` (All online)

**Communications:**
- `微弱信号` (Weak signal)
- `受损信号` (Damaged signal)
- `正常` (Normal)
- `强信号` (Strong signal)

### Warning Messages (Chinese):
- `警告：检测到多处结构性损伤` (Warning: Multiple structural damages detected)
- `警告：生命维持系统即将失效` (Warning: Life support system about to fail)
- `警告：船体结构完整性下降` (Warning: Hull structural integrity declining)
- `建议：立即撤离舰船` (Recommendation: Evacuate ship immediately)
- `建议：尽快进行维修` (Recommendation: Repair as soon as possible)
- `提示：船体有轻微损伤` (Notice: Minor hull damage)
- `状态：所有系统运行正常` (Status: All systems operating normally)

---

## Usage in Postman

1. Choose the template that matches your scenario
2. Copy the entire JSON object
3. Paste it into the Pre-request Script (replace the `shipStatus` object)
4. Adjust specific values if needed (hull percentage, status text, etc.)
5. Click **Send** to update
