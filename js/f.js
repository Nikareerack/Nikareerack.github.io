! function($) {
    window.stexBrowserLang = window.navigator.userLanguage || window.navigator.language, window.stexBrowserLang = window.stexBrowserLang.toUpperCase(), -1 != window.stexBrowserLang.indexOf("RU") ? window.stexBrowserLang = "RU" : window.stexBrowserLang = "EN", window.stexForm = {
        isRecaptchaScriptInit: !1,
        currentFormProccessing: !1,
        arMessages: {
            EN: {
                success: "Thank you! Your data has been submitted.",
                successorder: "Thank you! Order created. Checkout."
            },
            RU: {
                success: "Thank you! Your data has been submitted.",
                successorder: "Thank you! Order created. Checkout."
            }
        },
        arValidateErrors: {
            EN: {
                email: "Please put a correct e-mail",
                url: "Please put a correct URL",
                phone: "Please put a correct phone number",
                number: "Please put a correct number",
                date: "Please put a correct date",
                time: "Please put a correct time (HH:mm)",
                name: "Please put a name",
                namerus: "Please put a correct name (only cyrillic letters)",
                nameeng: "Please put a correct name (only latin letters)",
                string: "You put incorrect symbols. Only letters, numbers and punctuation symbols are allowed",
                req: "Please fill out all required fields",
                reqfield: "Required field",
                emptyfill: "No one field is filled"
            },
            RU: {
                email: "Please put a correct e-mail",
                url: "Please put a correct URL",
                phone: "Please put a correct phone number",
                number: "Please put a correct number",
                date: "Please put a correct date",
                time: "Please put a correct time (HH:mm)",
                name: "Please put a name",
                namerus: "Please put a correct name (only cyrillic letters)",
                nameeng: "Please put a correct name (only latin letters)",
                string: "You put incorrect symbols. Only letters, numbers and punctuation symbols are allowed",
                req: "Please fill out all required fields",
                reqfield: "Required field",
                emptyfill: "No one field is filled"
            }
        }
    }, $(document).ready(function() {
        window.stexForm.captchaCallback = function(e) {
            if (!window.stexForm.currentFormProccessing || !window.stexForm.currentFormProccessing.form) return !1;
            window.stexForm.send(window.stexForm.currentFormProccessing.form, window.stexForm.currentFormProccessing.btn, window.stexForm.currentFormProccessing.formtype, window.stexForm.currentFormProccessing.formskey), window.stexForm.currentFormProccessing = !1
        }, window.stexForm.validate = function(e) {
            var t = [],
                r = !0;
            return e.find(".js-stex-rule").each(function() {
                var e, a, s = $(this).data("stex-req") || 0,
                    i = $(this).data("stex-rule") || "none",
                    n = {},
                    o = $(this).val(),
                    l = "";
                if (n.obj = $(this), n.type = [], o && o.length > 0 && (l = o.replace(/\s/g, ""), o = o.trim()), o.length > 0 && (r = !1), 1 == s && (0 == o.length && 0 == l.length || ("checkbox" == $(this).attr("type") || "radio" == $(this).attr("type")) && 0 == $(this).closest("form").find('[name="' + $(this).attr("name") + '"]:checked').length)) n.type.push("req");
                else switch (i) {
                    case "email":
                        e = /^[a-zA-Zёа-яЁА-Я0-9_\.\-\+]{1,64}@[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}$/, o.length > 0 && !o.match(e) && n.type.push("email");
                        break;
                    case "url":
                        e = /^((https?|ftp):\/\/)?[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}\/?$/, o.length > 0 && ((a = (a = (a = (a = o.split("//")) && a.length > 1 ? a[1] : a[0]).split("/")) && a.length > 0 ? a[0] : "").match(e) || n.type.push("url"));
                        break;
                    case "phone":
                        e = /^[0-9\(\)\-\+]+$/gi, l.length > 0 && !l.match(e) ? n.type.push("phone") : 1 != (a = l.replace(/[^0-9]+/g, "")).indexOf("000") && 1 != a.indexOf("111") && 1 != a.indexOf("222") && 1 != a.indexOf("333") && 1 != a.indexOf("444") && 1 != a.indexOf("555") && 1 != a.indexOf("666") && 1 != a.indexOf("777") && 1 != a.indexOf("888") || n.type.push("phone");
                        break;
                    case "number":
                        e = /^[0-9]+$/gi, l.length > 0 && !l.match(e) && n.type.push("number");
                        break;
                    case "date":
                        e = /^[0-9]{1,4}[\-\.\/][0-9]{1,2}[\-\.\/][0-9]{1,4}$/gi, l.length > 0 && !l.match(e) && n.type.push("date");
                        break;
                    case "time":
                        e = /^[0-9]{2}[:\.][0-9]{2}$/gi, l.length > 0 && !l.match(e) && n.type.push("time");
                        break;
                    case "name":
                        e = /^([A-Za-zА-Яа-яЁёäöüÄÖÜßèéûҐґЄєІіЇї\s]{1,}((\-)?[A-Za-zА-Яа-яЁёäöüÄÖÜßèéûҐґЄєІіЇї\.\s](\')?){0,})*$/i, o.length > 0 && !o.match(e) && n.type.push("name");
                        break;
                    case "nameeng":
                        e = /^([A-Za-z\s]{1,}((\-)?[A-Za-z\.\s](\')?){0,})*$/i, o.length > 0 && !o.match(e) && n.type.push("nameeng");
                        break;
                    case "namerus":
                        e = /^([А-Яа-яЁё\s]{1,}((\-)?[А-Яа-яЁё\.\s](\')?){0,})*$/i, o.length > 0 && !o.match(e) && n.type.push("namerus");
                        break;
                    case "string":
                        e = /^[A-Za-zА-Яа-яЁёЁёäöüÄÖÜßèéû0-9,\.:;\"\'\`\-\_\+\?\!\%\$\@\*\&\^\s]$/i, o.length > 0 && !o.match(e) && n.type.push("string")
                }
                n.type && n.type.length > 0 && (t[t.length] = n)
            }), r && 0 == t.length && (t = [{
                obj: "none",
                type: ["emptyfill"]
            }]), t
        }, window.stexForm.hideErrors = function(e) {
            e.find(".js-errorbox-all").hide(), e.find(".js-rule-error").hide(), e.find(".js-error-rule-all").html(""), e.find(".js-successbox").hide(), e.find(".js-error-control-box .t-input-error").html(""), e.find(".js-error-control-box").removeClass("js-error-control-box"), e.removeClass("js-send-form-error"), e.removeClass("js-send-form-success")
        }, window.stexForm.showErrors = function(e, t) {
            if (!t || 0 == t.length) return !1;
            var r = e.data("inputbox");
            r || (r = ".blockinput");
            for (var a, s, i, n, o = window.stexForm.arValidateErrors[window.stexBrowserLang] || {}, l = "", d = 0; d < t.length; d++)
                if (t[d] && t[d].obj) {
                    if (0 == d && "none" == t[d].obj) {
                        (n = e.find(".js-rule-error-all")).html(o.emptyfill), n.css("display", "block").show();
                        break
                    }
                    for (s = 0, i = 1, (a = t[d].obj.closest(r).addClass("js-error-control-box")).find(".t-input-error").length > 0 && (s = 1), j = 0; j < t[d].type.length; j++) error = t[d].type[j], l = "", 1 == i && ((n = e.find(".js-rule-error-" + error)).length > 0 ? ("" == n.text() && o[error] > "" ? n.html(o[error]) : l = n.eq(0).text(), n.css("display", "block").show()) : o[error] > "" && (n = e.find(".js-rule-error-all")) && n.length > 0 && (n.html(o[error]), n.css("display", "block").show())), s && ("" == l && (o[error + "field"] > "" ? l = o[error + "field"] : o[error] > "" && (l = o[error])), l > "" && a.find(".t-input-error").html(l))
                }
            return e.find(".js-errorbox-all").css("display", "block").show(), e.trigger("stexform:aftererror"), !0
        }, window.stexForm.addPaymentInfoToForm = function(e) {
            e.find(".js-stex-payment").remove();
            var t, r, a, s = "";
            window.tcart.currency && window.tcart.currency > "" && (s += '<input type="hidden" name="stexpayment[currency]" value="' + window.tcart.currency + '" class="js-stex-payment">'), s += '<input type="hidden" name="stexpayment[amount]" value="' + window.tcart.amount + '" class="js-stex-payment js-stex-price">', window.tcart.system && window.tcart.system > "" ? s += '<input type="hidden" name="stexpayment[system]" value="' + window.tcart.system + '" class="js-stex-payment">' : s += '<input type="hidden" name="stexpayment[system]" value="auto" class="js-stex-payment">';
            for (r in window.tcart.products) {
                t = window.tcart.products[r];
                for (a in t)
                    if ("options" == a)
                        for (var i in t[a]) t[a][i].option && (s += '<input type="hidden" name="stexpayment[products][' + r + "][" + a + "][" + i + '][option]" value="' + t[a][i].option + '" class="js-stex-payment">'), t[a][i].price && t[a][i].price > 0 && (s += '<input type="hidden" name="stexpayment[products][' + r + "][" + a + "][" + i + '][price]" value="' + t[a][i].price + '" class="js-stex-payment">'), t[a][i].variant && (s += '<input type="hidden" name="stexpayment[products][' + r + "][" + a + "][" + i + '][variant]" value="' + t[a][i].variant + '" class="js-stex-payment">');
                    else s += '<input type="hidden" name="stexpayment[products][' + r + "][" + a + ']" value="' + t[a] + '" class="js-stex-payment">'
            }
            e.append(s)
        }, window.stexForm.payment = function($jform, arNext) {
            var html = "";
            if (window.tcart = {
                    amount: 0,
                    currency: "",
                    system: "",
                    products: []
                }, "y" != $jform.data("formpaymentoff")) {
                if ($jform.find(".js-successbox").length > 0) {
                    $jform.find(".js-successbox").text() > "" && $jform.data("successmessage", $jform.find(".js-successbox").text());
                    var arMessage = window.stexForm.arMessages[window.stexBrowserLang] || {};
                    arMessage.successorder && $jform.find(".js-successbox").html(arMessage.successorder), $jform.find(".js-successbox").show()
                }
                if ($jform.addClass("js-send-form-success"), "link" == arNext.type) return window.location.href = arNext.value, !0;
                if ("form" == arNext.type) {
                    $("#js-stex-payment-formid").remove();
                    var key = "",
                        val = "";
                    html = '<form id="js-stex-payment-formid" action="' + arNext.value.action + '" method="post"  style="position:absolue;opacity:0;width: 1px; height: 1px; left: -5000px;">', arNext.value.action = "";
                    for (key in arNext.value)(val = arNext.value[key]) > "" && (html += "<input type='hidden' name='" + key + "' value='" + val + "' >");
                    html += "</form>", $("body").append(html), $("#js-stex-payment-formid").submit()
                } else if ("function" == arNext.type) {
                    var arArgs = arNext.value.args;
                    return eval(arNext.value.name + "($jform, arArgs);"), !1
                }
            } else window.tcart.system = "none"
        }, window.stexForm.stripeLoad = function() {
            if (!0 !== window.stripeapiiscalled) {
                var e = document.createElement("script");
                e.type = "text/javascript", e.src = "https://checkout.stripe.com/checkout.js", document.body.appendChild(e), window.stripeapiiscalled = !0
            }
        }, window.stexForm.stripePay = function(e, t) {
            if (!0 !== window.stripeapiiscalled) return window.stexForm.stripeLoad(), window.setTimeout(function() {
                window.stexForm.stripePay(e, t)
            }, 200), !1;
            var r = t.companyname,
                a = t.companylogo;
            if (r || (r = window.location.host), !window.stripehandler) {
                if ("object" != typeof window.StripeCheckout) return window.setTimeout(function() {
                    window.stexForm.stripePay(e, t)
                }, 200), !1;
                window.stripehandler = window.StripeCheckout.configure({
                    key: t.accountid,
                    image: a,
                    name: r,
                    locale: "auto"
                }), $(window).on("popstate", function() {
                    window.stripehandler.close()
                })
            }
            window.stripehandler.open({
                name: r,
                image: a,
                description: t.description,
                amount: parseInt(100 * parseFloat(t.amount)),
                currency: t.currency,
                shippingAddress: "1" == t.shipping,
                email: t.email > "" ? t.email : "",
                token: function(r, a) {
                    r && r.id && $.ajax({
                        type: "POST",
                        url: "/stripe/",
                        data: {
                            projectid: t.projectid,
                            invoiceid: t.invoiceid,
                            token: r.id,
                            email: r.email,
                            currency: t.currency,
                            amount: parseInt(100 * parseFloat(t.amount))
                        },
                        dataType: "json",
                        success: function(r) {
                            var a = "/stex/" + e.attr("id") + "/payment/",
                                s = "Pay order in form " + e.attr("id"),
                                i = t.amount,
                                n = t.description;
                            window.stex && "function" == typeof stex.sendEventToStatistics && stex.sendEventToStatistics(a, s, n, i), t.successurl > "" && window.setTimeout(function() {
                                window.location.href = t.successurl
                            }, 300), e.data("successmessage") > "" ? e.find(".js-successbox").html(e.data("successmessage")) : e.find(".js-successbox").html(""), e.data("successmessage", "");
                            var o = e.data("success-callback");
                            window.tcart = {
                                amount: 0,
                                currency: "",
                                system: "",
                                products: []
                            }, window.stexForm.successEnd(e, t.successurl, o), e.trigger("stexform:aftersuccess")
                        },
                        fail: function() {},
                        timeout: 15e3
                    })
                }
            })
        }, window.stexForm.cloudpaymentLoad = function() {
            
        }, window.stexForm.cloudpaymentPay = function(e, t) {
            
        }, window.stexForm.successEnd = function($jform, successurl, successcallback) {
            if ($jform.find(".js-successbox").length > 0) {
                if ("" == $jform.find(".js-successbox").text()) {
                    var arMessage = window.stexForm.arMessages[window.stexBrowserLang] || {};
                    arMessage.success && $jform.find(".js-successbox").html(arMessage.success)
                }
                $jform.find(".js-successbox").show()
            }
            $jform.addClass("js-send-form-success"), successcallback && successcallback.length > 0 ? eval(successcallback + "($jform)") : successurl && successurl.length > 0 && setTimeout(function() {
                window.location.href = successurl
            }, 500), $jform.find("input[type=text]:visible").val(""), $jform.find("textarea:visible").html(""), $jform.find("textarea:visible").val(""), $jform.data("stexformresult", {
                tranid: "0",
                orderid: "0"
            })
        }, window.stexForm.send = function($jform, btnformsubmit, formtype, formskey) {
            if ("y" == $jform.data("formcart") && window.stexForm.addPaymentInfoToForm($jform), 2 == formtype || 0 == formtype && formskey > "") {
                var $inputElem;
                return ($inputElem = $jform.find("input[name=stexspec-cookie]")) && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="stexspec-cookie" value="">'), $inputElem = $jform.find("input[name=stexspec-cookie]")), $inputElem.length > 0 && $inputElem.val(document.cookie), ($inputElem = $jform.find("input[name=stexspec-referer]")) && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="stexspec-referer" value="">'), $inputElem = $jform.find("input[name=stexspec-referer]")), $inputElem.length > 0 && $inputElem.val(window.location.href), ($inputElem = $jform.find("input[name=stexspec-formid]")) && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="stexspec-formid" value="">'), $inputElem = $jform.find("input[name=stexspec-formid]")), $inputElem.length > 0 && $inputElem.val($jform.attr("id")), formskey > "" && (($inputElem = $jform.find("input[name=stexspec-formskey]")) && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="stexspec-formskey" value="">'), $inputElem = $jform.find("input[name=stexspec-formskey]")), $inputElem.length > 0 && $inputElem.val(formskey)), ($inputElem = $jform.find("input[name=stexspec-pageid]")) && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="stexspec-pageid" value="">'), $inputElem = $jform.find("input[name=stexspec-pageid]")), $inputElem.length > 0 && $inputElem.val($("#allrecords").data("stex-page-id")), ($inputElem = $jform.find("input[name=stexspec-projectid]")) && 0 != $inputElem.length || ($jform.append('<input type="hidden" name="stexspec-projectid" value="">'), $inputElem = $jform.find("input[name=stexspec-projectid]")), $inputElem.length > 0 && $inputElem.val($("#allrecords").data("stex-project-id")), $jform.find(".js-form-spec-comments").val(""), $formurl = "/processform/", $.ajax({
                    type: "POST",
                    url: $formurl,
                    data: $jform.serialize(),
                    dataType: "json",
                    success: function(json) {                    	
                        var successurl = $jform.data("success-url"),
                            successcallback = $jform.data("success-callback"),
                            formsendedcallback = $jform.data("formsended-callback");
                        if (btnformsubmit.removeClass("t-btn_sending"), btnformsubmit.data("form-sending-status", "0"), btnformsubmit.data("submitform", ""), json && json.error) {
                            successurl = "", successcallback = "";
                            var $errBox = $jform.find(".js-errorbox-all");
                            $errBox && 0 != $errBox.length || ($jform.prepend('<div class="js-errorbox-all"></div>'), $errBox = $jform.find(".js-errorbox-all"));
                            var $allError = $errBox.find(".js-rule-error-all");
                            $allError && 0 != $allError.length || ($errBox.append('<p class="js-rule-error-all">' + json.error + "</p>"), $allError = $errBox.find(".js-rule-error-all")), $allError.html(json.error).show(), $errBox.show(), $jform.addClass("js-send-form-error"), $jform.trigger("stexform:aftererror")
                        } else {
                            var formres = {};
                            if (json && json.results && json.results[0]) {
                                var str = json.results[0];
                                str = str.split(":"), formres.tranid = str[0] + ":" + str[1], formres.orderid = str[2] ? str[2] : "0"
                            } else formres.tranid = "0", formres.orderid = "0";
                            $jform.data("stexformresult", formres);
                            var virtPage = "/stex/" + $jform.attr("id") + "/submitted/",
                                virtTitle = "Send data from form " + $jform.attr("id"),
                                virtPrice = 0,
                                virtProduct = "";
                            if (window.stex && "function" == typeof stex.sendEventToStatistics ? ($jform.find(".js-stex-price").length > 0 && (virtPrice = $jform.find(".js-stex-price").val(), virtProduct = "Order " + formres.orderid), stex.sendEventToStatistics(virtPage, virtTitle, "", virtPrice), window.dataLayer && window.dataLayer.push({
                                    event: "submit_" + $jform.attr("id")
                                })) : ("undefined" != typeof ga && ga && "stex" != window.mainTracker && ga("send", {
                                    hitType: "pageview",
                                    page: virtPage,
                                    title: virtTitle
                                }), window.mainMetrika > "" && window[window.mainMetrika] && window[window.mainMetrika].hit(virtPage, {
                                    title: virtTitle,
                                    referer: window.location.href
                                }), window.dataLayer && window.dataLayer.push({
                                    event: "submit_" + $jform.attr("id")
                                })), $jform.trigger("stexform:aftersuccess"), formsendedcallback && formsendedcallback.length > 0 && eval(formsendedcallback + "($jform);"), json && json.next && json.next.type > "") {
                                var res = window.stexForm.payment($jform, json.next);
                                return successurl = "", !1
                            }
                            if ( json.success_data_callback ) {
                    			eval( json.success_data_callback + '(' + JSON.stringify(json) + ')' ) ;
                    			return;
                    		}
                            window.stexForm.successEnd($jform, successurl, successcallback)
                        }
                    },
                    error: function(e) {
                        btnformsubmit.removeClass("t-btn_sending"), btnformsubmit.data("form-sending-status", "0"), btnformsubmit.data("submitform", "");
                        var t = $jform.find(".js-errorbox-all");
                        t && 0 != t.length || ($jform.prepend('<div class="js-errorbox-all"></div>'), t = $jform.find(".js-errorbox-all"));
                        var r = t.find(".js-rule-error-all");
                        r && 0 != r.length || (t.append('<p class="js-rule-error-all"></p>'), r = t.find(".js-rule-error-all")), e && e.responseText > "" ? r.html(e.responseText + ". Please, try again later.") : e && e.statusText ? r.html("Error [" + e.statusText + "]. Please, try again later.") : r.html("Unknown error. Please, try again later."), r.show(), t.show(), $jform.addClass("js-send-form-error"), $jform.trigger("stexform:aftererror")
                    },
                    timeout: 15e3
                }), !1
            }
            return "y" == $jform.data("is-formajax") ? ($.ajax({
                type: "POST",
                url: $jform.attr("action"),
                data: $jform.serialize(),
                dataType: "text",
                success: function(html) {
                    var json, successurl = $jform.data("success-url"),
                        successcallback = $jform.data("success-callback");
                    if (btnformsubmit.removeClass("t-btn_sending"), btnformsubmit.data("form-sending-status", "0"), btnformsubmit.data("submitform", ""), html && html.length > 0)
                        if ("{" == html.substring(0, 1)) {
                            if ((json = window.JSON && window.JSON.parse ? window.JSON.parse(html) : $.parseJSON(html)) && json.message) "OK" != json.message && $jform.find(".js-successbox").html(json.message);
                            else if (json && json.error) {
                                var $errBox = $jform.find(".js-errorbox-all");
                                $errBox && 0 != $errBox.length || ($jform.prepend('<div class="js-errorbox-all"></div>'), $errBox = $jform.find(".js-errorbox-all"));
                                var $allError = $errBox.find(".js-rule-error-all");
                                return $allError && 0 != $allError.length || ($errBox.append('<p class="js-rule-error-all">Unknown error. Please, try again later.</p>'), $allError = $errBox.find(".js-rule-error-all")), $allError.html(json.error), $allError.show(), $errBox.show(), $jform.addClass("js-send-form-error"), $jform.trigger("stexform:aftererror"), !1
                            }
                        } else $jform.find(".js-successbox").html(html);
                    if ("" == $jform.find(".js-successbox").text()) {
                        var arMessage = window.stexForm.arMessages[window.stexBrowserLang] || {};
                        arMessage.success && $jform.find(".js-successbox").html(arMessage.success)
                    }
                    $jform.find(".js-successbox").show(), $jform.find("input[type=text]:visible").val(""), $jform.find("textarea:visible").html(""), $jform.find("textarea:visible").val(""), $jform.addClass("js-send-form-success");
                    var virtPage = "/stex/" + $jform.attr("id") + "/submitted/",
                        virtTitle = "Send data from form " + $jform.attr("id");
                    window.stex && "function" == typeof stex.sendEventToStatistics ? window.stex.sendEventToStatistics(virtPage, virtTitle, "", 0) : ("undefined" != typeof ga && "stex" != window.mainTracker && ga("send", {
                        hitType: "pageview",
                        page: virtPage,
                        title: virtTitle
                    }), window.mainMetrika > "" && window[window.mainMetrika] && window[window.mainMetrika].hit(virtPage, {
                        title: virtTitle,
                        referer: window.location.href
                    })), successcallback && successcallback.length > 0 ? eval(successcallback + "($jform)") : successurl && successurl.length > 0 && setTimeout(function() {
                        window.location.href = successurl
                    }, 500), $jform.trigger("stexform:aftersuccess")
                },
                error: function(e) {
                    btnformsubmit.removeClass("t-btn_sending"), btnformsubmit.data("form-sending-status", "0"), btnformsubmit.data("submitform", "");
                    var t = $jform.find(".js-errorbox-all");
                    t && 0 != t.length || ($jform.prepend('<div class="js-errorbox-all"></div>'), t = $jform.find(".js-errorbox-all"));
                    var r = t.find(".js-rule-error-all");
                    r && 0 != r.length || (t.append('<p class="js-rule-error-all"></p>'), r = t.find(".js-rule-error-all")), e && e.responseText > "" ? r.html(e.responseText + ". Please, try again later.") : e && e.statusText ? r.html("Error [" + e.statusText + "]. Please, try again later.") : r.html("Unknown error. Please, try again later."), r.show(), t.show(), $jform.addClass("js-send-form-error"), $jform.trigger("stexform:aftererror")
                },
                timeout: 15e3
            }), event.preventDefault(), !1) : (btnformsubmit.data("form-sending-status", "3"), $jform.submit(), !0)
        }, $(".js-stex-captcha").each(function() {
            
        }), $(".js-stex-mask").each(function() {
            var e = $(this).data("stex-mask"),
                t = $(this).data("stex-mask-holder");
            e && (t && t > "" ? $(this).mask("" + e, {
                placeholder: "" + t
            }) : $(this).mask("" + e))
        }), $(".js-stex-rule").focus(function() {
            var e = $(this).attr("placeholder");
            e && e.length > 0 && ($(this).data("placeholder", e), $(this).attr("placeholder", ""))
        }), $(".js-stex-rule").blur(function() {
            var e = $(this).data("placeholder");
            e > "" && ($(this).attr("placeholder", e), $(this).data("placeholder", ""))
        }), window.validateForm = function(e) {
            return window.stexForm.validate(e)
        };
        var $jallforms = $(".r").find(".js-form-proccess[data-formactiontype]");
        $jallforms.length > 0 && $jallforms.each(function() {
            1 != $(this).data("formactiontype") && $(this).append('<div style="position: absolute; left: -5000px; bottom:0;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments"  tabindex="-1" /></div>')
        }), $(".r").off("submit", ".js-form-proccess"), $(".r").on("submit", ".js-form-proccess", function() {
            var e = $(this).find("[type=submit]"),
                t = e.data("form-sending-status");
            return t && 3 == t ? (e.data("form-sending-status"), !0) : ($(this).find("[type=submit]").trigger("click"), !1)
        }), $(".r").off("dblclick", ".js-form-proccess [type=submit]"), $(".r").off("click", ".js-form-proccess [type=submit]"), $(".r").on("click", ".js-form-proccess [type=submit]", function(e) {
            e.preventDefault();
            var t = $(this);
            if (t.data("form-sending-status") >= "1") return !1;
            var r = $(this).closest("form"),
                a = !1;
            if (0 == r.length) return !1;
            if (t.addClass("t-btn_sending"), t.data("form-sending-status", "1"), t.data("submitform", r), window.stexForm.hideErrors(r), a = window.stexForm.validate(r), window.stexForm.showErrors(r, a)) return t.removeClass("t-btn_sending"), t.data("form-sending-status", "0"), t.data("submitform", ""), !1;
            var s = r.data("formactiontype"),
                i = $("#allrecords").data("stex-formskey");
            if (0 == r.find(".js-formaction-services").length && 1 != s && "" == i) {
                var n = r.find(".js-errorbox-all");
                n && 0 != n.length || (r.prepend('<div class="js-errorbox-all"></div>'), n = r.find(".js-errorbox-all"));
                var o = n.find(".js-rule-error-all");
                return o && 0 != o.length || (n.append('<p class="js-rule-error-all">' + json.error + "</p>"), o = n.find(".js-rule-error-all")), o.html("Please set reciever in block with forms").show(), n.show(), r.addClass("js-send-form-error"), t.removeClass("t-btn_sending"), t.data("form-sending-status", "0"), t.data("submitform", ""), r.trigger("stexform:aftererror"), !1
            }
            if (r.find(".g-recaptcha").length > 0 && grecaptcha) {
                window.stexForm.currentFormProccessing = {
                    form: r,
                    btn: t,
                    formtype: s,
                    formskey: i
                };
                var l = r.data("stex-captcha-clientid");
                if (void 0 === l || "" === l) {
                    var d = {
                        size: "invisible",
                        sitekey: r.data("stex-captchakey"),
                        callback: window.stexForm.captchaCallback
                    };
                    l = grecaptcha.render(r.attr("id") + "recaptcha", d), r.data("stex-captcha-clientid", l)
                } else grecaptcha.reset(l);
                return grecaptcha.execute(l), !1
            }
            return window.stexForm.send(r, t, s, i), !1
        });
        try {
            var stexPAGE_URL = window.location.href,
                stexPAGE_QUERY = "",
                stexPAGE_UTM = "";
            if (-1 !== stexPAGE_URL.toLowerCase().indexOf("utm_") && (stexPAGE_URL = stexPAGE_URL.toLowerCase(), stexPAGE_QUERY = stexPAGE_URL.split("?"), "string" == typeof(stexPAGE_QUERY = stexPAGE_QUERY[1]))) {
                var arPair, i, arParams = stexPAGE_QUERY.split("&");
                for (i in arParams) "utm_" == (arPair = arParams[i].split("="))[0].substring(0, 4) && (stexPAGE_UTM = stexPAGE_UTM + arParams[i] + "|||");
                if (stexPAGE_UTM.length > 0) {
                    var date = new Date;
                    date.setDate(date.getDate() + 30), document.cookie = "stexUTM=" + encodeURIComponent(stexPAGE_UTM) + "; path=/; expires=" + date.toUTCString()
                }
            }
        } catch (e) {}
    })
}(jQuery),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
    var t, r = navigator.userAgent,
        a = /iphone/i.test(r),
        s = /chrome/i.test(r),
        i = /android/i.test(r);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function(e, t) {
            var r;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((r = this.createTextRange()).collapse(!0), r.moveEnd("character", t), r.moveStart("character", e), r.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (r = document.selection.createRange(), e = 0 - r.duplicate().moveStart("character", -1e5), t = e + r.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(r, n) {
            var o, l, d, c, m, u, f, p;
            if (!r && this.length > 0) {
                var h = (o = e(this[0])).data(e.mask.dataName);
                return h ? h() : void 0
            }
            return n = e.extend({
                autoclear: e.mask.autoclear,
                placeholder: e.mask.placeholder,
                completed: null
            }, n), l = e.mask.definitions, d = [], c = f = r.length, m = null, e.each(r.split(""), function(e, t) {
                "?" == t ? (f--, c = e) : l[t] ? (d.push(new RegExp(l[t])), null === m && (m = d.length - 1), c > e && (u = d.length - 1)) : d.push(null)
            }), this.trigger("unmask").each(function() {
                function o() {
                    if (n.completed) {
                        for (var e = m; u >= e; e++)
                            if (d[e] && F[e] === h(e)) return;
                        n.completed.call(P)
                    }
                }

                function h(e) {
                    return n.placeholder.charAt(e < n.placeholder.length ? e : 0)
                }

                function w(e) {
                    for (; ++e < f && !d[e];);
                    return e
                }

                function g(e) {
                    for (; --e >= 0 && !d[e];);
                    return e
                }

                function j(e, t) {
                    var r, a;
                    if (!(0 > e)) {
                        for (r = e, a = w(t); f > r; r++)
                            if (d[r]) {
                                if (!(f > a && d[r].test(F[a]))) break;
                                F[r] = F[a], F[a] = h(a), a = w(a)
                            }
                        E(), P.caret(Math.max(m, e))
                    }
                }

                function y(e) {
                    var t, r, a, s;
                    for (t = e, r = h(e); f > t; t++)
                        if (d[t]) {
                            if (a = w(t), s = F[t], F[t] = r, !(f > a && d[a].test(s))) break;
                            r = s
                        }
                }

                function $() {
                    var e = P.val(),
                        t = P.caret();
                    if (p && p.length && p.length > e.length) {
                        for (T(!0); t.begin > 0 && !d[t.begin - 1];) t.begin--;
                        if (0 === t.begin)
                            for (; t.begin < m && !d[t.begin];) t.begin++;
                        P.caret(t.begin, t.begin)
                    } else {
                        for (T(!0); t.begin < f && !d[t.begin];) t.begin++;
                        P.caret(t.begin, t.begin)
                    }
                    o()
                }

                function v() {
                    T(), P.val() != L && P.change()
                }

                function b(e) {
                    if (!P.prop("readonly")) {
                        var t, r, s, i = e.which || e.keyCode;
                        p = P.val(), 8 === i || 46 === i || a && 127 === i ? (t = P.caret(), r = t.begin, (s = t.end) - r == 0 && (r = 46 !== i ? g(r) : s = w(r - 1), s = 46 === i ? w(s) : s), k(r, s), j(r, s - 1), e.preventDefault()) : 13 === i ? v.call(this, e) : 27 === i && (P.val(L), P.caret(0, T()), e.preventDefault())
                    }
                }

                function x(t) {
                    if (!P.prop("readonly")) {
                        var r, a, s, n = t.which || t.keyCode,
                            l = P.caret();
                        if (!(t.ctrlKey || t.altKey || t.metaKey || 32 > n) && n && 13 !== n) {
                            if (l.end - l.begin != 0 && (k(l.begin, l.end), j(l.begin, l.end - 1)), r = w(l.begin - 1), f > r && (a = String.fromCharCode(n), d[r].test(a))) {
                                if (y(r), F[r] = a, E(), s = w(r), i) {
                                    var c = function() {
                                        e.proxy(e.fn.caret, P, s)()
                                    };
                                    setTimeout(c, 0)
                                } else P.caret(s);
                                l.begin <= u && o()
                            }
                            t.preventDefault()
                        }
                    }
                }

                function k(e, t) {
                    var r;
                    for (r = e; t > r && f > r; r++) d[r] && (F[r] = h(r))
                }

                function E() {
                    P.val(F.join(""))
                }

                function T(e) {
                    var t, r, a, s = P.val(),
                        i = -1;
                    for (t = 0, a = 0; f > t; t++)
                        if (d[t]) {
                            for (F[t] = h(t); a++ < s.length;)
                                if (r = s.charAt(a - 1), d[t].test(r)) {
                                    F[t] = r, i = t;
                                    break
                                }
                            if (a > s.length) {
                                k(t + 1, f);
                                break
                            }
                        } else F[t] === s.charAt(a) && a++, c > t && (i = t);
                    return e ? E() : c > i + 1 ? n.autoclear || F.join("") === A ? (P.val() && P.val(""), k(0, f)) : E() : (E(), P.val(P.val().substring(0, i + 1))), c ? t : m
                }
                var P = e(this),
                    F = e.map(r.split(""), function(e, t) {
                        return "?" != e ? l[e] ? h(t) : e : void 0
                    }),
                    A = F.join(""),
                    L = P.val();
                P.data(e.mask.dataName, function() {
                    return e.map(F, function(e, t) {
                        return d[t] && e != h(t) ? e : null
                    }).join("")
                }), P.one("unmask", function() {
                    P.off(".mask").removeData(e.mask.dataName)
                }).on("focus.mask", function() {
                    if (!P.prop("readonly")) {
                        clearTimeout(t);
                        var e;
                        L = P.val(), e = T(), t = setTimeout(function() {
                            P.get(0) === document.activeElement && (E(), e == r.replace("?", "").length ? P.caret(0, e) : P.caret(e))
                        }, 10)
                    }
                }).on("blur.mask", v).on("keydown.mask", b).on("keypress.mask", x).on("input.mask paste.mask", function() {
                    P.prop("readonly") || setTimeout(function() {
                        var e = T(!0);
                        P.caret(e), o()
                    }, 0)
                }), s && i && P.off("input.mask").on("input.mask", $), T()
            })
        }
    })
});