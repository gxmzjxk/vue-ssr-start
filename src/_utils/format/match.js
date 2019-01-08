import Moment from '@/_utils/moment';
import { GAME_TYPE, GAME_STATUS, GAME_STATUS_TYPE } from '@/constant';
export const formatMatchList = function (list = [], CHANNEL = {}) {
    let moment;
    if (Array.isArray(list) && list.length > 0) {
        return list.map(item => {
            moment = new Moment(item.dateTime);
            item.week = moment.getWeek();
            item.date = moment.formatTime('MM-dd');
            item.games = formatGameList(item.games, false, CHANNEL);
            return item;
        });
    } else {
        return [];
    }
};

export const formatGameList = function (list = [], isLive = false, CHANNEL = {}) {
    let games = [];
    if (Array.isArray(list) && list.length > 0) {
        games = list.map((game) => {
            game = formatGameItem(game, isLive, CHANNEL);
            return game;
        });
        //
        if (CHANNEL.category === 'nba' || CHANNEL.category === 'cba') {
            games = games.filter((item) => {
                if (isNaN(item.hTeamId) && isNaN(item.vTeamId)) {
                    return item.hTeamId && item.vTeamId;
                } else {
                    return Number(item.hTeamId) && Number(item.vTeamId);
                }
            });
        }

    }
    return games;
};

export const formatGameItem = function (game = {}, isLive = false, CHANNEL = {}) {
    // 特殊处理 start
    let pathPrefix = CHANNEL.urlPrefix;
    let channelName = CHANNEL.name;
    if (CHANNEL.category === 'football') {
        pathPrefix = CHANNEL.DICT[game.tournamentId] && CHANNEL.DICT[game.tournamentId].urlPrefix;
        channelName = CHANNEL.DICT[game.tournamentId] && CHANNEL.DICT[game.tournamentId].name;
    }
    // 特殊处理 end
    game.link = `${pathPrefix}/match/${game.gameCode}`;
    //
    game.hname = game.hTeamData ? game.hTeamData.teamName : '';
    game.hflag = game.hTeamData ? game.hTeamData.flag : '';
    game.hlink = `${pathPrefix}/team/${game.hTeamData.teamId}`;
    game.vname = game.vTeamData ? game.vTeamData.teamName : '';
    game.vflag = game.vTeamData ? game.vTeamData.flag : '';
    game.vlink = `${pathPrefix}/team/${game.vTeamData.teamId}`;
    // NBA特殊处理 start
    if (CHANNEL.category === 'nba') {
        game.vname = game.hTeamData ? game.hTeamData.teamName : '';
        game.vflag = game.hTeamData ? game.hTeamData.flag : '';
        game.vlink = `${pathPrefix}/team/${game.hTeamData.teamId}`;
        game.hname = game.vTeamData ? game.vTeamData.teamName : '';
        game.hflag = game.vTeamData ? game.vTeamData.flag : '';
        game.hlink = `${pathPrefix}/team/${game.vTeamData.teamId}`;
    }
    // NBA特殊处理 end
    if (game.phase) {
        game.title = `${channelName}${game.phase}`;
    } else if (game.group) {
        game.title = `${channelName}${GAME_TYPE[game.gameType]}${game.group}组`;
    } else if (game.gameOrder) {
        game.title = `${channelName}第${game.gameOrder}轮`;
    } else {
        game.title = `${channelName}${GAME_TYPE[game.gameType]}`;
    }
    if (isLive) {
        game.gameTimeShow = new Moment(game.gameDateTime).formatShowTime();
    } else {
        game.gameTimeShow = new Moment(game.gameDateTime).formatTime('hh:mm');
    }
    game.gameDateShow = new Moment(game.gameDateTime).formatTime('MM-dd hh:mm');
    if (game.status === 1 || game.status === '-1') {
        game.progressShow = game.gameTimeShow;
    } else if (game.status === 0) {
        game.progressShow = '-';
    } else {
        // NBA特殊处理
        if (CHANNEL.category === 'nba') {
            game.progressShow = `${game.vTeamScore} - ${game.hTeamScore}`;
        } else {
            game.progressShow = `${game.hTeamScore} - ${game.vTeamScore}`;
        }

    }
    game.statusShow = GAME_STATUS[game.status];
    game.statusType = GAME_STATUS_TYPE[game.status];
    return game;
};