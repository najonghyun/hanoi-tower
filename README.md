# 🚥 하노이의 탑

---

### "하노이의 탑"을 누구나 직관적으로 즐길 수 있도록 웹사이트로 새롭게 구현해 보았습니다.

---

<br>

## 💻 화면 미리보기

### 초기 화면

<img src="https://github.com/user-attachments/assets/a8f92686-f70e-434e-a9ed-5d60e8dec6ea" width="30%" height="30%">

### 준비 완료 시

<img src="https://github.com/user-attachments/assets/29d5736b-ac5e-463f-b038-d8fc281ac3ab" width="30%" height="30%">

### step 이동

<img src="https://github.com/user-attachments/assets/b9e109c4-b6c9-4be2-9a53-353d6d19b9ae" width="30%" height="30%">

### 모두 옮길 시

<img src="https://github.com/user-attachments/assets/99a3b4c3-ec21-4d56-922b-d30444a0d39b" width="30%" height="30%">

<br>
<br>

---

### 📅 진행 기간

2025.01.06 ~ 2025.01.10

### 💡 기획

"하노이의 탑"을 시각적으로 쉽게 체험할 수 있도록 Vue를 활용해 웹 사이트 형태로 제작한 프로젝트입니다. 복잡한 알고리즘을 이해하는 대신, 단순히 보고, 느끼며, 체험할 수 있도록 직관적인 UI로 구성했습니다.

이 프로젝트를 통해 알고리즘이 어렵고 딱딱하다는 선입견을 깨고, 누구나 논리적 사고의 즐거움을 느낄 수 있기를 기대하고 있습니다.

### 🖇️ 기능

> ### 📝 원판 개수 입력

- 최소 1개부터 최대 12개까지 입력 가능
- 입력 후 준비버튼 클릭 시 하노이의 원판이 n개만큼 첫번째 위치에 생성

> ### 📝 step 버튼

- 하노이 원판을 하나씩 이동

> ### 📝 auto 버튼

- 하노이 원판을 계속해서 이동 (멈춤 제어가 있기 전까지)

> ### 🎲 dfs 알고리즘 사용

- 재귀로만 하려고 했으나 각각의 상태에 머물러야 하기 때문에 stack을 이용하여 dfs탐색

### ⚒️ 개발 환경

#### **FrontEnd**

- node.js : 16.14.2
- Vue : 2.5.11
- Vuex : 3.6.2

<br>
