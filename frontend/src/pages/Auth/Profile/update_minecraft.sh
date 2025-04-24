#!/bin/bash

cd ~/minecraft-server || exit

echo "📦 Обновляю Paper до последней версии..."

# Удаление старого Paper
rm -f paper.jar

# Получение последней версии Paper
LATEST_VERSION=$(curl -s https://api.papermc.io/v2/projects/paper | grep -oE '"versions":\[[^]]+' | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | tail -1)
LATEST_BUILD=$(curl -s https://api.papermc.io/v2/projects/paper/versions/$LATEST_VERSION/builds | grep -oE '"build":\s*[0-9]+' | grep -oE '[0-9]+' | tail -1)
PAPER_URL="https://api.papermc.io/v2/projects/paper/versions/$LATEST_VERSION/builds/$LATEST_BUILD/downloads/paper-$LATEST_VERSION-$LATEST_BUILD.jar"

echo "🧩 Paper $LATEST_VERSION (build $LATEST_BUILD)"
curl -o paper.jar "$PAPER_URL"

echo "🧼 Очищаю старые плагины Geyser/Floodgate..."
rm -f plugins/Geyser-Spigot.jar plugins/floodgate-spigot.jar

echo "🌉 Скачиваю свежий Geyser..."
curl -L -o plugins/Geyser-Spigot.jar https://download.geysermc.org/v2/projects/geyser/versions/latest/builds/latest/downloads/spigot

echo "🪜 Скачиваю свежий Floodgate..."
curl -L -o plugins/floodgate-spigot.jar https://download.geysermc.org/v2/projects/floodgate/versions/latest/builds/latest/downloads/spigot

echo "🚀 Перезапуск сервера..."
java -Xms1G -Xmx2G -jar paper.jar