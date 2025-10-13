pipeline {
  agent any

  environment {
    DOCKERHUB_REPO = "shuvra458/devtools-suite"
    IMAGE_TAG = "${env.GIT_COMMIT}"
    LATEST_TAG = "latest"
    DOCKER_CRED_ID = "dockerhub-creds"
    PROJECT_ROOT = "."   // repo root (contains manage.py)
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install deps & Lint') {
      steps {
        sh '''
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pip install flake8 || true
          flake8 . || true
        '''
      }
    }

    stage('Tests') {
      steps {
        sh '''
          if [ -f pytest.ini ] || [ -d tests ]; then
            pip install pytest
            pytest -q || true
          else
            echo "No tests found, skipping"
          fi
        '''
      }
    }

    stage('Build Image') {
      steps {
        sh '''
          IMAGE=${DOCKERHUB_REPO}:${IMAGE_TAG}
          docker build -t ${IMAGE} .
        '''
      }
    }

    stage('Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CRED_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker tag ${DOCKERHUB_REPO}:${IMAGE_TAG} ${DOCKERHUB_REPO}:${LATEST_TAG}
            docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}
            docker push ${DOCKERHUB_REPO}:${LATEST_TAG}
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Build and push succeeded."
    }
    failure {
      echo "Pipeline failed."
    }
  }
}
