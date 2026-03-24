import { Config } from "@remotion/cli/config";

Config.setPort(4000);

// Rspack 번들러 (실험적 - fs 모듈 호환성 이슈로 비활성화)
// Config.setExperimentalRspackEnabled(true);

// 클라이언트 사이드 렌더링 (실험적 - Studio 포트 바인딩 이슈로 비활성화)
// Config.setExperimentalClientSideRenderingEnabled(true);
