---
title: BookReview > Two Scoops of Django _ 6장. 장고에서 모델 이용하기 <2부>
date: 2017-10-15
tags:
- book review
- Django
---

이번 포스트에서는 장고 모델 디자인에 관련된 내용을 정리해보았다. 기본적인 모델에 대한 설명은 <a href="https://docs.djangoproject.com/en/1.11/topics/db/models/" target="_blank">장고 문서</a>를 참고하기 바란다.

<br>

## 데이터베이스 정규화

데이터베이스를 설계할 때 기본 원칙으로 삼을 수 있는 것이 `정규화`이다. 정규화에 대해 간략하게 정리해보았다.

### 정규화의 개념

**관계형 데이터베이스에서 중복을 최소화하고 일치하지 않는 종속성을 제거하여 데이터를 구조화하는 프로세스**이다.

위의 개념에서 `일치하지 않는 종속성`이란 데이터를 찾을 수 있는 경로가 없거나 끊겨있어 데이터를 찾기 어려운 상태를 말한다.

데이터가 중복되면 디스크 공간이 낭비되거나 유지관리상 문제가 생기므로 대부분의 데이터베이스 설계시 정규화를 만족하는 것이 좋다.

반면, 이러한 정규화는 굳이 따르지 않을 수도 있다. 예를 들어, 성능상의 이유로 정규화를 따르지 않을 수도 있다. 대부분 **3정규화를 만족하면 정규화가 되었다**고 한다. 아래에 3정규화의 개념까지 정리해보았다.

<br>

### (1) 제 1 정규화

- 반복된 데이터를 없앤다.
- 각 관련 데이터 집합에 따른 테이블이 있다.
- 기본 키를 사용하여 각 로우(row)를 식별한다.

<br>

### (2) 제 2 정규화

- 레코드는 테이블의 기본 키 이외에 어떤 항목에도 종속되면 안된다.
- 외래 키를 사용하여 테이블 간의 관계를 설정한다.

<br>

### (3) 제 3 정규화

- 키에 종속되지 않는 필드를 제거한다.
- 레코드 내에서 해당 레코드 키의 일부가 될 수 없는 값을 테이블에서 제외시키거나 관련 테이블로 이동시킨다.

[데이터베이스 정규화 기본사항 설명](https://support.microsoft.com/ko-kr/help/283878/description-of-the-database-normalization-basics)

<br>

## 정규화를 해야하는가?

데이터 정규화 개념에 대해 낯선 개발자들은 모델설계시 비정규화를 따르는 경향이 있다. 결론부터 말하면 정규화를 따르는 것이 맞다. 초기 설계시 뿐만 아니라 추후 관리측면에서 살펴보면 말이다. 비정규화는 프로젝트를 복잡하게 만들 뿐만 아니라 데이터 손실을 유발할 수도 있다.

모델을 비정규화할 때 발생하는 문제들은 `캐시(cache)`를 사용하여 대부분 극복할 수 있다. 적절한 위치에 캐시를 세팅해놓고 데이터 손실을 방지하는 것이다. 어디에 캐시를 설정할 지는 다음과 같은 기준에 따라 결정하면 된다.

- 가장 많은 쿼리를 포함하는 뷰와 템플릿
- 가장 많은 요청을 받는 URL
- 캐시를 삭제해야할 시점이 있는 곳

인기있는 캐시 장고 패키지는 `django-cache-machine`, `johny-cache`를 살펴보기 바란다.

<br>

## 헷갈리는 필드 옵션 - `null`과 `blank`

장고 모델에서 제공하는 각 필드별로 옵션을 지정할 때 가장 헷갈리는 `null`과 `blank`에 대해 정리해보았다.

<br>

### `null`과 `blank`의 개념 차이

기본 필드에서 `null`과 `blank`는 모두 False로 지정되어 있다.

`null=True` 옵션을 주면 해당 필드에 값을 입력하지 않을 경우 `NULL`, 즉, `없는 값`이 저장된다. 반면에 `blank=True` 옵션을 주면 해당 필드에 값을 입력하지 않을 경우 빈 문자열이나 빈 값(`''`)으로 저장된다.

<br>

### 언제 `null`을 쓰고 언제 `blank`를 쓸 것인가?

|필드타입|null=True|blank=True|
|:---:|:---:|:---:|
|CharField,<br>TextField,<br> SlugField,<br>EmailField, CommaSeperatedIntegerField,<br>UUIDField|사용안함<br>장고 표준에 따르면 빈 값(value)을 빈 문자열(string)로 저장하는 것이 옳다.|사용<br>빈 값이 저장되어야하는 필드라면 해당 옵션을 사용한다.|
|FileField,<br>ImageField|사용안함<br> 장고는 MEDIA_ROOT의 경로를 CharField에 파일, 이미지로 저장하므로 blank 옵션을 사용한다.|사용<br>CharField와 같은 원리|
|BooleanField|사용안함<br>NullBooleanField 사용|사용안함|
|IntegerField<br>FloatField<br>DecimalField<br>DurationField|사용가능|사용가능<br>빈 값을 받고싶은 경우에는 `null=True`와 함께 사용|
|DateTimeField<br>DateField<br>TimeField|사용가능|`auto_now`, `auto_now_add`옵션을 사용하고 있을 경우 `null=True`와 함께 사용|
|ForeignKey<br>ManyToManyField<br>OneToOneField|사용가능|사용가능|
|GenericIPAddressField|사용가능|사용가능|
|IPAddressField|사용 안함<br> 해당 필드는 사용하지 않는 추세이다|사용 안함<br>해당 필드는 사용하지 않는 추세이다|

<br>

### PostgreSQL 전용 필드에서 언제 `null`을 쓰고 언제 `blank`를 쓸 것인가?



<br>

## BinaryField 사용하기

장고 1.8에 추가된 `BinaryField`는 **로우 바이너리 데이터(row binary data) 및 바이트(byte)를 저장하는 필드**이다.

해당 필드는 `filter`, `exclude` 및 SQL문이 적용되지 않는다. 보통 메세지팩 형식의 콘텐츠나 원본 센서데이터, 압축된(base64 등) 데이터 등을 저장할 때 쓴다.

<br>

**`메세지팩`**

> 바이너리 직렬화 포맷으로 데이터를 다양한 언어 간에 교환할 수 있게 해준다. JSON과 비슷하지만 더 빠르고 용량도 적게 차지한다. <a href="http://msgpack.org/" target="_blank">메세지팩 홈페이지</a>

<br>

`BinaryField`에 저장되는 데이터는 크기가 클 경우 병목현상이 발생하기 쉬운 지점을 만든다. 따라서 해당 필드로부터 바로 파일을 서비스하면 절대 안된다. 해당 필드 뿐만 아니라 `FileField`, `ImageField`에도 직접 파일을 저장하는 것은 좋지 않다. 그 이유는 다음과 같다.

- 데이터베이스에서 읽고 쓰는 속도는 파일 시스템의 읽고 쓰는 속도보다 느리다.
- 데이터베이스 백업에 드는 시간과 공간이 계속적으로 늘어난다.
- 파일 자체에 접근할 때마다 장고와 데이터베이스 레이어를 거쳐야만 한다.

<br>

## 범용관계 피하기

장고 프레임워크를 사용하여 미디어 콘텐츠 앱을 만든다고 가정해보자. 텍스트 형식의 콘텐츠를 저장하는 `Post` 모델과 비디오 형식의 콘텐츠를 저장하는 `Video` 모델을 각각 만들었다. 두  모델에 공통적으로 태그를 띄워줄 수 있는 `Tag` 모델을 구현하려면 어떻게 해야할까?

가장 단순하고 기본적인 방식은 `Tag`에 해당 필드를 `ForeignKey`와 `ManyToManyField`를 사용하여 각각의 연결관계를 만들어주는 것이다. 하지만 장고에는 이러한 범용관계를 더 쉽게 만들어주는 모듈이 있다. 바로 `Contenttypes Application`이다.

**하나의 테이블에서 범용적으로 다른 테이블에 조인(=foreign key)을 걸고 싶을 때 사용한다.**

즉, `Tag`에서 `Post`와 `Video`로 동일한 필드를 사용하여 링크(=조인)를 걸고싶을 때 사용할 수 있다. `contenttypes application`은 장고 프로젝트 내에 installed된 모든 모델을 추적하여 `ContentType` 이라는 장고 제공모델의 인스턴스로 저장한 후 각 모델에 대한 정보를 관리해준다.

기본적으로 장고의 `authentication_framework`가 `contenttypes`를 사용하여 서비스 사용자들의 권한을 관리한다.

더 읽어보기 : <a href="https://docs.djangoproject.com/en/1.10/ref/contrib/contenttypes/" target="_blank">장고 문서 - contenttypes application</a>

<br>

앞서 장고에서 사용할 수 있는 범용관계의 예시를 들었는데, 범용관계는 **한 테이블에서 다른 테이블로 서로 제약조건이 없는 외부키(GenericForeignKey)로 바인딩하는 것**이다.

외래키 참조시에는 한 테이블의 기본 키값을 가지고 있는 열을 다른 테이블에서 참조할 때 테이블 간 연결이 생성된다. 제약조건이 없는 외부키를 사용하게 되면 다음과 같은 문제를 유발한다.

- 모델 간의 인덱싱이 존재하지 않으므로 쿼리 속도가 (상대적으로) 느리다.
- 기본 테이블에서 데이터를 삭제했을 때 외래키 테이블에 있는 데이터로의 관계 무결성이 손상받게 될 여지가 있다.(즉, 기본테이블 데이터가 삭제된 경우 외래 키 테이블의 관련 데이터를 수동으로 삭제해주거나 다른 데이터와 연결해주어야함)


<br>

이러한 문제 때문에 범용관계는 **여러 모델과 상호작용이 필요하나 단일 행위만 수행하는 태그, 메세지, 투표, 평점 매기기 등의 목적으로만 사용**한다.

하지만 이러한 단일 행위 앱이 메인 서비스라면 관리 측면에서 서드파티 패키지를 사용하거나 모델 디자인을 새로 하는 것이 더 나을 수 있다.

<br>

---

## 마치며

이번 시간에는 모델을 디자인할 때 가장 근본적인 개념인 데이터베이스 정규화에 대해 알아보았다. 그리고 모델 내의 필드에 대하여 도서에 소개해놓은  정보들을 개인적으로 공부한 내용과 함께 정리하였다. 마지막 3부에서는 모델의 `_meta` API와 매니저 등의 유틸리티/헬퍼 클래스에 대해 알아볼 것이다.

<br>