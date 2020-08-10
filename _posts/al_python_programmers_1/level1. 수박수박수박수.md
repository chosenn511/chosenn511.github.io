---
title: lPython _ Lv1. 수박수박수박수?
date: 2017-06-05
tags:
  - algorithm
  - python
---

### 문제 설명
> water_melon함수는 정수 n을 매개변수로 입력받습니다.
길이가 n이고, 수박수박수...와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.

> 예를들어 n이 4이면 '수박수박'을 리턴하고 3이라면 '수박수'를 리턴하면 됩니다.

### 내 코드

```python
def water_melon(n):
    # 함수를 완성하세요.
	if n % 2 == 0:
		return '수박' * (n // 2)
	else:
		return '수박' * (n // 2) + '수'

# 실행을 위한 테스트코드입니다.
print("n이 3인 경우: " + water_melon(3));
print("n이 4인 경우: " + water_melon(4));
```

<br>

### 타인의 코드

수박을 n번만큼 곱한다음 만들어진 문자열에서 n번째까지만 슬라이스

```python
def water_melon(n):
	s = "수박" * n
	return s[:n]
```
