---
title: HTML _ 기본 태그와 인라인, 블록 요소
date: 2017-06-16
tags:
- HTML
- markup
---

HTML은 마크업 언어로, 내용에 의미를 부여하는 언어이다. 따라서 각 요소의 속성 자체를 그대로 유지하는 것이 좋다. 디자인 요소는 최대한 css에서 해결하도록 한다.

<br>

## 1. 기본태그 소개

### `<p>`

- 단락을 의미, paragraph
- 블록 요소
- 줄바꿈을 하려면 `<br>`을 사용
- 다른 블록 요소를 포함할 수 없는 유일한 블록요소이다.

<br>

### `<pre></pre>`

HTML 파일에 작성한 단락 모습 그대로 화면에 출력한다. 따라서 줄바꿈을 위해 `<br>`을 사용할 필요가 없다.

```html
<pre>
hello!
html!
</pre>
```

<br>

### `<div></div>`

- 특별한 의미가 없는 블록 요소
- 블록 요소와 인라인 요소 모두를 담을 수 있는 그릇이다.
- 콘텐트를 논리그룹으로 묶어야하는 상황, 장이나 기사와 같이 콘텐트 의미별로 구역을 나눌 떄 사용
- class, id를 사용하여 css를 적용
- 문서전체 구조를 파악하는 데 큰 도움.
- 모든 종류의 콘텐트에 무분별하게 사용하지 않는다.

- **`<span>`** <br>

  div처럼 의미가 없다. 하지만 인라인 요소로, 특정 콘텐트에 상세한 특성을 부여할 때 사용한다.

<br>

#### 팁!

  이렇게 종료태그에 주석을 달아놓으면 나중에 닫는 태그를 매칭하는 데 시간을 단축할 수 있다.

```html
		</div><!--chapter1의 div-->
	</div><!--chapters의 div-->
</div><!--all-chapter의 div-->
```

<br>

## 중첩목록

```html
<ol>
 <li>커피</li>
 <li>콜라</li>
  <ul>
   <li>코카콜라</li>
   <li>펩시</li>
  </ul>
</ol>
```

<br>

## 블록 요소와 인라인 요소

|블록 요소|인라인 요소|
|:-----:|:-------:|
|h, p, pre, div, ol, ul, li, dt, dd|br, a, strong, em, i, abbr|

- 블록 요소는 다른 블록 요소 또는 인라인 요솔를 포함할 수 있다.
- 블록 요소는 인라인 요소 안에 포함될 수 없다.
- 인라인 요소는 다른 인라인 요소만 포함할 수 있다.
- p는 블록 요소이지만 다른 블록 요소를 포함할 수 없다.

<br>

### 강조 - `<strong>과 <em>`

- `<b>` 또는 `<i>`는 문서에 디자인 속성을 부여한다.
- `<strong>` 또는 `<em>`는 문서의 의미를 강조한다.
- `<b>` 또는 `<i>` 를 사용하기 보다는 문서에 의미를 부여하는 `<strong>` 또는 `<em>`을 사용하는 것이 맞다.

<br>

### 인라인 요소 - `<abbr>`

- 약어를 의미한다.
- 예시

```html
<abbr title="World Wide Web Consortium">W3C</abbr>
```

<br>

### 인라인 요소 - `<span>`

- 의미가 없음.
- 특정 컨텐츠에 상세특성을 부여할 때 사용
- 보통 가장 안쪽에서 쓰인다.

<br>

### 인라인 요소 - `<a>`

`<a href="id값">`
`<a href="#chapter1-2">`

- 같은 페이지 안에서 부여한 아이디 값을 기준으로 링크를 걸 수도 있다.

```html
<!-- 블록 요소가 인라인 요소 내부에 있으면 안된다. -->
<a href="dd.com"><h1>hello</h1></a>

<!-- h1은 블록 요소이므로 a로 감쌀 수 없다. 따라서 h1 안에 a가 들어가야한다.  -->
<h1><a href="dd.com">hello</a></h1>
```
<br>

출처 :html/css도서 -[웹표준가이드]