// 탭메뉴 선택
let tabBtn = document.querySelectorAll('.tab-btn');
// 카드 보여줄 공간 선택
let showArea = document.querySelector('.student-status-show-area');
// 총 몇 개인지 보여줄 영역 선택
let cardCount = document.querySelector('.card-count');
// console.log(tabBtn);
// console.log(showArea);
// console.log(cardCount);

// 학생 카드 만들고 보여주기
function studentCard(list) {
  // 카드 보여주는 공간 영역 초기화
  showArea.innerHTML = '';

  // 카드 만들기
  list.forEach(function (student) {
    let card = document.createElement('div');
    card.classList.add('student-card');

    let id = document.createElement('p');
    id.classList.add('student-id');
    id.textContent = student.id;

    let name = document.createElement('p');
    name.classList.add('student-name');
    name.textContent = student.name;

    let className = document.createElement('p');
    className.classList.add('student-class-name');
    className.textContent = student.className;

    let status = document.createElement('p');
    status.classList.add('student-status');
    status.textContent = student.status;

    // 상태별로 css 다르게
    if (student.status === '출석') {
      status.classList.add('attend');
    } else if (student.status === '결석') {
      status.classList.add('absent');
    } else if (student.status === '지각') {
      status.classList.add('late');
    }

    // 카드 영역에 내용 추가하기
    card.append(id, name, className, status);

    // 영역에 카드 추가하기
    showArea.appendChild(card);

    // 총 몇 명인지 보여주기
    cardCount.textContent = `총 ${list.length}명`;
  })
}

// 탭버튼 클릭했을 때 필터링 해서 보여주기
function filter(type) {
  // 전체 탭에서는 배열에 있는 값 전체 보여주기
  if (type === '전체') return serverStudents;
  // 전체 제외한 탭에서는 해당하는 값만 보여주기
  return serverStudents.filter(function (s) {
    return s.status === type;
  })
}

// 탭버튼 클릭
tabBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // active 전체 삭제
    tabBtn.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // 버튼 안에 적힌 텍스트 값 읽어오기, 공백 제거하고
    let type = btn.textContent.trim();
    let filtered = filter(type);
    studentCard(filtered);
  })
})

// 초기 상태 >> '전체' 탭이 active
studentCard(serverStudents);