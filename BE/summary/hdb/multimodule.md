
# **멀티 모듈 설계 이야기**

안녕하세요. 배달의민족 프론트 서버를 개발하고 있는 권용근입니다. 멀티 모듈의 개념을 처음알게 되었을 때부터 현재까지 겪었던 문제점들과 그것을 어떻게 해결해나갔는지를 이야기해보려고 합니다. 아래 내용은 모두 `Gradle` 과 `Spring Framework` 를 사용한 경험들로 작성되었습니다.

## **멀티 모듈 프로젝트란?**

멀티 모듈 프로젝트를 처음 알게된 건 2017년 초였습니다. 당시에 저는 단일 프로젝트를 사용하고 있었습니다. 예를 들어 제가 회원 시스템을 개발 한다고 하면

- member internal api
- member external api
- member batch

와 같이 서로 독립된 프로젝트 단위로 가지고 있었습니다. 이런 구조를 가지고 있을 때 가장 큰 문제점은 시스템의 중심 `Domain` 이 가져야할 구조와 규칙 등을 **동일하게 보장해주는 메커니즘** 이 없다는 것 입니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/sg-project.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/sg-project.png)

개발자는 동일한 `Domain` 을 가지고 있는 위 3가지 어플리케이션을 열심히 복&붙하며 개발을 하게 됩니다. 매우 귀찮고 불안하게 말이지요.

멀티 모듈 프로젝트는 기존의 단일 프로젝트를 프로젝트 안의 모듈로서 갖을 수 있을 수 있는 구조를 제공합니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/mt-project.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/mt-project.png)

그래서 개발자는 하나의 시스템에서 중심 도메인을 모듈로 분리하여 위와 같은 보장 메커니즘을 제공받을 수 있게 됩니다.

*더 자세한 내용은 [기억보단 기록을:Gradle 멀티 프로젝트 관리](https://jojoldu.tistory.com/123) 블로깅을 참고하면 좋습니다.*

**"아! 멀티 모듈 프로젝트는 공통으로 사용하는 코드들을 모아놓고 같이 쓸 수 있게 해주는구나!"**

맞습니다. **맞지만**, 위와 같은 생각만 했었기때문에 저는 **많은 문제점** 을 맛보았고, **많은 시행착오** 를 하게 되었습니다.

## **실패한 멀티 모듈 프로젝트**

저는 아래와 같은 어플리케이션들을 가지는 시스템을 멀티 모듈로 바꾸어보았습니다.

- Kingbbode System
    - internal api
    - external api
    - batch

공통으로 사용하는 코드들을 모았습니다. 모듈을 이름을 뭘로 하지? `common` 이 좋겠다! 그리고 `common` 의 저주가 시작되었습니다. 아래와 같은 멋진(?..) 구조가 완성되었습니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/failed-project.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/failed-project.png)

**"여러분. 이제 common 모듈에서만 수정하면 됩니다. 더 이상 노가다하지 않아도 됩니다."**

### **공통(Common) 모듈의 저주**

공통 모듈에 대부분의 핵심 또는 공통 코드들이 다 들어가게 되었습니다. 그리고 많은 문제점들이 생기기 시작했습니다.

**A 어플리케이션** 에서 기능을 추가합니다. 이 때 코드는 어디에 작성되게 될까요? 개발자는 고민을 하게 되고, 코드는 어떠한 선택에 의해 빈번하든 아니든 **공통 모듈에 점점 추가** 가 됩니다. **B 어플리케이션** 에서도 마찬가지 일 것 입니다.

이제 **C 어플리케이션** 에서 기능을 추가합니다. 공통 모듈에 작성된 유용해보이는 코드들이 있습니다. 사용하게 됩니다. 사실 그 기능은 **A 어플리케이션** 을 위해 작성한 코드입니다.

위 과정이 반복이 되다보면 어느세 공통 모듈은 걷잡을 수 없이 커져있을 것 입니다. 그리고 어플리케이션에서 하는 일이 점점 줄어들고 공통 모듈에서 점점 더 많은 일을 하게 됩니다.

### **1. 스파게티 코드**

모든 프로젝트들은 주기적인 청소가 반드시 필요합니다. 그게 기능의 F/O든 자발적인 리펙토링이든 말이지요. 그러나 공통 모듈의 저주가 이를 방해합니다.

> A: "오래된 기능이 F/O 되었다. 코드를 정리해볼까?", "이쪽 흐름이나 코드가 효율적이지 않네. 리펙토링 좀 해볼까?"
> 
> 
> 관리자 : "영향 범위는?"
> 
> A: "**시스템 전체..**"
> 

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/sp-code.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/sp-code.png)

코드가 꼬리에 꼬리를 물고 결국 하나의 코드만 수정해도 전체가 영향받는 현상은 불가피해보입니다.

심지어 A를 B로, B를 C로 가공한 코드에서 다시 C에서 A로 가공한 코드도 본적이 있습니다. 아래와 같이 말이지요.

```
class AService {
  private final ARepository aRepository;

  public A act(Long id) {
    ...
    return aRepository.findById(id);
  }
}

class BService {
  private final AService aService;

  public B act(Long id) {
    A a = aService.act(id);
    ...
    return mapToB(a);
  }
}

class CService {
  private final BService bService;

  public C act(Long id) {
    B b = bService.act(id);
    ...
    return mapToC(b);
  }
}

class DService {
  private final CService cService;

  //띠용!!
  public A act(Long id) {
    C c = cService.act(id);
    ...
    return mapToA(c);
  }
}
```

공통 모듈에 들어간 코드는 더 이상 처음 작성한 의도만을 위한 코드가 아니게 됩니다. 공통이기 때문입니다. 우리는 혼자 개발하는 것이 아닐 뿐더라 혼자 개발한다고 해도 이러한 실수는 반드시 생기게 됩니다.

### **2. 의존성 덩어리**

공통 모듈은 어떤 의존성을 갖게 될까요? 결국 전부라고 저는 확신합니다.

웹쪽 설정을 사용하니까 `spring-boot-starter-web`, JPA를 사용하니까 `spring-boot-starter-data-jpa`, REDIS도 사용하니까 `spring-boot-starter-data-redis` 등등등 계속 추가하게 됩니다. 전부가 아니더라 프로젝트에서 사용하는 대부분의 의존성이 공통 모듈로부터 시작될 것 입니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/big-depend.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/big-depend.png)

문제는 어플리케이션들이 사용하는 의존성은 다를 수도 있다는 것 입니다. 예를 들어 데이터베이스를 사용하지 않는 어플리케이션에서 공통 모듈을 사용하기 위해 데이터베이스와 커넥션을 맺게 됩니다. 그 외에 다른 의존성도 마찬가지겠지요.

스프링 부트는 의존성을 기반으로 발동되는 `AutoConfiguration` 들이 아주 많이 있지요. 의존성 덩어리인 공통 모듈로 인해 어디선가 발동되는 스프링 부트의 마법으로 어플리케이션은 최적화되어 돌아가지 못하게 될 것이고, 이것은 곧 장애 포인트가 될 것 입니다.

### **3. 공통 설정**

설정까지 공통 모듈로 몰게 되는 경우도 많이 보았습니다. 고정적으로 공통으로 사용되어야 하는 호스트 정보 등은 경우에 따라 공통으로 보아야할 수도 있지만, 그 외의 Thread Pool, Connection Pool, Timeout 등의 설정도 가장 민감하고 중요한 어플리케이션 기준으로 몰아들어갑니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/common-setting.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/common-setting.png)

이 때 발생하는 문제의 대표적인 예로 데이터베이스 커넥션이 있습니다. 모든 데이터베이스에는 가질 수 있는 최대 커넥션 개수가 정해져 있습니다. 데이터베이스를 사용하지 않는 어플리케이션에서 공통 모듈을 사용하기 위해 사용되는 커넥션으로 인해 실제로 데이터베이스를 사용하는 어플리케이션과 해당 어플리케이션까지 모두 문제가 생길 수가 있게 됩니다.

이 외에도 어플리케이션마다 다르게 작성되어야 할 설정을 한 곳으로 몰게 되었을 때 수많은 문제점들이 있겠지요?

---

왜 이런 문제점들이 생기게 되었을까요? 제 생각에는 **멀티 모듈 프로젝트는 독립적으로 실행 가능한 어플리케이션을 1개 이상 가질 수 있기 때문입니다.**

멀티 모듈 프로젝트는 하나의 시스템을 단위로 만들어집니다. 여기서 말하는 **시스템** 은 아래와 같은 정의를 말합니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/system.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/system.png)

[출처: 이벤트 기반 분산 시스템을 향한 여정 (Arawn Park)](https://www.slideshare.net/arawnkr/ss-94475606)

`멀티 모듈 프로젝트`는 독립적으로 실행가능한 어플리케이션 모듈을 1개 이상 가지고 있으며, 사용하는 인프라 자원 역시 1개 이상을 가지고 있습니다. **독립적으로 실행 가능** 한 어플리케이션들은 당연히 서로 다른 책임과 역할을 가지기 때문에 `스파게티 코드`, `의존성 덩어리`, `설정` 등의 문제를 피하기 위해 하위의 모듈들에 대한 의존성과 사용성에 대한 개방, 폐쇄를 철저히 해야만 했습니다.

## **멀티 모듈 구성하기**

### **글을 읽기 전 주의사항**

아래 글에서 나오는 용어와 관점을 우리가 많이 바라보는 시점인 `레이어 아키텍처` 의 시점으로 바라보았을 때 혼동이 올 수 있습니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/before-prdm.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/before-prdm.png)

**아래 작성된 내용은 기존의 시점과 조금 다른 시점에서 어플리케이션을 바라본 점이라는 것을 인지하여 읽어주시면 감사하겠습니다**

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/after-prdm.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/after-prdm.png)

---

사전마다 거의 재각각으로 설명이 되어있지만, 공통적으로 나오는 내용으로 정리했을 때 모듈이라는 개념은 **독립적으로 운영될 수 있는 의미를 가지는 구성요소 단위** 라고 정의가 됩니다.

> 모듈은 여러 가지로 정의될 수 있지만, 일반적으로 큰 체계의 구성요소이고, 다른 구성요소와 독립적으로 운영된다.출처: wikipedia
> 

모듈이라는 용어는 개발 영역 안에서도 여러 영역에서 쓰이고 있습니다. 그렇다면 설계해야 할 프로젝트 모듈의 예시가 무엇이 있을까요? 답은 굉장히 간단했고 가까운 곳에 많이 있습니다. 우리가 제공받고 있는 의존 라이브러리들이 모두 모듈입니다. `Spring Framework`, `타 회사 연동용 라이브러리` 등등등 우리는 굉장히 많은 모듈들을 사용하고 있습니다.

그래서 많은 인지도와 인기를 가지고 있는 여러 오픈소스 라이브러리들 중 멀티 모듈 구조를 갖는 프로젝트들이 어떠한 구조로 모듈을 사용하고 있는지 참고하기 위해 찾아보았습니다. 라이브러리(프레임워크)와 우리가 구성해야할 시스템의 모듈은 제공 정도의 목적이 다르기 때문에 그들의 구조를 참고하는데에는 많은 괴리감이 있었습니다. 그러나 모듈 자체에 대한 특징에서는 공통적으로 어떠한 특징을 찾아낼 수 있었습니다.

- 모듈은 독립적인 의미가 갖는다.
- 모듈은 어떠한 추상화 정도에 대한 계층을 가지고 있다.
- 계층 간 의존 관계에 대한 규칙이 있다.

이러한 특징들을 우리가 설계해야할 시스템에 적용하여 고민하여 아래와 같은 시스템에서 가져야할 계층 구조를 정의했습니다.

![https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/modules.png](https://techblog.woowahan.com/wp-content/uploads/img/2019-07-01/modules.png)

- 독립 모듈 계층
- 도메인 모듈 계층
- 내부 모듈 계층
- 공통 모듈 계층
- 어플리케이션 모듈 계층

이러한 정의된 계층 구조를 갖음으로써 우리는 모듈이 어디까지 책임과 역할 가질 수 있는지를 명확히 할 수 있고, 의존 관계 또한 최소화하여 최적화된 프로젝트를 만들어낼 수 있습니다. 위 계층에 어떠한 독립적으로 의미를 갖는 모듈들이 배치될 수 있는지 살펴보겠습니다.
