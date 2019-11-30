function exec(vari) {
    var code = document.getElementById("code").contentWindow.document;
    console.log(vari);
    code.open();
    code.writeln(vari);
    code.close();
}
