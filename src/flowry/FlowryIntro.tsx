import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  spring,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansKR";

// ─── Font Setup ───────────────────────────────────────
const { fontFamily } = loadFont();

// ─── Color Palette ────────────────────────────────────
const C = {
  bg: "#0a0f1e",
  bgLight: "#131b2e",
  card: "#1a2340",
  primary: "#3b82f6",
  primaryGlow: "#2563eb",
  accent: "#10b981",
  purple: "#8b5cf6",
  orange: "#f59e0b",
  pink: "#ec4899",
  cyan: "#06b6d4",
  text: "#f1f5f9",
  textMuted: "#64748b",
  textDim: "#475569",
  border: "#1e293b",
};

const font = (weight: number = 400) => ({
  fontFamily,
  fontWeight: weight,
});

// ─── Shared: Animated Background ──────────────────────
const AnimatedBg: React.FC<{ variant?: "grid" | "dots" | "clean" }> = ({ variant = "grid" }) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.15;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${C.bgLight} 0%, ${C.bg} 100%)`,
        }}
      />
      {/* Moving grid */}
      {variant === "grid" && (
        <div
          style={{
            position: "absolute",
            inset: -100,
            backgroundImage: `
              linear-gradient(${C.border}30 1px, transparent 1px),
              linear-gradient(90deg, ${C.border}30 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: `translate(${Math.sin(drift * 0.02) * 10}px, ${drift % 80}px)`,
            opacity: 0.4,
          }}
        />
      )}
      {/* Floating orbs */}
      {[
        { x: 20, y: 30, size: 300, color: C.primary, speed: 0.01 },
        { x: 75, y: 60, size: 250, color: C.purple, speed: 0.015 },
        { x: 50, y: 80, size: 200, color: C.accent, speed: 0.008 },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${orb.x + Math.sin(frame * orb.speed + i) * 5}%`,
            top: `${orb.y + Math.cos(frame * orb.speed + i) * 5}%`,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

// ─── Scene 1: Hero Title (0–120 frames) ───────────────
const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 35, config: { damping: 12 } });
  const logoY = interpolate(frame, [0, 35], [40, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const tagOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [30, 55], [15, 0], { extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" });
  const descY = interpolate(frame, [50, 75], [15, 0], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [65, 95], [0, 200], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBg />
      {/* Logo glow */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primaryGlow}25 0%, transparent 70%)`,
          filter: "blur(50px)",
          opacity: logoScale,
        }}
      />
      {/* Logo text */}
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${logoY}px)`,
          fontSize: 110,
          color: C.text,
          letterSpacing: -5,
          ...font(900),
        }}
      >
        Flowry
      </div>
      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          fontSize: 26,
          color: C.primary,
          marginTop: 8,
          letterSpacing: 2,
          textTransform: "uppercase",
          ...font(500),
        }}
      >
        Project Management Dashboard
      </div>
      {/* Divider line */}
      <div
        style={{
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
          marginTop: 24,
        }}
      />
      {/* Description */}
      <div
        style={{
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
          fontSize: 22,
          color: C.textMuted,
          marginTop: 20,
          textAlign: "center",
          lineHeight: 1.6,
          ...font(400),
        }}
      >
        기획부터 개발까지, 프로젝트의 모든 흐름을 한 곳에서
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Features Grid (120–270 frames) ──────────
const FEATURES = [
  { icon: "📋", title: "요구사항 관리", desc: "등록 · 피드백 · 승인 워크플로우", color: C.primary },
  { icon: "📌", title: "칸반 보드", desc: "드래그앤드롭으로 태스크 이동", color: C.accent },
  { icon: "📊", title: "스프린트 관리", desc: "번다운 차트 · 벨로시티 추적", color: C.purple },
  { icon: "📄", title: "문서 자동 생성", desc: "승인 시 명세서 자동 작성", color: C.orange },
  { icon: "🔗", title: "GitHub 연동", desc: "커밋 · PR · 머지 자동 추적", color: C.pink },
  { icon: "👥", title: "팀 협업", desc: "초대 링크 · 역할 기반 접근 제어", color: C.cyan },
];

const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: 80 }}>
      <AnimatedBg variant="dots" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          fontSize: 50,
          color: C.text,
          textAlign: "center",
          marginBottom: 50,
          ...font(700),
        }}
      >
        주요 <span style={{ color: C.primary }}>기능</span>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {FEATURES.map((feat, i) => {
          const delay = 20 + i * 10;
          const scale = spring({ frame: Math.max(frame - delay, 0), fps, from: 0.85, to: 1, durationInFrames: 20, config: { damping: 12 } });
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${Math.max(scale, 0.85)})`,
                background: C.card,
                border: `1px solid ${feat.color}30`,
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: `0 4px 24px ${feat.color}10`,
              }}
            >
              <div style={{ fontSize: 38 }}>{feat.icon}</div>
              <div style={{ fontSize: 22, color: C.text, ...font(700) }}>{feat.title}</div>
              <div style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.4, ...font(400) }}>{feat.desc}</div>
              <div
                style={{
                  width: 40,
                  height: 3,
                  background: `linear-gradient(90deg, ${feat.color}, ${feat.color}60)`,
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

// ─── Scene 3: Workflow (270–450 frames) ────────────────
const STEPS = [
  { label: "요구사항\n등록", icon: "📝", color: C.primary },
  { label: "피드백\n& 승인", icon: "💬", color: C.accent },
  { label: "태스크\n자동 생성", icon: "✅", color: C.purple },
  { label: "칸반에서\n개발", icon: "⚡", color: C.orange },
  { label: "GitHub\n자동 연동", icon: "🔗", color: C.pink },
  { label: "문서\n자동 생성", icon: "📄", color: C.cyan },
];

const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: 80 }}>
      <AnimatedBg variant="clean" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: headerOpacity,
          fontSize: 50,
          color: C.text,
          textAlign: "center",
          marginBottom: 70,
          ...font(700),
        }}
      >
        하나의 <span style={{ color: C.accent }}>흐름</span>으로 연결
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {STEPS.map((step, i) => {
          const delay = 20 + i * 15;
          const nodeScale = spring({ frame: Math.max(frame - delay, 0), fps, from: 0, to: 1, durationInFrames: 20, config: { damping: 10 } });
          const arrowWidth = interpolate(frame, [delay + 8, delay + 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  transform: `scale(${nodeScale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: `${step.color}15`,
                    border: `2px solid ${step.color}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    boxShadow: `0 0 20px ${step.color}20`,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: C.text,
                    textAlign: "center",
                    width: 90,
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                    ...font(500),
                  }}
                >
                  {step.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 40,
                    height: 2,
                    background: `linear-gradient(90deg, ${step.color}80, ${STEPS[i + 1].color}80)`,
                    marginBottom: 30,
                    transform: `scaleX(${arrowWidth})`,
                    transformOrigin: "left",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: interpolate(frame, [110, 135], [0, 1], { extrapolateRight: "clamp" }),
          textAlign: "center",
          marginTop: 60,
          fontSize: 20,
          color: C.textMuted,
          ...font(400),
        }}
      >
        사람은 기획과 코딩에 집중 — 나머지는 Flowry가 자동으로
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Tech Stack (450–560 frames) ─────────────
const TECH = [
  { name: "Next.js 16", color: C.text },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind CSS", color: "#06b6d4" },
  { name: "shadcn/ui", color: C.text },
  { name: "@dnd-kit", color: C.accent },
  { name: "Prisma 7", color: "#5a67d8" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "NextAuth v5", color: C.purple },
  { name: "Sentry", color: "#362d59" },
  { name: "Vercel", color: C.text },
  { name: "Docker", color: "#2496ed" },
  { name: "GitHub Webhooks", color: C.text },
];

const TechScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: 80, justifyContent: "center" }}>
      <AnimatedBg variant="clean" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: headerOpacity,
          fontSize: 50,
          color: C.text,
          textAlign: "center",
          marginBottom: 50,
          ...font(700),
        }}
      >
        Tech <span style={{ color: C.purple }}>Stack</span>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {TECH.map((t, i) => {
          const delay = 15 + i * 4;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const y = interpolate(frame, [delay, delay + 12], [15, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                padding: "14px 28px",
                borderRadius: 100,
                background: `${t.color}12`,
                border: `1px solid ${t.color}35`,
                color: C.text,
                fontSize: 17,
                display: "flex",
                alignItems: "center",
                gap: 10,
                ...font(500),
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: t.color,
                  boxShadow: `0 0 8px ${t.color}60`,
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

// ─── Scene 5: CTA Outro (560–700 frames) ──────────────
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, from: 0.6, to: 1, durationInFrames: 30, config: { damping: 12 } });
  const tagOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const btnOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
  const btnY = interpolate(frame, [40, 60], [15, 0], { extrapolateRight: "clamp" });
  const badgeOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBg />
      {/* Large ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primaryGlow}15 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale})`,
            fontSize: 90,
            color: C.text,
            letterSpacing: -4,
            ...font(900),
          }}
        >
          Flowry
        </div>
        <div
          style={{
            opacity: tagOpacity,
            fontSize: 24,
            color: C.textMuted,
            marginTop: 16,
            ...font(400),
          }}
        >
          프로젝트 관리의 새로운 흐름
        </div>
        <div
          style={{
            opacity: btnOpacity,
            transform: `translateY(${btnY}px)`,
            marginTop: 36,
            padding: "16px 40px",
            borderRadius: 100,
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryGlow})`,
            color: C.text,
            fontSize: 20,
            boxShadow: `0 4px 20px ${C.primary}40`,
            ...font(600),
          }}
        >
          github.com/tygwan/flowry
        </div>
        <div
          style={{
            opacity: badgeOpacity,
            marginTop: 24,
            display: "flex",
            gap: 20,
            fontSize: 15,
            color: C.textDim,
            ...font(400),
          }}
        >
          <span>MIT License</span>
          <span style={{ color: C.border }}>·</span>
          <span>Open Source</span>
          <span style={{ color: C.border }}>·</span>
          <span>Self-hostable</span>
        </div>
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
      <Sequence from={120} durationInFrames={150}>
        <FeaturesScene />
      </Sequence>
      <Sequence from={270} durationInFrames={180}>
        <WorkflowScene />
      </Sequence>
      <Sequence from={450} durationInFrames={110}>
        <TechScene />
      </Sequence>
      <Sequence from={560} durationInFrames={140}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
