var NanoTimer = require('nanotimer');

var tiMer = new NanoTimer();
var ffs = new NanoTimer();
var rpkeyword, rpcomment, rpurl, rplastsite, rpkwID, lastrpID
var oplimitkw, oplimitwin, googledom, googlelang
var listberitaabc
var x = 0
var c
var countbacklink = 0
var countlastbacklink
var IsDone
var mUUID
var jenis
mUUID = stash.get('uuid')


/*begin contextmenu*/
'use strict';

const electron = require('electron');
const remote = electron.remote;
const Menu = remote.Menu;

const InputMenu = Menu.buildFromTemplate([{
    label: 'Copy',
    role: 'copy',
}, {
    label: 'Paste',
    role: 'paste',
}, {
    type: 'separator',
}, {
    label: 'Select all',
    role: 'selectall',
}, ]);

document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();

    var node = e.target;

    while (node) {
        if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
            InputMenu.popup(remote.getCurrentWindow());
            break;
        }
        node = node.parentNode;
    }
});
/* end contextmenu*/

//var licinput = stash.get('license')
/*if (licinput) {
    $('#LicInput').val(licinput)
}
*/
countlastbacklink = stash.get('lastbacklink')
lastid = stash.get('lastid')
IsDone = stash.get('IsDone')
if (countlastbacklink == undefined || countlastbacklink == NaN) {
    stash.set('lastbacklink', 0)
    countlastbacklink = 0
}
if(lastid == undefined || lastid == NaN){
    stash.set('lastid', 0)
    lastid = 0
}
if(IsDone == undefined || IsDone == NaN){
    stash.set('IsDone', 0)
    IsDone = 0
}


require("machine-uuid")((uuid) => {
    if (!mUUID) {
        mUUID = reverseString(uuid)
        stash.set('uuid', mUUID)
    } else {
        mUUID = stash.get('uuid')
    }
})

oplimitkw = stash.get('limitkw')
oplimitwin = stash.get('winSet')
googledom = stash.get('googledom')
googlelang = stash.get('googlelang')

try {
    if (oplimitkw && oplimitkw !== undefined) {
        $('#limitkw').val(oplimitkw).change();
    }
} catch (e) {

}
try {
    if (oplimitwin && oplimitwin !== undefined) {
        $('#winSetting').val(oplimitwin).change();
    }
} catch (e) {

}
try {
    if (oplimitwin && oplimitwin !== undefined) {
        $('#googledom').val(googledom).change();
        $('#googledomdetail').text(googledom)
    }
} catch (e) {

}
try {
    if (oplimitwin && oplimitwin !== undefined) {
        $('#googlelang').val(googlelang).change();
        $('#googlelangdetail').text(googlelang)
    }
} catch (e) {

}

$.getScript("https://dwsbacklinkhelper.firebaseapp.com/listberita.js")
    .done((script, textStatus) => {
        listberitaabc = listberita;
        c = listberitaabc.length
        $("#abclength").html((c - 1) + " backlink article")
    })
    .fail((jqxhr, settings, exception) => {
        //console.log('fetch berita gagal')
    });

$('#plist').hide();
$('#apdomerror').hide()
$('#savespin').hide()
$('#serpdetail').hide()

getsyncProject = () => {
    $("#projid").empty();
    $('#projectSerp').children('option:not(:first)').remove();
    //$("#projectSerp").append(new Option('Select Project', '0'));
    db.values('project', null, 100000).always((records) => {
        for (i = 0; i < records.length; i++) {
            var projid = document.getElementById("projid")
            var btnproj = document.createElement("button")
            btnproj.innerHTML = records[i].domain
            btnproj.setAttribute("id", "projectID-" + records[i].id)
            btnproj.setAttribute("class", "list-group-item")
            projid.appendChild(btnproj)
            $("#projectSerp").append(new Option(records[i].domain, records[i].id));
        }
    });
}

getsyncProject()

$(document).on("click", "button", function () {
    var btnid = this.id;
    var btnAddProject = btnid.indexOf("addproject")
    var btnProjectId = btnid.indexOf("projectID-")
    var btnsaveProject = btnid.indexOf("btnsaveProject")
    var btndeleteProject = btnid.indexOf("deleteProject")
    var btnrandkom = btnid.indexOf("randkom")
    var btnsaveset = btnid.indexOf('savesetting')
    var btndelkw = btnid.indexOf('deletekw-')
    var btndelallkw = btnid.indexOf('deleteAllkw')
    var btnrunproject = btnid.indexOf('runProject-')
    var btnsavewinset = btnid.indexOf('savewinsetting')
    var btnreload_abcwb0 = btnid.indexOf('reload-abcwb0')
    var btnreload_abcwb1 = btnid.indexOf('reload-abcwb1')
    var btnreload_abcwb2 = btnid.indexOf('reload-abcwb2')
    var btnreload_abcwb3 = btnid.indexOf('reload-abcwb3')
    var btngoback_abcwb0 = btnid.indexOf('goback-abcwb0')
    var btngoback_abcwb1 = btnid.indexOf('goback-abcwb1')
    var btngoback_abcwb2 = btnid.indexOf('goback-abcwb2')
    var btngoback_abcwb3 = btnid.indexOf('goback-abcwb3')
    var btnsavelic = btnid.indexOf('savelicsetting')
    var btnsavegoogle = btnid.indexOf('savegooglesetting')
    var btnrunall = btnid.indexOf('runall')
    var btnstop = btnid.indexOf('stopall')
    var btnpause = btnid.indexOf('pauseall')
    if (btnsavegoogle > -1) {
        var godom = $('#googledom').val()
        var golang = $('#googlelang').val()
        var goid = createRandomString(6);
        stash.set('googledom', godom)
        stash.set('googlelang', golang)
        $('#googledom').val(godom).change();
        $('#googlelang').val(golang).change();
    }

    if (btnsavelic > -1) {
        var licenseinput = $('#LicInput').val()
        stash.set('license', licenseinput)
        $.messager.alert('SimpleBacklink.co.id', 'License setting saved.');
    }

    if (btngoback_abcwb0 > -1) {
        var cgb = abcwb0.canGoBack();
        if (cgb == true) {
            abcwb0.goBack();
        }
    }
    if (btngoback_abcwb1 > -1) {
        var cgb = abcwb1.canGoBack();
        if (cgb == true) {
            abcwb1.goBack();
        }
    }
    if (btngoback_abcwb2 > -1) {
        var cgb = abcwb2.canGoBack();
        if (cgb == true) {
            abcwb2.goBack();
        }
    }
    if (btngoback_abcwb3 > -1) {
        var cgb = abcwb3.canGoBack();
        if (cgb == true) {
            abcwb3.goBack();
        }
    }

    if (btnreload_abcwb0 > -1) {
        abcwb0.reloadIgnoringCache();
    }
    if (btnreload_abcwb1 > -1) {
        abcwb1.reloadIgnoringCache();
    }
    if (btnreload_abcwb2 > -1) {
        abcwb2.reloadIgnoringCache();
    }
    if (btnreload_abcwb3 > -1) {
        abcwb3.reloadIgnoringCache();
    }

    if (btnsaveset > -1) {
        var limitkw = 1;
        stash.set('limitkw', limitkw);
        $.messager.alert('SimpleBacklink.co.id', 'Backlink setting saved.');
    }

    if (btnsavewinset > -1) {
        var winset = $('#winSetting').val()
        stash.set('winSet', winset);
        $.messager.alert('SimpleBacklink.co.id', 'Window setting saved.');
    }

    if (btnrunproject > -1) {
        var winSet = stash.get('winSet')
        var rpid = btnid.replace('runProject-', '')
        runProjectThread(rpid, winSet,"satu")
    }

    if(btnstop > -1){
        stopRun()
    }
    if (btndelallkw > -1) {
        delAllkw()
    }

    if (btndelkw > -1) {
        var pid = $('#pid').val()
        var dkwid = btnid.replace('deletekw-', '')
        delkw(dkwid, pid)
    }

    if (btnrandkom > -1) {
        $('#komentar1').val(randComment(autocomment))
    }

    if (btndeleteProject > -1) {
        var dpid = btnid.replace('deleteProject-', '')
        db.from('kwlist').where('pid', '=', dpid).list().done((records) => {
            var cekdb = records
            if (cekdb.length > -1 || cekdb.length > 0) {
                for (i = 0; i < records.length; i++) {
                    if (records[i].pid == dpid) {
                        db.remove('kwlist', parseInt(records[i].id)).done(() => {
                            //console.log('removed')
                        });
                    }
                }
            }
        });

        setTimeout(() => {
            db.remove('project', parseInt(dpid)).done(() => {
                $('#plist').hide();
                getsyncProject()
            });
        }, 500)

    }

    if (btnProjectId == 0) {
        var id = btnid.replace("projectID-", "");
        var dpID = "deleteProject-" + id
        var projName = document.getElementById(btnid).innerHTML
        $('#t1').html(projName)
        $('.deletePro').attr('id', dpID)
        $('#pid').val(id)
        showplist()
        getsyncdb(id)
        $("#valueid").text(id)
    }

    if (btnsaveProject > -1) {
        db.values('project', null, 100000).always((records) => {
            if (records.length > 2) {
                $("#AddProjectModal").modal("toggle")
                $.messager.alert('Errors!', 'trial beta only 1 project allowed.');
            } else {
                var addProjDom = $('#addprojectdomain').val()
                var apd = addProjDom.replace("http://", "")
                apd = apd.replace("https://", "")
                apd = apd.replace("www.", "")

                var chkdom = CheckIsValidDomain(apd)
                if (chkdom) {
                    $('#apdomerror').hide()
                    $('#apdom').removeClass('has-error')
                    $('#addprojectdomain').val(apd)
                    var pid1 = createRandomString(6);
                    db.put('project', {
                        domain: apd,
                        projectid: pid1
                    })
                    
                    getsyncProject()
                    $("#AddProjectModal").modal("toggle")
                } else {
                    $('#apdomerror').show()
                    $('#apdom').addClass('has-error')
                }
            }
        })

        //$("#AddProjectModal").modal("toggle")
    }

    if (btnAddProject > -1) {
        //addAnother()
    }

    console.log(btnid)
});

$(document).on("click", "a", function () {
    var aid = this.id;
});

$("#saveautofills").submit((e) => {
    e.preventDefault();
    savefills();
})

/* begin Custom Function for index.html */
CheckIsValidDomain = (domain) => {
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,24})$/);
    return domain.match(re);
}

createRandomString = (length) => {
    var str = '';
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(
        '');
    var charsLen = chars.length;
    if (!length) {
        length = ~~(Math.random() * charsLen);
    }
    for (var i = 0; i < length; i++) {
        str += chars[~~(Math.random() * charsLen)];
    }
    return str;
}

showplist = () => {
    $('#plist').show()
}

addAnother = () => {
    var projid = document.getElementById("projid");
    var btnproj = document.createElement("button");
    var children = projid.children.length + 1
    btnproj.innerHTML = 'project_' + children;
    btnproj.setAttribute("id", "projectID-" + children)
    btnproj.setAttribute("class", "list-group-item")
    projid.appendChild(btnproj)
}

$("#projectSerp").change(() => {

    $("#projectSerp option:selected").each(() => {
        //console.log($( this ).text())
        if ($(this).val() !== "")
            $('#domainSerp').text($(this).text())
        $('#serpdetail').show()
    });

});

getsyncGoogleSetting = () => {

}

cekkwdom.addEventListener('did-finish-load', () => {
    thedom = $('#cekkwdom').attr('src')
    if (thedom !== 'about:blank')
        savefills2(thedom)
})

savefills = () => {
    $('#savespin').show()
    var thedom = ""
    var cekdom9 = $('#t1').html()
    var kwid1 = createRandomString(6);
    var ioukom = document.getElementById('ioukom').value;
    var kw_kom = $("#keyword").val();
    var url_kom = $("#url").val();
    $("#cekkwdom").attr('src', url_kom)

    //cekkwdom.removeEventListener("did-finish-load",null,false);
}

savefills2 = (thedom) => {

    setTimeout(() => {
        var cekdom9 = $('#t1').html()
        var kwid1 = createRandomString(6);
        var ioukom = document.getElementById('ioukom').value;
        var kw_kom = $("#keyword").val();
        var url_kom = $("#url").val();
        thedom = thedom.replace("http://www.", "");
        thedom = thedom.replace("https://www.", "");
        thedom = thedom.replace("http://", "");
        thedom = thedom.replace("https://", "");
        var cekdom1 = thedom.indexOf(cekdom9)

        if (cekdom1 > -1) {
            //console.log('domain and project is the same.')
            url_kom = url_kom.replace("http://www.", "");
            url_kom = url_kom.replace("https://www.", "");
            url_kom = url_kom.replace("http://", "");
            url_kom = url_kom.replace("https://", "");
            var komentar1 = $("#komentar1").val();
            var pid = $('#pid').val()
            $('#fkw').removeClass('has-error')
            $('#furl').removeClass('has-error')
            $('#fcom').removeClass('has-error')
            if (kw_kom == '') {
                $('#fkw').addClass('has-error')
                $.messager.alert('Errors!', 'Keyword can\'t be empty.');
            } else if (url_kom == '') {
                $('#furl').addClass('has-error')
                $.messager.alert('Errors!', 'URL can\'t be empty.');
            } else if (komentar1 == '') {
                $('#fcom').addClass('has-error')
                $.messager.alert('Errors!', 'Comment can\'t be empty.');
            } else {
                db.put('kwlist', {
                    keyword: kw_kom,
                    url: url_kom,
                    comment: komentar1,
                    backlink: 0,
                    pid: pid,
                    lastsite: 0,
                    kwid: kwid1
                });
                getsyncdb(pid)
                $.messager.alert('SimpleBacklink.co.id', 'Autofills Saved.');
                $("#keyword").val("");
                $("#url").val('');
                $("#komentar1").val('');
            }

        } else {
            $.messager.alert('Errors!', 'Project domain and the url (redirected page) must be the same domain.');
        }
        $("#cekkwdom").attr('src', 'about:blank')
        $('#savespin').hide()
    }, 500)
}

getsyncdb = (projid) => {
    $('#fkw').removeClass('has-error')
    $('#furl').removeClass('has-error')
    $('#fcom').removeClass('has-error')
    $('#listkw').find('#listkwbody > tr').remove();
    var id = projid
    db.from('kwlist').where('pid', '=', id).list().done((records) => {
        var cekdb = records
        if (cekdb.length > -1 || cekdb.length > 0) {
            for (i = 0; i < records.length; i++) {
                var cb99 = 0
                if (records[i].lastsite !== 0) {
                    var cb99 = records[i].lastsite + 1
                }
                var table = document.getElementById("listkwbody");
                var rowss = document.getElementById("listkwbody").rows.length;
                var row = table.insertRow(rowss);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                cell1.innerHTML = (rowss + 1);
                cell2.innerHTML = records[i].keyword;
                cell3.innerHTML = '<a class="url_kom" data-id="' + records[i].id + '" href="http://' + records[i].url + '" target="_blank">' + records[i].url + '</a>';
                cell4.innerHTML = records[i].comment;
                cell5.innerHTML = cb99;
                cell6.innerHTML = '<button id="runProject-' + records[i].id + '" class="btn btn-success btn-xs" data-target="#runprojectTab" data-toggle="tab" target="_self">Run Project</button>';
                cell7.innerHTML = '<button id="deletekw-' + records[i].id + '" class="btn btn-danger btn-xs" target="_self">delete</button>';
            }
        }
    });
}

delkw = (id, projid) => {
    db.remove('kwlist', parseInt(id)).done(() => {
        getsyncdb(projid)
    });
    $.messager.alert('SimpleBacklink.co.id', 'Autofill deleted Successfully.');
}

delAllkw = () => {
    //db.clear('kwlist');
    //console.log('db cleared successfully');
    //window.location.reload();
}

randComment = (input) => {
    var rand = input[(Math.random() * input.length) | 0];
    return rand;
}

var autocomment = [
    "informasi yang bagus sekali semoga info ini bermanfaat",
    "Terimakasih atas informasi artikelnya menarik sekali",
    "terimakasih atas informasinya",
    "informasi ini sangat bagus sekali terimakasih telah berbagi, terus update",
    "saya kagum dengan artikel ini banyak sekali yang berminat membaca artikel ini",
    "baik sekali agan membuat informasi yang bagus seperti ini lanjutkan",
    "saya berterimakasih karena website ini selalu memberikan hal menarik",
    "website ini mempunyai banyak sekali informasi menarik, terus update gan",
    "website ini memberikan segala informasi yang bagus dan bermanfaat",
    "makasih gan, lanjutkan update nya",
    "ditunggu update selanjutnya",
    "pertamax gan terimakasih untuk infonya",
    "sering-sering update lagi artikelnya",
    "artikelnya sudah bagus, di tunggu update terbarunya terimakasih",
    "infonya sangat menarik bos",
    "sering - sering update artikelnya",
    "informasi yang sangat mudah di pahami terimakasih admin",
    "jarang sekali ada web site yang meyediakan artikel semenarik ini",
    "sangat memuaskan sekali artikelnya sangat mudah untuk di pahami",
    "terimakasih sangat bermanfaat dan informatif",
    "saya berterimakasih karena website ini selalu memberikan hal menarik kepada kami",
    "lanjutkan buat artikel menarik dan informatif lainnya",
    "sangat menarik dan informatif terus update artikel terbarunya",
    "Terimakasih atas beritanya pak, Saya Tunggu Berita yang barunya lagi",
    "selamat pagi wishnya semoga yang terbaik dan kebaikan selalu memihak aamiin",
    "Situs Anda selalu memberikan berita yang update, menarik dan bermanfaat",
    "Bagi bapak atau ibu admin web yang menyajikan banyak informasi ini,kami menunggu berita terbaru dari web yang ber kualitas ini",
    "hebat postingannya, inspiratif banget…",
    "terima kasih infonya !!!",
    "thanks atas share informasinya semoga bertambah lagi ilmunya",
    "TQ sob atas infonya",
];

cektitle = () => {
    const abcwb0 = document.querySelector('#abcwb0')
    var abcwb0Title = abcwb0.getTitle().toLowerCase();
    var c19 = 0
    var limitnas= stash.get('limitid')
    var IsDones = stash.get('IsDone')
    var limitss = stash.get('limitid')
    console.log(abcwb0Title)
    if (abcwb0Title == "submitted") {
        //tiMer.clearInterval()
        stoptiMer(tiMer)
        c19++
        //console.log("c1: " + c19)
        if (c19 == 1) {
            //console.log("c2: " + c19)
            //abcwbnext(0)
            //tiMer.clearInterval()
            stoptiMer(tiMer)
            //setTimeout(() => {

            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                if(jenis == "all"){
                    if(limitnas == 0){
                        $.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                        $('#menu-project').trigger('click');
                        stash.set('IsDone',0)
                        stash.set('limitid',0)
                        stash.set('lastid',0)
                    }
                    else{
                        stash.set('IsDone',1)
                        if(limitss > 0){
                            $('#next-abc').click()
                        }
                        else{
                            abcwb0.stop()
                            stoptiMer(tiMer)
                            $('#menu-project').trigger('click');
                            getsyncdb(rppID)
                                //getsyncProject()
                            countbacklink = 0
                        }
                    }
                }
                else{
                    abcwb0.stop()
                    stoptiMer(tiMer)
                    //stash.set('IsDone',0)
                    $('#menu-project').trigger('click');
                    getsyncdb(rppID)
                    //getsyncProject()
                    countbacklink = 0
                }    
            } else {
                $('#next-abc').click()
            }
            //},5000)

        }

    } else if (abcwb0Title.indexOf('404') > -1 ||
        abcwb0Title.indexOf('hacke') > -1 ||
        abcwb0Title.indexOf('hosting') > -1 ||
        abcwb0Title.indexOf('406') > -1 ||
        abcwb0Title.indexOf('account suspended') > -1 ||
        abcwb0Title.indexOf('suspended.cgi') > -1 ||
        abcwb0Title.indexOf('suspende.cgi') > -1 ||
        abcwb0Title.indexOf('suspendedpage.cgi') > -1 ||
        abcwb0Title.indexOf('Not Found') > -1 ||
        abcwb0Title.indexOf('login aktifitas') > -1) {
        c19++
        if (c19 == 1) {
            //abcwbnext(0)
            //tiMer.clearInterval()
        stoptiMer(tiMer)
            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                if(jenis == "all"){
                    if(limitnas == 0){
                        $.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                        $('#menu-project').trigger('click');
                        stash.set('IsDone',0)
                        stash.set('limitid',0)
                        stash.set('lastid',0)
                    }
                    else{
                        stash.set('IsDone',1)
                        if(limitss > 0){
                            $('#next-abc').click()
                        }
                        else{
                            abcwb0.stop()
                            stoptiMer(tiMer)
                            $('#menu-project').trigger('click');
                            getsyncdb(rppID)
                                //getsyncProject()
                            countbacklink = 0
                        }
                    }
                }
                else{
                    abcwb0.stop()
                    stoptiMer(tiMer)
                    //stash.set('IsDone',0)
                    $('#menu-project').trigger('click');
                    getsyncdb(rppID)
                    //getsyncProject()
                    countbacklink = 0
                }
            } else {
                $('#next-abc').click()
            }

        }
        //tiMer.clearInterval()
        stoptiMer(tiMer)
    }
}

function getColumn(table_id, col) {
    var tab = document.getElementById(table_id),
        n = tab.rows.length,
        arr = [],
        row;
    
    if (col < 0) {
        return arr; // Return empty Array.
    }
    for (row = 1; row < n; ++row) {
        if (tab.rows[row].cells.length > col) {
            arr.push(tab.rows[row].cells[col].innerText);
        }
    }
    return arr;
}

function sendHeartBeat() {
    var IsDone = stash.get('IsDone')
    var limits = stash.get('limitid')
    if(IsDone == 1){
        if(limits != 0){
            $("#runall").click()
        }
        else{
            
        }
    }
}

startTimer = (timer) => {
    timer.setInterval(sendHeartBeat,'','1s')
}

stoptiMer = (timer) => {
    timer.clearInterval()
}
stopRun = () => {
    clearInterval(runProjectThread)
    clearInterval(cektitle)
    $('#menu-project').trigger('click');
}

function runAll(){
    jenis = "all"
    var id  = $("#valueid").text();
    db.from('kwlist').where('pid', '=', id).list().done((records) => {
        var cekdb = records
        if (cekdb.length > -1 || cekdb.length > 0) {
            for (i = 0; i < records.length; i++) {
                var idna = (parseInt(cekdb[i].id)-(cekdb.length-1))
                var idna2 = (parseInt(idna)+1)
                var win = stash.get('winSet')
                var selesai = stash.get('IsDone')
                var limited = stash.get('limitid')
                var lastiid = stash.get('lastid')
                var ids = 0
                if(selesai == 0){
                    stash.set('limitid',cekdb.length)
                    stash.set('lastid',idna)
                    ids = (parseInt(cekdb[i].id)-1)
                }
                else{
                    stash.set('limitid',cekdb.length-1)
                    stash.set('lastid',idna2)
                    ids = idna2
                }
                var muid = stash.get('uuid')
                oplimitkw = stash.get('limitkw')
                $('li.active').removeClass('active');
                $("#next-abc").off()
                $("#prev-abc").off()
                x = 0
                db.get('kwlist', parseInt(ids)).done((records) => {
                    rpkeyword = records.keyword
                    rpurl = records.url
                    rpcomment = records.comment
                    rpkwID = records.kwid
                    rppID = records.pid
                    countlastbacklink = stash.get('lastbacklink')
                    rplastsite = records.lastsite

                    if (countlastbacklink !== 0) {
                        countlastbacklink += 1
                    }

                    if (countlastbacklink || countlastbacklink !== "NaN" && countlastbacklink !== 'undefined') {
                        x = parseInt(countlastbacklink)
                    } else {
                        x = 0
                    }

                    var runtab = document.getElementById("runprojectContainer")
                    $("#runprojectContainer").empty();
                    var creatediv = document.createElement("div")
                    creatediv.className = "row"
                    if (win == 1) {
                        creatediv.innerHTML = '<div class="col-md-12"> </div><button class="btn btn-danger btn-xs" id="reload-abcwb0">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb0">Go Back</button> <button id="stopall" class="btn btn-danger btn-xs">Stop</button> <span id="abcwb0indicator" style="margin-right:10px!important;color:#000;"></span><hr/><webview class="wb1" id="abcwb0" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity allowpopups=false autosize minwidth="576" maxheight="200"></webview></div>'
                        runtab.appendChild(creatediv)
                        x = countlastbacklink
                        changewbsrc(0)
                        countbacklink += 1
                    
                        const abcwb0 = document.querySelector('#abcwb0')
                        const abcwb0loadstart = () => {
                            abcwb0indicator.innerText = 'loading...'
                        }
                        const abcwb0loadstop = () => {
                            abcwb0indicator.innerText = ''
                            stoptiMer(tiMer)

                            

                            tiMer.setInterval(cektitle, '', '10s')
                        }
                        abcwb0.addEventListener('did-start-loading', abcwb0loadstart)
                        //abcwb.addEventListener('did-stop-loading', abcloadstop)
                        abcwb0.addEventListener('did-finish-load', abcwb0loadstop)
                        //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
                        abcwb0.addEventListener("dom-ready", () => {
                            abcwb0.openDevTools();
                            var abcwb0cookiescript
                            
                            abcwb0cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                            abcwb0.executeJavaScript(abcwb0cookiescript, () => {})
                        });
                        abcwb0.addEventListener('console-message', (e) => {
                            //console.log('Guest page logged a message:', e.message)
                        })
                        abcwb0.addEventListener('ipc-message', (event) => {
                            //console.log(event)
                        })
                       
                        
                        $("#next-abc").click(() => {
                            
                            try {
                                //tiMer.clearInterval()
                                stoptiMer(tiMer)
                            } catch (error) {

                            }
                            if (oplimitkw == 0) {
                                countlastbacklink += 1
                                countbacklink += 1
                                rplastsite += 1
                                abcwbnext(0)
                                db.from('kwlist').where('kwid', '=', rpkwID).patch({
                                    lastsite: rplastsite
                                });
                                stash.set('lastbacklink', countlastbacklink)
                            } else {
                                if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                    try {
                                        clearInterval(cektitle)
                                    } catch (error) {

                                    }
                                    stash.set('IsDone',1)
                                    if(limited > 0){
                                        if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                            countlastbacklink += 1
                                            countbacklink += 1
                                            rplastsite += 1
                                            abcwbnext(0)
                                            db.from('kwlist').where('kwid', '=', rpkwID).patch({
                                                lastsite: rplastsite
                                            });
                                            stash.set('lastbacklink', countlastbacklink)
                                            getsyncdb(rppID)
                                            var idlamana = stash.get('lastid')
                                            var limitedlama = stash.get('limitid')
                                            var idbaru = (parseInt(idlamana)+1)
                                            var limitbaru = (parseInt(limitedlama)-1)
                                            
                                            stash.set('limitid',limitbaru)
                                            stash.set('lastid',idbaru)
                                        }
                                        else{

                                        }           
                                    }
                                    else{
                                        stash.set('limitid',0)
                                        stash.set('lastid',0)
                                        stash.set('IsDone',0)
                                        $.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                                        $('#menu-project').trigger('click');
                                        getsyncdb(rppID)
                                        //getsyncProject()
                                        countbacklink = 0
                                    }                      
                                } else {
                                    countlastbacklink += 1
                                    countbacklink += 1
                                    rplastsite += 1
                                    abcwbnext(0)
                                    db.from('kwlist').where('kwid', '=', rpkwID).patch({
                                        lastsite: rplastsite
                                    });
                                    stash.set('lastbacklink', countlastbacklink)
                                    getsyncdb(rppID)
                                }
                            }
                            
                        });
                        $("#prev-abc").click(() => {
                            abcwbprev(0)
                            //console.log(x)
                            //stash.set(rpkwID, parseInt(x))
                            //db.from('kwlist').where('kwid', '=', rpkwID).patch({
                            //    lastsite: x
                            //});
                        });
                    }
                });
            }
        }
    });
}
runProjectThread = (id, win) => {
    var muid = stash.get('uuid')
    //var lic = stash.get('license')
    //var licdec = decryptlicGenerator(lic)

    //$.post("http://accounts.simplebacklink.co.id/appmid.php", { machineid: muid })
    //.done( (data) => {
    //console.log("Data Loaded: " + data);
    // if (data == "Machine ID is incorrect") {
    //     $.messager.alert('SimpleBacklink.co.id', 'Machine Id not valid.<br>Please use Registered machine.!');
    //} else if (data == 'authorized') {
    oplimitkw = stash.get('limitkw')
    $('li.active').removeClass('active');
    $("#next-abc").off()
    $("#prev-abc").off()
    x = 0
    db.get('kwlist', parseInt(id)).done((records) => {
        rpkeyword = records.keyword
        rpurl = records.url
        rpcomment = records.comment
        rpkwID = records.kwid
        rppID = records.pid
        countlastbacklink = stash.get('lastbacklink')
        rplastsite = records.lastsite

        if (countlastbacklink !== 0) {
            countlastbacklink += 1
        }

        if (countlastbacklink || countlastbacklink !== "NaN" && countlastbacklink !== 'undefined') {
            x = parseInt(countlastbacklink)
        } else {
            x = 0
        }

        var runtab = document.getElementById("runprojectContainer")
        $("#runprojectContainer").empty();
        var creatediv = document.createElement("div")
        creatediv.className = "row"
        if (win == 1) {
            creatediv.innerHTML = '<div class="col-md-12"> </div><button class="btn btn-danger btn-xs" id="reload-abcwb0">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb0">Go Back</button> <button id="stopall" class="btn btn-danger btn-xs">Stop</button> <span id="abcwb0indicator" style="margin-right:10px!important;color:#000;"></span><hr/><webview class="wb1" id="abcwb0" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity allowpopups=false autosize minwidth="576" maxheight="200"></webview></div>'
            runtab.appendChild(creatediv)
            x = countlastbacklink
            changewbsrc(0)
            countbacklink += 1
           
            const abcwb0 = document.querySelector('#abcwb0')
            const abcwb0loadstart = () => {
                abcwb0indicator.innerText = 'loading...'
            }
            const abcwb0loadstop = () => {
                abcwb0indicator.innerText = ''
                stoptiMer(tiMer)

                

                tiMer.setInterval(cektitle, '', '10s')
                
                /*
                var cektitle = setInterval(()=>{
                    const abcwb0 = document.querySelector('#abcwb0')
                    var abcwb0Title = abcwb0.getTitle().toLowerCase();
                            
                    console.log(abcwb0Title)
                    
                    if(abcwb0Title == "submitted"){
                        clearInterval(cektitle)
                        c19++
                        console.log("c1: " + c19)
                        if(c19 == 1){
                            console.log("c2: " + c19)
                            //abcwbnext(0)
                            clearInterval(cektitle)
                            //setTimeout(() => {
                                
                                if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                    abcwb0.stop()
                                    //$.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                                    $('#menu-project').trigger('click');
                                    getsyncdb(rppID)
                                }else{
                                    $('#next-abc').click()
                                }
                            //},5000)
                            
                        }
                        
                    }else if(abcwb0Title.indexOf('404') > -1 || 
                    abcwb0Title.indexOf('hacke') > -1 || 
                    abcwb0Title.indexOf('hosting') > -1 ||
                    abcwb0Title.indexOf('406') > -1 ){
                         c19++
                        if(c19 == 1){
                            //abcwbnext(0)
                            clearInterval(cektitle)
                            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                abcwb0.stop()
                                //$.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                                $('#menu-project').trigger('click');
                                getsyncdb(rppID)
                            }else{
                                $('#next-abc').click()
                            }
                            
                        }
                        //clearInterval(cektitle)
                    }
                },1000)
                */
            }
            abcwb0.addEventListener('did-start-loading', abcwb0loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb0.addEventListener('did-finish-load', abcwb0loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb0.addEventListener("dom-ready", () => {
                abcwb0.openDevTools();
                var abcwb0cookiescript
                
                abcwb0cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb0.executeJavaScript(abcwb0cookiescript, () => {})
            });
            abcwb0.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            abcwb0.addEventListener('ipc-message', (event) => {
                //console.log(event)
            })

            $("#next-abc").click(() => {
                
                try {
                    //tiMer.clearInterval()
                    stoptiMer(tiMer)
                } catch (error) {

                }
                if (oplimitkw == 0) {
                    countlastbacklink += 1
                    countbacklink += 1
                    rplastsite += 1
                    abcwbnext(0)
                    db.from('kwlist').where('kwid', '=', rpkwID).patch({
                        lastsite: rplastsite
                    });
                    stash.set('lastbacklink', countlastbacklink)
                } else {
                    if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                        try {
                            clearInterval(cektitle)
                        } catch (error) {

                        }
                            $.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                            $('#menu-project').trigger('click');
                            getsyncdb(rppID)
                            //getsyncProject()
                            countbacklink = 0                   
                    } else {
                        countlastbacklink += 1
                        countbacklink += 1
                        rplastsite += 1
                        abcwbnext(0)
                        db.from('kwlist').where('kwid', '=', rpkwID).patch({
                            lastsite: rplastsite
                        });
                        stash.set('lastbacklink', countlastbacklink)
                        getsyncdb(rppID)
                    }
                }
                
            });
            $("#prev-abc").click(() => {
                abcwbprev(0)
                //console.log(x)
                //stash.set(rpkwID, parseInt(x))
                //db.from('kwlist').where('kwid', '=', rpkwID).patch({
                //    lastsite: x
                //});
            });
        } else if (win == 2) {
            //$('#reload-abcwb0').show()
            //$('#reload-abcwb1').show()
            //$('#reload-abcwb2').hide()
            //$('#reload-abcwb3').hide()
            creatediv.innerHTML = '<div class="row"> <div class="col-md-6">  <button class="btn btn-danger btn-xs" id="reload-abcwb0">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb0">Go Back</button> <span id="abcwb0indicator" style="margin-right:10px!important;color:#000;"></span><hr/><webview class="wb2" id="abcwb0" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity autosize minwidth="570" maxheight="200"></webview></div><div class="col-md-6"> <button class="btn btn-danger btn-xs" id="reload-abcwb1">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb1">Go Back</button> <span id="abcwb1indicator" style="margin-right:10px!important;color:#000;"></span><hr/><webview class="wb2" id="abcwb1" src="about:blank" preload="../assets/js/seoabc.page.js"disablewebsecurity autosize minwidth="570" maxheight="200"></webview></div></div>'
            runtab.appendChild(creatediv)
            x = countlastbacklink
            setTimeout(() => {
                //countbacklink += 1
                changewbsrc(0)
            }, 1000)
            setTimeout(() => {
                x += 1;
                countlastbacklink += 1
                countbacklink += 1
                rplastsite += 1
                changewbsrc(1)
            }, 2000)

            const abcwb0 = document.querySelector('#abcwb0')
            const abcwb0loadstart = () => {
                abcwb0indicator.innerText = 'loading...'
                //$("#abcwb0").toggle();
                //$("#loader").show();
            }
            const abcwb0loadstop = () => {
                abcwb0indicator.innerText = ''
                //$("#abcwb0").show();
                //$("#loader").hide();
            }
            abcwb0.addEventListener('did-start-loading', abcwb0loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb0.addEventListener('did-finish-load', abcwb0loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb0.addEventListener("dom-ready", () => {
                //abcwb0.openDevTools();
                var abcwb0cookiescript
                var abcwbTitle = abcwb0.getTitle();
                abcwb0cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb0.executeJavaScript(abcwb0cookiescript, () => {})
            });
            abcwb0.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            const abcwb1 = document.querySelector('#abcwb1')
            const abcwb1loadstart = () => {
                abcwb1indicator.innerText = 'loading...'
                //$("#abcwb1").toggle();
                //$("#loader").show();
            }
            const abcwb1loadstop = () => {
                abcwb1indicator.innerText = ''
                //$("#abcwb1").show();
                //$("#loader").hide();
            }
            abcwb1.addEventListener('did-start-loading', abcwb1loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb1.addEventListener('did-finish-load', abcwb1loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb1.addEventListener("dom-ready", () => {
                //abcwb1.openDevTools();
                var abcwb1cookiescript
                var abcwbTitle = abcwb1.getTitle();
                abcwb1cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb1.executeJavaScript(abcwb1cookiescript, () => {})
            });
            abcwb1.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            $("#next-abc").click(() => {
                if (oplimitkw == 0) {
                    countlastbacklink += 1
                    countbacklink += 1
                    rplastsite += 1
                    abcwbnext(0)
                    setTimeout(() => {
                        countlastbacklink += 1
                        countbacklink += 1
                        rplastsite += 1
                        abcwbnext(1)
                    }, 500)
                    //console.log(x)
                    //stash.set(rpkwID, parseInt(x))
                    db.from('kwlist').where('kwid', '=', rpkwID).patch({
                        lastsite: rplastsite
                    });
                    stash.set('lastbacklink', countlastbacklink)
                } else {
                    if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                        $.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                        $('#menu-project').trigger('click');
                        getsyncdb(rppID)
                        //getsyncProject()
                        countbacklink = 0
                    } else {
                        countlastbacklink += 1
                        countbacklink += 1
                        rplastsite += 1
                        if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                            abcwbblank(0)
                        } else {
                            abcwbnext(0)
                        }
                        setTimeout(() => {
                            countlastbacklink += 1
                            countbacklink += 1
                            rplastsite += 1
                            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                abcwbblank(1)
                            } else {
                                abcwbnext(1)
                            }
                        }, 500)

                        //console.log(x)
                        //stash.set(rpkwID, parseInt(x))
                        db.from('kwlist').where('kwid', '=', rpkwID).patch({
                            lastsite: rplastsite
                        });
                        stash.set('lastbacklink', countlastbacklink)
                        getsyncdb(rppID)
                    }
                }

            });
            $("#prev-abc").click(() => {
                abcwbprev(0)
                setTimeout(() => {
                    abcwbprev(1)
                }, 500)
                //console.log(x)
                //stash.set(rpkwID, parseInt(x))
                //db.from('kwlist').where('kwid', '=', rpkwID).patch({
                //    lastsite: x
                //});
            });
        } else if (win == 4) {
            //$('#reload-abcwb0').show()
            //$('#reload-abcwb1').show()
            //$('#reload-abcwb2').show()
            //$('#reload-abcwb3').show()
            creatediv.innerHTML = '<div class="row"> <div class="col-md-6"> <button class="btn btn-danger btn-xs" id="reload-abcwb0">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb0">Go Back</button> <span id="abcwb0indicator" style="margin-right:10px!important;color:#000;"></span><hr/><webview class="wb4" id="abcwb0" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity autosize minwidth="570" maxheight="200"></webview> </div> <div class="col-md-6"> <button class="btn btn-danger btn-xs" id="reload-abcwb1">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb1">Go Back</button> <span id="abcwb1indicator" style="margin-right:10px!important;color:#000;"></span><hr /><webview class="wb4" id="abcwb1" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity autosize minwidth="570" maxheight="200"></webview> </div> </div> <div style="clear:both">&nbsp;</div><div class="row"> <div class="col-md-6"> <button class="btn btn-danger btn-xs" id="reload-abcwb2">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb2">Go Back</button> <span id="abcwb2indicator" style="margin-right:10px!important;color:#000;"></span><hr /><webview class="wb4" id="abcwb2" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity autosize minwidth="570" maxheight="200"></webview> </div> <div class="col-md-6"> <button class="btn btn-danger btn-xs" id="reload-abcwb3">Reload</button> <button class="btn btn-primary btn-xs" id="goback-abcwb3">Go Back</button> <span id="abcwb3indicator" style="margin-right:10px!important;color:#000;"></span><hr /><webview class="wb4" id="abcwb3" src="about:blank" preload="../assets/js/seoabc.page.js" disablewebsecurity autosize minwidth="570" maxheight="200"></webview> </div> </div>'
            runtab.appendChild(creatediv)
            changewbsrc(0)
            //console.log(countbacklink)
            //countbacklink = 1
            setTimeout(() => {
                x += 1;
                changewbsrc(1)
                countbacklink += 1
                countlastbacklink += 1
                rplastsite += 1
                //console.log(countbacklink)
            }, 1000)
            setTimeout(() => {
                x += 1;
                changewbsrc(2)
                countbacklink += 1
                countlastbacklink += 1
                rplastsite += 1
                //console.log(countbacklink)
            }, 2000)
            setTimeout(() => {
                x += 1;
                changewbsrc(3)
                countbacklink += 1
                countlastbacklink += 1
                rplastsite += 1
                //console.log(countbacklink)
            }, 3000)
            const abcwb0 = document.querySelector('#abcwb0')
            const abcwb0loadstart = () => {
                abcwb0indicator.innerText = 'loading...'
                //$("#abcwb0").toggle();
                //$("#loader").show();
            }
            const abcwb0loadstop = () => {
                abcwb0indicator.innerText = ''
                //$("#abcwb0").show();
                //$("#loader").hide();
            }
            abcwb0.addEventListener('did-start-loading', abcwb0loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb0.addEventListener('did-finish-load', abcwb0loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb0.addEventListener("dom-ready", () => {
                //abcwb0.openDevTools();
                var abcwb0cookiescript
                var abcwbTitle = abcwb0.getTitle();
                abcwb0cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb0.executeJavaScript(abcwb0cookiescript, () => {})
            });
            abcwb0.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            //end wb0
            const abcwb1 = document.querySelector('#abcwb1')
            const abcwb1loadstart = () => {
                abcwb1indicator.innerText = 'loading...'
                //$("#abcwb1").toggle();
                //$("#loader").show();
            }
            const abcwb1loadstop = () => {
                abcwb1indicator.innerText = ''
                //$("#abcwb1").show();
                //$("#loader").hide();
            }
            abcwb1.addEventListener('did-start-loading', abcwb1loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb1.addEventListener('did-finish-load', abcwb1loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb1.addEventListener("dom-ready", () => {
                //abcwb1.openDevTools();
                var abcwb1cookiescript
                var abcwbTitle = abcwb1.getTitle();
                abcwb1cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb1.executeJavaScript(abcwb1cookiescript, () => {})
            });
            abcwb1.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            //end wb1
            const abcwb2 = document.querySelector('#abcwb2')
            const abcwb2loadstart = () => {
                abcwb2indicator.innerText = 'loading...'
                //$("#abcwb2").toggle();
                //$("#loader").show();
            }
            const abcwb2loadstop = () => {
                abcwb2indicator.innerText = ''
                //$("#abcwb2").show();
                //$("#loader").hide();
            }
            abcwb2.addEventListener('did-start-loading', abcwb2loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb2.addEventListener('did-finish-load', abcwb2loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb2.addEventListener("dom-ready", () => {
                //abcwb2.openDevTools();
                var abcwb2cookiescript
                var abcwbTitle = abcwb0.getTitle();
                abcwb2cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb2.executeJavaScript(abcwb2cookiescript, () => {})
            });
            abcwb2.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            //end wb2
            const abcwb3 = document.querySelector('#abcwb3')
            const abcwb3loadstart = () => {
                abcwb3indicator.innerText = 'loading...'
                //$("#abcwb3").toggle();
                //$("#loader").show();
            }
            const abcwb3loadstop = () => {
                abcwb3indicator.innerText = ''
                //$("#abcwb3").show();
                //$("#loader").hide();
            }
            abcwb3.addEventListener('did-start-loading', abcwb3loadstart)
            //abcwb.addEventListener('did-stop-loading', abcloadstop)
            abcwb3.addEventListener('did-finish-load', abcwb3loadstop)
            //abcwb.WebContents.on('did-finish-load', () => abcloadstop);
            abcwb3.addEventListener("dom-ready", () => {
                //abcwb3.openDevTools();
                var abcwb3cookiescript
                var abcwbTitle = abcwb3.getTitle();
                abcwb3cookiescript = 'document.cookie = "kwkom=' + rpkeyword + '";document.cookie = "urlkom=' + rpurl + '";document.cookie = "kom1=' + rpcomment + '";'
                abcwb3.executeJavaScript(abcwb3cookiescript, () => {})
            });
            abcwb3.addEventListener('console-message', (e) => {
                //console.log('Guest page logged a message:', e.message)
            })
            $("#next-abc").click(() => {
                if (oplimitkw == 0) {
                    countbacklink += 1
                    countlastbacklink += 1
                    rplastsite += 1
                    abcwbnext(0)
                    setTimeout(() => {
                        countbacklink += 1
                        countlastbacklink += 1
                        rplastsite += 1
                        abcwbnext(1)
                    }, 500)
                    setTimeout(() => {
                        countbacklink += 1
                        countlastbacklink += 1
                        rplastsite += 1
                        abcwbnext(2)
                    }, 500)
                    setTimeout(() => {
                        countbacklink += 1
                        countlastbacklink += 1
                        rplastsite += 1
                        abcwbnext(3)
                    }, 500)
                    //console.log(x)
                    //stash.set(rpkwID, parseInt(x))
                    db.from('kwlist').where('kwid', '=', rpkwID).patch({
                        lastsite: countbacklink
                    });
                    stash.set('lastbacklink', x)
                } else {
                    if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                        $.messager.alert('SimpleBacklink.co.id', 'Backlink per keyword has been reached.<br>you can rerun this project from Project Tab');
                        $('#menu-project').trigger('click');
                        getsyncdb(rppID)
                        countbacklink = 0
                    } else {
                        countbacklink += 1
                        if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                            abcwbblank(0)
                        } else {
                            countlastbacklink += 1
                            rplastsite += 1
                            abcwbnext(0)
                        }
                        setTimeout(() => {
                            countbacklink += 1
                            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                abcwbblank(1)
                            } else {
                                countlastbacklink += 1
                                rplastsite += 1
                                abcwbnext(1)
                            }
                        }, 500)
                        setTimeout(() => {
                            countbacklink += 1
                            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                abcwbblank(2)
                            } else {
                                countlastbacklink += 1
                                rplastsite += 1
                                abcwbnext(2)
                            }
                        }, 500)
                        setTimeout(() => {
                            countbacklink += 1
                            if (countbacklink == oplimitkw || countbacklink > oplimitkw) {
                                abcwbblank(3)
                            } else {
                                countlastbacklink += 1
                                rplastsite += 1
                                abcwbnext(3)
                            }
                        }, 500)
                        //console.log(x)
                        //stash.set(rpkwID, parseInt(x))
                        setTimeout(() => {
                            db.from('kwlist').where('kwid', '=', rpkwID).patch({
                                lastsite: rplastsite
                            });
                            stash.set('lastbacklink', countlastbacklink)
                            getsyncdb(rppID)
                        }, 1000)

                    }
                }

            });
            $("#prev-abc").click(() => {
                abcwbprev(0)
                setTimeout(() => {
                    abcwbprev(1)
                }, 500)
                setTimeout(() => {
                    abcwbprev(2)
                }, 500)
                setTimeout(() => {
                    abcwbprev(3)
                }, 500)
                //console.log(x)
                //stash.set(rpkwID, parseInt(x))
                //db.from('kwlist').where('kwid', '=', rpkwID).patch({
                //    lastsite: x
                //});
            });
            //end wb0
        }



    });
    //} else {
    //$.messager.alert('SimpleBacklink.co.id', "Error, Could'nt connect to the server.");
    //}
    //})
    //.fail(() => {
    //    $.messager.alert('SimpleBacklink.co.id', "Error, Could'nt connect to the server.");
    //});

    /*
    if (muid !== licdec) {
        //$('#menu-setting').trigger('click');
        $.messager.alert('SimpleBacklink.co.id', 'License not valid.<br>Please input valid license on setting page');
        
    } else {
        
    }
    */

}

changewbsrc = (browserID) => {
    if (browserID == 0) {
        $("#abcwb0").attr("src", listberitaabc[x]);
        var a = listberitaabc.indexOf(listberitaabc[x]);
        $("#abcnow").html(a + " of ");
    } else if (browserID == 1) {
        $("#abcwb1").attr("src", listberitaabc[x]);
        var a = listberitaabc.indexOf(listberitaabc[x]);
        $("#abcnow").html(a + " of ");
    } else if (browserID == 2) {
        $("#abcwb2").attr("src", listberitaabc[x]);
        var a = listberitaabc.indexOf(listberitaabc[x]);
        $("#abcnow").html(a + " of ");
    } else if (browserID == 3) {
        $("#abcwb3").attr("src", listberitaabc[x]);
        var a = listberitaabc.indexOf(listberitaabc[x]);
        $("#abcnow").html(a + " of ");
    }
}

abcwbnext = (browserID) => {
    abcwbcookiescript = 'document.cookie = "submitted=0";'
    if (browserID == 0) {
        abcwb0.executeJavaScript(abcwbcookiescript, () => {})
    } else if (browserID == 1) {
        abcwb1.executeJavaScript(abcwbcookiescript, () => {})
    } else if (browserID == 2) {
        abcwb2.executeJavaScript(abcwbcookiescript, () => {})
    } else if (browserID == 3) {
        abcwb3.executeJavaScript(abcwbcookiescript, () => {})
    }

    x += 1;
    if (x > c - 1) {
        x = 0
        stash.set('lastbacklink', 0)
    }
    changewbsrc(browserID)
    //console.log(countbacklink)
}

abcwbprev = (browserID) => {
    x -= 1;
    if (x <= 0) {
        x = c - 1
    }
    changewbsrc(browserID);
}

abcwbblank = (browserID) => {
    if (browserID == 0) {
        $("#abcwb0").attr("src", '../html/blank.html');
    } else if (browserID == 1) {
        $("#abcwb1").attr("src", '../html/blank.html');
    } else if (browserID == 2) {
        $("#abcwb2").attr("src", '../html/blank.html');
    } else if (browserID == 3) {
        $("#abcwb3").attr("src", '../html/blank.html');
    }
}

shortcut.add("Ctrl+Tab", () => {
    $('#next-abc').trigger('click')
})
shortcut.add("Ctrl+R", () => {
    // prevent reloading page
})
shortcut.add("Meta+R", () => {
    // prevent reloading page
})

reverseString = (s) => {
    return s.split("").reverse().join("");
}

encryptlicGenerator = (input) => {
    var CryptoJS = require("crypto-js");
    var ciphertext = CryptoJS.AES.encrypt(input, '21seo22abc23simple24backlink');
    return ciphertext.toString()
}

decryptlicGenerator = (input) => {
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(input.toString(), '21seo22abc23simple24backlink');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext
}
