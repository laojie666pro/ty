document.addEventListener('DOMContentLoaded', function() {
    // 导航栏处理
    initSidebar();
    
    // 返回顶部按钮
    initBackToTop();
    
    // 代码块复制功能
    initCodeCopy();
    
    // 检查项保存功能
    initChecklistSave();
    
    // FAQ页面功能
    if (window.location.href.includes('/faq/')) {
        initFAQ();
    }
    
    // 添加执行环境提示功能
    initEnvironmentTips();
});

// 初始化侧边栏
function initSidebar() {
    // 获取当前页面路径
    const currentPath = decodeURIComponent(window.location.href)
        .split('file:///D:/code/CODE/shuoming/')[1] || '';
    
    // 检查子页面的高亮
    const isSubPage = (path, section) => {
        return path.includes(`/pages/${section}/`) || 
               path.includes(`/${section}.html`);
    };
    
    // 构建导航栏HTML
    const sidebarHtml = `
        <div class="sidebar-header">
            <h2>部署指南</h2>
        </div>
        <div class="sidebar-content">
            <ul class="nav-menu">
                <li class="nav-item ${isSubPage(currentPath, 'config') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/config/index.html">1. 系统配置检查</a>
                </li>
                <li class="nav-item ${isSubPage(currentPath, 'install') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/install/index.html">2. 基础环境安装</a>
                </li>
                <li class="nav-item ${isSubPage(currentPath, 'dev') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/dev/index.html">3. 开发环境配置</a>
                </li>
                <li class="nav-item ${isSubPage(currentPath, 'model') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/model/index.html">4. 模型部署</a>
                </li>
                <li class="nav-item ${isSubPage(currentPath, 'data') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/data/index.html">5. 数据采集系统</a>
                </li>
                <li class="nav-item ${isSubPage(currentPath, 'faq') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/faq/index.html">6. 常见问题</a>
                </li>
                <li class="nav-item ${isSubPage(currentPath, 'optimize') ? 'active' : ''}">
                    <a href="file:///D:/code/CODE/shuoming/pages/optimize/index.html">7. 优化建议</a>
                </li>
            </ul>
        </div>
    `;
    
    // 更新导航栏
    document.querySelector('.sidebar').innerHTML = sidebarHtml;
}

// 初始化返回顶部按钮
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化代码块复制功能
function initCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '复制';
        block.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.innerHTML = '已复制';
                setTimeout(() => {
                    copyBtn.innerHTML = '复制';
                }, 2000);
            });
        });
    });
}

// 初始化检查项保存功能
function initChecklistSave() {
    const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
    const pageId = decodeURIComponent(window.location.href)
        .split('file:///D:/code/CODE/shuoming/')[1] || '';
    
    // 加载保存的状态
    checkboxes.forEach((checkbox, index) => {
        const saved = localStorage.getItem(`${pageId}-checkbox-${index}`);
        if (saved === 'true') {
            checkbox.checked = true;
        }
    });
    
    // 保存状态
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            localStorage.setItem(`${pageId}-checkbox-${index}`, checkbox.checked);
        });
    });
}

// 移动端菜单处理
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('show');
    });
}

// 点击内容区域关闭移动端菜单
document.querySelector('.main-content').addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.remove('show');
    }
});

// 初始化FAQ页面功能
function initFAQ() {
    // 获取所有FAQ问题项
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('.answer');
        
        // 初始状态隐藏答案
        answer.style.display = 'none';
        
        // 添加点击事件
        question.addEventListener('click', () => {
            // 切换显示/隐藏状态
            const isHidden = answer.style.display === 'none';
            answer.style.display = isHidden ? 'block' : 'none';
            
            // 切换问题的激活状态
            question.classList.toggle('active');
        });
        
        // 添加鼠标悬停效果
        question.addEventListener('mouseenter', () => {
            question.classList.add('hover');
        });
        
        question.addEventListener('mouseleave', () => {
            question.classList.remove('hover');
        });
    });
}

// 初始化执行环境提示
function initEnvironmentTips() {
    const notes = document.querySelectorAll('.note');
    
    notes.forEach(note => {
        // 为每个执行环境说明添加图标和打开按钮
        const envStrong = Array.from(note.querySelectorAll('strong')).find(
            el => el.textContent.includes('执行环境：')
        );
        
        if (envStrong) {
            const env = envStrong.parentElement.textContent.split('：')[1].trim();
            const info = EnvironmentManager.getInfo(env);
            
            if (info) {
                // 添加图标
                envStrong.parentElement.insertBefore(
                    createIcon(info.icon), 
                    envStrong
                );
                
                // 添加打开按钮
                const openBtn = document.createElement('button');
                openBtn.className = 'open-env-btn';
                openBtn.innerHTML = '打开';
                openBtn.onclick = (e) => {
                    e.preventDefault();
                    openEnvironment(env);
                };
                envStrong.parentElement.appendChild(openBtn);
            }
        }
        
        // 添加提示按钮
        const helpBtn = document.createElement('button');
        helpBtn.className = 'help-btn';
        helpBtn.innerHTML = '?';
        note.appendChild(helpBtn);
        
        // 添加提示内容
        helpBtn.addEventListener('click', () => {
            const envStrong = Array.from(note.querySelectorAll('strong')).find(
                el => el.textContent.includes('执行环境：')
            );
            const env = envStrong ? envStrong.parentElement.textContent.split('：')[1].trim() : '';
            const info = EnvironmentManager.getInfo(env);
            
            if (info) {
                const helpText = `
                    <h4>如何打开${info.name}：</h4>
                    ${getHelpSteps(info)}
                `;
                showTooltip(helpBtn, helpText);
            }
        });
    });
}

// 添加获取帮助步骤的函数
function getHelpSteps(info) {
    const helpSteps = {
        CMD: `
            <ol>
                <li>按 Win + R</li>
                <li>输入 cmd</li>
                <li>点击确定</li>
            </ol>
        `,
        VSCODE: `
            <ol>
                <li>在VS Code中按 Ctrl + \`</li>
                <li>或点击顶部菜单 查看 > 终端</li>
            </ol>
        `,
        POWERSHELL: `
            <ol>
                <li>按 Win + X</li>
                <li>选择 "Windows PowerShell (管理员)"</li>
                <li>点击"是"确认权限</li>
            </ol>
        `
    };
    
    const type = EnvironmentManager.getType(info.name);
    return helpSteps[type] || '';
}

// 创建图标元素
function createIcon(symbol) {
    const icon = document.createElement('span');
    icon.className = 'env-icon';
    icon.textContent = symbol;
    return icon;
}

// 显示提示框
function showTooltip(element, content) {
    let tooltip = document.querySelector('.env-tooltip');
    
    // 如果提示框不存在则创建
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'env-tooltip';
        document.body.appendChild(tooltip);
    }
    
    // 更新提示内容
    tooltip.innerHTML = content;
    
    // 计算位置
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${rect.left}px`;
    
    // 显示提示框
    tooltip.classList.add('show');
    
    // 点击其他地方关闭提示框
    const closeTooltip = (e) => {
        if (!tooltip.contains(e.target) && e.target !== element) {
            tooltip.classList.remove('show');
            document.removeEventListener('click', closeTooltip);
        }
    };
    
    document.addEventListener('click', closeTooltip);
}

// 添加环境管理器对象
const EnvironmentManager = {
    // 环境类型定义
    types: {
        CMD: {
            name: 'CMD快速启动',
            icon: '💻',
            extension: '.bat',
            content: '@echo off\nstart cmd.exe',
            description: '打开Windows命令提示符',
            message: '请运行下载的 open_cmd.bat 文件来打开命令提示符',
            fallbackSteps: {
                title: '自动打开失败，请选择以下方式之一打开命令提示符：',
                methods: [
                    {
                        name: '方式一',
                        steps: [
                            '按 Win + R',
                            '输入 cmd',
                            '点击确定'
                        ]
                    },
                    {
                        name: '方式二',
                        steps: [
                            '右键点击开始菜单',
                            '选择"Windows 终端"或"命令提示符"'
                        ]
                    }
                ],
                note: '如果需要管理员权限，请右键点击并选择"以管理员身份运行"'
            }
        },
        VSCODE: {
            name: 'VS Code快速启动',
            icon: '📝',
            extension: '.bat',
            description: '打开VS Code并加载当前项目',
            message: '请运行下载的 open_vscode.bat 文件来打开VS Code',
            getContent() {
                return `@echo off\ncode "${window.location.href.split('file:///')[1].split('/CODE/shuoming/')[0]}"`;
            },
            fallbackSteps: {
                title: '自动打开失败，请按以下步骤打开VS Code：',
                methods: [
                    {
                        name: '打开VS Code',
                        steps: [
                            '在开始菜单中搜索 "VS Code" 并打开',
                            '或直接双击桌面上的VS Code图标'
                        ]
                    },
                    {
                        name: '打开项目',
                        steps: [
                            '点击 文件 > 打开文件夹',
                            '或按 Ctrl + K, Ctrl + O',
                            '选择项目文件夹并确认'
                        ]
                    }
                ],
                note: '可以将VS Code添加到右键菜单，方便直接打开文件夹'
            }
        },
        POWERSHELL: {
            name: 'PowerShell(管理员)',
            icon: '⚡',
            extension: '.ps1',
            content: 'Set-ExecutionPolicy Bypass -Scope Process -Force\nStart-Process powershell -Verb RunAs',
            description: '以管理员权限打开PowerShell',
            message: '请右键点击下载的 open_powershell.ps1 文件，选择"使用 PowerShell 运行"',
            fallbackSteps: {
                title: '自动打开失败，请选择以下方式之一打开PowerShell：',
                methods: [
                    {
                        name: '方式一（推荐）',
                        steps: [
                            '按 Win + X',
                            '选择 "Windows PowerShell (管理员)"',
                            '在UAC提示中点击"是"'
                        ]
                    },
                    {
                        name: '方式二',
                        steps: [
                            '在开始菜单搜索 "PowerShell"',
                            '右键点击 "Windows PowerShell"',
                            '选择"以管理员身份运行"'
                        ]
                    }
                ],
                note: '管理员权限对于某些操作是必需的'
            }
        }
    },

    // 获取环境类型
    getType(env) {
        if (env.includes('CMD')) return 'CMD';
        if (env.includes('VS Code')) return 'VSCODE';
        if (env.includes('PowerShell')) return 'POWERSHELL';
        return null;
    },

    // 获取环境信息
    getInfo(env) {
        const type = this.getType(env);
        if (!type) return null;

        const info = this.types[type];
        return {
            ...info,
            content: typeof info.content === 'function' ? info.content() : info.content
        };
    },

    // 创建脚本文件
    createScript(env) {
        const info = this.getInfo(env);
        if (!info) return null;

        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(info.content);
        link.download = info.name + info.extension;
        return link;
    }
};

// 修改相关函数使用环境管理器
function openEnvironment(env) {
    try {
        const link = EnvironmentManager.createScript(env);
        if (!link) throw new Error('Unsupported environment');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        const info = EnvironmentManager.getInfo(env);
        showInstructions(env, info.message);
    } catch (error) {
        console.error('Failed to open environment:', error);
        showFallbackInstructions(env);
    }
}

// 修改生成脚本函数
function generateScript(env) {
    const info = EnvironmentManager.getInfo(env);
    if (!info) throw new Error('Unsupported environment');

    return {
        name: info.name,
        content: info.content,
        extension: info.extension,
        description: info.description
    };
}

// 修改相关函数，使用脚本生成器
function showInstructions(env, message) {
    const scriptInfo = generateScript(env);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="instructions">
                <h4>使用说明</h4>
                <p>${message}</p>
                <div class="script-preview">
                    <h5>脚本内容预览：</h5>
                    <pre><code>${scriptInfo.content}</code></pre>
                    <div class="preview-note">
                        <p>这个脚本将：</p>
                        <ul>
                            <li>${scriptInfo.description}</li>
                        </ul>
                    </div>
                </div>
                <div class="note-text">
                    <p>提示：</p>
                    <ul>
                        <li>文件将下载为：${scriptInfo.name}${scriptInfo.extension}</li>
                        <li>如果浏览器阻止下载，请允许下载</li>
                        <li>如果系统提示安全警告，可以点击"仍要运行"</li>
                    </ul>
                </div>
                <div class="save-option">
                    <label>
                        <input type="checkbox" id="save-script">
                        创建桌面快捷方式（推荐）
                    </label>
                    <p class="save-path">将在桌面创建快捷方式文件</p>
                </div>
            </div>
            <div class="button-group">
                <button class="download-btn" onclick="downloadScript('${env}')">下载脚本</button>
                <button class="show-manual" onclick="showFallbackInstructions('${env}')">手动步骤</button>
                <button class="modal-close">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 处理保存选项
    const saveCheckbox = modal.querySelector('#save-script');
    saveCheckbox.checked = localStorage.getItem('save-scripts') === 'true';
    
    saveCheckbox.addEventListener('change', () => {
        localStorage.setItem('save-scripts', saveCheckbox.checked);
        if (saveCheckbox.checked) {
            const info = EnvironmentManager.getInfo(env);
            if (!info) return;
            
            // 创建快捷方式文件
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(info.content);
            link.download = info.name + info.extension;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 显示额外说明
            const extraModal = document.createElement('div');
            extraModal.className = 'modal';
            extraModal.innerHTML = `
                <div class="modal-content">
                    <div class="instructions">
                        <h4>快捷方式已创建</h4>
                        <p>建议将下载的文件移动到桌面，方便使用：</p>
                        <ol>
                            <li>
                                打开下载文件夹
                                <button class="quick-open-btn" onclick="openFolder('downloads')">
                                    打开下载文件夹
                                </button>
                            </li>
                            <li>找到 "${info.name}${info.extension}" 文件</li>
                            <li>右键选择"剪切"</li>
                            <li>
                                打开桌面文件夹
                                <button class="quick-open-btn" onclick="openFolder('desktop')">
                                    打开桌面文件夹
                                </button>
                            </li>
                            <li>右键选择"粘贴"</li>
                        </ol>
                        <p class="note-text">提示：双击此文件即可${info.description}</p>
                    </div>
                    <button class="modal-close">明白了</button>
                </div>
            `;
            
            document.body.appendChild(extraModal);
            
            extraModal.querySelector('.modal-close').onclick = () => {
                extraModal.remove();
            };
            
            extraModal.onclick = (e) => {
                if (e.target === extraModal) {
                    extraModal.remove();
                }
            };
        }
    });
    
    // 添加关闭功能
    modal.querySelector('.modal-close').onclick = () => {
        modal.remove();
    };
    
    // 点击外部关闭
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

function downloadScript(env) {
    const scriptInfo = generateScript(env);
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(scriptInfo.content);
    link.download = scriptInfo.name + scriptInfo.extension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 修改备用说明函数
function showFallbackInstructions(env) {
    const info = EnvironmentManager.getInfo(env);
    if (!info || !info.fallbackSteps) return;
    
    const steps = info.fallbackSteps;
    const instructions = `
        <div class="fallback-instructions">
            <p>${steps.title}</p>
            <ol>
                ${steps.methods.map(method => `
                    <li>${method.name}：
                        <ul>
                            ${method.steps.map(step => `
                                <li>${step}</li>
                            `).join('')}
                        </ul>
                    </li>
                `).join('')}
            </ol>
            <p class="note-text">提示：${steps.note}</p>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            ${instructions}
            <button class="modal-close">我知道了</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').onclick = () => {
        modal.remove();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// 添加打开文件夹的函数
function openFolder(type) {
    const link = document.createElement('a');
    let command = '';
    
    if (type === 'downloads') {
        command = `@echo off
explorer "%USERPROFILE%\\Downloads"`;
    } else if (type === 'desktop') {
        command = `@echo off
explorer "%USERPROFILE%\\Desktop"`;
    }
    
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(command);
    link.download = `open_${type}.bat`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 