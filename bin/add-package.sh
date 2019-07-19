#!/bin/bash

echo "当前packages目录下的所有组件列表"

for dir in $(ls ./packages)
do
  echo $dir
done

echo "只需要输入cut-chart-之后的内容，脚本会自动补全"
read -p "请输入package名称：" packageName
echo $packageName

while [ -d ./packages/cut-chart-$packageName ]
do
 read -p "该组件已存在，请重新输入package名称：" packageName
done

mkdir ./packages/"cut-chart-$packageName"

cp -r ./template/* ./packages/"cut-chart-$packageName"

sed -i "s/_packageName/$packageName/g" `grep _packageName -rl ./packages/cut-chart-$packageName`

echo "package目录初始化完成"

lerna bootstrap

lerna list
