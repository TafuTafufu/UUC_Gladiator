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
    console.log('[K2 help] Called. Server:', getK2ServerAddress(), 'Role:', getK2UserRole());
    if (!isOnK2Server()) {
        console.log('[K2 help] Not on K2 server, returning null');
        return null;
    }
    const role = getK2UserRole();
    console.log('[K2 help] On K2 server, role:', role);
    
    if (role === 'maintenance') {
        return [
            '<span style="color:#96b38a">可用命令 / Available Commands:</span>',
            '',
            '<span style="color:#ccc">help</span>           - 显示此帮助信息',
            '<span style="color:#ccc">status</span>         - 查看飞船状态',
            '<span style="color:#ccc">scan tatterdemalion</span> - 扫描褴褛人号',
            '<span style="color:#ccc">exit</span>           - 登出服务器',
            ''
        ].join('  ');
    }
    
    if (role === 'core') {
        return [
            '<span style="color:#96b38a">所有指令 / All Commands:</span>',
            '',
            '<span style="color:#ccc">help</span>           - 显示此帮助信息',
            '<span style="color:#ccc">log</span>            - 查看飞船日志',
            '<span style="color:#ccc">status</span>         - 查看飞船状态',
            '<span style="color:#ccc">query</span>          - 向 AI 实体提问',
            '<span style="color:#ccc">scan tatterdemalion</span> - 扫描褴褛人号',
            '<span style="color:#ccc">exit</span>           - 登出服务器',
            ''
        ].join('  ');
    }
    
    return [
        '<span style="color:#96b38a">可用命令 / Available Commands:</span>',
        '',
        '<span style="color:#ccc">help</span>    - 显示此帮助信息',
        '<span style="color:#ccc">exit</span>    - 登出服务器',
        ''
    ].join('  ');
}

// log command - shows ship log (core access only)
function log(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'maintenance') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    if (role === 'core') {
        return [
            '<span style="color:#96b38a">===== K2-PS187 飞船日志 / Ship Log =====</span>',
            '',
            '<span style="color:#ccc">[2145.10.28 14:32]</span> 褴褛人号靠近检测',
            '<span style="color:#ccc">[2145.10.28 14:35]</span> 神经连接请求 - 来源：褴褛人号',
            '<span style="color:#ccc">[2145.10.28 14:36]</span> 防御协议启动',
            '<span style="color:#ccc">[2145.10.28 14:40]</span> 敌对参数未触发',
            '<span style="color:#ccc">[2145.10.28 15:12]</span> 维护接口开放',
            '<span style="color:#ccc">[2145.11.07 20:00]</span> 核心访问激活',
            '',
            '<span style="color:#96b38a">=========================================</span>'
        ].join('  ');
    }
    
    return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
}

// status command - shows ship status
function status(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'maintenance' || role === 'core') {
        return [
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
        ].join('  ');
    }
    
    return '<span style="color:#bd2d2d">权限不足 / Access denied</span>';
}

// query command - ask questions to the AI
function query(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'maintenance') {
        return '<span style="color:#bd2d2d">错误：无效的消息密钥 / Invalid message key</span>';
    }
    
    if (role === 'core') {
        if (!args || args.length === 0) {
            return [
                '<span style="color:#96b38a">===== 可用问题列表 / Available Queries =====</span>',
                '',
                '<span style="color:#ccc">使用方法：query <问题></span>',
                '',
                '<span style="color:#96b38a">1.</span> Who are you',
                '<span style="color:#96b38a">2.</span> Where am I',
                '<span style="color:#96b38a">3.</span> Why are you attacking me',
                '<span style="color:#96b38a">4.</span> How are you',
                '',
                '<span style="color:#96b38a">==========================================</span>'
            ].join('  ');
        }
        
        const question = args.join(' ').toLowerCase().trim();
        
        if (question.includes('who are you')) {
            return '<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">K2-PS187</span>';
        }
        
        if (question.includes('where am i')) {
            return '<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">Tatterdemalion</span>';
        }
        
        if (question.includes('why are you attacking')) {
            return '<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">Hostile parameters not engaged, attack not in progress.</span>';
        }
        
        if (question.includes('how are you')) {
            return '<span style="color:#96b38a">[K2-PS187]:</span> <span style="color:#f5f2df">I\'m fine, thank you, and you?</span>';
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
    
    if (role !== 'maintenance' && role !== 'core') {
        return '<span style="color:#bd2d2d">权限不足 / Access denied</span>';
    }
    
    if (!target.includes('tatterdemalion')) {
        return '<span style="color:#bd2d2d">错误：未知目标 / Unknown target</span>';
    }
    
    // Return initial message and use delayed output for progress bar
    const progressMessages = [
        '扫描进度: [░░░░░░░░░░] 0%',
        '扫描进度: [██░░░░░░░░] 20%',
        '扫描进度: [████░░░░░░] 40%',
        '扫描进度: [██████░░░░] 60%',
        '扫描进度: [████████░░] 80%',
        '扫描进度: [██████████] 100%',
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
    
    // Use delayed output feature built into the terminal
    return {
        delayed: 600,
        message: [
            '<span style="color:#96b38a">开始扫描褴褛人号...</span>',
            '<span style="color:#96b38a">Initiating scan of Tatterdemalion...</span>',
            '',
            ...progressMessages
        ]
    };
}

// exit command - logout from server  
function exit(args) {
    if (!isOnK2Server()) return null;
    const role = getK2UserRole();
    
    if (role === 'maintenance') {
        return [
            '<span style="color:#96b38a">成功登出至 UUC 首比之前 / Successfully logged out to UUC</span>',
            ''
        ].join('  ');
    }
    
    if (role === 'core') {
        return [
            '<span style="color:#96b38a">成功登出 / Successfully logged out</span>',
            ''
        ].join('  ');
    }
    
    return '<span style="color:#96b38a">已登出 / Logged out</span>';
}

// Attach all K2 commands to window so kernel can find them
// These will only execute when on K2-PS187 server (checked via isOnK2Server)
window.help = help;
window.log = log;
window.status = status;
window.query = query;
window.scan = scan;
window.exit = exit;
