<div align="center">
  <img src="https://github.com/user-attachments/assets/98532218-7522-423a-9a00-bc2affb7a23d" width=1000 />
</div>

<br>

<div align=center>

<p align=center>
  <a href="https://here-we.gitbook.io/here-we/frontend/undefined">팀 깃북</a>
  &nbsp; | &nbsp; 
  <a href="https://github.com/orgs/TeamTheGenius/projects/7">프로젝트</a>
  &nbsp; | &nbsp;
  <a href="https://www.figma.com/design/dt1WvU7EadrXIAfOT3O0xC/TeamTheGenius?node-id=0-1&t=PahQoJ54AqZyN88R-1">피그마</a>
  &nbsp;  &nbsp; 
  <br>
  <a href="https://herewe.co.kr/">배포 링크</a>
  &nbsp; | &nbsp; 
  <a href="https://main--686612406a1162af8de27174.chromatic.com/">Storybook</a>
</p>

</div>


# 프로젝트 소개 

HERE:WE는 정기적인 소모임을 갖는 사람들이 **모임 계획**부터 **추억 관리**까지 모든 것을 한 곳에서 관리할 수 있도록 도와주는 서비스입니다.

기존의 SNS 서비스들로는 흩어져 있는 모임 정보와 추억들을 한 눈에 보기 어려웠던 불편함을 해결하고, 소모임 구성원들이 더욱 쉽게 모임을 계획하고, 소통하며, 추억을 간직할 수 있는 종합적인 공간을 제공합니다.

# 기술적 도전 

## 🎨 디자인 시스템 구축 및 UI 일관성 개선 

> "일관된 UI를 위한 체계적인 접근, 어떻게 해결했을까?"

Sass Map과 Function을 활용한 색상/타이포그래피 토큰화부터 라이트/다크 모드까지. 
<br/> 
CSS 변수가 아닌 Sass 맵 구조를 선택한 이유와 모듈화(@use, @forward)를 통한 확장성 있는 디자인 시스템 구축 경험을 공유합니다.

[🔗 자세히 보기](https://here-we.gitbook.io/here-we/frontend/ui)

<br />

## 🧩 합성 컴포넌트로 해결한 Props 폭발 문제

> "Modal 하나에 10개의 props? 더 나은 방법이 있다!"

Props Explosion을 겪고 나서 도입한 합성 컴포넌트 패턴. 
<br />
Children API와 React.isValidElement를 활용한 자동 레이아웃 구성부터 확장성과 유연성 사이의 균형점까지, 실제 적용하면서 마주친 트레이드오프를 솔직하게 담았습니다.


[🔗 자세히 보기](https://here-we.gitbook.io/here-we/frontend/ui-1)

<br />

## 📱 크로스 플랫폼 드래그 앤 드롭 완전 정복기

> "HTML5 Drag API는 모바일에서 작동하지 않는다!"

DragEvent API 학습부터 MouseEvent, TouchEvent, PointerEvent까지. 
<br />
서드파티 라이브러리 없이 데스크탑과 모바일 모두에서 작동하는 드래그 앤 드롭을 구현했습니다. 자동 스크롤, 고스트 이미지, requestAnimationFrame 최적화까지 포함된 완전한 구현기입니다.


[🔗 자세히 보기](https://here-we.gitbook.io/here-we/frontend/3)

<br />

# 주요 기능 

## 🔐 간편한 소셜 로그인

> "번거로운 회원가입은 이제 그만!"

구글, 네이버, 카카오 소셜 로그인을 통해 빠르고 안전하게 서비스를 시작할 수 있습니다. 복잡한 회원가입 절차 없이 한 번의 클릭으로 HERE:WE의 모든 기능을 이용해보세요.

## 👥 나만의 크루 만들기

> "초대받은 사람들만의 프라이빗 공간!"

친구, 동료, 가족과 함께할 크루를 생성하고 관리할 수 있습니다. 크루는 초대받은 멤버들만 접근할 수 있는 비공개 공간으로, 안전하고 편안한 환경에서 추억을 쌓고 앞으로의 만남을 계획할 수 있습니다.

## 💌 크루원 초대하기

> "더 많은 사람들과 함께하고 싶다면?"

이메일을 통해 간편하게 크루원을 초대할 수 있습니다. 초대받은 사람은 링크를 통해 바로 크루에 참여할 수 있어, 새로운 멤버를 맞이하는 과정이 매우 간단합니다. 함께할 사람들을 늘려가며 더 풍성한 추억을 만들어보세요.

## ✨ 모먼트 생성하기

> "특별한 순간을 계획해보세요!"

크루원들과 함께할 새로운 만남을 모먼트로 만들어보세요. 언제, 어디서, 무엇을 할지 계획하고 크루원들에게 공유할 수 있습니다. 생일파티, 여행, 모임 등 어떤 순간이든 모먼트로 기록하고 준비해보세요.

## 🙋‍♀️ 모먼트 참여/취소

> "내 일정에 맞춰 자유롭게!"

생성된 모먼트에 참여 의사를 표현하거나 일정 변경 시 취소할 수 있습니다. 실시간으로 참여 현황을 확인할 수 있어 모먼트 주최자도, 참여자도 계획을 세우기 편리합니다. 유연한 참여 시스템으로 부담 없는 만남을 만들어가세요.

## 📍 방문 장소 편집

> "우리만의 특별한 코스를 만들어보세요!"

모먼트에서 방문할 장소들을 자유롭게 추가하고 순서를 변경할 수 있습니다. 드래그 앤 드롭으로 간편하게 동선을 조정할 수 있어 완벽한 하루 코스를 계획할 수 있습니다.


# 기술 스택

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
<br/>
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

</div>



# 팀 소개 

<table align="center">
  <tr>
    <th><a href="https://github.com/hey-sung">성희연</a></th>
    <th><a href="https://github.com/choiseona">최선아</a></th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fdf16a36-58fa-4cd6-a092-3a07313c0fd4" width="120" height="120"></td>
    <td><img src="https://github.com/user-attachments/assets/5efa2522-7fdb-4d4e-a283-f4d5aa50bcbc" width="120" height="120"></td>
  </tr>
  <tr align="center">
    <td>BE<br/><a href="https://github.com/TeamTheGenius/HERE-WE_Server">BE 저장소</a></td>
    <td>FE</td>
  </tr>
</table>
