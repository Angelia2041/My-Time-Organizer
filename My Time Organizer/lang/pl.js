(function () {
    var lang = {
            months : "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
            monthsShort : "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
            weekdays : "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
            weekdaysShort : "nie_pon_wt_śr_czw_pt_sb".split("_"),
            longDateFormat : {
                L : "DD-MM-YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY HH:mm",
                LLLL : "dddd, D MMMM YYYY HH:mm"
            },
            relativeTime : {
                future : "za %s",
                past : "%s temu",
                s : "kilka sekund",
                m : "minutę",
                mm : "%d minut",
                h : "godzinę",
                hh : "%d godzin",
                d : "1 dzień",
                dd : "%d dni",
                M : "miesiąc",
                MM : "%d miesięcy",
                y : "rok",
                yy : "%d lat"
            },
            ordinal : function (number) {
                return '.';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('pl', lang);
    }
}());
