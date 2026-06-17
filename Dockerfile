# 1. 베이스 이미지 - Node.js 20 Alpine (가벼운 버전)
FROM node:20-alpine

# 2. 컨테이너 안에서 작업할 디렉토리 설정
WORKDIR /app

# 3. 패키지 파일 먼저 복사 (캐시 활용)
COPY package*.json ./

# 4. 패키지 설치
RUN npm install

# 5. 소스코드 전체 복사
COPY . .

# 6. TypeScript 빌드
RUN npm run build

# 7. 3000번 포트 오픈
EXPOSE 3000

# 8. 앱 실행
CMD ["node", "dist/main.js"]