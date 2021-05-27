#!/usr/bin/env bash

rm -fr server
mkdir server
mkdir server/cws
mkdir server/fb
mkdir server/ok
mkdir server/vk
mkdir server/vkm
mkdir server/win
mkdir server/android

cp -r build/* server
cp -r build/* server/cws
cp -r build/* server/fb
cp -r build/* server/ok
cp -r build/* server/vk
cp -r build/* server/vkm
cp -r build/* server/win
cp -r build/* server/android

echo '{"app":"pwa"}' > server/settings.json
echo '{"app":"cws"}' > server/cws/settings.json
echo '{"app":"fb"}'  > server/fb/settings.json
echo '{"app":"ok"}'  > server/ok/settings.json
echo '{"app":"vk"}'  > server/vk/settings.json
echo '{"app":"vkm"}' > server/vkm/settings.json
echo '{"app":"win"}' > server/win/settings.json
echo '{"app":"android"}' > server/android/settings.json

exit;