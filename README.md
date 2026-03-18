# Remotion Video Studio

프로젝트 소개 영상을 React 코드로 생성하는 공용 Remotion 프로젝트입니다.

## 설치

```bash
cd ~/dev/remotion
npm install
```

### Linux/WSL2 의존성 (필수)

Remotion은 Chrome Headless Shell을 사용하므로 시스템 라이브러리가 필요합니다.

**Ubuntu 24.04 (WSL2 포함):**
```bash
sudo apt-get install -y libnss3 libdbus-1-3 libatk1.0-0t64 libasound2t64 \
  libxrandr2 libxkbcommon0 libxfixes3 libxcomposite1 libxdamage1 libgbm-dev \
  libcups2t64 libcairo2 libpango-1.0-0 libatk-bridge2.0-0t64
```

**Ubuntu 22.04 이하:**
```bash
sudo apt-get install -y libnss3 libdbus-1-3 libatk1.0-0 libasound2 \
  libxrandr2 libxkbcommon0 libxfixes3 libxcomposite1 libxdamage1 libgbm-dev \
  libcups2 libcairo2 libpango-1.0-0 libatk-bridge2.0-0
```

> Ubuntu 24.04에서는 일부 패키지명에 `t64` 접미사가 붙습니다.
> `libasound2` → `libasound2t64`, `libcups2` → `libcups2t64` 등

## 사용법

### Studio 실행 (프리뷰)

```bash
npx remotion studio src/index.tsx
```

**WSL2에서 실행 시:**
```bash
npx remotion studio src/index.tsx --ipv4 --no-open --port 4000
```
Windows 브라우저에서 `http://localhost:4000` 접속

> WSL2는 기본적으로 IPv6로 바인딩되어 Windows 브라우저에서 접근이 안 됩니다.
> `--ipv4` 옵션이 필수입니다.

### 영상 렌더링 (MP4 생성)

```bash
npx remotion render src/index.tsx FlowryIntro out/flowry-intro.mp4
```

### ffmpeg 설치 (렌더링 시 필요)

```bash
# Ubuntu
sudo apt-get install -y ffmpeg

# 또는 static binary (sudo 불가 시)
wget -q https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -O /tmp/ffmpeg.tar.xz
tar -xf /tmp/ffmpeg.tar.xz -C /tmp
cp /tmp/ffmpeg-*-amd64-static/ffmpeg ~/.local/bin/
cp /tmp/ffmpeg-*-amd64-static/ffprobe ~/.local/bin/
```

## 프로젝트 구조

```
remotion/
├── src/
│   ├── index.tsx              ← 진입점 (Composition 등록)
│   └── flowry/
│       └── FlowryIntro.tsx    ← Flowry 소개 영상 (5개 씬)
├── out/                       ← 렌더링 결과물
├── tsconfig.json
├── package.json
└── README.md
```

## Flowry 소개 영상 구성

| 씬 | 시간 | 내용 |
|---|---|---|
| Hero | 0~4초 | 로고 + 서브타이틀 애니메이션 |
| Features | 4~8초 | 6개 기능 카드 순차 등장 |
| Workflow | 8~13초 | 요구사항→완료 흐름 애니메이션 |
| Tech Stack | 13~16초 | 기술 스택 pill 순차 등장 |
| Outro | 16~20초 | CTA + GitHub URL |

**해상도:** 1920x1080 (Full HD)
**프레임레이트:** 30fps
**총 길이:** 20초 (600 프레임)

## 새 영상 추가 방법

1. `src/` 아래에 폴더 생성 (예: `src/qure/`)
2. React 컴포넌트로 씬 작성
3. `src/index.tsx`에 Composition 등록:

```tsx
<Composition
  id="QureIntro"
  component={QureIntro}
  durationInFrames={600}
  fps={30}
  width={1920}
  height={1080}
/>
```

4. Studio에서 프리뷰 확인
5. `npx remotion render src/index.tsx QureIntro out/qure-intro.mp4`

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| `libnspr4.so: cannot open` | Linux 의존성 미설치 | 위 apt-get 명령어 실행 |
| WSL2에서 브라우저 접속 불가 | IPv6 바인딩 | `--ipv4` 옵션 추가 |
| `ERR_CONNECTION_REFUSED` | 포트 미스매치 | `ss -tlnp`로 실제 포트 확인 |
| `Cannot GET /` | 잘못된 URL | Studio URL 확인 (보통 `/`) |
| 렌더링 시 ffmpeg 에러 | ffmpeg 미설치 | ffmpeg 설치 |
