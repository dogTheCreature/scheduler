#!/bin/bash

# プロジェクトルートディレクトリへのパス
PROJECT_ROOT=$(dirname $(dirname $(realpath $0)))

# .env.testファイルの読み込み
set -a
source $PROJECT_ROOT/.env.test
set +a

# テスト用MariaDBコンテナの起動
echo "Starting MariaDB container..."
podman run --name $DB_CONTAINER_NAME \
    -e MYSQL_ROOT_PASSWORD=$DB_ROOT_PASSWORD \
    -e MYSQL_USER=$DB_USER \
    -e MYSQL_PASSWORD=$DB_PASSWORD \
    -e MYSQL_DATABASE=$DB_NAME \
    -v $PROJECT_ROOT/db/init.sql:/docker-entrypoint-initdb.d/init.sql:ro \
    -p $DB_PORT:3306 \
    -d mariadb:latest

# コンテナの起動を待つ
echo "Waiting for MariaDB to start..."
sleep 10

# テストの実行
echo "Running tests..."
npm test -- --detectOpenHandles

# テスト用MariaDBコンテナの停止と削除
echo "Stopping and removing MariaDB container..."
podman stop $DB_CONTAINER_NAME
podman rm $DB_CONTAINER_NAME

echo "Test complete."
