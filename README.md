# TypeScript + Prisma + MySQL + Express API 서버

TypeScript, Express.js, Prisma, MySQL로 구축된 RESTful API 서버입니다. 웹 애플리케이션을 구축하기 위한 기반을 제공합니다.

## 주요 기능

*   **CRUD 연산:** 사용자에 대한 생성, 읽기, 업데이트 및 삭제(CRUD) 작업을 완벽하게 지원합니다.
*   **인증:** JSON 웹 토큰(JWT)을 사용한 안전한 사용자 인증.
*   **데이터베이스 관리:** Prisma를 통한 간소화된 데이터베이스 액세스 및 마이그레이션.
*   **API 문서:** 명확하고 상호작용적인 API 문서를 위해 Swagger가 사전 구성되어 있습니다.
*   **컨테이너화:** Docker 및 Docker Compose를 사용하여 컨테이너화된 환경에서 실행할 수 있습니다.
*   **개발 환경:** 자동 서버 재시작을 위해 `nodemon`을 사용한 개발 환경이 포함되어 있습니다.
*   **린팅 및 포맷팅:** ESLint 및 Prettier를 사용하여 코드 품질을 유지합니다.

## 기술 스택

*   **백엔드:** Node.js, Express.js
*   **데이터베이스:** MySQL
*   **ORM:** Prisma
*   **언어:** TypeScript
*   **API 문서:** Swagger
*   **인증:** JWT (jsonwebtoken)
*   **컨테이너화:** Docker, Docker Compose
*   **배포:** PM2
*   **테스팅:** Jest, Supertest

## 시작하기

### 사전 요구 사항

*   [Node.js](https://nodejs.org/en/)
*   [Docker](https://www.docker.com/)
*   [Docker Compose](https://docs.docker.com/compose/)

### 설치 및 실행

1.  **저장소 복제:**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2.  **의존성 설치:**

    ```bash
    npm install
    ```

3.  **환경 변수 설정:**

    루트 디렉토리에 `.env` 파일을 만들고 다음 변수를 추가합니다:

    ```
    DATABASE_URL="mysql://root:password@localhost:3306/dev"
    ```

4.  **Docker Compose로 실행:**

    ```bash
    docker-compose up -d
    ```

    이렇게 하면 애플리케이션, MySQL 데이터베이스 및 Nginx 프록시가 시작됩니다. 애플리케이션은 `http://localhost`에서 액세스할 수 있습니다.

## API 엔드포인트

API 문서는 애플리케이션이 실행되면 `http://localhost/api-docs`에서 확인할 수 있습니다.

`swagger.yaml`에 정의된 엔드포인트는 다음과 같습니다:

*   **Users**
    *   `GET /users`: 모든 사용자 조회
    *   `POST /users`: 새 사용자 생성
    *   `GET /users/{id}`: ID로 사용자 조회
    *   `PUT /users/{id}`: ID로 사용자 정보 업데이트
    *   `DELETE /users/{id}`: ID로 사용자 삭제

## 스크립트

*   `npm start`: 프로덕션 서버 시작
*   `npm run dev`: `nodemon`으로 개발 서버 시작
*   `npm run build`: TypeScript를 JavaScript로 컴파일
*   `npm test`: 테스트 실행
*   `npm run lint`: 코드 린팅
*   `npm run prisma:migrate`: 데이터베이스 마이그레이션 실행
*   `npm run deploy:prod`: PM2를 사용하여 프로덕션 모드로 애플리케이션 배포
*   `npm run deploy:dev`: PM2를 사용하여 개발 모드로 애플리케이션 배포

## 프로젝트 구조

```
.
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── controllers/
│   ├── dtos/
│   ├── exceptions/
│   ├── interfaces/
│   ├── middlewares/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── test/
│   └── utils/
├── .dockerignore
├── .editorconfig
├── .eslintrc
├── .gitignore
├── docker-compose.yml
├── Dockerfile.dev
├── Dockerfile.prod
├── jest.config.js
├── nginx.conf
├── package.json
├── swagger.yaml
└── tsconfig.json
```

## TODO

*   [ ] **환경 변수 상세 설정:** `config` 디렉토리와 `envalid`를 사용한 환경 변수 유효성 검사에 대한 자세한 설명을 추가합니다.
*   [ ] **테스트 작성 및 실행:** `*.test.ts` 파일을 작성하고 `npm test`를 실행하여 테스트하는 방법에 대한 상세한 가이드를 추가합니다.
*   [ ] **배포 프로세스:** `Dockerfile.prod`와 `ecosystem.config.js`를 사용한 프로덕션 배포 방법에 대한 자세한 설명을 추가합니다.
*   [ ] **로깅:** `utils/logger.ts`의 `winston` 로거를 설정하고 사용하는 방법에 대한 설명을 추가합니다.
*   [ ] **CI/CD 파이프라인:** GitHub Actions 또는 Jenkins와 같은 도구를 사용하여 CI/CD 파이프라인을 구축하는 방법에 대한 가이드를 추가합니다.
