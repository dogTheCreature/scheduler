#!/bin/bash

# プロジェクトルートディレクトリへのパス
PROJECT_ROOT=$(dirname $(dirname $(realpath $0)))

# .env.testファイルの読み込み
set -a
source ./.env.test.local
set +a

# ワイルドカードを展開してファイルのリストを取得
files=$(ls ../db/test/*.sql)

# マウントする引数を作成
mount_args=""
for file in $files; do
    mount_args="$mount_args -v $file:/docker-entrypoint-initdb.d/$(basename $file)"
done

# テスト用MariaDBコンテナの起動
echo "Starting MariaDB container..."
echo "podman run --name $DB_CONTAINER_NAME \
    -e MYSQL_ROOT_PASSWORD=$DB_ROOT_PASSWORD \
    -e MYSQL_USER=$DB_USER \
    -e MYSQL_PASSWORD=$DB_PASSWORD \
    -e MYSQL_DATABASE=$DB_NAME \
    -v $PROJECT_ROOT/db/00_init.sql:/docker-entrypoint-initdb.d/00_init.sql:ro \
    $mount_args \
    -p $DB_PORT:3306 \
    -d mariadb:latest"
podman run --name $DB_CONTAINER_NAME \
    -e MYSQL_ROOT_PASSWORD=$DB_ROOT_PASSWORD \
    -e MYSQL_USER=$DB_USER \
    -e MYSQL_PASSWORD=$DB_PASSWORD \
    -e MYSQL_DATABASE=$DB_NAME \
    -v $PROJECT_ROOT/db/00_init.sql:/docker-entrypoint-initdb.d/00_init.sql:ro \
    $mount_args \
    -p $DB_PORT:3306 \
    -d mariadb:latest

# コンテナの起動を待つ
echo "Waiting for MariaDB to start..."
sleep 5

# テストの実行
echo "Running tests..."
npm test -- --detectOpenHandles

# テスト用MariaDBコンテナの停止と削除
echo "Stopping and removing MariaDB container..."
podman stop $DB_CONTAINER_NAME
podman rm $DB_CONTAINER_NAME
podman volume prune -f

echo "Test complete."
