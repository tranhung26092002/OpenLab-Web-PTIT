pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'react-app:latest'  // Tên image Docker
        CONTAINER_NAME = 'react-app'  // Tên container
    }

    stages {
        stage('Clean Old Containers') {
            steps {
                script {
                    // Kiểm tra và dừng container cũ nếu có
                    sh """
                    if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                        echo 'Stopping and removing old container...'
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image từ Dockerfile
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                script {
                    // Deploy container mới với Docker Compose
                    sh 'docker-compose down'  // Dừng các container cũ (nếu có)
                    sh 'docker-compose up -d'  // Khởi động container mới
                }
            }
        }
    }

    post {
        always {
            // Dọn dẹp sau mỗi lần build
            cleanWs()
        }
    }
}
