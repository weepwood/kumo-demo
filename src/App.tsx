import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Switch } from "@cloudflare/kumo";
import { ArrowSquareOutIcon, PlusIcon } from "@phosphor-icons/react";

type ServiceStatus = "healthy" | "warning" | "deploying";

type Service = {
  name: string;
  description: string;
  region: string;
  requests: string;
  latency: string;
  status: ServiceStatus;
};

const services: Service[] = [
  {
    name: "image-optimizer",
    description: "图片压缩、格式协商与边缘缓存",
    region: "全球 · 312 PoP",
    requests: "18.4M",
    latency: "22 ms",
    status: "healthy",
  },
  {
    name: "api-gateway",
    description: "鉴权、限流与后端服务路由",
    region: "亚太 · 74 PoP",
    requests: "9.7M",
    latency: "37 ms",
    status: "warning",
  },
  {
    name: "realtime-events",
    description: "WebSocket 连接与实时事件分发",
    region: "全球 · 198 PoP",
    requests: "6.2M",
    latency: "29 ms",
    status: "healthy",
  },
];

const deploymentSteps = [
  "校验 Worker 配置",
  "生成生产构建",
  "上传边缘资源",
  "同步全球节点",
  "部署完成",
];

function StatusBadge({ status }: { status: ServiceStatus }) {
  if (status === "warning") {
    return (
      <Badge variant="warning" appearance="dot">
        需关注
      </Badge>
    );
  }

  if (status === "deploying") {
    return (
      <Badge variant="info" appearance="dot">
        部署中
      </Badge>
    );
  }

  return (
    <Badge variant="success" appearance="dot">
      运行正常
    </Badge>
  );
}

export default function App() {
  const [autoScale, setAutoScale] = useState(true);
  const [smartCache, setSmartCache] = useState(true);
  const [attackMode, setAttackMode] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastDeploy, setLastDeploy] = useState("今天 17:42");

  useEffect(() => {
    if (!deploying) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 20, 100);
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setDeploying(false);
            setLastDeploy("刚刚");
          }, 500);
        }
        return next;
      });
    }, 650);

    return () => window.clearInterval(timer);
  }, [deploying]);

  const visibleSteps = useMemo(
    () => deploymentSteps.slice(0, Math.max(1, Math.ceil(progress / 20))),
    [progress],
  );

  const startDeployment = () => {
    setProgress(0);
    setDeploying(true);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">K</div>
          <div>
            <strong>Kumo Console</strong>
            <span>Edge platform demo</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="主导航">
          <a className="nav-item active" href="#overview">
            <span>◫</span> 总览
          </a>
          <a className="nav-item" href="#services">
            <span>☁</span> 边缘服务
          </a>
          <a className="nav-item" href="#deployment">
            <span>⌁</span> 部署记录
          </a>
          <a className="nav-item" href="#settings">
            <span>⚙</span> 策略设置
          </a>
        </nav>

        <div className="sidebar-footer">
          <Badge variant="beta">Kumo 2.9</Badge>
          <p>Cloudflare UI component demo</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PRODUCTION WORKSPACE</p>
            <h1>边缘服务控制台</h1>
          </div>
          <div className="topbar-actions">
            <Button
              variant="outline"
              icon={ArrowSquareOutIcon}
              onClick={() =>
                window.open("https://github.com/cloudflare/kumo", "_blank")
              }
            >
              Kumo 仓库
            </Button>
            <Button variant="primary" icon={PlusIcon} onClick={startDeployment} loading={deploying}>
              {deploying ? "正在部署" : "新建部署"}
            </Button>
          </div>
        </header>

        <section className="hero" id="overview">
          <div className="hero-copy">
            <Badge variant="success" appearance="dot">
              所有核心系统正常
            </Badge>
            <h2>管理全球边缘应用，保持快速、可靠与安全。</h2>
            <p>
              这是一个使用 Cloudflare Kumo 组件构建的交互式控制台演示，展示按钮、徽章、开关等组件在真实产品界面中的组合方式。
            </p>
          </div>
          <div className="network-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="core-node">☁</div>
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
          </div>
        </section>

        <section className="metrics-grid" aria-label="核心指标">
          <article className="metric-card">
            <span className="metric-label">今日请求</span>
            <strong>34.3M</strong>
            <span className="metric-trend positive">↑ 12.8%</span>
          </article>
          <article className="metric-card">
            <span className="metric-label">缓存命中率</span>
            <strong>94.7%</strong>
            <span className="metric-trend positive">↑ 2.4%</span>
          </article>
          <article className="metric-card">
            <span className="metric-label">P95 延迟</span>
            <strong>31 ms</strong>
            <span className="metric-trend">全球平均</span>
          </article>
          <article className="metric-card">
            <span className="metric-label">拦截威胁</span>
            <strong>128K</strong>
            <span className="metric-trend warning">近 24 小时</span>
          </article>
        </section>

        <div className="dashboard-grid">
          <section className="panel services-panel" id="services">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">SERVICES</p>
                <h3>边缘服务</h3>
              </div>
              <Button variant="secondary" size="sm" icon={PlusIcon}>
                添加服务
              </Button>
            </div>

            <div className="service-list">
              {services.map((service) => (
                <article className="service-row" key={service.name}>
                  <div className="service-icon">{service.name.slice(0, 1).toUpperCase()}</div>
                  <div className="service-main">
                    <div className="service-title-line">
                      <strong>{service.name}</strong>
                      <StatusBadge status={deploying && service.name === "api-gateway" ? "deploying" : service.status} />
                    </div>
                    <p>{service.description}</p>
                    <span>{service.region}</span>
                  </div>
                  <div className="service-stat">
                    <strong>{service.requests}</strong>
                    <span>请求 / 24h</span>
                  </div>
                  <div className="service-stat">
                    <strong>{service.latency}</strong>
                    <span>P95 延迟</span>
                  </div>
                  <Button
                    variant="ghost"
                    shape="square"
                    icon={ArrowSquareOutIcon}
                    aria-label={`查看 ${service.name}`}
                  />
                </article>
              ))}
            </div>
          </section>

          <section className="panel settings-panel" id="settings">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">POLICIES</p>
                <h3>智能策略</h3>
              </div>
              <Badge variant="info">实时生效</Badge>
            </div>

            <div className="switch-stack">
              <div className="switch-row">
                <div>
                  <strong>自动扩缩容</strong>
                  <p>根据请求量动态调整资源。</p>
                </div>
                <Switch label="自动扩缩容" checked={autoScale} onCheckedChange={setAutoScale} />
              </div>
              <div className="switch-row">
                <div>
                  <strong>智能缓存</strong>
                  <p>自动优化缓存规则和有效期。</p>
                </div>
                <Switch label="智能缓存" checked={smartCache} onCheckedChange={setSmartCache} />
              </div>
              <div className="switch-row">
                <div>
                  <strong>攻击防护模式</strong>
                  <p>启用更严格的挑战和限速。</p>
                </div>
                <Switch label="攻击防护模式" checked={attackMode} onCheckedChange={setAttackMode} />
              </div>
            </div>

            <div className="policy-summary">
              <span>当前策略</span>
              <strong>{[autoScale, smartCache, attackMode].filter(Boolean).length} / 3 已启用</strong>
            </div>
          </section>

          <section className="panel deployment-panel" id="deployment">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">DEPLOYMENT</p>
                <h3>生产部署</h3>
              </div>
              <Badge variant={deploying ? "info" : "success"} appearance="dot">
                {deploying ? "进行中" : "已同步"}
              </Badge>
            </div>

            <div className="deployment-copy">
              <div>
                <span>当前版本</span>
                <strong>v1.8.4</strong>
              </div>
              <div>
                <span>上次部署</span>
                <strong>{lastDeploy}</strong>
              </div>
              <div>
                <span>目标环境</span>
                <strong>Global</strong>
              </div>
            </div>

            <div className="progress-track" aria-label={`部署进度 ${progress}%`}>
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="terminal">
              <div className="terminal-bar">
                <span /> <span /> <span />
                <strong>deployment.log</strong>
              </div>
              <div className="terminal-body">
                {deploying || progress > 0 ? (
                  visibleSteps.map((step, index) => (
                    <p key={step}>
                      <span>{index === visibleSteps.length - 1 && deploying ? "›" : "✓"}</span>
                      {step}
                    </p>
                  ))
                ) : (
                  <p><span>✓</span>等待下一次部署任务</p>
                )}
              </div>
            </div>

            <Button variant="primary" onClick={startDeployment} loading={deploying}>
              {deploying ? `部署中 ${progress}%` : "重新部署"}
            </Button>
          </section>
        </div>

        <footer className="page-footer">
          <span>Built with React, Vite and Cloudflare Kumo.</span>
          <a href="https://github.com/weepwood/kumo-demo" target="_blank" rel="noreferrer">
            查看源代码 ↗
          </a>
        </footer>
      </main>
    </div>
  );
}
