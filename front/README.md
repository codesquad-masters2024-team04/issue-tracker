# issue tracker FE

## 기술 스택

- React 18
- Vite
- styled-components
- antd

## 프로젝트 구조

```
/apis // api 요청을 담당합니다.
/features //각 페이지 별로 구분하여 폴더를 생성합니다.
/utils // 공통으로 사용되는 함수들을 모아두었습니다.
```

```
/featrues
    /issue
      /containers // 복잡한 로직이나 hook 데이터를 처리하고 컴포넌트로 데이터를 내려줍니다.
      /pages // 새로운 페이지가 필요한 경우 추가합니다. (라우팅 목적)
      /apis // api 요청을 담당합니다.
      /components // UI를 담당하는 컴포넌트를 모아두었습니다.
      /hooks // API를 호출하거나 여러 페이지들에서 재사용할 수 있도록 작성한 custom hook을 모아두었습니다.
    /label
    /milestone
```

## 배포

- AWS S3에 배포합니다
- [배포 링크](http://issue-tracker-front.s3-website.ap-northeast-2.amazonaws.com/)
