<h3><a href='https://eunochoi.github.io/react_minigame/'>🔗 Minesweeper</a></h3>

제로초님의 유튜브 영상을 보고 공부한 내용이며 react 함수 컴포넌트 문법을 이용해 만든 지뢰찾기 게임입니다.

<h3>props 전달</h3>
이전에 만들어 보았던 간단한 투두앱의 경우 page도 적고 props를 넘겨주는 일이 많지 않았지만
지뢰찾기는 지뢰 한칸이 테이블의 하나의 요소로 이루어져 있어 props를 주고받는 일이 잦았습니다.
여기 저기에서 state를 필요로 하다보니 props 전달을 어떻게 해주어야 하는지 어디에 state를 만들어서 전달해주어야 효율적인지 많은 고민이 필요했습니다. 덕분에 state와 props 공부가 정말 많이 되었고 헷갈리던 부분이 얼추 해소되었습니다. 
또 props를 중구난방으로 여기저기 전달하다 보니 상태를 통합적으로 관리해주는 도구, 리덕스의 필요성을 절실히 느낄 수 있었습니다

<h3>모바일 우클릭 문제</h3>
데스크탑 브라우저에서 깃발표시를 우클릭으로 동작하도록 구현하였습니다. 
당연히 모바일에선 롱터치로 대체되어 동작한다고 알고있었고 또 안드로이드폰에서 제대로 동작하였습니다.
그런데 나중에 ios 모바일 디바이스에선 동작하지 않는다는거 알게 되었습니다.
검색해보니 따로 ios 모바일 환경 롱클릭의 이벤트 리스너가 존재하고 있지 않아 당황스러웠지만
검색을 많이하였고 결국 user agent로 정보 확인후 ios의 경우 타이머를 이용해 타이머 활용해서 롱터치 구현하는식으로 해결하였습니다 :)


<h3>메인 화면</h3>
<img width="367" alt="Screen Shot 2022-06-06 at 5 59 46" src="https://user-images.githubusercontent.com/64246481/172070399-181fd157-03cf-4690-9412-885b07f3ea86.png">
<h3>난이도 설정 화면</h3>
<img width="367" alt="Screen Shot 2022-06-06 at 6 00 21" src="https://user-images.githubusercontent.com/64246481/172070405-ab30c029-7bdf-41bb-84fc-ffa2115fbaed.png">
<h3>게임 진행 화면</h3>
<img width="367" alt="Screen Shot 2022-06-06 at 6 00 05" src="https://user-images.githubusercontent.com/64246481/172070403-287f9420-7fce-4219-9ddb-c45d54f2c4fd.png">


