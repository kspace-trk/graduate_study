# �T�v

���_�������ۂ̘_���X�^�[�^�[�Z�b�g�D  
VSCode�̐ݒ�͂��̃��|�W�g�����N���[������΂n�j�D(�C���X�g�[����C.git�̃f�B���N�g���͍폜���Ă�)  
�����ɃC���X�g�[�����K�v�Ȃ��̂�����܂��D  

�ڂ�����esa���Q�ƁD  
https://otanilab.esa.io/  
���u/�Z�p�i���b�W/VSCode��Latex(���_)�ł�����𐮂���v

# ���O����
##  Latex �C���X�g�[��(�߂����᎞�Ԃ�����)
 ###  Windows
[���̃T�C�g�� �P�s�ڂɂ���install-tl-windows.exe�̃����N�𓥂��exe�����s���Ă��������B(����ɏ]���Α��v�ł��B)](https://www.tug.org/texlive/acquire-netinstall.html)
 ### Mac
```bash
$ brew cask install mactex-no-gui
```
Error: Calling brew cask install is disabled!�Əo��ꍇ�͈ȉ��ŃC���X�g�[��  
```bash 
$ brew install mactex-no-gui
```
### Linux
```bash 
$ sudo apt install texlive-full
```

## Latex�p�̃r���h�t�@�C���𐶐�

`.latexmkrc`�����ꂼ��A�����̃t�@�C���p�X��ō쐬����K�v���邪����܂��B  
- windows :  `C:\Users\[���[�U��]\.latexmkrc`
- mac : `/Users/USERNAME/.latexmkrc`
- linux : `~\.latexmkrc`

���e�͈ȉ��̂Ƃ���ł��B  
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
## �g���@�\ LaTeX Workshop �̃C���X�g�[��
VSCode�̊g���@�\������ʂ��� `latex`�Ɠ��͂��Ċg���@�\���C���X�g�[�����܂��傤�B  

# �r���h

## �r���h�R�}���h

`paper.tex`���J������Ԃ�  
-  Windows/Linux �� `ctrl + alt + b`  
-  Mac �� `? + ? + b `

�������ƁA�z�b�g�����[�h�`���̃r���h���n�܂�܂��B  
�G���[���Ȃ��΂��������\������Ȃ��̂ł�����ƕ|���ł����B  

## pdf�̃v���r���[

�z�b�g�����[�h�`���ɂȂ���pdf��VSCode�̉E���ɕ\�����܂��B  

`paper.tex`���J������Ԃ�

-  Windows/Linux �� `ctrl + alt + v`  
-  Mac �� `? + ? + v`

�ŉE���ɕ\�������͂��ł��B  

����Ńz�b�g�����[�h��ԂɂȂ��Ă���͂��ł��B  
������01.tex�Ȃǂ����������Ă݂Ă��������B  
�ۑ��ɑ������Ԃ�������܂����A�ύX�����f�ł��Ă���Α��v�ł��B  

