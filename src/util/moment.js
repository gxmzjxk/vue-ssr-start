var Moment = function (time) {
    if (Object.prototype.toString.call(time) === '[object Date]') {
        this.time = time;
        this.timestamp = time.getTime();
    } else {
        this.time = time ? new Date(time) : new Date();
        this.timestamp = time;
    }
};
Moment.prototype = {
    formatTime(format = 'yyyy-MM-dd hh:mm:ss') {
        /*
         * eg:format="yyyy-MM-dd hh:mm:ss";
         */
        var k;
        var o = {
            'M+': this.time.getMonth() + 1,
            'd+': this.time.getDate(),
            'h+': this.time.getHours(),
            'm+': this.time.getMinutes(),
            's+': this.time.getSeconds(),
            'q+': Math.floor((this.time.getMonth() + 3) / 3),
            'S': this.time.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.time.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
        }
        for (k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    },
    getWeek() {
        let dayOrder = this.time.getDay();
        let week = '';
        switch (dayOrder) {
            case 0:
                week = '星期日';
                break;
            case 1:
                week = '星期一';
                break;
            case 2:
                week = '星期二';
                break;
            case 3:
                week = '星期三';
                break;
            case 4:
                week = '星期四';
                break;
            case 5:
                week = '星期五';
                break;
            case 6:
                week = '星期六';
                break;
            default:
                console.warn('get Week Day error');
                break;
        }
        return week;
    },
    fixTime(opt = {}) {
        let that = this;
        var showStr = '';
        var now = new Date().getTime();
        var delta = Number(now) - Number(that.time);
        var perMin = 60 * 1000;
        var perHour = 60 * perMin;
        var perDay = 24 * perHour;
        if (delta > 0) {
            if (delta < perMin) {
                showStr = '刚刚';
            } else if (perMin <= delta && delta < perHour) {
                showStr = Math.floor(delta / perMin) + '分钟前';
            } else if (perHour <= delta && delta < perDay) {
                showStr = Math.floor(delta / perHour) + '小时前';
            } else {
                showStr = opt.wcup ? that.formatTime('MM-dd') : that.formatTime('MM-dd hh:mm');
            }
            return showStr;
        } else {
            // console.warn('传入起始时间早于当前时间');
        }
    },
    formatShowTime() {
        let showTime = this.time.getTime();
        let today = new Date(new Moment().formatTime('yyyy-MM-dd')).getTime() - 1000 * 60 * 60 * 8;
        let yesterday = today - 1000 * 60 * 60 * 24;
        let tonight = today + 1000 * 60 * 60 * 24;
        let tomorrow = tonight + 1000 * 60 * 60 * 24;
        if (showTime < yesterday || showTime >= tomorrow) return this.formatTime('M-d hh:mm');
        else if (showTime >= yesterday && showTime < today) return '昨日 ' + this.formatTime('hh:mm');
        else if (showTime >= today && showTime < tonight) return '今日 ' + this.formatTime('hh:mm');
        else if (showTime >= tonight && showTime < tomorrow) return  '明日 ' + this.formatTime('hh:mm');
    },
    diffNow(format = false) {
        let now = Date.now();
        let diff = Math.abs((now / 1000 - this.timestamp / 1000));
        return this.getDiff(diff, format);
    },
    getDiff(delta, format = false) {
        let diff = Math.round(delta);
        let days, hours, minutes, seconds, remain;
        let formatShow = '';
        days = Math.floor(diff / 86400);
        remain = diff % 86400;
        hours = Math.floor(remain / 3600);
        remain = remain % 3600;
        minutes = Math.floor(remain / 60);
        seconds = remain % 60;
        if (format) {
            if (days > 0) {
                formatShow += days + '天';
            }
            if (hours > 0) {
                formatShow += hours + '小时';
            }
            if (minutes > 0) {
                formatShow += minutes + '分';
            }
            formatShow += seconds + '秒';
            return formatShow;
        } else {
            return {
                days,
                hours,
                minutes,
                seconds
            };
        }
    }
};

export default Moment;