

### 문자열 유무 검증 (@NotBlank, @NotEmpty, @NotNull)

`@NotBlank`

- `null`이 아닌 값
- 공백이 아닌 문자를 하나 이상 포함해야 한다.
- 반드시 값이 존재하고 공백 문자를 제외한 길이가 0보다 커야 한다.

`@NotEmpty`

- `null`이거나 빈 문자열이 아니어야 한다.
- 반드시 값이 존재하고 길이 혹은 크기가 0보다 커야 한다.

`@NotNull`

- `null`이 아닌 값이어야 한다.
- 반드시 값이 있어야 한다.

[비교](https://www.notion.so/0f57d32eb20748508332bf96822be115)

### 최대 최소 검증

**지원 타입**

- `BigDecimal`
- `BigInteger`
- `CharSequence`
- `byte`
- `short`
- `int`
- `long`
- 이에 대응하는 `Wrapper` 클래스
- `null`도 `valid`
- `double`, `float`은 라운딩 에러 때문에 지원 X

**어노테이션**

- `@DecimalMax` : 지정된 최대 값보다 작거나 같아야 한다.
    - `String` 값 - max 값을 지정한다.
- `@DecimalMin` : 지정된 최대 값보다 크거나 같아야 한다.
    - `String` 값 - min 값을 지정한다.
- `@Max` : 지정된 최대 값보다 작거나 같아야 한다.
    - `int` 값 - max 값을 지정한다.
- `@Min` : 지정된 최대 값보다 크거나 같아야 한다.
    - `int` 값 - min 값을 지정한다.

**예시**

```java
public class MinMaxDto{
	
	@DecimalMax(value = "10000000000")
	private BigInteger decimalMax;

	@DecimalMin(value = "1")
	private BigInteger decimalMin;

	@Max(value = 1000)
	private Integer max;

	@Min(value = 1)
	private Integer min;
	
}
```

### 범위 값에 대한 검증

**지원 타입**

- `BigDecimal`
- `BigInteger`
- `CharSequence`
- `byte`
- `short`
- `int`
- `long`
- 이에 대응하는 Wrapper 클래스
- `null`도 valid
- `double`
- `float`

**어노테이션**

- `@Positive` : 양수
- `@PositiveOrZero` : `0`이거나 양수
- `@Negative` : 음수
- `@NegativeOrZero` : 0이거나 음수

**예시**

```java
public class RangeDto{

	@Positive
	private Integer positive;
	
	@PositiveOrZero
	private Integer positiveOrZero;

	@Negative
	private Integer negative;
	
	@NegativeOrZero
	private Integer negativeOrZero;
}
```
