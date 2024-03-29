<h1 align="middle">GitHub-Graph</h1>
<p align="middle">GitHub 유저의 정보를 그래프 뷰로 제공하는 애플리케이션 🌐</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-yellow?style=flat-square" alt="template version"/>
  <a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>
<div align="middle">
  <img width="1678" alt="github-graph" src="https://user-images.githubusercontent.com/21965795/181521149-6b03fc2e-3f2f-4755-a620-9d352b63b379.png">
</div>

<br/>

## 🔥 소개 ( [Demo](https://github-graph.vercel.app/) )

**GitHub Graph는 GitHub API를 활용해서 검색한 GitHub 유저의 정보를 리스트와 그래프 뷰로 확인할 수 있는 애플리케이션입니다.**

이 프로젝트는 제가 현재 사용하고 있는 메모앱인 [Obsidian](https://obsidian.md/)의 그래프 뷰를 보고 인상 깊게 느껴서 이를 적용해 볼 아이템을 고민해보다가 GitHub에 적용하면 사용자에게 새로운 경험을 제공할 수 있을 것 같아서 시작하게 된 프로젝트입니다. 초기에는 GitHub에서 제공하는 REST API기반으로 구현하다가 Over-Fetching 문제를 겪어보고는 비효율적이라고 생각해서 GraphQL기반으로 변경했습니다. 하지만 GraphQL 사용이 처음이다보니 전반적인 동작 방식을 익힐 필요가 있다고 판단해서 공식 문서와 간단한 강의를 참고해서 [영화 애플리케이션](https://github.com/Leo-Xee/graphql-movie-app)을 구현해본 뒤 프로젝트를 다시 진행했습니다. 또한 API 타입 선언의 자동화를 위해서 [GraphQL Code Generateor](https://www.graphql-code-generator.com/)를 사용했으며 이를 통해 생성된 타입 선언 파일(`generated.ts`)은 큰 용량 때문에 Git에 포함하지는 않았습니다.

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

---

### 프로젝트 실행

```bash
$ npm run dev
# or
$ yarn dev
```

<br/>

## 📚 기술 스택

|                                                            Typescript                                                            |                                                             React.js                                                             |                                                             Emotion                                                              |                                                             GraphQL                                                              |
| :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/21965795/174472604-4e0c144f-4500-4cc6-80b7-3dd29c907171.png" width="100px"/> | <img src="https://user-images.githubusercontent.com/21965795/176630651-1248191d-432c-45ac-b876-9e5ff54e36f9.png" width="100px" > | <img src="https://user-images.githubusercontent.com/21965795/174472822-309713cb-6730-453c-8bd2-ea071c1176ec.png" width="100px"/> | <img src="https://user-images.githubusercontent.com/21965795/181214974-dd227adb-ec4d-4289-8ec7-14bd5ac4e6ed.png" width="100px"/> |

|                                                          Apollo-Client                                                           |                                                              D3.js                                                               |                                                             Zustand                                                              |
| :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/21965795/181214962-6fefb210-5f2f-4040-be9c-d4cba3391b7b.png" width="100px"/> | <img src="https://user-images.githubusercontent.com/21965795/181407685-e19c697e-dade-4cbf-8d8f-a0028b188c6e.png" width="100px"/> | <img src="https://user-images.githubusercontent.com/21965795/181411960-a0b2bb8f-425a-4065-a1cb-c0d0152df8f8.png" width="100px"/> |

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

### ✅ GitHub 유저 검색어 추천 및 자동완성

![search](https://user-images.githubusercontent.com/21965795/181534472-6aa1945f-b249-4905-8c9b-04425e8c3ec5.gif)

GitHub 유저 검색 시에 검색 및 로딩 아이콘이 활성화되고 최대 5개의 추천 검색어를 보여줍니다. 사용자는 추천 검색어를 클릭하거나 검색창에 입력한 아이디로 유저를 검색할 수 있습니다. 또한 추천 검색어를 위한 API 요청이 무분별하게 발생하는 문제를 방지하고자 관련 함수에 디바운스를 적용했습니다.

### ✅ Tab 별 리스트 뷰와 무한스크롤

![list](https://user-images.githubusercontent.com/21965795/181534737-0774433c-5f2f-43c8-81ed-5d4cbdfe7f91.gif)

유저 검색이 실행되면 잠시 스켈레톤 UI를 보여준 후에 검색한 유저의 기본 정보와 `Followings`, `Followers`, `Repositories`, `StarredRepositories` 리스트를 Tab 별로 구분해서 보여줍니다. 각 리스트는 초기 지연 시간을 고려해서 최초에는 20개만 보여주고 사용자가 스크롤 하다가 리스트의 중간에 도달하는 것을 `Intersection Observer`로 감지해서 그 다음 20개의 데이터를 보여주도록 무한스크롤을 구현했습니다. 그리고 리스트의 아이템을 클릭하면 해당 유저나 레포지토리 GitHub 주소로 이동하도록 했습니다.

Tab 변경 시에는 Tab 상태를 의존하고 있는 컴포넌트만 리렌더링되기를 원했기 때문에 전역 상태관리 라이브러리 중 하나인 Zustand를 사용해서 구현했습니다.

### ✅ D3.js를 사용한 그래프 뷰

![view](https://user-images.githubusercontent.com/21965795/181534925-4f10139d-bf7c-4a7e-b801-05a15245db85.gif)

[D3.js](https://d3js.org/)는 데이터를 기반으로 DOM을 조작하는 라이브러리이며 다양한 모듈을 제공합니다. 이 중에 [Force](https://github.com/d3/d3-force/tree/v3.0.0), [Selections](https://github.com/d3/d3-selection/tree/v3.0.0), [Zoom](https://github.com/d3/d3-zoom/tree/v3.0.0) 모듈을 사용해서 그래프 뷰를 구현했으며 Tab의 상태에 따라서 다른 결과를 최대 100개의 노드로 보여줍니다.

그래프 뷰의 동작은 `runForceGraph` 함수가 담당하며 다음 과정을 통해 실행됩니다.

1. 데이터 필터링

   - GitHub Graph의 그래프 뷰는 Tab의 상태에 따라 다른 결과를 보여줘야합니다. 그래서 상태별로 데이터를 필터링해서 시뮬레이션이 필요로하는 데이터 형식으로 구성하는 작업을 `FilterData` 함수에서 처리합니다.
   - 검색된 사용자 노드를 중심으로 그래프 뷰를 보여주길 원했기 때문에 `FilterData` 함수에서 검색된 유저의 정보인 `userData`를 첫 요소로 삽입합니다.

2. 시뮬레이션 생성 및 노드와 간선 등록

   - 시뮬레이션을 생성하고 필터링한 데이터를 노드(Nodes), 간선(Links)으로 등록합니다.
   - `svg` 요소 내부에 노드와 간선을 `g` 요소를 사용해서 따로 그룹화하고 노드들 중에 검색된 사용자 노드와 그 외의 노드들을 class 속성으로 구분한 뒤 서로 다른 스타일을 적용합니다.
   - 데이터가 Followings나 Followers인 경우에는 해당 유저의 Followers의 수에 따라서 다른 스타일을 지정하고 데이터가 Repositories나 StarredRepositories인 경우에는 해당 레포지토리의 Star 개수에 따라서 다른 스타일을 지정합니다.

3. Zoom 생성 및 등록

   - Zoom 기능을 추가하기 위해서 Zoom 객체를 생성하고 `svg` 요소에 이벤트를 등록합니다.
   - Zoom의 scale이 너무 커지거나 작아지면 사용성에 문제가 있기 때문에 적절한 최소값과 최대값을 설정합니다.

4. Drag 생성 및 등록

   - Drag 기능을 추가하기 위해서 Drag 객체를 생성하고 `svg` 요소에 이벤트를 등록합니다.

5. Graph 컴포넌트가 Unmount될 때, 시뮬레이션 정지 및 DOM 제거
   - D3.js는 DOM을 직접 조작하기 때문에 상태 기반으로 DOM을 조작하는 React.js에서 사용할 때에는 무조건 해당 컴포넌트가 Unmount 될 때 시뮬레이션의 계산을 정지하고 추가한 DOM 요소를 제거해줘야합니다. 그래서 관련 함수를 `runForceGraph` 함수의 반환값으로 작성했고 이를 Unmount 시에 실행합니다.

### ✅ 다크모드

![dark](https://user-images.githubusercontent.com/21965795/181535321-9efbfaba-2b02-4a17-b90b-8a7cf5d5ee9a.gif)

우측 상단의 다크모드 버튼을 클릭해서 애플리케이션의 테마를 다변경할 수 있습니다. 이를 위해서 Emotion의 테마 기능을 사용해서 테마별 변수와 스타일을 `theme.ts`에서 따로 지정했고 Zustand를 통해서 상태를 관리했습니다.

<br/>

## ⁉️ 트러블 슈팅과 고민

### 🤔 Router가 필요할까?

- 프로젝트 초기에는 페이지가 많지 않다보니 라우터의 필요성을 느끼지 못했는데 검색된 유저의 주소로 직접 접근하거나 검색된 페이지를 공유할 때 유용할 것 같아서 라우터를 사용하기로 결정했다. 그 덕분에 `username`을 URL의 파라미터로 관리할 수 있어서 중복되는 로직을 조금 줄일 수 있었던 것 같다.

### 🤔 상태관리 라이브러리가 필요할까?

- `UserDetail` 페이지 내부에서 `Search`와 `Profile` 컴포넌트 를 제외한 `Graph`, `ListContainer`, `Tab` 컴포넌트가 Tab의 상태에 따라서 변경되어야 했었다. 이를 위해서 Context API를 사용할지 상태관리 라이브러리를 사용할지 고민했는데 Tab 상태에 따라서 원하는 컴포넌트만 리렌더링하길 원했고 전역으로 관리해야할 상태가 많지 않다고 판단해서 라이브러리 후보 중 가장 가벼운 Zustand를 선택했다. 

- 물론 Context API를 사용하고 컴포넌트 최적화 작업을 해준다면 동일할 효과를 낼 수 있겠지만 그렇게까지 해서 사용해야할 이유를 찾지 못했다. 하지만 프로덕트의 스케일이 엔터프라이즈급으로 커진다면 특정 라이브러리에 대한 추가적인 의존성은 코드의 복잡도를 유발하기 때문에 Context API나 제대로된 상태관리 라이브러리를 사용하는 편이 나을 것 같다는 생각도 들었다.

### 🤔 검색한 유저 데이터와 Tab별 리스트 데이터를 언제 얼마나 패칭해야할까?

- GitHub Graph에서 사용되는 데이터의 종류는 크게 검색한 유저 데이터와 Tab 상태별 리스트 데이터로 2가지이다. 하지만 GraphQL 쿼리를 어떻게 구성해서 언제 얼마나 패칭해야할 지에 대해서 고민이 많았다. 그러다가 검색한 유저 데이터의 경우에는 유저의 기본 데이터와 followings, followers, repositories, starredRepositories의 count만 쿼리하고 `UserDetail` 페이지가 마운트될 때 패칭하는 것으로 결정했다. 그리고 Tab별 리스트 데이터는 무한스크롤로 보여줄 것이기 때문에 Tab 별로 쿼리를 구성해서 패칭하는 것으로 결정했다. 

- 하지만 `ListContainer` 컴포넌트에서 각각의 Tab 별 리스트를 보여주기 위해서 컴포넌트를 어떻게 효율적으로 분리할 수 있을지에 대한 또 다른 고민이 생겼다. 그래서 초기에는 Tab 별로 아이템의 뷰가 비슷하다고 생각되서 반복되는 코드를 줄이고자 `ListContainer` 컴포넌트에서 Tab 별 리스트를 모두 처리해주려고 했다가 코드 가독성이 매우 떨어지는 문제가 생겼다. 그래서 코드의 반복이 조금 생기더라도 분리하는 편이 나을 거라고 판단하고 각각의 리스트를 따로 구현했다. 코드 가독성과 반복 제거는 트레이드 오프 관계에 있는 것 같은데 적절한 균형을 잡는 것이 중요하다고 느꼈다.

### 🤔 Apollo-Client에서는 페이지네이션을 어떻게 적용하는걸까?

- 페이지네이션과 무한스크롤 기능을 처음 구현하는 것은 아니지만 이를 GraphQL과 Apollo-Client 기반에서 구현하는 것은 처음이었다. 그래서 [공식문서](https://www.apollographql.com/docs/react/pagination/overview)와 검색하다 찾은 [영상](https://www.youtube.com/watch?v=lNtQbn7qN-8&t=722s)을 보고 구현하다가 `fetchMore` 인자로 `updateQuery`를 사용해서 캐싱된 데이터에 새로운 데이터를 붙여줄 때 정상 동작하지 않는 문제가 생겼다. 그래서 구글링하던 중 더이상 `updateQuery`로 사용하지는 않는다는 글을 보고 `apollo.ts`의 `InMemoryCache`의 관련 로직을 작성하는 것으로 변경하니 잘 동작했다. 참고로 페이지네이션에는 페이지 기반과 커서 기반이 있는데 커서 기반이 조회 시에 중복 데이터를 보여주는 문제가 없고 GitHub API가 Relay 스타일의 커서 기반 페이지네이션을 지원하기 때문에 커서 기반 페이지네이션을 사용했다.

- 페이지네이션 전략에는 크게 2가지가 있다. offset 기반과 커서 기반이다. 무한 스크롤에 유용한 커서 기반으로 사용하기로 결정했다. 유저의 followings, followers, repos, stars의 리스트를 각각 페이지네이션 및 캐시 관리를 해야하는데 이걸 어떻게 따로 구분해서 관리할지가 고민이였다.

### 🤔 D3.js는 대체 어떻게 동작하는 걸까?

- D3.js의 동작 방식을 이해하기까지는 꽤 시간이 걸렸다. 게다가 GitHub Graph에서 사용하려는 `Force` 모듈은 다른 모듈과 동작방식이 매우 달랐고 레퍼런스도 많지 않았으며 SVG에 익숙한 편도 아니였다. 그래서 작은 프로젝트를 클론해보며 익혀볼 필요성을 느끼고 있었는데 [이 예제](https://levelup.gitconnected.com/creating-a-force-graph-using-react-and-d3-6579bcd9628c)와 공식문서 및 [번역된 문서](https://github.com/zziuni/d3/wiki/API-Reference)가 D3.js를 이해하는데 큰 도움이 되었고 SVG는 MDN의 내용을 수시로 보면서 진행해나갔다.

### ⚠️ 검색창에 디바운스가 적용되지 않는 문제

- 검색창의 검색추천 기능을 위해서 사용자가 입력한 값마다 API 요청해서 데이터를 뿌려줘야했는데 개별 타이핑마다 요청하기에는 성능상 큰 문제가 있기 때문에 lodash의 디바운스를 적용했는데 제대로 동작하지 않았다. 그러다 생각해보니 useCallback으로 해당 함수를 감싸주지 않아서 리렌더링 시마다 항상 다른 함수로 인식해서 발생하는 문제 였다. 그래서 useCallback으로 감싸주니 정상 동작했지만 코드가 생각보다 깔끔하지 못해서 찾아보니 커링으로 처리하는 예제가 있어서 추후에 커링을 공부해보고 리팩토링 해봐야겠다고 느꼈다.

### ⚠️ 검색된 유저를 주소로 접근하거나 새로고침할 때 플리커 현상이 발생하는 문제

- `UserDetail` 페이지에서는 유저가 이미 검색된 상태이기 때문에 검색창에 검색된 유저 아이디가 표시되어야한다. 일반적으로는 문제가 없는데 페이지를 새로고침하거나 해당 페이지로 직접 접근하는 경우에 검색창의 유저 아이디가 잠깐 비어있다가 다시 표시되는 문제인 일명 플리커 현상이 생겼다. 원인을 찾아보니 검색창의 `input`을 URL로부터 `useParams`를 사용해 받아와서 `useEffect` 내부에서 `setInput`을 통해서 변경해줬기 때문이였다. 이러면 마운트 이후에 리렌더링이 일어나는데 그 사이에 검색창에 빈값이 보여지니 문제가 생기는 것이다. 이 문제의 해결을 위해서 마운트 이전에 실행되는 `useLayoutEffect`를 사용해서 수정했다가 `URL`의 파라미터가 있을 경우에는 그 값을 `input` 상태값의 디폴트로 주는 것이 훨씬 간결할 것 같아서 재수정했다.

### ⚠️ GraphQL 유니온타입에 map 사용 시에 타입 문제

- GraphQL을 처음 사용하는 프로젝트라서 Inline Fragment라는 개념을 알지 못했다. 그래서 유니온 타입의 배열로 이루어진 추천 검색어 데이터의 쿼리를 작성할 때와 응답으로 받은 데이터를 map으로 뿌려줄 때 시행착오가 있었다. 해결을 위해 [공식문서](https://graphql.org/learn/queries/#inline-fragments)를 살펴보니 쿼리를 위해 유니온 타입에 접근할 때는 Inline Fragment를 사용하라는 내용이 있어서 이를 참고 했고 map 사용 시에는 타입 가드를 사용하는 방법으로 해결했다.

### ⚠️ Apollo-Client의 캐시가 덮어써지는 문제

- 사용자의 리스트 뷰와 그래프 뷰가 필요로 하는 데이터의 구성요소와 개수가 달랐기 때문에 각각 다른 쿼리를 구성해야했다. 하지만 동일한 사용자에 대한 요청이기 때문에 Apollo-Client는 기본적으로 이들의 데이터를 동일한 필드로 간주해서 캐시를 덮어쓰기 때문에 정상적으로 동작하지 않았다. 그래서 캐시를 따로 관리할 필요가 있었는데 [공식문서의 keyArgs](https://www.apollographql.com/docs/react/pagination/key-args)부분을 읽어보니 `keyArgs` 라는 배열을 사용해서 동일한 필드의 캐시를 분리할 수 있음을 확인했다. 나의 경우에는 리스트 뷰와 그래프 뷰가 요청하는 데이터의 개수에 대한 인자가 달라서 key값으로 `first` 라는 인자값을 사용하는 방법으로 문제를 해결헀다.

### ⚠️ 특정 노드에 이미지 삽입 및 스타일링이 적용되지 않는 문제

- 그래프 뷰에서 검색된 사용자의 아바타를 위해 `svg`에 이미지를 삽입하고 `border-radius`로 스타일을 주고 싶었는데 일반적인 방법으로는 적용되지 않았다. 그래서 구글링을 한참하다가 [이 글](https://www.amitmerchant.com/how-to-use-html-in-svg-using-foreignobject/)을 보고 `foreignObject`를 사용하면 가능하다는 것을 확인했고 해당 태그안에 `img` 태그를 삽입하고 스타일을 주는 방식으로 해결했다.

### ⚠️ 크로스 브라우징 문제

- 파이어폭스에서 노드의 `alignment-baseline` 속성이 동작하지 않아서 노드 안에 있는 텍스트의 레아이웃이 깨지는 문제가 있었다. 그래서 [공식문서](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline)와 [스택오버플로우](https://stackoverflow.com/questions/19212498/firefox-support-for-alignment-baseline-property)를 찾아보니 `alignment-base` 대신 `dominant-baseline`의 사용을 권장하는 내용을 보고는 수정해서 해결했다.

- 사파리에서 검색된 사용자의 노드 이미지에 `border-radius` 속성이 동작하지 않는 문제가 있었다. 기존에는 해당 속성이 이미지의 상위 엘리먼트인 `foreignObject`에 적용되어 있었는데 이를 `xhtml:img` 엘리먼트에 직접 적용해서 문제를 해결했다.

<br/>

## 🌐 링크

- [Web VSCode](https://github.dev/Leo-Xee/github-graph)
- [Figma](https://www.figma.com/file/FyKmTZFpnrUPGQKMn9QRzH/Github-Graph?node-id=0%3A1)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
