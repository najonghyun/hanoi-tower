module.exports = {
  publicPath: "./", // 상대 경로로 설정
  outputDir: "dist", // 빌드 결과물이 생성될 폴더
  assetsDir: "assets", // 정적 파일(js, css 등) 저장 경로
  devServer: {
    port: 8080, // 개발 서버 포트
    open: true, // 서버 실행 시 브라우저 자동 열기
  },
};
