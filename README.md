# 🚀퀵스타터 프로젝트 (Next.js)

> 사이드 프로젝트를 빠르게 시작하기 위해 초기 세팅을 미리 구성한 보일러플레이트입니다.

## 👀이런 분들께 추천합니다

- 매번 초기 ESLint / Prettier / import 설정이 번거로운 분
- 사이드 프로젝트를 빠르게 시작하고 싶은 분
- 팀 작업을 염두에 두고 포맷팅이나 import 순서로 인한 의미 없는 diff를 줄이고 싶은 분

## 🚀Quick Start

- 이 프로젝트는 `pnpm`을 패키지 매니저로 사용합니다.
- 설치되어 있지 않다면 아래 명령어로 설치해주세요.
- 개발 모드와 빌드 모드 모두 Webpack 기반으로 동작하도록 설정되어 있습니다.

```bash
npm install -g pnpm
```

```bash
pnpm install
pnpm dev
```

## 🏗️기술 스택

- Next.js 16 (App Router)
- TypeScript
- pnpm

## 🚧설치된 패키지 목록

```bash
pnpm add -D \
  prettier \                           # 스타일 통일을 위한 코드 포맷팅
  eslint-config-prettier \             # ESLint 규칙과 충돌 방지
  eslint-plugin-prettier \             # Prettier 포맷 위반을 ESLint 에러로 처리
  eslint-import-resolver-typescript \  # TypeScript 경로 인식을 위한 리졸버
  eslint-plugin-simple-import-sort \   # import 순서 저장 시 자동 정렬
  @svgr/webpack \                      # svg 파일 컴포넌트화
```

## ⚙️설정 내역

- Next.js App Router 기반입니다.
- 기본적으로 Next.js에서 제공하는 설정을 따라갑니다.

### 1️⃣ Prettier

- 기본 설정은 아래와 같습니다.

```javascript
{
  "tabWidth": 2,           // 들여쓰기 시 탭을 공백 2칸으로 설정
  "useTabs": false,        // 탭 대신 스페이스 사용
  "semi": true,            // 문장 끝에 세미콜론(;) 추가
  "singleQuote": true,     // 문자열에 작은따옴표(') 사용
  "jsxSingleQuote": true,  // JSX에서도 작은따옴표 사용
  "trailingComma": "es5",  // ES5에서 허용되는 위치에 후행 쉼표 추가
  "printWidth": 80,        // 한 줄 최대 길이 80자
  "endOfLine": "auto"      // OS에 맞게 개행 문자 자동 처리
}
```

#### prettier-plugin-tailwindcss

- `tailwindcss` 사용시 속성 순서에 맞게 정렬해주는 플러그인
  - 아래 코드를 `.prettierrc`에 추가해주세요

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 2️⃣ Import order

- 의미 없는 diff 방지를 위해 import 순서를 통일하도록 설정하였습니다.
- `eslint-plugin-simple-import-sort`
  - **저장 시 자동으로 정렬**됩니다.
  - import 정렬 순서는 다음과 같이 정의하였습니다.

    ```javascript
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. Side effect imports (e.g. import './style.css')
          ['^\\u0000'],
          // 2. React, Next 관련 패키지
          ['^react', '^next'],
          // 3. 외부 라이브러리 (node_modules)
          ['^@?\\w'],
          // 4. 내부 Alias 경로 (@/ components, hooks 등)
          ['^@/'],
          // 5. 부모/형제 경로 (../, ./)
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=[^/]*/*$)', '^\\./?$'],
          // 6. 스타일 및 리소스 파일
          ['^.+\\.?(css|scss|sass|less)$'],
          // 7. SVG 파일 (쿼리 스트링 포함 허용)
          ['^.+\\.svg(\\?.*)?$'],
        ],
      },
    ],
    ```

  - 추가로 커스텀을 하고 싶다면 [공식문서](https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#custom-grouping)를 참조해주세요.

- `eslint-plugin-import`
  - **올바른 경로인지, 중복된 import가 없는지 등을 검사**합니다.
  - 해당 패키지로 import order까지 정의하는 것은 자동 정렬을 해주는 다른 패키지와 충돌될 수 있어 권장하지 않습니다.
- 저장 시 import 자동 정렬이 동작하지 않는다면, `.vscode/settings.json`에 아래의 코드를 추가해주세요. 그리고 `ctrl` + `shift` + `p`를 통해 `Restart ESLint Server`로 서버를 재시작 해주세요.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "eslint.useFlatConfig": true
}
```

### 3️⃣ ESLint

- Flat Config 기반(`eslint.config.mjs`)으로 구성되어 있습니다.
- 저장 시 ESLint + Prettier가 함께 동작하도록 설정되어 있습니다.

#### 주요 정책

- 사용하지 않는 변수
  - `_`로 시작하지 않는 변수는 경고(warn)
  - 사용하지 않는 import 또한 경고(warn)로 처리되며 자동으로 삭제되지는 않습니다.
    - 임시로 코드를 주석 처리하는 경우도 있기 때문에 자동 삭제는 설정하지 않았습니다.
    - 대신, 필요하다면 CI 단계에서 에러로 처리하도록 확장할 수 있습니다.
- import 관련
  - 저장 시 import 순서가 자동 정렬됩니다.
  - 모듈 간 순환 참조는 경고(warn)로 표시됩니다.
- 코드 스타일
  - Prettier 규칙을 ESLint 에러로 처리합니다.

> 자세한 설정 내용은 `eslint.config.mjs` 파일을 참고해주세요.

### 4️⃣ 외부 Image 설정

- 외부 이미지 사용시 `next.config.ts`에서 image 프로퍼티를 활성화 시켜주세요.
- 외부 URL에 맞춰 수정 후 사용해주세요.

### 5️⃣ Font

- 대부분 로컬 폰트를 사용하는 경우가 많기 때문에 미리 설정을 해두었습니다.
- 필요시 해당 파일에서 주석을 해제하여 활성화 시켜주세요.
  - `/src/app/fonts.ts`
  - `/src/app/layout.ts`
- 설정되어 있는 예시중 `fontName`은 사용하는 폰트 패밀리의 이름에 맞게 변경해주세요.

### 6️⃣ SVGR

- SVGR 사용시 해당 파일에서 주석을 해제하여 활성화 시켜주세요.
  - `/svg.d.ts`
  - `/next.config.ts`
