# PSA
2021 충북대학교 컴퓨터공학과 11조 졸업작품 - 키워드 기반 상품 추천 프로그램
# 키워드 기반 도서 추천 서비스
### contributor
|이진희|윤정환|신지애|손지현 |
|------|---|---| --- |
| [bebusl](https://github.com/bebusl)              |      [dungbik](https://github.com/dungbik)         |   [ShinJA0](https://github.com/ShinJA0)|[jihyun131](https://github.com/jihyun131)      |
| 🌴                                               | 🔥                                               | 📖                                               |📖   |



### 서비스 설명
* 실시간으로 상품의 리뷰에서 추출된 특징에 대한 선호도를 선택하게 해 사용자의 요구사항이 반영된 상품을 추천해주고, 상품의 요약정보를 시각화해주는 웹/앱 서비스
* 웹 소켓과 분산 처리를 이용해 실시간으로 많은 요청을 처리 가능
-----
## 샘플
**앱화면**

**웹화면**

## 의존성 및 설치 방법
* 용량이 큰 파일은 git에 올리지 않았음.
* 모델( checkpoint-1200 ) 파일은 다운로드 받아서 server/celery/model/ 위치에 넣어주어야 함
* tfidf 매트릭스 파일도 다운로드받아 sever/celery/model폴더에 넣어주어야 함.
* .env파일을 server/env파일에 생성해주어야 함.(key 내용 문의 :  bebus1998@naver.com)

### 설계문서
https://drive.google.com/file/d/1l_4s9RA0bdtXl6AEqNQ8vaIUsDOr4abv/view?usp=sharing

### api server
*  의존성

* 설치방법
     ```
        cd server
        npm i
        cd server/celery
    ```

### react-native app
[flutter install](https://docs.flutter.dev/get-started/install)
<br />

## 실행방법(development)
### api 서버 오픈
```
cd server
npm i
npm run dev
```

### flutter app 빌드
```
cd flutter-app
flutter build apk (android)
flutter build ios (ios)
```



----
## License
```
The MIT License (MIT)

Copyright (c) 2021 yoonleeverse

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```
