// K2-PS187 Server Commands
// Role-based command implementations

// Helper function to get current user role from userDatabase
// Note: userDatabase and serverDatabase are global variables in kernel.js
function getK2UserRole() {
    // These are global variables from kernel.js, not on window
    if (typeof userDatabase !== 'undefined' && userDatabase && userDatabase.role) {
        return userDatabase.role;
    }
    return 'default';
}

// Helper function to get current server address
function getK2ServerAddress() {
    // serverDatabase is a global variable from kernel.js
    if (typeof serverDatabase !== 'undefined' && serverDatabase) {
        return serverDatabase.serverAddress || '';
    }
    return '';
}

// Helper to check if we're on K2-PS187 server
function isOnK2Server() {
    return getK2ServerAddress() === 'K2-PS187';
}

// help command - shows available commands
function help(args) {
    if (!isOnK2Server()) {
        return null;
    }
    const role = getK2UserRole();
    
    // Crew members have no access to commands except exit
    if (role === 'crew') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    const out = [];
    
    if (role === 'maintenance') {
        out.push(`<div class="k2-block">`);
        out.push(`<p class="glow" style="font-size:1.1rem">╔════════════════════════════════╗</p>`);
        out.push(`<p class="glow" style="font-size:1.1rem">║   K2-PS187 维护接口 / MAINT    ║</p>`);
        out.push(`<p class="glow" style="font-size:1.1rem">╚════════════════════════════════╝</p>`);
        out.push(`<br>`);
        out.push(`<b>help</b>           - 显示此帮助信息<br>`);
        out.push(`<b>status</b>         - 查看飞船状态<br>`);
        out.push(`<b>scan tatterdemalion</b> - 扫描褴褛人号<br>`);
        out.push(`<b>exit</b>           - 登出服务器<br>`);
        out.push(`<br>`);
        out.push(`<span style="color:#888">注意：维护权限受限。</span>`);
        out.push(`</div>`);
        
        return {
            delayed: 0,
            clear: false,
            message: out
        };
    }
    
    if (role === 'core') {
        out.push(`<div class="k2-block">`);
        out.push(`<p class="glow" style="font-size:1.1rem">╔════════════════════════════════╗</p>`);
        out.push(`<p class="glow" style="font-size:1.1rem">║   K2-PS187 核心访问 / CORE     ║</p>`);
        out.push(`<p class="glow" style="font-size:1.1rem">╚════════════════════════════════╝</p>`);
        out.push(`<br>`);
        out.push(`<b>help</b>           - 显示此帮助信息<br>`);
        out.push(`<b>log</b>            - 查看飞船日志<br>`);
        out.push(`<b>status</b>         - 查看飞船状态<br>`);
        out.push(`<b>query</b>          - ?<br>`);
        out.push(`<b>scan tatterdemalion</b> - 扫描褴褛人号<br>`);
        out.push(`<b>exit</b>           - 登出服务器<br>`);
        out.push(`<br>`);
        out.push(`<span style="color:#888">注意：核心权限已授予。</span>`);
        out.push(`</div>`);
        
        return {
            delayed: 0,
            clear: false,
            message: out
        };
    }
    
    // Default/visitor
    out.push(`<div class="k2-block">`);
    out.push(`<p class="glow" style="font-size:1.1rem">╔════════════════════════════════╗</p>`);
    out.push(`<p class="glow" style="font-size:1.1rem">║   K2-PS187 访客模式 / GUEST    ║</p>`);
    out.push(`<p class="glow" style="font-size:1.1rem">╚════════════════════════════════╝</p>`);
    out.push(`<br>`);
    out.push(`<b>help</b>    - 显示此帮助信息<br>`);
    out.push(`<b>exit</b>    - 登出服务器<br>`);
    out.push(`<br>`);
    out.push(`<span style="color:#888">访问受限：请登录以获取更多权限。</span>`);
    out.push(`</div>`);
    
    return {
        delayed: 0,
        clear: false,
        message: out
    };
}

// log command - shows ship log (core access only)
function log(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'maintenance' || role === 'crew') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    if (role === 'core') {
        const logId = 'log-output-' + Date.now();
        
        const logEntries = [
            { day: '387 日', text: '我们到达了"碎片"，迫切的想要进行任务的第二部分。明天我们的队伍将登陆。' },
            { day: '388 日', text: '小队乘坐着空飞机降落。已经设置好营地和勘测设备。' },
            { day: '389 日', text: '登陆的小队已经开始向神圣的中心挖掘出发，真希望我能和他们一道。继续监督他们的进度。' },
            { day: '403 日', text: '小队已经进入碎片的核心中心，他们传回了一张图片，里面有一个似乎是金字塔的建筑。完全不符合物理学定律。小行星的内部尺寸比它可能的最大的尺寸还要打，拥有中立和大气。向不可名状者献上崇高的敬意，祝福他们混沌的神迹！我们发现了，真正的死去的卡尔克萨碎片，一个圣地！' },
            { day: '405 日', text: '小队发现了一个巨大的中央腔，他们传回了详细的象形文字墙的扫描图。我们用 K2-PS187 翻译这些象形文字。小队发现了一个"坟墓"，上有如尼文的封印。' },
            { day: '406 日', text: 'K2-PS187 告诉我，象形文字描述了伊提被祝福之地卡尔克萨吸收之后的历史。它是用歌剧的形式表达的。我们发现了《黄色之王》的续集，这个故事多么辉煌！我已经命令电脑翻译，将这个故事合成为歌剧。小队摧毁了如尼文的封印，片刻后他们就失联了。' },
            { day: '407 日', text: '"碎片"上登陆的航天飞机爆炸了。小队失联已达 20 小时。扫描器显示有一个人在航天飞机爆炸附近移动，它不是小队中的任何一个人。她自由了！我们的任务已经完成。我们没有能力再派一队人登录，而且所有的交流尝试都失败了。我们返回地球。我们已经竭尽全力了。' },
            { day: '412 日', text: 'K2-PS187 完成了翻译和制作歌剧的工作，船员们聚集在一起观看，但是主机的一些地方发生了故障。我们决定将观看推迟到技术问题得到解决。' },
            { day: '414 日', text: 'K2-PS187 系统发生故障。我们没办法重新控制它。自动门杀死了克雷文·约翰逊。我们打开了系统的安全/惩罚程序，但是系统仍然拒绝服从命令。' },
            { day: '415 日', text: 'K2-PS187 试图引爆主引力爆装置，让主引擎过载。我们已经关闭了计算机并试图用我们的个人终端操纵这艘船。' },
            { day: '417 日', text: '截获了加密的无线电讯息，我们不能在没有主机的情况下确定来源或者解得信息。有一个文明生活在这里吗？一旦与地球重新建立起通讯，我们必须马上汇报这一情况。' },
            { day: '418 日', text: '粒子风暴。导航系统失线，直到通过这一区域。' }
        ];
        
        // Display log entries sequentially by chunks (each day + text is one chunk)
        setTimeout(() => {
            const logDiv = document.getElementById(logId);
            if (!logDiv) return;
            
            let currentEntry = 0;
            
            // Add header
            logDiv.innerHTML = '<span style="color:#96b38a">===== K2-PS187 飞船日志 / Ship Log =====</span><br><br>';
            
            const interval = setInterval(() => {
                if (currentEntry < logEntries.length) {
                    const entry = logEntries[currentEntry];
                    // Add date header (bold, on its own line)
                    logDiv.innerHTML += `<b style="color:#f5f2df">${entry.day}</b><br>`;
                    // Add log text (as a paragraph)
                    logDiv.innerHTML += `<p style="color:#ccc; margin: 0 0 1em 0;">${entry.text}</p>`;
                    currentEntry++;
                    // Auto-scroll to show latest content
                    window.scrollTo(0, document.body.scrollHeight);
                } else {
                    // Add footer
                    logDiv.innerHTML += '<br><span style="color:#96b38a">=========================================</span>';
                    // Final scroll to bottom
                    window.scrollTo(0, document.body.scrollHeight);
                    clearInterval(interval);
                }
            }, 500); // Display each chunk every 500ms
        }, 50);
        
        return `<div id="${logId}"></div>`;
    }
    
    return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
}

// status command - shows ship status (fetches latest data from JSON)
function status(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'crew') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    if (role === 'maintenance') {
        // Maintenance users get instant display (no typewriter)
        const statusId = 'status-output-' + Date.now();
        
        setTimeout(() => {
            fetch(`config/network/K2-PS187/shipStatus.json?t=${Date.now()}`)
                .then(response => response.json())
                .then(data => {
                    const statusDiv = document.getElementById(statusId);
                    if (!statusDiv) return;
                    
                    const lines = [
                        '<span style="color:#96b38a">===== 褴褛人号舰体状态 / Tatterdemalion Ship Status =====</span>',
                        '',
                        `<span style="color:#ccc">船体完整性：</span><span style="color:${data.hullIntegrity.color}">${data.hullIntegrity.status} (${data.hullIntegrity.value}${data.hullIntegrity.unit})</span>`,
                        `<span style="color:#ccc">推进系统：</span><span style="color:${data.propulsion.color}">${data.propulsion.status}</span>`,
                        `<span style="color:#ccc">生命维持：</span><span style="color:${data.lifeSupport.color}">${data.lifeSupport.status}</span>`,
                        `<span style="color:#ccc">武器系统：</span><span style="color:${data.weapons.color}">${data.weapons.status}</span>`,
                        `<span style="color:#ccc">通讯阵列：</span><span style="color:${data.communications.color}">${data.communications.status}</span>`,
                        `<span style="color:#ccc">核心 AI：</span><span style="color:${data.coreAI.color}">${data.coreAI.status}</span>`,
                        ''
                    ];
                    
                    // Add warnings
                    data.warnings.forEach(warning => {
                        lines.push(`<span style="color:#ff4d4d">${warning}</span>`);
                    });
                    
                    lines.push('');
                    lines.push('<span style="color:#96b38a">========================================================</span>');
                    
                    statusDiv.innerHTML = lines.join('<br>');
                })
                .catch(error => {
                    const statusDiv = document.getElementById(statusId);
                    if (statusDiv) {
                        statusDiv.innerHTML = '<span style="color:#ff4d4d">错误：无法加载状态数据 / Error: Cannot load status data</span>';
                    }
                });
        }, 50);
        
        return `<div id="${statusId}">正在加载状态... / Loading status...</div>`;
    }
    
    if (role === 'core') {
        // Core users get cool typewriter effect
        const statusId = 'status-output-' + Date.now();
        
        // Typewriter effect function
        function typewriterEffect(element, lines, lineIndex = 0, charIndex = 0) {
            if (lineIndex >= lines.length) return;
            
            const currentLine = lines[lineIndex];
            const lineId = statusId + '-line-' + lineIndex;
            
            // Create line element if it doesn't exist
            if (charIndex === 0) {
                const lineElement = document.createElement('p');
                lineElement.id = lineId;
                lineElement.innerHTML = '';
                element.appendChild(lineElement);
            }
            
            const lineElement = document.getElementById(lineId);
            if (!lineElement) return;
            
            if (charIndex < currentLine.length) {
                // Add next character
                lineElement.innerHTML = currentLine.substring(0, charIndex + 1);
                window.scrollTo(0, document.body.scrollHeight);
                setTimeout(() => typewriterEffect(element, lines, lineIndex, charIndex + 1), 15); // 15ms per character
            } else {
                // Move to next line after brief pause
                window.scrollTo(0, document.body.scrollHeight);
                setTimeout(() => typewriterEffect(element, lines, lineIndex + 1, 0), 40);
            }
        }
        
        setTimeout(() => {
            fetch(`config/network/K2-PS187/shipStatus.json?t=${Date.now()}`)
                .then(response => response.json())
                .then(data => {
                    const statusDiv = document.getElementById(statusId);
                    if (!statusDiv) return;
                    
                    const statusLines = [
                        '<span style="color:#96b38a">===== 褴褛人号舰体状态 / Tatterdemalion Ship Status =====</span>',
                        '',
                        `<span style="color:#ccc">船体完整性：</span><span style="color:${data.hullIntegrity.color}">${data.hullIntegrity.status} (${data.hullIntegrity.value}${data.hullIntegrity.unit})</span>`,
                        `<span style="color:#ccc">推进系统：</span><span style="color:${data.propulsion.color}">${data.propulsion.status}</span>`,
                        `<span style="color:#ccc">生命维持：</span><span style="color:${data.lifeSupport.color}">${data.lifeSupport.status}</span>`,
                        `<span style="color:#ccc">武器系统：</span><span style="color:${data.weapons.color}">${data.weapons.status}</span>`,
                        `<span style="color:#ccc">通讯阵列：</span><span style="color:${data.communications.color}">${data.communications.status}</span>`,
                        `<span style="color:#ccc">核心 AI：</span><span style="color:${data.coreAI.color}">${data.coreAI.status}</span>`,
                        ''
                    ];
                    
                    // Add warnings
                    data.warnings.forEach(warning => {
                        statusLines.push(`<span style="color:#ff4d4d">${warning}</span>`);
                    });
                    
                    statusLines.push('');
                    statusLines.push('<span style="color:#96b38a">========================================================</span>');
                    
                    typewriterEffect(statusDiv, statusLines);
                })
                .catch(error => {
                    const statusDiv = document.getElementById(statusId);
                    if (statusDiv) {
                        statusDiv.innerHTML = '<span style="color:#ff4d4d">错误：无法加载状态数据 / Error: Cannot load status data</span>';
                    }
                });
        }, 50);
        
        return `<div id="${statusId}">正在加载状态... / Loading status...</div>`;
    }
    
    return '<span style="color:#bd2d2d">权限不足 / Access denied</span>';
}

// query command - ask questions to the AI
function query(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'maintenance' || role === 'crew') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    if (role === 'core') {
        // Initialize query tracking in localStorage
        if (!localStorage.getItem('k2_queries_asked')) {
            localStorage.setItem('k2_queries_asked', JSON.stringify([]));
        }
        
        const queriesAsked = JSON.parse(localStorage.getItem('k2_queries_asked'));
        const hasAskedAll3 = queriesAsked.includes(1) && queriesAsked.includes(2) && queriesAsked.includes(3);
        
        if (!args || args.length === 0) {
            const out = [];
            out.push(`<div class="k2-block">`);
            out.push(`<p class="glow" style="font-size:1.1rem">╔════════════════════════════════╗</p>`);
            out.push(`<p class="glow" style="font-size:1.1rem">║   K2-PS187 查询系统 / QUERY    ║</p>`);
            out.push(`<p class="glow" style="font-size:1.1rem">╚════════════════════════════════╝</p>`);
            out.push(`<br>`);
            out.push(`<span style="color:#ccc">使用方法：query &lt;number&gt;</span><br>`);
            out.push(`<br>`);
            out.push(`<b>1. Who are you</b><br>`);
            out.push(`<b>2. Where am I</b><br>`);
            out.push(`<b>3. Why are you attacking me</b><br>`);
            
            // Only show question 4 if all three previous questions have been asked
            if (hasAskedAll3) {
                out.push(`<b>4. How are you</b><br>`);
            }
            
            out.push(`<br>`);
            out.push(`<span style="color:#888">提示：输入 query &lt;number&gt; 以获取 K2-PS187 响应。</span>`);
            out.push(`</div>`);
            
            return {
                delayed: 0,
                clear: false,
                message: out
            };
        }
        
        // Parse the question number
        const questionNum = parseInt(args[0]);
        
        // Typewriter effect for query answers
        function typewriterAnswer(text) {
            const queryId = 'query-output-' + Date.now();
            
            setTimeout(() => {
                const queryDiv = document.getElementById(queryId);
                if (!queryDiv) return;
                
                let charIndex = 0;
                const interval = setInterval(() => {
                    if (charIndex < text.length) {
                        queryDiv.innerHTML = text.substring(0, charIndex + 1);
                        charIndex++;
                        window.scrollTo(0, document.body.scrollHeight);
                    } else {
                        clearInterval(interval);
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                }, 15); // 15ms per character for smooth typewriter effect
            }, 50);
            
            return `<div id="${queryId}"></div>`;
        }
        
        // Handle numbered questions
        if (questionNum === 1) {
            // Track that this question was asked
            if (!queriesAsked.includes(1)) {
                queriesAsked.push(1);
                localStorage.setItem('k2_queries_asked', JSON.stringify(queriesAsked));
            }
            return typewriterAnswer('<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">K2-PS187</span>');
        }
        
        if (questionNum === 2) {
            // Track that this question was asked
            if (!queriesAsked.includes(2)) {
                queriesAsked.push(2);
                localStorage.setItem('k2_queries_asked', JSON.stringify(queriesAsked));
            }
            return typewriterAnswer('<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">Tatterdemalion</span>');
        }
        
        if (questionNum === 3) {
            // Track that this question was asked
            if (!queriesAsked.includes(3)) {
                queriesAsked.push(3);
                localStorage.setItem('k2_queries_asked', JSON.stringify(queriesAsked));
            }
            return typewriterAnswer('<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">Hostile parameters not engaged, attack not in progress.</span>');
        }
        
        if (questionNum === 4) {
            // Easter egg: only available if user has asked questions 1, 2, and 3
            if (hasAskedAll3) {
                if (!queriesAsked.includes(4)) {
                    queriesAsked.push(4);
                    localStorage.setItem('k2_queries_asked', JSON.stringify(queriesAsked));
                }
                return typewriterAnswer('<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">I\'m fine, thank you, and you?</span>');
            } else {
                return '<span style="color:#bd2d2d">未识别的问题 / Unrecognized query</span>';
            }
        }
        
        return '<span style="color:#bd2d2d">未识别的问题 / Unrecognized query</span>';
    }
    
    return '<span style="color:#bd2d2d">权限不足 / Access denied</span>';
}

// scan command - scan tatterdemalion with progress bar
function scan(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    const target = args ? args.join(' ').toLowerCase() : '';
    
    if (role === 'crew') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    if (role !== 'maintenance' && role !== 'core') {
        return '<span style="color:#bd2d2d">权限不足 / Access denied</span>';
    }
    
    if (!target.includes('tatterdemalion')) {
        return '<span style="color:#bd2d2d">错误：未知目标 / Unknown target</span>';
    }
    
    // Create a unique ID for this scan's progress bar
    const scanId = 'scan-progress-' + Date.now();
    
    // Typewriter effect function
    function typewriterEffect(element, lines, lineIndex = 0, charIndex = 0) {
        if (lineIndex >= lines.length) return;
        
        const currentLine = lines[lineIndex];
        const lineId = scanId + '-line-' + lineIndex;
        
        // Create line element if it doesn't exist
        if (charIndex === 0) {
            const lineElement = document.createElement('p');
            lineElement.id = lineId;
            lineElement.innerHTML = '';
            element.appendChild(lineElement);
        }
        
        const lineElement = document.getElementById(lineId);
        if (!lineElement) return;
        
        if (charIndex < currentLine.length) {
            // Add next character
            lineElement.innerHTML = currentLine.substring(0, charIndex + 1);
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => typewriterEffect(element, lines, lineIndex, charIndex + 1), 20); // 20ms per character
        } else {
            // Move to next line after brief pause
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => typewriterEffect(element, lines, lineIndex + 1, 0), 50);
        }
    }
    
    // Start the animation after a brief moment
    setTimeout(() => {
        let progress = 0;
        const progressBar = document.getElementById(scanId);
        if (!progressBar) return;
        
        const barLength = 25; // Longer progress bar (25 blocks)
        
        const interval = setInterval(() => {
            progress += 4; // Increment by 4 to reach 100 in 25 steps
            const filled = Math.floor((progress / 100) * barLength);
            const empty = barLength - filled;
            const bar = '█'.repeat(filled) + '░'.repeat(empty);
            
            if (progress <= 100) {
                progressBar.innerHTML = `扫描进度: [${bar}] ${progress}%`;
                window.scrollTo(0, document.body.scrollHeight);
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                progressBar.innerHTML = `扫描进度: [${bar}] 100%`;
                window.scrollTo(0, document.body.scrollHeight);
                
                // After completion, show the scan results with typewriter effect
                setTimeout(() => {
                    const resultsDiv = document.getElementById(scanId + '-results');
                    if (resultsDiv) {
                        const resultLines = [
                            '',
                            '<span style="color:#96b38a">扫描完成 / Scan complete</span>',
                            '',
                            '<span style="color:#96b38a">===== 褴褛人号舰体状态 / Tatterdemalion Ship Status =====</span>',
                            '',
                            '<span style="color:#ccc">船体完整性：</span><span style="color:#ff4d4d">严重受损 (23%)</span>',
                            '<span style="color:#ccc">推进系统：</span><span style="color:#ff4d4d">离线</span>',
                            '<span style="color:#ccc">生命维持：</span><span style="color:#bd2d2d">故障</span>',
                            '<span style="color:#ccc">武器系统：</span><span style="color:#bd2d2d">不可用</span>',
                            '<span style="color:#ccc">通讯阵列：</span><span style="color:#96b38a">微弱信号</span>',
                            '<span style="color:#ccc">核心 AI：</span><span style="color:#96b38a">在线 (K2-PS187 神经核心)</span>',
                            '',
                            '<span style="color:#ff4d4d">警告：检测到多处结构性损伤</span>',
                            '<span style="color:#ff4d4d">建议：立即进行紧急维修</span>',
                            '',
                            '<span style="color:#96b38a">========================================================</span>'
                        ];
                        
                        typewriterEffect(resultsDiv, resultLines);
                    }
                }, 300);
            }
        }, 320); // Update every 320ms for ~8 second total animation (25 steps * 320ms = 8000ms)
    }, 100);
    
    // Return the initial message with progress bar placeholder
    return [
        '<span style="color:#96b38a">开始扫描褴褛人号...</span>',
        '<span style="color:#96b38a">Initiating scan of Tatterdemalion...</span>',
        '',
        `<span id="${scanId}">扫描进度: [░░░░░░░░░░░░░░░░░░░░░░░░░] 0%</span>`,
        `<div id="${scanId}-results"></div>`
    ].join('  ');
}

// exit command - returns to UUC server in not-logged-in state
function exit(args) {
    if (!isOnK2Server()) return null;
    
    // Use kernel.connectToServer to switch back to UUC_Gladiator without login
    // This will return user to UUC in a not-logged-in state
    setTimeout(() => {
        kernel.connectToServer('UUC_Gladiator', '', '');
    }, 800);
    
    return {
        delayed: 0,
        clear: false,
        message: [
            '<span style="color:#96b38a">正在断开连接... / Disconnecting from K2-PS187...</span>',
            '<span style="color:#888">返回 UUC_Gladiator 主系统 / Returning to UUC_Gladiator main system...</span>'
        ]
    };
}

// Attach all K2 commands to window so kernel can find them
// These will only execute when on K2-PS187 server (checked via isOnK2Server)
window.help = help;
window.log = log;
window.status = status;
window.query = query;
window.scan = scan;
window.exit = exit;
