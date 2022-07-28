<h1 align="middle">GitHub-Graph</h1>
<p align="middle">GitHub 유저의 정보를 그래프 뷰로 제공하는 애플리케이션 🌐</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-yellow?style=flat-square" alt="template version"/>
  <a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>
<div align="middle">
  <img width="850" alt="graph" src="https://user-images.githubusercontent.com/21965795/181421405-4e9bee6b-64a7-4123-8641-0f4a98a044bd.png"/>
</div>

<br/>

## 🔥 소개 ( Demo ) 

**GitHub-Graph는 검색한 GitHub 유저의 정보를 리스트와 그래프 뷰로 확인할 수 있는 기능을 제공하는 애플리케이션입니다.**

이 프로젝트는 제가 현재 사용하고 있는 메모앱인 [Obsidian](https://obsidian.md/)의 그래프 뷰를 인상 깊게 느껴서 이를 적용해 볼 아이템을 고민해보다가 GitHub 유저의 정보에 적용하면 사용자에게 새로움과 유용함을 제공할 수 있을 것 같아서 시작하게 된 프로젝트입니다. 초기에는 GitHub에서 제공하는 REST API를 사용해서 구현하다가 Over-Fetching 문제를 겪어보고 너무 비효율적이라고 생각해서 GraphQL을 사용하는 것으로 변경했습니다. 하지만 GraphQL 사용이 처음이다보니 전반적인 동작 방식을 익힐 필요가 있다고 판단했습니다. 그래서 공식 문서과 간단한 강의를 참고해서 [영화 애플리케이션](https://github.com/Leo-Xee/graphql-movie-app)을 구현해본 뒤 프로젝트를 다시 진행했습니다. 또한 API의 타입 선언의 자동화를 위해서 [GraphQL Code Generateor](https://www.graphql-code-generator.com/)를 사용했으며 이를 통해 생성된 API 타입 선언 파일(`generated.ts`)은 큰 용량 때문에 Git에 포함하지는 않았습니다.

<br/>

## 🚀 실행 방법

### 프로젝트 클론 및 의존성 설치

```bash
$ git clone https://github.com/Leo-Xee/github-graph.git
```

```bash
$ npm install
# or 
$ yarn install
```

### GitHub API Token 생성 및 적용

GitHub API를 사용하기 위해서 [GitHub API Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)를 참고해서 Personal Token을 생성합니다. **다만 아래의 항목을 필수로 체크해야합니다.**
- `repo`
- `admin:repo_hook`
- `user`
- `project`

Personal Token 생성을 완료했다면 루트 위치에 `.env.example`을 참고해서 `.env`를 생성하고 Token값을 할당합니다.

### GraphQL Code Generator 실행

현재 API 타입 정보가 프로젝트에 존재하지 않기 때문에 다음 명령어로 생성하면 타입 정보를 가진 `src/graphql/generated.ts` 가 생성됩니다.

```bash
$ npm run generate
# or 
$ yarn generate
```

### 프로젝트 실행

```bash
$ npm run dev
# or 
$ yarn dev
```

<br/>

## 📚 기술 스택

| Typescript | React.js |  Emotion   |  GraphQL   | 
| :--------: | :--------: | :------: | :-----: |
|  <img src="https://user-images.githubusercontent.com/21965795/174472604-4e0c144f-4500-4cc6-80b7-3dd29c907171.png" width="100px"/> |  <img src="https://user-images.githubusercontent.com/21965795/176630651-1248191d-432c-45ac-b876-9e5ff54e36f9.png" width="100px" > | <img src="https://user-images.githubusercontent.com/21965795/174472822-309713cb-6730-453c-8bd2-ea071c1176ec.png" width="100px"/>  | <img src="https://user-images.githubusercontent.com/21965795/181214974-dd227adb-ec4d-4289-8ec7-14bd5ac4e6ed.png" width="100px"/>|

 | Apollo-Client | D3.js | Zustand |
 | :-----: | :-----: | :-----: |
 | <img src="https://user-images.githubusercontent.com/21965795/181214962-6fefb210-5f2f-4040-be9c-d4cba3391b7b.png" width="100px"/>|<img src="https://user-images.githubusercontent.com/21965795/181407685-e19c697e-dade-4cbf-8d8f-a0028b188c6e.png" width="100px"/>|<img src="https://user-images.githubusercontent.com/21965795/181411960-a0b2bb8f-425a-4065-a1cb-c0d0152df8f8.png" width="100px"/>|


<br/>

## 🌲 디렉터리 구조

```bash
.
├── public
└── src
    ├── assets      // 정적 파일
    ├── components
    │   └── common  // 공통 컴포넌트
    ├── graphql     // graphQL 쿼리
    ├── hooks       // 커스텀 Hooks
    ├── pages       // Page 컴포넌트 
    ├── shared
    │   └── utils   // 유틸 함수
    ├── styles      
    └── types       // 타입
```
<br/>

## ⚙️ 주요 내용

### ✅ Github 유저 검색어 추천 및 자동완성

### ✅ Tab 별 리스트 뷰와 무한스크롤

### ✅ D3-Force를 사용한 그래프 뷰

### ✅ 다크모드

<br/>

## ⁉️ 트러블 슈팅

### 검색에 디바운스 적용 문제

useCallback을 사용하지 않으면 동일한 함수로 인식하지 못해서 정상 동작하지 않았다.

### Graphql 유니온타입을 map 돌릴 때 타입 문제

Graphql을 처음 사용하는지라 inline Fragment에 대해서 이해 하지 못해서 로드한 데이터를 map을 돌리는데 의도와 달리 정상적으로 데이터를 뿌려주지 못했다.

### 라우터의 필요성

초기에는 라우터의 필요성을 느끼지 못했는데 검색된 유저를 주소로 접근할 떄 용이할 것 같아서 라우터를 추가하기로 했다. 추가로 상위 컴포넌트에서 관리해야할 username과 같은 state를 url의 파라미터로 관리할 수 있다는 점도 이점이 되는 것 같다.

### 클라이언트 상태관리의 필요성

Board 컴포넌트 내부에서 Tab의 상태를 관리해야하는데 이 상태에 기반한 데이터 패팅을 Graph 컴포넌트에서도 필요함으로 공통된 부모 컴포넌트인 App에서 Tab의 상태를 관리해야했다. 그러면 Props Drilling으로 인해 로직이 복잡해질 것 같아 클라이언트 상태관리 라이브러리의 필요성을 느끼게 되었고 사용을 결정했다. 현재 상황에서는 하드하게 사용하지는 않을 것이기 때문에 RTK, Recoil, zustand를 후보를 두고 비교했는데 용량면에서 zustand로 채택했다.

### 검색한 유저의 정보를 언제 얼마나 로드할 것인가?

검색한 유저의 정보(following, followers, repos, star)를 검색 시에 한번에 로드해야하는지 탭 별로 로드해야할 지 고민이 있었다. 정보별로 각각의 리스트 컴포넌트를 만들기에는 반복적인 코드가 많을 것 같아서 List 컴포넌트 내에서 구분해서 처리해주기로했다. 하지만 작성하고 보니 코드 가독성이 매우 떨어져서 코드의 반복이 조금 되더라도 나누는 것이 나은것 같다고 느꼈다. 그래서 UserList(FollowingList, FollowerList)로 나누었다. 가독성과 반복 제거는 트레이드오프 관계 인 것 같은데 적절한 균형을 잘 잡아야겠다고 느꼈다.

### Graphql 무한스크롤

페이지네이션 전략에는 크게 2가지가 있다. offset 기반과 커서 기반이다. 무한 스크롤에 유용한 커서 기반으로 사용하기로 결정했다. 유저의 followings, followers, repos, stars 의 리스트를 각각 페이지네이션 및 캐시 관리를 해야하는데 이걸 어떻게 따로 구분해서 관리할지가 고민이였다.

### 새로고침 시에 Search 컴포넌트의 input의 값이 바로 보여지지 않는 문제

검색 된 유저의 URL로 바로 접근하거나 새로고침 하는 경우에 search 컴포넌트의 input의 값이 바로 뜨지 않는 문제가 생겼었다. input의 값의 경우에는 URL의 파라미터를 useParams로 가져와서 useEffect 내에서 넣어주는 방식이였는데 이는 렌더링 된 직 후에 실행되기 때문에 잠시 값이 아닌 placeHolder가 보여졌다가 다시 값이 보여지는 현상이 생겼던 것이다. 이를 해결하기 위해서 렌더링 이전에 실행되는 useLayoutEffect를 사용하니 더이상 플리커현상이 일어나지않고 바로 값이 보여졌다.

### D3 force의 동작방식

- 기본 동작 방식
- 타입 정하기
- rect 안에 text 넣기
- 이미지 넣기
