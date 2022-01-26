# 概要

卒論を書く際の論文スターターセット．  
VSCodeの設定はこのリポジトリをクローンすればＯＫ．(インストール後，.gitのディレクトリは削除してね)  
※他にインストールが必要なものがあります．  

詳しくはesaを参照．  
https://otanilab.esa.io/  
より「/技術ナレッジ/VSCodeでLatex(卒論)できる環境を整える」

# 事前準備
##  Latex インストール(めっちゃ時間かかる)
 ###  Windows
[このサイトの １行目にあるinstall-tl-windows.exeのリンクを踏んでexeを実行してください．(流れに従えば大丈夫です．)](https://www.tug.org/texlive/acquire-netinstall.html)
 ### Mac
```bash
$ brew cask install mactex-no-gui
```
Error: Calling brew cask install is disabled!と出る場合は以下でインストール  
```bash 
$ brew install mactex-no-gui
```
### Linux
```bash 
$ sudo apt install texlive-full
```

## Latex用のビルドファイルを生成

`.latexmkrc`をそれぞれ，いかのファイルパス先で作成する必要するがあります．  
- windows :  `C:\Users\[ユーザ名]\.latexmkrc`
- mac : `/Users/USERNAME/.latexmkrc`
- linux : `~\.latexmkrc`

内容は以下のとおりです．  
```bash
#!/usr/bin/env perl

# LaTeX
$latex = 'platex -synctex=1 -halt-on-error -file-line-error %O %S';
$max_repeat = 5;

# BibTeX
$bibtex = 'pbibtex %O %S';
$biber = 'biber --bblencoding=utf8 -u -U --output_safechars %O %S';

# index
$makeindex = 'mendex %O -o %D %S';

# DVI / PDF
$dvipdf = 'dvipdfmx %O -o %D %S';
$pdf_mode = 3;

# preview
$pvc_view_file_via_temporary = 0;
if ($^O eq 'linux') {
    $dvi_previewer = "xdg-open %S";
    $pdf_previewer = "xdg-open %S";
} elsif ($^O eq 'darwin') {
    $dvi_previewer = "open %S";
    $pdf_previewer = "open %S";
} else {
    $dvi_previewer = "start %S";
    $pdf_previewer = "start %S";
}

# clean up
$clean_full_ext = "%R.synctex.gz"
```
## 拡張機能 LaTeX Workshop のインストール
VSCodeの拡張機能検索画面から `latex`と入力して拡張機能をインストールしましょう．  

# ビルド

## ビルドコマンド

`paper.tex`を開いた状態で  
-  Windows/Linux は `ctrl + alt + b`  
-  Mac は `? + ? + b `

を押すと，ホットリロード形式のビルドが始まります．  
エラーがないばあい何も表示されないのでちょっと怖いですが．  

## pdfのプレビュー

ホットリロード形式になったpdfをVSCodeの右側に表示します．  

`paper.tex`を開いた状態で

-  Windows/Linux は `ctrl + alt + v`  
-  Mac は `? + ? + v`

で右側に表示されるはずです．  

これでホットリロード状態になっているはずです．  
試しに01.texなどを書き換えてみてください．  
保存に多少時間がかかりますが，変更が反映できていれば大丈夫です．  

