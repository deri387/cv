setTimeout(function () {
            try {
                var nama = document.getElementsByName("nama");
                var count_nama = nama.length;
                for (x = 0; x <= count_nama; x++) {
                    var kwkom2 = getCookie("kwkom");
                    if (kwkom2 && kwkom2 !== undefined) {
                        nama[x].value = getCookie("kwkom");
                    }
                }
            } catch (err) {}

            try {
                var nama_komentar = document.getElementsByName("nama_komentar");
                var count_nama_komentar = nama_komentar.length;
                for (x = 0; x <= count_nama_komentar; x++) {
                    var kwkom2 = getCookie("kwkom");
                    if (kwkom2 && kwkom2 !== undefined) {
                        nama_komentar[x].value = getCookie("kwkom");
                    }
                }
            } catch (err) {}

            try {
                var url_input = document.getElementsByName("url");
                var count_url_input = url_input.length;
                var found = false;
                for (var i = 0; i < wbwithspace.length && !found; i++) {
                    var cekdom = window.location.hostname;
                    cekdom = cekdom.replace("www.", "");
                    if (wbwithspace.includes(cekdom)) {
                        found = true;
                        break;
                    }
                }

                if (found == true) {
                    var cekurl = getCookie("urlkom");
                    if (cekurl && cekurl !== undefined) {
                        cekurl = getCookie("urlkom");
                    } else {
                        cekurl = "";
                    }

                    var thedom = "";

                    if (cekurl.includes("http") == false) {
                        thedom = "http://" + cekurl;
                    }

                    for (x = 0; x <= count_url_input; x++) {
                        url_input[x].value = "                     " +
                            thedom;
                    }
                } else {
                    for (x = 0; x <= count_url_input; x++) {
                        var cekurl = getCookie("urlkom");
                        if (cekurl && cekurl !== undefined) {
                            url_input[x].value = getCookie("urlkom");
                        }
                    }
                }

            } catch (err) {}

            try {
                var wb_input = document.getElementsByName("website");
                var count_wb_input = wb_input.length;
                for (x = 0; x <= count_wb_input; x++) {
                    var cekurl = getCookie("urlkom");
                    if (cekurl && cekurl !== undefined) {
                        wb_input[x].value = getCookie("urlkom");
                    }
                }
            } catch (err) {}

            try {
                var email_input = document.getElementsByName("email");
                var count_email_input = email_input.length;
                for (x = 0; x <= count_email_input; x++) {
                    var cekurl = getCookie("urlkom");
                    if (cekurl && cekurl !== undefined) {
                        email_input[x].value = getCookie("urlkom");
                    }
                }
            } catch (err) {}

            try {
                var pesan_input = document.getElementsByName("pesan");
                var count_pesan_input = pesan_input.length;
                for (x = 0; x <= count_pesan_input; x++) {
                    var kom2 = getCookie("kom1");
                    if (kom2 && kom2 !== undefined) {
                        pesan_input[x].value = getCookie("kom1") + ' <a href="https://' + getCookie("urlkom") + '">' + getCookie("kwkom") + '</a>';
                    }
                }
            } catch (err) {}

            try {
                var isi_komentar_input = document.getElementsByName("isi_komentar");
                var count_isi_komentar_input = isi_komentar_input.length;
                for (x = 0; x <= count_isi_komentar_input; x++) {
                    var kom2 = getCookie("kom1");
                    if (kom2 && kom2 !== undefined) {
                        isi_komentar_input[x].value = getCookie("kom1");
                    }
                }
            } catch (err) {}

            try {
                var isi_kom_input = document.getElementsByName("isi_kom");
                var count_isi_kom_input = isi_kom_input.length;
                for (x = 0; x <= count_isi_kom_input; x++) {
                    var kom2 = getCookie("kom1");
                    if (kom2 && kom2 !== undefined) {
                        isi_kom_input[x].value = getCookie("kom1");
                    }
                }
            } catch (err) {}

            try {
                var isi_koment_input = document.getElementsByName("isi_koment");
                var count_isi_koment_input = isi_koment_input.length;
                for (x = 0; x <= count_isi_koment_input; x++) {
                    var kom2 = getCookie("kom1");
                    if (kom2 && kom2 !== undefined) {
                        isi_koment_input[x].value = getCookie("kom1");
                    }
                }
            } catch (err) {}

            try {
                var isi_input = document.getElementsByName("isi");
                var count_isi_input = isi_input.length;
                for (x = 0; x <= count_isi_input; x++) {
                    var kom2 = getCookie("kom1");
                    if (kom2 && kom2 !== undefined) {
                        isi_input[x].value = getCookie("kom1");
                    }
                }
            } catch (err) {}

            try {
                var komentar_input = document.getElementsByName("komentar");
                var count_komentar_input = komentar_input.length;
                for (x = 0; x <= count_komentar_input; x++) {
                    var kom2 = getCookie("kom1");
                    if (kom2 && kom2 !== undefined) {
                        komentar_input[x].value = getCookie("kom1");
                    }
                }
            } catch (err) {}

            //console.log("filled");


        }, 500);
