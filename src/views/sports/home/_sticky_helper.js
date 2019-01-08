import { throttle } from '../../_helper/sticky';
import { bus } from '../../_common/bus';

export const scrollGetPos = function(opt) {
    let { dom, cb } = opt;
    window.addEventListener(
        'scroll',
        throttle(() => {
            let pos = dom && dom.getBoundingClientRect();
            if (typeof cb === 'function') cb(pos);
        }, 200)
    );
};
/**
 * 
 * @description 替换FixedMenu中的内容，替换成功之后返回老的 menus，以便于重置
 * @param {Array} menus 
 * @returns previousMenus
 */
export const replaceFixedMenu = function(menus, autoShow = true) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(menus)) {
            let newMenus = menus.slice();
            bus.$emit('fm_replace_all', {
                model: newMenus,
                cb(previous) {
                    resolve(previous);
                    if (autoShow) bus.$emit('fm_show');
                }
            });
        } else {
            reject('menus must be array.');
        }
    });
};

export const cleanFixedMenu = function() {
    return new Promise((resolve) => {
        bus.$emit('fm_clean_menu', {
            model: null,
            cb() {
                resolve();
            }
        });
    });
};