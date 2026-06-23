.PHONY: build
build: 
	@docker build -t devops-configuration-generator .
	@echo "Docker image built successfully: devops-configuration-generator"
	@docker volume create devops-configuration-generator-volume
	@echo "Docker volume created successfully: devops-configuration-generator-volume"

.PHONY: run
run:
	@docker run -dp 3000:3000 --name devops-configuration-generator devops-configuration-generator
	@echo "Docker container started successfully: devops-configuration-generator"

.PHONY: stop
stop:
	@docker stop devops-configuration-generator
	@echo "Docker container stopped successfully: devops-configuration-generator"

.PHONY: start
start:
	@docker start devops-configuration-generator
	@echo "Docker container started successfully: devops-configuration-generator"

.PHONY: restart
restart:
	@docker restart devops-configuration-generator
	@echo "Docker container restarted successfully: devops-configuration-generator"

.PHONY: rm
rm:
	@docker rm -f devops-configuration-generator
	@echo "Docker container removed successfully: devops-configuration-generator"

.PHONY: clean
clean:
	@docker rmi devops-configuration-generator
	@echo "Docker image removed successfully: devops-configuration-generator"