# ---- Build stage ----
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# 1) wrapper 먼저 복사(캐시)
COPY gradlew ./gradlew
COPY gradle/wrapper ./gradle/wrapper
RUN chmod +x ./gradlew

# 2) 의존성 메타만 먼저 복사해서 캐시 워밍업
COPY build.gradle settings.gradle gradle.properties* ./

# (Gradle 플러그인/의존성 다운) — 실패하면 wrapper 설정이 여전히 잘못된 것
RUN ./gradlew --no-daemon --version

# 3) 앱 소스 복사
COPY src ./src

# 4) 테스트는 일단 스킵하여 빌드(필요시 -x test 제거)
RUN ./gradlew --no-daemon clean bootJar -x test

# ---- Run stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/build/libs/*SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
