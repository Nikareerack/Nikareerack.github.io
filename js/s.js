function t_throttle(e, t, o) {
    t || (t = 250);
    var i, n;
    return function() {
        var r = o || this,
            s = +new Date,
            a = arguments;
        i && i + t > s ? (clearTimeout(n), n = setTimeout(function() {
            i = s, e.apply(r, a)
        }, t)) : (i = s, e.apply(r, a))
    }
}
window.isSearchBot = !1,
    function(e) {
        if ($isMobile = !1, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && ($isMobile = !0), /Bot/i.test(navigator.userAgent) && (window.isSearchBot = !0), window.isMobile = $isMobile, 1 == $isMobile) {
            var t = function() {
                for (var t, o, i, n, r, s, a = document.body.querySelectorAll(".t-cover__carrier"), c = e(window).height(), l = 0, d = 0, h = a.length; h > d; d++) t = a[d], o = t.style, o.height.indexOf("vh") > -1 && (l = parseInt(o.height) / 100, i = Math.round(c * l) + "px", n = e(t).parent(".t-cover"), n && (n = n[0]) && (r = n.querySelector(".t-cover__filter"), s = n.querySelector(".t-cover__wrapper"), r && (r.style.height = i), s && (s.style.height = i), o.height = n.style.height = i));
                for (var t, o, i, n, r, s, u = document.body.querySelectorAll("[data-height-correct-vh]"), c = e(window).height(), l = 0, d = 0, h = u.length; h > d; d++) t = u[d], o = t.style, o.height.indexOf("vh") > -1 && (l = parseInt(o.height) / 100, i = c + "px", n = e(t).parent(".t-cover"), o.height = i)
            };
            e(document).ready(function() {
                t()
            }), e(window).load(function() {
                t()
            })
        }
        1 == $isMobile && (e(window).width() < 480 ? (e(document).ready(function() {
            e("div[data-customstyle=yes]").each(function(t) {
                e(this).css("font-size").replace("px", "") > 26 && (e(this).css("font-size", ""), e(this).css("line-height", ""))
            }), e("[field]").find("span").each(function(t) {
                e(this).css("font-size").replace("px", "") > 26 && e(this).css("font-size", "")
            });
            var t;
            e(".t-title, .t-name, .t-heading, .t-descr, .t-text, .t-subtitle").not(".tn-elem, .tn-atom").each(function(o) {
                if (t = e(this).attr("style"), "undefined" != typeof t && "" != t && t.indexOf("font-size") > -1 && e(this).css("font-size").replace("px", "") > 26) {
                    var i = t.replace("font-size", "fontsize").replace("line-height", "lineheight");
                    e(this).attr("style", i)
                }
            })
        }), e(window).load(function() {
            var t = e(window).width();
            e(".r").each(function() {
                var o = e(this);
                e(this).find("div").not("[data-auto-correct-mobile-width=false], .tn-elem, .tn-atom").each(function() {
                    var i = parseInt(e(this).outerWidth(!0));
                    i > t && (console.log("Block not optimized for mobile width. Block width:" + i + " Block id:" + o.attr("id")), console.log(e(this)), o.css("overflow", "auto"), i - 3 > t && o.css("word-break", "break-all"))
                })
            })
        })) : e(window).width() < 900 && e(document).ready(function() {
            e("div[data-customstyle=yes]").each(function(t) {
                e(this).css("font-size").replace("px", "") > 30 && (e(this).css("font-size", ""), e(this).css("line-height", ""))
            }), e("[field]").find("span").each(function(t) {
                e(this).css("font-size").replace("px", "") > 30 && e(this).css("font-size", "")
            });
            var t;
            e(".t-title, .t-name, .t-heading, .t-descr, .t-text, .t-subtitle").not(".tn-elem, .tn-atom").each(function(o) {
                if (t = e(this).attr("style"), "undefined" != typeof t && "" != t && t.indexOf("font-size") > -1 && e(this).css("font-size").replace("px", "") > 30) {
                    var i = t.replace("font-size", "fontsize").replace("line-height", "lineheight");
                    e(this).attr("style", i)
                }
            })
        }))
    }(jQuery),
    function(e) {
        function t() {
            this.setScrollListener()
        }
        t.prototype.videoTags = [], t.prototype.defaultConfig = {
            isNeedStop: !1
        }, t.prototype.videoConfigs = [], t.prototype.registerNewVideo = function(e, t) {
            if (!(e instanceof HTMLVideoElement)) throw new Error("Wrong tag passed into registerNewVideo");
            return -1 == this.videoTags.indexOf(e) ? (this.videoTags.push(e), this.videoConfigs.push("undefined" == typeof t ? this.defaultConfig : t), this.scrollCb(), !0) : !1
        }, t.prototype.unergisterVideo = function(e) {
            if (!(e instanceof HTMLVideoElement)) throw new Error("Wrong tag passed into unregisterNewVideo");
            var t;
            return (t = this.videoTags.indexOf(e)) > -1 ? ("function" == typeof e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e), this.pauseVideo(e, this.videoConfigs[t]), this.videoTags.splice(t, 1), this.videoConfigs.splice(t, 1), !0) : !1
        }, t.prototype.pauseVideo = function(e, t) {
            if (!t) throw new Error("Wrong config type!");
            e.pause(), t.isNeedStop && e.load()
        }, t.prototype.setScrollListener = function() {
            e(window).bind("scroll", t_throttle(jQuery.proxy(this.scrollCb, this), 200))
        }, t.prototype.scrollCb = function() {
            for (var t = e(window).height(), o = null, i = 0, n = this.videoTags.length; n > i; i++) {
                if (o = this.videoTags[i], _vrect = this.getVideoBoundingRect(o, !1), Math.abs(_vrect.top) < t && Math.abs(_vrect.top) > t / 2) {
                    var r = 1 - (Math.abs(_vrect.top) - t / 2) / (t / 2) - .2;
                    r > 0 && 1 >= r && 0 != o.volume && (o.volume = r)
                }
                Math.abs(_vrect.top) > t || 0 == _vrect.height ? this.pauseVideo(o, this.videoConfigs[i]) : o.paused && o.play()
            }
        }, t.prototype.getVideoObject = function(e) {
            for (var t = 0, o = this.videoTags.length; t > o; t++) {
                var i = this.videoTags[t];
                if (i.v === e) return i
            }
            return null
        }, t.prototype.getVideoBoundingRect = function(t, o) {
            "undefined" == typeof o && (o = !0);
            var i = null;
            return o ? (i = e(t).parents(".r")[0], i || (i = t)) : i = t, i.getBoundingClientRect()
        }, window.videoLoadProcessor = new t
    }(jQuery),
    function(e) {
        function t() {
            this.setScrollCb(), this.itemHeight = screen.availHeight;
            var t = .25;
            this.itemTransitionTop = this.itemHeight * t, this.activeItemIndex = null, this.windowHeight = document.documentElement.clientHeight || window.innerHeight || screen.availHeight, this.topOffsetShift = -150, e(window).resize(jQuery.proxy(this.recalculateAllSequencesOffsets, this)), this._resizeInterval = setInterval(jQuery.proxy(this.scrollCb, this), 500)
        }

        function o(t) {
            var o = e("#rec" + t),
                i = o.find(".t-cover").height(),
                n = o.find("div[data-hook-content]").outerHeight();
            if (n > 300 && n > i) {
                var n = n + 120;
                n > 1e3 && (n += 100), console.log("auto correct cover height: " + n), o.find(".t-cover").height(n), o.find(".t-cover__filter").height(n), o.find(".t-cover__carrier").height(n), o.find(".t-cover__wrapper").height(n), 0 == $isMobile && setTimeout(function() {
                    var e = o.find(".t-cover__carrier");
                    e.find("iframe").length > 0 && (console.log("correct video from cover_fixcontentheight"), a(e, n + "px")), e.find("video").length > 0 && console.log("correct html5video from cover_fixcontentheight")
                }, 2e3)
            }
        }

        function i(e, t) {
            -1 == e.indexOf("https://www.youtube.com/embed") && (e = "https://www.youtube.com/embed" + ("/" == e[0] ? e : "/" + e));
            var o = function(e) {
                    for (var t = e.split("/"), o = null, i = 0, n = t.length; n > i; i++) "embed" == t[i] && (o = t[i + 1]);
                    return o
                },
                i = location.protocol + "//" + location.host;
            return e = "yes" != t ? ("/" == e[e.length - 1] ? e : e) + "?autoplay=1&loop=1&enablejsapi=1&&playerapiid=featuredytplayer&controls=0&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light&wmode=transparent&origin=" + i + "&playlist=" + o(e) : ("/" == e[e.length - 1] ? e : e) + "?autoplay=0&loop=0&enablejsapi=1&&playerapiid=featuredytplayer&controls=1&modestbranding=1&rel=0&showinfo=0&color=black&iv_load_policy=3&theme=dark&wmode=transparent&origin=" + i
        }

        function n(t, o, i) {
            var n, s = e(window),
                a = e(t),
                c = 0;
            s.scroll(function() {
                n && (window.clearTimeout(n), c >= 15 && (r(a, s, o, i), c = 0), c++), n = window.setTimeout(function() {
                    r(a, s, o, i), c = 0
                }, 100)
            }), s.scroll()
        }

        function r(e, t, o, i) {
            var n, r, s, a, c;
            n = e.offset().top, r = e.height(), s = t.scrollTop(), a = t.height(), c = o.getPlayerState(), s + a > n && n + r >= s ? (1 !== c && o.playVideo(), "yes" == i && (s > n + r - 100 ? o.setVolume(30) : s > n + r - 200 ? o.setVolume(70) : n + 200 > s + a ? o.setVolume(30) : o.setVolume(100))) : n > s + a && s + a > n - 500 ? 2 !== c && (o.playVideo(), o.pauseVideo()) : s > n + r && n + r + 500 > s ? 2 !== c && o.pauseVideo() : 2 !== c && o.pauseVideo()
        }

        function s() {
            if ("yes" !== window.loadytapi_flag) {
                window.loadytapi_flag = "yes";
                var e = document.createElement("script");
                e.src = "https://www.youtube.com/iframe_api";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t)
            }
        }

        function a(t, o) {
            console.log("setWidthHeightYoutubeVideo:" + o);
            var i = t.find("iframe"),
                n = t.attr("data-content-video-nocover"),
                r = t.attr("data-content-video-noadcut-youtube"),
                s = t.attr("data-content-video-ratio"),
                a = .5625;
            if (s > 0 && (a = 1 * parseFloat(s)), "yes" != n) {
                if (o || (o = "100vh"), o.indexOf("vh") > -1) {
                    var c = window.innerHeight;
                    c || (c = e(window).height());
                    var l = Math.floor(c * (parseInt(o) / 100))
                } else var l = parseInt(o);
                var d = Math.floor(parseInt(window.innerWidth));
                d || (d = e(window).width());
                var h = d,
                    u = h * a,
                    p = h,
                    f = u,
                    v = u,
                    g = 1;
                if ("yes" == r || (f = f + 110 + 110, v = u - 220), l > v)
                    if (l > u) var g = l / u + .02;
                    else var g = u / l + .02;
                var w = Math.floor(p * g),
                    m = Math.floor(f * g),
                    y = m - l,
                    b = w - d;
                i.height(m + "px"), i.width(w + "px"), y > 0 && i.css("margin-top", -Math.floor(y / 2) + "px"), b > 0 && i.css("margin-left", -Math.floor(b / 2) + "px")
            } else {
                var u;
                o || (u = Math.floor(t.width() * a)), o && o.indexOf("vh") > -1 ? u = Math.floor(window.innerHeight * (parseInt(o) / 100)) : o && (u = parseInt(o)), i.css("width", "100%"), i.height(u + "px")
            }
        }
        t.prototype.defaultConfig = {
            orientation: "vertical",
            speedFactor: 1,
            automated: !1
        }, t.prototype.sequenceObjects = [], t.prototype.recalculateAllSequencesOffsets = function() {
            this._resizeTimeout && clearTimeout(this._resizeTimeout), this._resizeInterval && clearInterval(this._resizeInterval), this._resizeTimeout = setTimeout(jQuery.proxy(function() {
                this.scrollCb(), this._resizeInterval = setInterval(jQuery.proxy(this.scrollCb, this), 500)
            }, this), 10)
        }, t.prototype.registerNewBlock = function(e) {
            if (!(e instanceof HTMLElement)) throw new Error("Wrong node type in registerNewBlock");
            for (var t = 0, o = this.sequenceObjects.length; o > t; t++)
                if (this.sequenceObjects[t].sequenceBlock === e) return !1;
            var i = e.querySelector('[data-hook="sequence-holder"]'),
                n = 0,
                r = this.getAbsoluteTopOffset(i),
                s = function() {
                    var t = Array.prototype.slice.call(e.querySelectorAll('[data-hook="sequence-item"]'), 0),
                        o = [];
                    return t.forEach(jQuery.proxy(function(e, t, i) {
                        var r = this.getItemHeight(e),
                            s = e.querySelector('[data-hook="item-background"]');
                        e.style.height = r + "px", s.style.height = this.itemHeight + "px", t < i.length - 1 && (n += r), o.push({
                            node: e,
                            height: r,
                            topOffset: this.getAbsoluteTopOffset(e.querySelector(".txt-holder")) - (t == i.length - 1 ? 0 : this.topOffsetShift),
                            backgroundHolder: s
                        })
                    }, this)), o
                }.call(this),
                a = (this.itemHeight, {
                    sequenceBlock: e,
                    sequenceHolder: i,
                    sequenceHolderTopOffset: r,
                    sequenceHeight: n,
                    items: s,
                    started: !1,
                    prevBackgroundColor: ""
                });
            return this.sequenceObjects.push(a), this.scrollCb(), !0
        }, t.prototype.getItemHeight = function(e) {
            var t = e.querySelector("[data-hook='item-text']");
            e.querySelector("[data-hook='item-background']");
            st = e.style;
            var o = parseFloat(getComputedStyle(t).top);
            t.style.top = o + "px";
            var i = Math.max(t.clientHeight + o, this.itemHeight);
            return i
        }, t.prototype.fixTextBlocksPosition = function(e) {
            txtBlocks = Array.prototype.slice.call(e.querySelectorAll('[data-hook="item-text"]'), 0), txtBlocks.forEach(function(e, t, o) {
                var i = e.parentNode.querySelector("[data-hook='item-background']");
                i.style.top = "-" + e.clientHeight + "px"
            })
        }, t.prototype.unergisterBlock = function(e) {
            for (var t = 0, o = this.sequenceObjects.length, i = null; o > t; t++)
                if (this.sequenceObjects[t].sequenceBlock === e) {
                    i = t;
                    break
                }
            return null !== i ? (this.sequenceObjects.splice(i, 1), !0) : !1
        }, t.prototype.getAbsoluteTopOffset = function(e) {
            var t = e.offsetTop;
            for (e = e.offsetParent; null != e;) t += e.offsetTop, e = e.offsetParent;
            return t
        }, t.prototype.processSequence = function(e) {
            0 == e.started && (e.prevBackgroundColor = document.body.style.backgroundColor, document.body.style.backgroundColor = "rgb(0, 0, 0)", e.started = !0);
            for (var t, o, i, n, r, s = (e.sequenceBlock, e.sequenceHolder, e.items), a = null, c = 0, l = s.length; l > c; c++)
                if (t = s[c].node, r = t.querySelector(".txt-holder"), n = t.getBoundingClientRect(), n.top < this.itemTransitionTop && n.bottom < n.height + this.itemTransitionTop && n.bottom > this.itemTransitionTop) {
                    a = c;
                    break
                }
            if (null != a) {
                i = n.top / this.itemTransitionTop, i > 1 ? i = 1 : 0 > i && (i = 0);
                for (var c = 0, l = s.length; l > c; c++) t = s[c].node, o = s[c].backgroundHolder.style, "fixed" != o.position && (o.position = "fixed"), c == a ? (o.opacity = 1 - i, t.querySelector(".txt-holder").style.opacity = 1 - i) : c == a - 1 ? (o.opacity = i, t.querySelector(".txt-holder").style.opacity = i) : (o.opacity = 0, t.querySelector(".txt-holder").style.opacity = 0)
            }
        }, t.prototype.stopSequence = function(e) {
            0 != e.started && (e.items.forEach(function(e, t, o) {
                e.backgroundHolder.style.position = "relative", e.backgroundHolder.style.display = "block", e.backgroundHolder.style.opacity = 1
            }), document.body.style.backgroundColor = e.prevBackgroundColor, e.started = !1)
        }, t.prototype.scrollCb = function() {
            for (var t, o = (e(window).scrollTop(), 0), i = this.sequenceObjects.length; i > o; o++) {
                t = this.sequenceObjects[o];
                var n = t.sequenceHolder.getBoundingClientRect();
                n.top < 0 && n.bottom > 0 && n.bottom > n.height - t.sequenceHeight - 100 ? this.processSequence(t) : this.stopSequence(t)
            }
        }, t.prototype.setScrollCb = function() {
            this._scrollCb = jQuery.proxy(this.scrollCb, this), e(window).bind("scroll", t_throttle(this._scrollCb, 200))
        }, window.sequenceController = new t, window.processVideo = function(t) {
            mp4Src = e(t).attr("data-content-video-url-mp4"), webmSrc = e(t).attr("data-content-video-url-webm"), e(t).css("background-color", "transparent"), e(t).css("background-image", "");
            var o = {
                mp4: mp4Src,
                webm: webmSrc,
                preload: "none",
                autoplay: !1,
                loop: !0,
                scale: !0,
                zIndex: 0,
                width: "100%"
            };
            vid = e(t).videoBG(o), videoLoadProcessor.registerNewVideo(vid, {
                isNeedStop: !1
            })
        }, window.cover_init = function(t) {
            e(document).ready(function() {
                var i = document.body.querySelector("#coverCarry" + t),
                    n = e(i),
                    r = n.attr("data-content-cover-bg"),
                    s = n.attr("data-content-cover-height"),
                    a = n.attr("data-content-cover-parallax"),
                    c = n.attr("data-content-video-url-mp4"),
                    l = n.attr("data-content-video-url-webm"),
                    d = n.attr("data-content-video-url-youtube"),
                    h = n.attr("data-content-video-noloop"),
                    u = n.attr("data-content-video-nomute"),
                    p = n.attr("data-content-bg-base64"),
                    f = n.attr("data-content-video-nocover");
                r || (r = ""), s || (s = ""), a || (a = ""), c || (c = ""), l || (l = ""), d || (d = ""), h || (h = ""), u || (u = ""), d || (d = ""), p || (p = ""), f && "yes" == f && (c = "", l = "", d = ""), !$isMobile || "" == l && "" == c && "" == d || n.css("background-image", "url('" + r + "')"), o(t);
                var v = e("#rec" + t).find("img[data-hook-clogo]");
                if (v.length && v.load(function() {
                        o(t)
                    }), ("" !== c || "" !== l || "" !== d) && 0 == $isMobile)
                    if ("" != d || "" == c && "" == l) {
                        if ("" != d) {
                            n.css("background-color", "#000000"), n.css("background-image", ""), n.attr("data-content-cover-bg", "");
                            var g, w = 0,
                                m = e(window);
                            m.scroll(function() {
                                g && window.clearTimeout(g), g = window.setTimeout(function() {
                                    if (w = n.find("iframe").length, !(w > 0)) {
                                        var e, t, o, r;
                                        e = n.offset().top, t = n.height(), o = m.scrollTop(), r = m.height(), o + r > e - 500 && e + t + 500 >= o && processYoutubeVideo(i, s)
                                    }
                                }, 100)
                            }), m.scroll()
                        }
                    } else {
                        if (n.css("background-color", "#000000"), n.css("background-image", "url('https://stex.ws/img/spinner-white.gif')"), n.css("background-size", "auto"), n.attr("data-content-cover-bg", ""), "" != h) var y = !1;
                        else var y = !0;
                        if ("" != u) var b = 1;
                        else var b = "";
                        var x = "";
                        "fixed" == a && (s.indexOf("vh") > -1 && parseInt(s) > 100 && (n.css("height", "100vh"), x = "yes"), s.indexOf("px") > -1 && parseInt(s) > e(window).height() && (n.css("height", "100vh"), x = "yes"));
                        var g, w = "",
                            m = e(window),
                            T = n.parent();
                        m.scroll(function() {
                            if (g && window.clearTimeout(g), g = window.setTimeout(function() {
                                    if (!(w > 0)) {
                                        var e, t, o, i;
                                        if (e = n.offset().top, t = n.height(), o = m.scrollTop(), i = m.height(), o + i > e - 500 && e + t + 500 >= o) {
                                            var r = n.videoBG({
                                                mp4: c,
                                                webm: l,
                                                poster: "",
                                                preload: "none",
                                                autoplay: !1,
                                                loop: y,
                                                volume: b,
                                                scale: !0,
                                                zIndex: 0,
                                                width: "100%"
                                            });
                                            videoLoadProcessor.registerNewVideo(r), w = 1
                                        }
                                    }
                                }, 100), "fixed" == a && "yes" == x) {
                                var e, t, o, i;
                                e = T.offset().top, t = T.height(), o = m.scrollTop(), i = m.height(), o >= e + t - i ? (n.css("position", "absolute"), n.css("bottom", "0px"), n.css("top", "auto")) : o >= e ? (n.css("position", "fixed"), n.css("top", "0px")) : e > o && (n.css("position", "relative"), n.css("top", "auto"))
                            }
                        }), m.scroll()
                    }
                if ("dynamic" == a && 0 == $isMobile && n.parallax("50%", .2, !0), "yes" == p && "" != r && "" == c && "" == l && "" == d) {
                    var k = "";
                    e("<img/>").attr("src", r).load(function() {
                        e(this).remove(), n.css("background-image", "url('" + r + "')"), n.css("opacity", "1")
                    }), "yes" != k && (n.css("background-image", ""), n.css("opacity", "0"), n.css("transition", "opacity 25ms"))
                }
                var _ = e("#rec" + t).find(".t-cover__arrow-wrapper");
                _.length > 0 && _.click(function() {
                    var o = e("#rec" + t).height();
                    o > 0 && e("html, body").animate({
                        scrollTop: e("#rec" + t).offset().top + o
                    }, 500)
                })
            })
        }, e(document).ready(function() {
            e(".t-cover__carrier").each(function() {
                var t = e(this).attr("data-content-cover-id");
                t > 0 && cover_init(t)
            })
        });
        var c = e.Deferred();
        window.processYoutubeVideo = function(t, o) {
            s();
            var r = function() {
                var r = e(t),
                    s = r.attr("data-content-video-url-youtube"),
                    c = r.attr("data-content-video-nomute"),
                    l = r.attr("data-content-video-noloop"),
                    d = r.attr("data-content-video-nocover"),
                    h = document.createElement("iframe");
                h.src = i(s, d), h.frameBorder = 0;
                var u;
                if (t.appendChild(h), 0 == $isMobile) {
                    new YT.Player(h, {
                        events: {
                            onReady: function(e) {
                                n(t, e.target, c), e.target.setVolume && "yes" != c && e.target.setVolume(0), e.target.setLoop(!0)
                            },
                            onStateChange: function(t) {
                                if (t.target.setVolume && "yes" != c && t.target.setVolume(0), -1 === t.data) {
                                    var o = window.fix_scrolltop_beforestop_youtube;
                                    o >= 0 && (e("html, body").scrollTop(o), delete window.fix_scrolltop_beforestop_youtube)
                                }
                                t.data === YT.PlayerState.PLAYING ? u = window.setInterval(function() {
                                    var e = t.target.getCurrentTime(),
                                        o = t.target.getDuration();
                                    e + 1 > o && 0 !== o && (t.target.seekTo(0), "yes" === l && (t.target.stopVideo(), t.target.clearVideo()))
                                }, 1e3) : window.clearTimeout(u)
                            }
                        }
                    })
                }
                a(r, o)
            };
            c.then(r)
        }, window.onYouTubeIframeAPIReady = function() {
            c.resolve()
        }
    }(jQuery),
    function(e) {
        function t() {
            this.callbacks = {}
        }
        t.prototype.defaultConfig = {
            single: !1,
            context: null
        }, t.prototype.addEventListener = function(e, t, o) {
            evtCallbacks = this._getEventCallbacks(e), evtCallbacks || (evtCallbacks = this.callbacks[e] = []), evtCallbacks.push({
                callback: t,
                config: "object" == typeof o ? o : this.defaultConfig
            })
        }, t.prototype._getEventCallbacks = function(e) {
            return this.callbacks[e]
        }, t.prototype.removeEventListener = function(e, t) {
            var o = this._getEventCallbacks(e);
            if (!o) return !1;
            for (var i, n = 0, r = o.length; r > n; n++)
                if (i = o[n], t === i.callback) return o.splice(n, 1), !0;
            return !1
        }, t.prototype.emitEvent = function(e, t) {
            var o = [];
            extend(o, this._getEventCallbacks(e));
            for (var i, n, r, s = 0, a = o.length; a > s; s++) i = o[s], n = i.callback, r = i.config, r.context ? n.call(r.context, t) : n(t), r.single && this.removeEventListener(e, n)
        }, window.observer = new t
    }(jQuery),
    function(e) {
        e(document).ready(function() {
            function t() {
                if (o.length)
                    for (var t, n, r, s = o.length - 1; s >= 0; s--) t = e(o[s]), n = t.offset().top, r = i.scrollTop() + i.height() - 100, r > n && (t.removeClass("r_hidden"), t.addClass("r_showed"), o.splice(s, 1))
            }
            if (0 == $isMobile && "yes" !== e("#allrecords").attr("data-blocks-animationoff") && 0 == window.isSearchBot) {
                e(".r").each(function(t) {
                    e(this).attr("style") && -1 !== e(this).attr("style").indexOf("background-color") && e(this).attr("data-animationappear", "off")
                });
                var o = e(".r").not("[data-animationappear=off], [data-screen-min], [data-screen-max]"),
                    i = e(window);
                o.each(function(t) {
                    a = e(this).offset().top, b = i.scrollTop() + i.height() + 300, a > 1e3 && a > b ? e(this).addClass("r_hidden") : e(this).addClass("r_showed"), e(this).addClass("r_anim")
                }), i.bind("scroll", t_throttle(t, 200)), t()
            }
            e("body").height() < e(window).height() - 100 && e(".t-stexlabel").css("display", "none")
        })
    }(jQuery),
    function(e) {
        function t() {
            var t = e(window);
            t.wnd_width = t.width(), t.wnd_height = t.height()
        }

        function o() {
            t();
            var o, i, n, r = e(window).width(),
                s = e("div.r[data-screen-max], div.r[data-screen-min]");
            s.each(function(t) {
                n = e(this).css("display"), o = e(this).attr("data-screen-max"), void 0 === o && (o = 1e4), o = parseInt(o), i = e(this).attr("data-screen-min"), void 0 === i && (i = 0), i = parseInt(i), o >= i && (o >= r && r > i ? "block" != n && e(this).css("display", "block") : "none" != n && e(this).css("display", "none"))
            })
        }
        e(document).ready(function() {
            o(), e(window).bind("resize", t_throttle(o, 200))
        })
    }(jQuery),
    function(e) {
        function t(t, o) {
            var i = t.closest(".t-cover__carrier"),
                n = o + "";
            console.log("setWidthHeightHTMLVideo:" + n);
            var r = i.find("video"),
                s = i.attr("data-content-video-nocover"),
                a = i.attr("data-content-video-ratio"),
                c = .5625;
            if (a > 0 && (c = 1 * parseFloat(a)), "yes" != s) {
                if (n || (n = "100vh"), n.indexOf("vh") > -1) {
                    var l = window.innerHeight;
                    l || (l = e(window).height());
                    var d = Math.floor(l * (parseInt(n) / 100))
                } else var d = parseInt(n);
                var h = Math.floor(parseInt(window.innerWidth));
                h || (h = e(window).width());
                var u = h,
                    p = u * c,
                    f = u,
                    v = p,
                    g = p,
                    w = 1;
                if (d > g)
                    if (d > p) var w = d / p + .02;
                    else var w = p / d + .02;
                var m = Math.floor(f * w),
                    y = Math.floor(v * w),
                    b = y - d,
                    x = m - h;
                r.height(y + "px"), r.width(m + "px"), b > 0 && r.css("margin-top", -Math.floor(b / 2) + "px"), x > 0 && r.css("margin-left", -Math.floor(x / 2) + "px")
            } else {
                var p;
                n || (p = Math.floor(i.width() * c)), n && n.indexOf("vh") > -1 ? p = Math.floor(window.innerHeight * (parseInt(n) / 100)) : n && (p = parseInt(n)), r.css("width", "100%"), r.height(p + "px")
            }
        }
        e.fn.videoBG = function(o, i) {
            var i = {};
            if ("object" == typeof o) i = e.extend({}, e.fn.videoBG.defaults, o);
            else {
                if (o) return e(o).videoBG(i);
                i = e.fn.videoBG.defaults
            }
            var n = e(this);
            if (n.length) {
                "static" != n.css("position") && n.css("position") || n.css("position", "relative"), 0 == i.width && (i.width = n.width()), 0 == i.height && (i.height = n.height()), i.textReplacement && (i.scale = !0, n.width(i.width).height(i.height).css("text-indent", "-9999px"));
                var r = e.fn.videoBG.video(i);
                return i.scale && r.height(i.height).width(i.width), n.append(r), t(r, i.height), r.find("video")[0]
            }
        }, e.fn.videoBG.setFullscreen = function(t) {
            var o = e(window).width(),
                i = e(window).height();
            if (t.css("min-height", 0).css("min-width", 0), t.parent().width(o).height(i), o / i > t.aspectRatio) {
                t.width(o).height("auto");
                var n = t.height(),
                    r = (n - i) / 2;
                0 > r && (r = 0), t.css("top", -r)
            } else {
                t.width("auto").height(i);
                var s = t.width(),
                    r = (s - o) / 2;
                if (0 > r && (r = 0), t.css("left", -r), 0 === r) {
                    setTimeout(function() {
                        e.fn.videoBG.setFullscreen(t)
                    }, 500)
                }
            }
            e("body > .videoBG_wrapper").width(o).height(i)
        }, e.fn.videoBG.video = function(t) {
            var o = e("<div/>");
            o.addClass("videoBG").css("position", t.position).css("z-index", t.zIndex).css("top", 0).css("left", 0).css("height", t.height).css("width", t.width).css("opacity", t.opacity).css("overflow", "hidden");
            var i = e("<video/>");
            if (i.css("position", "relative").css("z-index", t.zIndex).attr("poster", t.poster).css("top", 0).css("left", 0).css("min-width", "100%").css("min-height", "100%"), t.autoplay && i.attr("autoplay", t.autoplay), t.volume > 0 ? i.prop("volume", t.volume) : i.prop("volume", 0), t.fullscreen) {
                i.bind("canplay", function() {
                    i.aspectRatio = i.width() / i.height(), e.fn.videoBG.setFullscreen(i)
                });
                var n;
                e(window).resize(function() {
                    clearTimeout(n), n = setTimeout(function() {
                        e.fn.videoBG.setFullscreen(i)
                    }, 100)
                }), e.fn.videoBG.setFullscreen(i)
            }
            var r = i[0];
            t.loop && (loops_left = t.loop, i.bind("ended", function() {
                loops_left && r.play(), loops_left !== !0 && loops_left--
            })), i.bind("canplay", function() {
                t.autoplay && r.play()
            }), e.fn.videoBG.supportsVideo() && (e.fn.videoBG.supportType("webm") && "" != t.webm ? i.attr("src", t.webm) : e.fn.videoBG.supportType("mp4") && "" != t.mp4 ? i.attr("src", t.mp4) : i.attr("src", t.ogv));
            var s = e("<img/>");
            return s.attr("src", t.poster).css("position", "absolute").css("z-index", t.zIndex).css("top", 0).css("left", 0).css("min-width", "100%").css("min-height", "100%"), e.fn.videoBG.supportsVideo() ? o.html(i) : o.html(s), t.textReplacement && (o.css("min-height", 1).css("min-width", 1), i.css("min-height", 1).css("min-width", 1), s.css("min-height", 1).css("min-width", 1), o.height(t.height).width(t.width), i.height(t.height).width(t.width), s.height(t.height).width(t.width)), e.fn.videoBG.supportsVideo(), o
        }, e.fn.videoBG.supportsVideo = function() {
            return document.createElement("video").canPlayType
        }, e.fn.videoBG.supportType = function(t) {
            if (!e.fn.videoBG.supportsVideo()) return !1;
            var o = document.createElement("video");
            switch (t) {
                case "webm":
                    return o.canPlayType('video/webm; codecs="vp8, vorbis"');
                case "mp4":
                    return o.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                case "ogv":
                    return o.canPlayType('video/ogg; codecs="theora, vorbis"')
            }
            return !1
        }, e.fn.videoBG.wrapper = function() {
            var t = e("<div/>");
            return t.addClass("videoBG_wrapper").css("position", "absolute").css("top", 0).css("left", 0), t
        }, e.fn.videoBG.defaults = {
            mp4: "",
            ogv: "",
            webm: "",
            poster: "",
            autoplay: !0,
            loop: !0,
            scale: !1,
            position: "absolute",
            opacity: 1,
            textReplacement: !1,
            zIndex: 0,
            width: 0,
            height: 0,
            fullscreen: !1,
            imgFallback: !0
        }
    }(jQuery),
    function(e) {
        var t = e(window),
            o = t.height();
        t.resize(function() {
            o = t.height()
        }), e.fn.parallax = function(i, n, r) {
            function s() {
                var i = t.scrollTop();
                l.each(function() {
                    var t = e(this),
                        r = t.offset().top,
                        s = a(t),
                        c = this.getBoundingClientRect();
                    if (!(i > r + s || r > i + o)) {
                        var l = -1 * Math.round(c.top * n);
                        d ? this.style["-webkit-transform"] = "translateY(" + l + "px)" : this.style.top = l + "px"
                    }
                })
            }
            var a, c, l = e(this),
                d = "undefined" == typeof document.body.style["-webkit-transform"] ? !1 : !0;
            d && l.css("position", "relative"), window.correctFirstTop4Parallax = function() {
                l.each(function() {
                    c = l.offset().top
                })
            }, window.correctFirstTop4Parallax(), a = r ? function(e) {
                return e.outerHeight(!0)
            } : function(e) {
                return e.height()
            }, (arguments.length < 1 || null === i) && (i = "50%"), (arguments.length < 2 || null === n) && (n = .1), (arguments.length < 3 || null === r) && (r = !0), e(window).resize(window.correctFirstTop4Parallax), t.bind("scroll", s).resize(s), "complete" !== document.readyState ? window.addEventListener("load", function() {
                s()
            }) : s()
        }
    }(jQuery), window.stex = window.stex || {},
    function(e) {
        stex.sendEventToStatistics = function(e, t, o, i) {
            o || (o = window.location.href), i = i ? parseFloat(i) : 0, window.ga && "stex" != window.mainTracker && ga("send", {
                hitType: "pageview",
                page: e,
                title: t
            }), window.mainMetrika > "" && window[window.mainMetrika] && window[window.mainMetrika].hit(e, {
                title: t,
                referer: o
            }), void 0 != window.dataLayer && (i > 0 ? window.dataLayer.push({
                event: "pageView",
                eventAction: e,
                title: t,
                value: i,
                referer: o
            }) : window.dataLayer.push({
                event: "pageView",
                eventAction: e,
                title: t,
                referer: o
            })), void 0 != window.fbq && (i > 0 ? window.fbq("track", "InitiateCheckout", {
                content_name: t,
                content_category: e,
                value: i,
                referrer: o
            }) : window.fbq("track", "ViewContent", {
                content_name: t,
                content_category: e,
                referrer: o
            }))
        }, e(document).ready(function() {
            var t = navigator.userAgent.toLowerCase(),
                o = -1 != t.indexOf("msie") ? parseInt(t.split("msie")[1]) : !1;
            (8 == o || 9 == o) && e(".t-btn").each(function() {
                var t = e(this).attr("href");
                e(this).find("table").length > 0 && t > "" && -1 == t.indexOf("#popup:") && -1 == t.indexOf("#price:") && e(this).click(function(t) {
                    t.preventDefault();
                    var o = e(this).attr("href");
                    window.location.href = o
                })
            }), stex.showFormError = function(e, t) {
                var o = e.find(".js-errorbox-all");
                o && 0 != o.length || (e.prepend('<div class="js-errorbox-all"></div>'), o = e.find(".js-errorbox-all"));
                var i = o.find(".js-rule-error-all");
                i && 0 != i.length || (o.append('<p class="js-rule-error-all"></p>'), i = o.find(".js-rule-error-all")), "string" == typeof t ? i.html(t) : t && t.responseText ? i.html(t.responseText + ". Later, plaese try again.") : t && t.statusText ? i.html("Error - " + t.statusText + ". Later, plaese try again.") : i.html("Unknown error. Later, plaese try again."), i.show(), o.show()
            }, e("input.js-amount").each(function() {
                var t = e(this).val();
                t = t.replace(/,/g, "."), t = parseFloat(t.replace(/[^0-9\.]/g, "")), e(this).val(t)
            }), stex.robokassaPayment = function(t, o, i) {
                return e.ajax({
                    type: "POST",
                    url: "https://forms.stexcdn.com/payment/robokassa/",
                    data: t.serialize(),
                    dataType: "text",
                    success: function(n) {
                        o.removeClass("t-btn_sending"), o.data("form-sending-status", "0"), o.data("submitform", "");
                        var r = o.closest(".r").attr("id");
                        if ("{" == n.substring(0, 1)) {
                            if (window.JSON && window.JSON.parse ? json = window.JSON.parse(n) : json = e.parseJSON(n), !json) return void stex.showFormError(t, !1);
                            if (json.error > "") return void stex.showFormError(t, json.error)
                        } else if ("http" == n.substring(0, 4)) {
                            stex.sendEventToStatistics("/stex/payment/" + r + "/click/", "Payment button: " + o.val(), "", i);
                            var s = n;
                            window.setTimeout(function() {
                                window.location.href = s
                            }, 500)
                        } else stex.showFormError(t, n)
                    },
                    fail: function(e) {
                        o.removeClass("t-btn_sending"), o.data("form-sending-status", "0"), o.data("submitform", "");
                        stex.showFormError(t, e)
                    },
                    timeout: 15e3
                })
            }
        })
    }(jQuery);