import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";

// ─── Color Palette ────────────────────────────────────
const COLORS = {
  bg: "#0f172a",
  bgLight: "#1e293b",
  primary: "#3b82f6",
  primaryLight: "#60a5fa",
  accent: "#10b981",
  accentLight: "#34d399",
  purple: "#8b5cf6",
  orange: "#f59e0b",
  pink: "#ec4899",
  text: "#f8fafc",
  textMuted: "#94a3b8",
  border: "#334155",
};

// ─── Scene 1: Hero Title ──────────────────────────────
const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 30 });
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [40, 70], [20, 0], { extrapolateRight: "clamp" });

  const glowPulse = Math.sin(frame * 0.05) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgLight} 0%, ${COLORS.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'Pretendard', sans-serif",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.border}40 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}40 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}${Math.round(glowPulse * 30).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          fontSize: 100,
          fontWeight: 800,
          color: COLORS.text,
          letterSpacing: -4,
          textShadow: `0 0 40px ${COLORS.primary}80`,
        }}
      >
        Flowry
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 28,
          color: COLORS.primaryLight,
          marginTop: 16,
          fontWeight: 500,
        }}
      >
        Project Management Dashboard
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 20,
          color: COLORS.textMuted,
          marginTop: 12,
          maxWidth: 600,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        기획부터 개발까지, 프로젝트의 모든 흐름을 한 곳에서
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Features Grid ───────────────────────────
const FEATURES = [
  { icon: "📋", title: "요구사항 관리", desc: "등록 → 피드백 → 승인", color: COLORS.primary },
  { icon: "📌", title: "칸반 보드", desc: "드래그앤드롭 태스크 관리", color: COLORS.accent },
  { icon: "📊", title: "스프린트", desc: "번다운 차트 + 벨로시티", color: COLORS.purple },
  { icon: "📄", title: "문서 자동 생성", desc: "승인 시 명세서 자동 작성", color: COLORS.orange },
  { icon: "🔗", title: "GitHub 연동", desc: "커밋/PR 자동 추적", color: COLORS.pink },
  { icon: "👥", title: "팀 협업", desc: "초대 링크 + 역할 관리", color: COLORS.primaryLight },
];

const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        padding: 80,
        fontFamily: "'Inter', 'Pretendard', sans-serif",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <span style={{ color: COLORS.primary }}>Features</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 30,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {FEATURES.map((feat, i) => {
          const delay = i * 8;
          const cardScale = spring({ frame: frame - delay, fps, from: 0.8, to: 1, durationInFrames: 20 });
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `scale(${Math.max(cardScale, 0.8)})`,
                background: `${COLORS.bgLight}`,
                border: `1px solid ${feat.color}40`,
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 36 }}>{feat.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.text }}>{feat.title}</div>
              <div style={{ fontSize: 15, color: COLORS.textMuted }}>{feat.desc}</div>
              <div
                style={{
                  width: 40,
                  height: 3,
                  background: feat.color,
                  borderRadius: 2,
                  marginTop: 4,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Workflow Animation ──────────────────────
const WORKFLOW_STEPS = [
  { label: "요구사항 등록", icon: "📝", color: COLORS.primary },
  { label: "피드백 & 승인", icon: "💬", color: COLORS.accent },
  { label: "태스크 생성", icon: "✅", color: COLORS.purple },
  { label: "개발 (칸반)", icon: "⚡", color: COLORS.orange },
  { label: "GitHub 연동", icon: "🔗", color: COLORS.pink },
  { label: "문서 자동 생성", icon: "📄", color: COLORS.primaryLight },
];

const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, #0c1222 100%)`,
        padding: 80,
        fontFamily: "'Inter', 'Pretendard', sans-serif",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        하나의 <span style={{ color: COLORS.accent }}>흐름</span>으로 연결
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {WORKFLOW_STEPS.map((step, i) => {
          const delay = 15 + i * 12;
          const stepOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const stepY = interpolate(frame, [delay, delay + 10], [30, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          const arrowOpacity = interpolate(frame, [delay + 5, delay + 12], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: stepOpacity,
                  transform: `translateY(${stepY}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: `${step.color}20`,
                    border: `2px solid ${step.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: COLORS.text,
                    fontWeight: 500,
                    textAlign: "center",
                    width: 100,
                  }}
                >
                  {step.label}
                </div>
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div
                  style={{
                    opacity: arrowOpacity,
                    fontSize: 24,
                    color: COLORS.textMuted,
                    marginBottom: 30,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" }),
          textAlign: "center",
          marginTop: 50,
          fontSize: 18,
          color: COLORS.textMuted,
        }}
      >
        사람은 기획과 코딩에 집중, 나머지는 Flowry가 자동으로
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Tech Stack ──────────────────────────────
const TECH = [
  { name: "Next.js 16", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "shadcn/ui", category: "UI" },
  { name: "@dnd-kit", category: "UI" },
  { name: "Prisma 7", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "NextAuth v5", category: "Auth" },
  { name: "Sentry", category: "Monitoring" },
  { name: "Vercel", category: "Deploy" },
  { name: "Docker", category: "Deploy" },
  { name: "GitHub Webhooks", category: "Integration" },
];

const TechScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        padding: 80,
        fontFamily: "'Inter', 'Pretendard', sans-serif",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        Tech <span style={{ color: COLORS.purple }}>Stack</span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {TECH.map((t, i) => {
          const delay = 10 + i * 4;
          const pillOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const pillScale = interpolate(frame, [delay, delay + 10], [0.7, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          const categoryColors: Record<string, string> = {
            Frontend: COLORS.primary,
            UI: COLORS.accent,
            Backend: COLORS.purple,
            Database: COLORS.orange,
            Auth: COLORS.pink,
            Monitoring: "#ef4444",
            Deploy: COLORS.accentLight,
            Integration: COLORS.primaryLight,
          };

          const color = categoryColors[t.category] || COLORS.textMuted;

          return (
            <div
              key={i}
              style={{
                opacity: pillOpacity,
                transform: `scale(${pillScale})`,
                padding: "12px 24px",
                borderRadius: 100,
                background: `${color}15`,
                border: `1px solid ${color}50`,
                color: COLORS.text,
                fontSize: 16,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color,
                }}
              />
              {t.name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: CTA / Outro ─────────────────────────────
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, from: 0.5, to: 1, durationInFrames: 25 });
  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const urlOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
  const badgeOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgLight} 0%, ${COLORS.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'Pretendard', sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          transform: `scale(${logoScale})`,
          fontSize: 80,
          fontWeight: 800,
          color: COLORS.text,
          letterSpacing: -3,
        }}
      >
        Flowry
      </div>

      <div
        style={{
          opacity: textOpacity,
          fontSize: 24,
          color: COLORS.textMuted,
          marginTop: 20,
        }}
      >
        Start managing your projects today
      </div>

      <div
        style={{
          opacity: urlOpacity,
          marginTop: 30,
          padding: "14px 36px",
          borderRadius: 100,
          background: `${COLORS.primary}`,
          color: COLORS.text,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        github.com/tygwan/flowry
      </div>

      <div
        style={{
          opacity: badgeOpacity,
          marginTop: 20,
          display: "flex",
          gap: 16,
          fontSize: 14,
          color: COLORS.textMuted,
        }}
      >
        <span>MIT License</span>
        <span>·</span>
        <span>Open Source</span>
        <span>·</span>
        <span>Self-hostable</span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ─────────────────────────────────
export const FlowryIntro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={120}>
        <HeroScene />
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <FeaturesScene />
      </Sequence>
      <Sequence from={240} durationInFrames={150}>
        <WorkflowScene />
      </Sequence>
      <Sequence from={390} durationInFrames={100}>
        <TechScene />
      </Sequence>
      <Sequence from={490} durationInFrames={110}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
