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

유저 검색이 실행되면 잠시 스켈레톤 UI를 보여준 후에 검색한 유저의 기본 정보와 Followings, Followers, Repositories, StarredRepositories 리스트를 Tab 별로 구분해서 보여줍니다. 각 리스트는 초기 지연 시간을 고려해서 최초에는 20개만 보여주고 사용자가 스크롤 하다가 리스트의 중간에 도달하는 것을 Intersection Observer로 감지해서 그 다음 20개의 데이터를 보여주도록 무한스크롤을 구현했습니다. 그리고 리스트의 아이템을 클릭하면 해당 유저나 레포지토리 GitHub 주소로 이동하도록 했습니다.

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

우측 상단의 다크모드 버튼을 클릭해서 애플리케이션의 테마를 변경할 수 있습니다. 이를 위해서 Emotion의 테마 기능을 사용해서 테마별 변수와 스타일을 `theme.ts`에서 따로 지정했고 Zustand를 통해서 상태를 관리했습니다.

<br/>

## ⁉️ 트러블 슈팅과 고민(작성중 ..)

### Router가 필요할까?

초기에는 라우터의 필요성을 느끼지 못했는데 검색된 유저를 주소로 접근할 떄 용이할 것 같아서 라우터를 추가하기로 했다. 추가로 상위 컴포넌트에서 관리해야할 username과 같은 state를 url의 파라미터로 관리할 수 있다는 점도 이점이 되는 것 같다.

### 상태관리 라이브러리가 필요할까?

Board 컴포넌트 내부에서 Tab의 상태를 관리해야하는데 이 상태에 기반한 데이터 패팅을 Graph 컴포넌트에서도 필요함으로 공통된 부모 컴포넌트인 App에서 Tab의 상태를 관리해야했다. 그러면 Props Drilling으로 인해 로직이 복잡해질 것 같아 클라이언트 상태관리 라이브러리의 필요성을 느끼게 되었고 사용을 결정했다. 현재 상황에서는 하드하게 사용하지는 않을 것이기 때문에 RTK, Recoil, zustand를 후보를 두고 비교했는데 용량면에서 zustand로 채택했다.

### 검색한 유저의 데이터와 Tab별 리스트 데이터를 언제 패칭해야할까?

검색한 유저의 정보(following, followers, repos, star)를 검색 시에 한번에 로드해야하는지 탭 별로 로드해야할 지 고민이 있었다. 정보별로 각각의 리스트 컴포넌트를 만들기에는 반복적인 코드가 많을 것 같아서 List 컴포넌트 내에서 구분해서 처리해주기로했다. 하지만 작성하고 보니 코드 가독성이 매우 떨어져서 코드의 반복이 조금 되더라도 나누는 것이 나은것 같다고 느꼈다. 그래서 UserList(FollowingList, FollowerList)로 나누었다. 가독성과 반복 제거는 트레이드오프 관계 인 것 같은데 적절한 균형을 잘 잡아야겠다고 느꼈다.

### D3.js는 대체 어떻게 동작하는 걸까?

### 페이지네이션 전략 중에 어떤 것을 사용해야할까?

페이지네이션 전략에는 크게 2가지가 있다. offset 기반과 커서 기반이다. 무한 스크롤에 유용한 커서 기반으로 사용하기로 결정했다. 유저의 followings, followers, repos, stars 의 리스트를 각각 페이지네이션 및 캐시 관리를 해야하는데 이걸 어떻게 따로 구분해서 관리할지가 고민이였다.

### 검색창에 디바운스가 적용 안되는 문제

useCallback을 사용하지 않으면 동일한 함수로 인식하지 못해서 정상 동작하지 않았다.

### GraphQL 유니온타입에 map 사용 시에 타입 문제

Graphql을 처음 사용하는지라 inline Fragment에 대해서 이해 하지 못해서 로드한 데이터를 map을 돌리는데 의도와 달리 정상적으로 데이터를 뿌려주지 못했다.

### Apollo-Client의 캐시가 덮어써지는 문제

### 검색된 유저를 주소로 접근하거나 새로고침 할 때 플리커 현상이 발생하는 문제

검색 된 유저의 URL로 바로 접근하거나 새로고침 하는 경우에 search 컴포넌트의 input의 값이 바로 뜨지 않는 문제가 생겼었다. input의 값의 경우에는 URL의 파라미터를 useParams로 가져와서 useEffect 내에서 넣어주는 방식이였는데 이는 렌더링 된 직 후에 실행되기 때문에 잠시 값이 아닌 placeHolder가 보여졌다가 다시 값이 보여지는 현상이 생겼던 것이다. 이를 해결하기 위해서 렌더링 이전에 실행되는 useLayoutEffect를 사용하니 더이상 플리커현상이 일어나지않고 바로 값이 보여졌다.

### 특정 노드에 이미지 삽입 및 스타일링이 적용되지 않는 문제

text, image

<br/>

## 🌐 링크

- [Web VSCode](https://github.dev/Leo-Xee/github-graph)
- [Figma](https://www.figma.com/file/FyKmTZFpnrUPGQKMn9QRzH/Github-Graph?node-id=0%3A1)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
