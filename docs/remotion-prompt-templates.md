# Remotion Prompt Templates & Techniques Library

> Adobe After Effects 수준의 고품질 영상을 Remotion + AI로 제작하기 위한 프롬프트 템플릿 및 테크닉 레퍼런스
>
> Source: https://www.remotion.dev/prompts (21개 커뮤니티 프롬프트 분석)

---

## 1. 테크닉 분류 체계

### 1.1 Motion & Animation

| 테크닉 | 설명 | 사용 프롬프트 |
|---------|------|---------------|
| Spring Physics | `spring()` 기반 물리 애니메이션 (damping, mass 조절) | #4, #8, #9, #11, #21 |
| Staggered Delay | 요소별 시차 등장 (delay 간격) | #4, #9, #12, #17 |
| Typewriter Effect | 한 글자씩 타이핑 (~1 char/frame) | #4, #13 |
| Pop-in Scaling | 3x→1x 스케일 드라마틱 등장 | #8 |
| Elastic Layout | 새 요소가 기존 요소를 물리적으로 밀어냄 | #19 |
| Breathing Idle | 미세한 맥동 대기 애니메이션 | #11 |
| Floating Motion | 지속적 부유 움직임 | #4, #8 |
| Orbit Animation | 원형 궤도 회전 | #4 |
| Speed Ramp | 속도 가감속 전환 | #15 |

### 1.2 Transitions

| 테크닉 | 설명 | 사용 프롬프트 |
|---------|------|---------------|
| Blur/Unblur | 흐림→선명 전환 (1초) | #1 |
| Fade In/Out | 불투명도 기반 전환 | #5, #12 |
| Slide-in (Lower Third) | 하단에서 슬라이드 등장 | #5 |
| Iris Wipe | 원형 확대/축소 전환 | #19 |
| Ring Tunnel | 터널 형태 장면 전환 | #19 |
| Wipe Logic | 요소가 지나가며 뒤의 것을 지움 | #11 |
| Whip Transition | 빠른 회전 전환 | #15 |
| Light Leak Transition | `@remotion/light-leaks` 사용 | #15 |

### 1.3 3D & Visual Effects

| 테크닉 | 설명 | 사용 프롬프트 |
|---------|------|---------------|
| React Three Fiber | 3D 장면 렌더링 | #2, #7, #8, #16 |
| 3D Perspective Transform | CSS rotateX/rotateY | #1, #4 |
| Metallic Material | 금속 질감 머테리얼 | #16 |
| Glitch Effect | react-postprocessing 글리치 | #8, #16 |
| Particle System | 부유 파티클 (삼각형, 육각형) | #4, #8, #21 |
| Ghost Trail | 이동 시 잔상 효과 | #11 |
| Depth of Field | 배경 흐림 깊이감 | #19 |
| Film Grain | 영화 필름 그레인 효과 | #15 |
| Glow/Bloom | 발광 효과 (feGaussianBlur) | #9, #18, #20 |
| Shimmer Effect | 반짝임/쉬머 효과 | #21 |

### 1.4 Typography & Text

| 테크닉 | 설명 | 사용 프롬프트 |
|---------|------|---------------|
| Kinetic Typography | 텍스트에 물리 기반 움직임 | #19 |
| Word-by-Word Reveal | 단어 단위 순차 등장 | #4, #15 |
| Shape Morphing to Text | 도형→글자 변환 (flubber) | #11 |
| Pixel Block Text | 픽셀 블록으로 글자 구성 | #17 |
| Highlighter Effect | rough.js로 형광펜 효과 | #1 |
| Counter Animation | 숫자 카운트업 | #12, #15, #21 |

### 1.5 Data Visualization

| 테크닉 | 설명 | 사용 프롬프트 |
|---------|------|---------------|
| Bar Chart | 순차적 막대 성장 | #9, #18 |
| Line Chart | stroke-dasharray 기반 그리기 | #9, #18 |
| Audio Spectrum | 주파수 대역별 시각화 | #20 |
| Timeline Visualization | 시계열 데이터 애니메이션 | #6 |
| 3D Tower Chart | Three.js 기반 3D 막대 | #7 |
| SOC/Battery Visualization | 상태 기반 기술 시각화 | #21 |

### 1.6 Audio & Sound

| 테크닉 | 설명 | 사용 프롬프트 |
|---------|------|---------------|
| Audio Reactivity | `useAudioData` 기반 시각 반응 | #12, #20 |
| BGM Fade In/Out | 배경 음악 페이드 (1s in, 2s out) | #4 |
| Beat Sync | BPM에 맞춘 장면 전환 | #19 |
| Sound Effects | remotion.media 효과음 | #12 |

---

## 2. 프롬프트 작성 패턴

### Pattern A: 장면 기반 구조 (Scene-by-Scene)

가장 정밀한 결과를 내는 패턴. After Effects 수준의 퀄리티에 필수.

```
Create a Remotion video (1920x1080, 30fps, ~{duration}s) with {theme} theme.

**Color Palette:** {bg}, {surface}, {border}, {accent}, {text}
**Fonts:** {primary} (UI), {mono} (code), {serif} (branding)

**Scene 1 ({name}, {duration}s):**
{상세한 시각 요소 설명}
{애니메이션 방식 (spring, ease-out 등)}
{전환 효과}

**Scene 2 ({name}, {duration}s):**
...

**Transitions:** Spring animations with fade + scale (0.95->1 in, 1->0.95 out)
**Audio:** {BGM 파일} at {volume}% with {fade-in}s fade-in and {fade-out}s fade-out
```

**대표 예시:** #4 (Launch Video on X) - 8개 장면, 각각 세부 레이아웃과 애니메이션 지정

### Pattern B: 반복 대화형 (Iterative Refinement)

초기 결과물을 점진적으로 개선하는 패턴.

```
[Initial] "use remotion best practices. create {기본 요소}"
[Refine]  "{크기/색상/밝기 조정}"
[Refine]  "{효과 추가 (glitch, glow 등)}"
[Refine]  "{애니메이션 범위 조정}"
[Export]  "export as {format}"
```

**대표 예시:** #16 (Spinning Glitching SVG Logo) - 9단계 대화로 완성

### Pattern C: 참조 기반 (Reference-Driven)

웹사이트/데이터를 자동으로 가져와 활용.

```
"use remotion best practices.
{data source}: {URL 또는 파일 경로}
use {tool} to {데이터 추출 방법}.
make a {output format} showing {시각화 방식}.
{폰트/크기 등 가독성 요구사항}"
```

**대표 예시:** #5 (YouTube 구독자 수), #14 (Strava GPX 데이터)

### Pattern D: 영화적 연출 (Cinematic Production)

실사 영상 편집 수준의 지시.

```
**Prompt 1 (분석):** Analyze {source} for visual highlights, detect weak sections
**Prompt 2 (타임라인):** Second-by-second timeline with motion effects, transitions
**Prompt 3 (모션 그래픽):** Price reveals, counters, lower-thirds, overlays
**Prompt 4 (타이포그래피):** Font choices, text animation styles
**Prompt 5 (시네마틱):** Light leaks, color grading, film grain
**Prompt 6 (리텐션):** Hook in first 2s, pattern interrupt at 5-7s, CTA
**Prompt 7 (익스포트):** Format, resolution, compression
```

**대표 예시:** #15 (Real Estate Investing) - 7단계 프로덕션 파이프라인

---

## 3. 고품질 영상을 위한 체크리스트

### Visual Quality (After Effects 동급)

- [ ] **Color Palette 정의** - 최소 5색 (bg, surface, border, accent, text)
- [ ] **Font Stack** - UI용 + 코드용 + 브랜딩용 분리
- [ ] **3D Perspective** - 단순 2D 대신 CSS/Three.js 3D 변환 활용
- [ ] **Glassmorphism** - 반투명 배경 + backdrop-filter: blur
- [ ] **Glow/Bloom** - 주요 요소에 발광 효과
- [ ] **Particle System** - 배경 부유 파티클로 깊이감
- [ ] **Gradient Animation** - 정적 그라데이션 대신 움직이는 그라데이션
- [ ] **Film Grain / Noise** - 미세한 노이즈 텍스처

### Motion Quality

- [ ] **Spring Physics** - ease 대신 spring (damping: 14~300)
- [ ] **Staggered Animation** - 동시 등장 대신 시차 등장
- [ ] **Overshoot & Settle** - 약간의 오버슈팅 후 안착
- [ ] **Idle Animation** - 정지 상태에서도 미세한 움직임 (breathing)
- [ ] **Exit Animation** - 등장만큼 퇴장도 신경 쓰기
- [ ] **Transition Variety** - 장면 전환을 2가지 이상 혼용

### Audio Quality

- [ ] **BGM** - 분위기에 맞는 배경 음악 (볼륨 30-40%)
- [ ] **Fade In/Out** - 음악 시작/끝 페이드
- [ ] **Sound Effects** - 전환, 등장 시 효과음 (remotion.media)
- [ ] **Beat Sync** - 주요 장면 전환을 비트에 맞추기

### Production Quality

- [ ] **Hook** - 처음 2초에 시선 잡기
- [ ] **Pattern Interrupt** - 5-7초에 변화 주기
- [ ] **CTA** - 마지막에 행동 유도
- [ ] **Resolution** - 1920x1080 (YouTube) 또는 1080x1920 (Instagram/TikTok)
- [ ] **FPS** - 30fps (일반) 또는 60fps (부드러운 움직임 필요 시)

---

## 4. 즉시 활용 가능한 템플릿

### Template 1: Product Launch Video (30초)

```
use remotion best practices. Create a 1920x1080, 30fps, 30-second product launch
video for {PRODUCT_NAME} with a dark premium theme.

Color Palette: #0c0a09 (bg), #1c1917 (surface), #292524 (border),
{ACCENT_COLOR} (accent), #fafaf9 (text), #a8a29e (muted)
Fonts: Inter (UI), JetBrains Mono (code), Georgia (branding)

Scene 1 (Hook, 3s):
Black background. Large bold text "{HOOK_TEXT}" fades in word-by-word
with spring animation. Hold for 1s, then blur out.

Scene 2 (Logo Reveal, 4s):
{PRODUCT_NAME} logo slides in from bottom with spring bounce.
Subtitle "{TAGLINE}" fades in below. Add floating particles in background.
Play whoosh sound effect from remotion.media.

Scene 3 (Feature Showcase, 12s):
Show 4 feature cards in a 2x2 grid. Each card slides in with staggered
delay (0.3s apart). Each card has: icon, title, one-line description.
Add subtle glow effect on accent-colored icons.

Scene 4 (Demo, 6s):
Show app screenshot/mockup with 3D perspective (rotateX: 10deg).
Slowly zoom in while panning right. Add glassmorphism overlay panel
showing key stats with counter animations.

Scene 5 (Social Proof, 2s):
Counter animating up to "{USER_COUNT}+" with label "Happy Users".
Spring-animated entrance.

Scene 6 (CTA, 3s):
"{CTA_TEXT}" in large text. URL "{WEBSITE}" below.
Pulsing accent-colored button. Fade to black.

Transitions: Use @remotion/transitions with spring-based fade+scale.
Audio: Background music at 35% volume with 1s fade-in and 2s fade-out.
Add whoosh/switch sound effects from remotion.media on scene transitions.
```

### Template 2: Data Visualization Video (15초)

```
use remotion best practices. Create a 1920x1080, 30fps, 15-second data
visualization video with dark theme (#1A1A2E).

Font: Inter for labels, JetBrains Mono for numbers.

Scene 1 (Title, 3s):
"{TITLE}" fades in with spring animation.
Subtitle: "{SUBTITLE}" appears below with 0.5s delay.
Subtle grid background fades in.

Scene 2 (Chart Animation, 9s):
{CHART_TYPE} chart with the following data: {DATA}.
- Bars grow upward from baseline with staggered timing (0.1s apart)
- Each bar has gradient fill from {COLOR_1} to {COLOR_2}
- Add glow effect (feGaussianBlur) on bar tops
- Axis labels slide in from left/bottom
- If line overlay: draw progressively with stroke-dasharray
- Add pulsing dot marker at the current data point
- Display value labels above each bar with spring pop-in

Scene 3 (Insight, 3s):
Highlight the key insight: "{INSIGHT_TEXT}"
Accent-colored box draws around the relevant data point.
Text appears with word-by-word animation.

Spring-based timing throughout. 120 frames minimum for smooth animation.
```

### Template 3: Cinematic Brand Intro (10초)

```
use remotion best practices. Create a 1920x1080, 60fps, 10-second
cinematic brand intro for {BRAND_NAME}.

Visual Style: {STYLE} (options: Cyberpunk, Minimal, Aurora Glassmorphism,
Corporate Luxury)

Scene 1 (Setup, 2s):
Background: radial gradient from {COLOR_1} to {COLOR_2} with subtle
noise texture. Add 3D floating geometric shapes (triangles, hexagons)
with depth-of-field blur. Shapes have breathing idle animation.

Scene 2 (Build, 4s):
{BRAND_NAME} text assembles via {METHOD}:
Option A: Pixel blocks light up one-by-one as colored cursors pass
Option B: Geometric shapes morph into letters (use flubber library)
Option C: Text scales from 3x to 1x with dramatic pop-in
Add ghost-trail effect during motion. Play "ding" from remotion.media.

Scene 3 (Logo, 2s):
Logo flies in from left with spring animation (damping: 14).
Snaps into place and performs 360-degree rotation.
Rotating dashed tech rings appear behind logo.

Scene 4 (Exit, 2s):
Cinematic wipe transition: logo slides across screen,
elements vanish (scale down + fade) as logo passes over them.
Final: subtle light leak overlay. Fade to black.

Use @remotion/light-leaks for scene transitions.
All animations use spring physics (no linear easing).
```

### Template 4: Instagram Story / Reels (9:16)

```
use remotion best practices. Create a 1080x1920, 30fps, 15-second
vertical video optimized for Instagram Stories/Reels.

IMPORTANT: Use large font sizes (minimum 48px body, 72px headers)
for mobile legibility.

Color Palette: {PALETTE}
Font: {FONT} (bold weights only for mobile readability)

Scene 1 (Hook, 2s):
Full-screen {ACCENT_COLOR} background.
"{HOOK_TEXT}" in white, 96px bold, centered.
Slam-in animation (scale from 1.5x with spring damping: 10).

Scene 2 (Content, 8s):
{CONTENT_DESCRIPTION}
Use vertical stacking layout. Each element slides in from right
with staggered 0.2s delays. Add progress indicator dots at top.

Scene 3 (CTA, 3s):
"{CTA_TEXT}" with pulsing animation.
Swipe-up indicator arrow bouncing at bottom.
@handle or URL in smaller text below.

Scene 4 (Loop Point, 2s):
Transition seamlessly back to Scene 1's visual style
for Instagram loop behavior.

Audio: Upbeat track at 40% volume, 0.5s fade-in, 1s fade-out.
Format: Export as MP4 (H.264) for maximum compatibility.
```

### Template 5: Technical/Engineering Visualization (20초)

```
use remotion best practices. Create a 1920x1080, 30fps, 20-second
technical visualization for {SYSTEM_NAME}.

Theme: Dark (#0b1120), Font: Courier New (data), Inter (labels)

Phase 1 - IDLE (0-4s):
Display {COMPONENT_COUNT} components in a row/grid layout.
Each shows: label, current value (3 decimal places), status indicator.
Color-coded fill levels: green (high), orange (medium), red (low).
Subtle grid background. Components fade in with staggered timing.

Phase 2 - MEASURING (4-6s):
Status indicator changes to yellow pulsing dot.
Scanning animation sweeps across components left to right.
Values begin to fluctuate slightly.

Phase 3 - PROCESSING (6-16s):
Status changes to green pulsing dot.
Values converge via smoothstep interpolation toward target.
Active components show: colored border + directional arrow.
Particle animation for energy/data flow between components.
Shimmer effect on fill levels during processing.

Phase 4 - COMPLETE (16-20s):
Status changes to blue steady dot. All values equalized.
Info panel slides up from bottom with spring animation showing:
summary metrics in a horizontal row.
Legend appears: explaining color codes and symbols.

All value changes use smoothstep interpolation.
UI panels use spring animations (damping: 200).
```

---

## 5. 핵심 라이브러리 매핑

| After Effects 기능 | Remotion 대응 |
|---------------------|---------------|
| Keyframe Animation | `interpolate()` + `spring()` |
| Easing Functions | `Easing.bezier()`, `Easing.inOut()` |
| 3D Camera | React Three Fiber + `useFrame()` |
| Particle System | Canvas API 또는 Three.js Points |
| Shape Morphing | `flubber` 라이브러리 |
| Glow/Bloom | CSS `filter: drop-shadow()` 또는 SVG `feGaussianBlur` |
| Light Leaks | `@remotion/light-leaks` |
| Color Grading | CSS `filter: hue-rotate() saturate() contrast()` |
| Film Grain | CSS noise texture overlay (opacity 5-10%) |
| Lower Third | CSS absolute positioning + slide animation |
| Mask/Matte | CSS `clip-path` 또는 SVG `<clipPath>` |
| Audio Reactivity | `useAudioData()` + `visualizeAudio()` |
| Transparent Export | ProRes 4444 (`--codec prores --prores-profile 4444`) |
| Motion Blur | CSS `filter: blur()` on moving elements |
| Track Matte | CSS `mix-blend-mode` + `mask-image` |
| Expressions | React state + `useCurrentFrame()` |

---

## 6. 프롬프트 최적화 팁

### DO (효과적)
1. **"use remotion best practices"** 로 시작 - 스킬 규칙 자동 로드
2. **해상도/FPS/길이** 명시 - `1920x1080, 30fps, 20s`
3. **정확한 색상 코드** 제공 - `#0c0a09` (hex 값)
4. **초 단위 타임라인** 작성 - `Scene 1 (0-3s): ...`
5. **애니메이션 방식** 지정 - `spring (damping: 14)`, `ease-out`
6. **참조 URL** 제공 - 로고, 데이터, 스타일 가이드
7. **반복 개선** 활용 - 한 번에 완벽하려 하지 말고 대화로 다듬기

### DON'T (비효과적)
1. "멋진 영상 만들어줘" - 너무 모호함
2. 색상/폰트 미지정 - 일관성 없는 결과물
3. 타이밍 미지정 - AI가 임의로 결정
4. 한 프롬프트에 모든 것 - 장면별로 나누기
5. After Effects 용어 직접 사용 - Remotion 대응 개념으로 변환

---

## 7. 수집된 프롬프트 원문 인덱스

| # | 제목 | 제작자 | 도구 | 핵심 테크닉 |
|---|------|--------|------|-------------|
| 1 | News Article Headline Highlight | @Remotion | Claude Code | OCR, 3D 회전, rough.js 형광펜 |
| 2 | Travel Route on Map with 3D Landmarks | @JNYBGR | Claude Code | 지도, 경로 애니메이션, 3D 랜드마크 |
| 3 | Product Demo for Presscut | @Shpigford | Claude Code | React UI 복제, 인터랙티브 데모 |
| 4 | Launch Video on X | @ghumare64 | Claude Code | 8장면 구조, 타이핑, 3D, 파티클 |
| 5 | Transparent CTA Overlay | @Remotion | Claude Code | YouTube 스크래핑, Lower Third, ProRes |
| 6 | Rocket Launches Timeline | @crispynotfound | - | 궤적 애니메이션, 미니멀 |
| 7 | Three.js Top 20 Games | @DilumSanjaya | Claude Code | React Three Fiber, 3D 막대 |
| 8 | Cinematic Tech Intro | @tiw_ari_ayu | Gemini | 팝인, 글리치, 글라스모피즘, 파티클 |
| 9 | Bar + Line Chart | samohovets | OpenCode | 복합 차트, 글로우, 스프링 |
| 10 | Promotion Video for VVTerm | @wiedymi | Claude Code | Apple 스타일, 미니멀 프로모 |
| 11 | Shape to Words Transformation | @tiw_ari_ayu | Gemini | flubber 모핑, 잔상, 와이프 |
| 12 | Music CD Store Promo | samohovets | OpenCode | 오디오 반응, 그라데이션, 카운터 |
| 13 | Cursor Agent Skills Announcement | @edwinarbus | Cursor | 타이프라이터, 줌, 브랜드 룰 |
| 14 | Strava Run Visualized | @JNYBGR | Claude Code | GPX 파싱, 지도, 라이브 메트릭 |
| 15 | Real Estate Investing | HarisShah2345 | Claude Code | 7단계 시네마틱 파이프라인 |
| 16 | Spinning Glitching SVG Logo | @Remotion | Claude Code | 3D SVG, 금속 질감, 반복 개선 |
| 17 | 3D Retro Pixel Font | @GogHeng | Claude Code | 픽셀 블록, 멀티 커서, 3D 엠보싱 |
| 18 | History Bar/Line Chart | Shiam56 | - | 이중 축 차트, 글로우, 스프링 |
| 19 | The Kinetic Marketing | @tiw_ari_ayu | Gemini | 키네틱 타이포, 아이리스 와이프, 140BPM |
| 20 | Audio Spectrum Visualizer | samohovets | OpenCode | 주파수 스펙트럼, 글로우, 반사 |
| 21 | BMS Cell Balancing | pasrom | Claude Code | 상태 기반 위상, 파티클, smoothstep |
