# PSA
2021 충북대학교 컴퓨터공학과 11조 졸업작품 - 키워드 기반 상품 추천 프로그램
# 키워드 기반 도서 추천 서비스
### contributor
|이진희|윤정환|신지애|손지현 |
|------|---|---| --- |
| [bebusl](https://github.com/bebusl)              |      [dungbik](https://github.com/dungbik)         |   [ShinJA0](https://github.com/ShinJA0)|[jihyun131](https://github.com/jihyun131)      |
| 🌴                                               | 🔥                                               |✨                                         |      🪄  |



### 서비스 설명
* 실시간으로 상품의 리뷰에서 추출된 특징에 대한 선호도를 선택하게 해 사용자의 요구사항이 반영된 상품을 추천해주고, 상품의 요약정보를 시각화해주는 웹/앱 서비스
* 웹 소켓과 분산 처리를 이용해 실시간으로 많은 요청을 처리 가능

----
### 기능적 요구사항
1. **회원가입 / 로그인** : (회원가입 선행되어야 함. 로그인 안했을 때는 장바구니 이용불가)
2. **검색** : 원하는 제품군 검색
3. **크롤링** : 제품의 리뷰를 크롤링
4. **키워드 추출 및 긍/부정도 판단** : 리뷰의 키워드 추출 + 키워드에 대한 긍/부정도 판단 후 db저장
5. **키워드 선택 기능** : 리뷰에서 추출된 키워드를 보여줌 -> 비선호/선호 키워드 선택하게 함
6. **랭킹 알고리즘** : 선택 키워드에 알맞은 상품 보여주기
7. **분석 결과 워드클라우드 및 그래프로 표현(상세 페이지)** : 상품에 대한 정보 제공.

----
### 시스템 아키텍처
![PSA 시스템아키텍처](https://user-images.githubusercontent.com/49019236/159383240-33a08847-0d26-4183-9929-4fab8f9edc01.png)
---
### 설명 비디오
프로그램이 어떤 방식으로 작동하는지 알고싶다면 아래의 링크를 클릭해 설명 동영상을 봐주세요!
* 전체적인 흐름 설명
* 랭킹 알고리즘/키워드 추출 및 감성분석에 사용한 모델설명
* [PSA 설명](https://drive.google.com/file/d/1e4UQALNm7_9CtjcrN047z9Hswzy_jOhF/view?usp=sharing)
---

### 샘플
#### 웹화면
![웹화면](https://user-images.githubusercontent.com/49019236/159382447-5b223d81-d68c-43a3-b9ec-7427918c25b3.gif)
#### 앱 화면
![앱화면](https://user-images.githubusercontent.com/49019236/159383022-011f29ec-7bcd-46ae-baf5-77c58d4b37b0.gif)

--- 
### 설계문서
[문서 보기](https://drive.google.com/file/d/15s48vr1W2MqqURBeMLCMSAanJe-UlNxL/view?usp=sharing)
---
### 실행방법(development) - docker로 docker-compose파일 빌드하고 실행시키는 게 가장 빠름!
빌드 및 실행방법 추가예정.
