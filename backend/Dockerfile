FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

COPY . .

# Gradle Wrapper + zip 포함했으니 오프라인으로 실행
RUN ./gradlew --offline bootJar

# 실행용 단계
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
