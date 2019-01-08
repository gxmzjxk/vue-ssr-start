<template>
    <div class="fixed-menu-wrap" :class="{show: showComponent}" ref="fixed_menu">
        <header class="before plugin-area" ref="before"></header>
        <ul class="menu-list" ref="main">
            <template v-for="(item, index) in menus">
                <li class="menu-item" :key="index" :class="{active: item.active}">
                    <a v-if="item.link" :href="item.link" class="link">{{item.title}}</a>
                    <div v-else class="link">{{item.title}}</div>
                </li>
            </template>
        </ul>
        <footer class="after plugin-area" ref="after"></footer>
    </div>
</template>
<script>
/**
 * @api 组件API
 *  @method add: 在原有 menu-list 添加一个 Item
 *  @method insert_after: 
 * @example 通过事件总线调用
 * this.$bus.$emit('fm_{API_NAME}', {PARAMS});
 * 
 * 
 */
// const CACHE_DATA = []; // Time Travel
export default {
    data() {
        return {
            showComponent: false,
            menus: [],
            oldMenus: [],
            oldNode: null,
            //
            beforeNode: null,
            afterNode: null, // 既用来做 menu 后面的 Plugin，如果是整体 Dom 替换，也放在这
            beforeHtml: '',
            afterHtml: ''
        };
    },
    methods: {
        /**
         * @description 显示 FixedMenu 控件
         */
        show() {
            this.showComponent = true;
        },
        /**
         * @description 隐藏 FixedMenu 控件
         */
        hide() {
            this.showComponent = false;
        },
        /**
         * @param {Object} item: menus 中的 Item 格式数据
         * @description 在原有的 menus 最后面 添加一个 item
         */
        add(item) {
            if (item && item.title) {
                this.menus.push(item);
            } else {
                console.warn('the params is invalid');
            }
        },
        /**
         * @description 替换 menus 前面的 Plugin
         * @param {HtmlElement} node
         */
        replace_before(node) {
            return new Promise((resolve, reject) => {
                if (node && node.nodeType === 1) {
                    if (node.isEqualNode(this.beforeNode)) {
                        resolve();
                    } else {
                        let _node = node.cloneNode(true);
                        this.clean_before();
                        this.$refs.before && this.$refs.before.appendChild(_node);
                        this.$nextTick(() => {
                            resolve();
                        });
                    }
                } else {
                    reject('the arguments must be HtmlElement');
                }
            });
        },
        /**
         * @description 替换 menus 后面的 Plugin
         * @param {HtmlElement} node
         */
        replace_after(node) {
            return new Promise((resolve, reject) => {
                if (node && node.nodeType === 1) {
                    if (node.isEqualNode(this.afterNode)) {
                        resolve();
                    } else {
                        let _node = node.cloneNode(true);
                        this.clean_after();
                        this.$refs.after && this.$refs.after.appendChild(_node);
                        this.$nextTick(() => {
                            resolve();
                        });
                    }
                } else {
                    reject('the arguments must be HtmlElement');
                }
            });
        },
        /**
         * @description 替换 fixedMenu 整体控件里的内容, 支持 menus 和 HtmlElement
         * @param {HtmlElement | Array} model
         */
        replace_all(model) {
            return new Promise((resolve, reject) => {
                if (Array.isArray(model)) {
                    let oldMenus = this.menus.slice();
                    if (JSON.stringify(oldMenus) !== JSON.stringify(model)) {
                        this.oldMenus = oldMenus;
                        this.clean_all();
                        this.menus = model;
                    }
                    this.$nextTick(() => {
                        resolve(this.oldMenus);
                    });
                } else if (model && model.nodeType === 1) {
                    if (this.oldNode && this.oldNode.isEqualNode(model)) {
                        resolve(this.oldNode);
                    } else {
                        this.oldNode = this.afterNode && this.afterNode.cloneNode(true);
                        this.replace_after(model).then(() => {
                            resolve(this.oldNode);
                        });
                    }
                } else {
                    reject('params error');
                }
            });
        },
        /* 清空 menu */
        clean_menu() {
            this.menus = [];
        },
        /* 清空 menu 之前的 Plugin */
        clean_before() {
            if (this.$refs.before) this.$refs.before.innerHTML = '';
        },
        /* 清空 menu 之后的 Plugin */
        clean_after() {
            if (this.$refs.after) this.$refs.after.innerHTML = '';
        },
        /* 清空 整个 fixedMenu 控件 */
        clean_all() {
            this.clean_menu();
            this.clean_before();
            this.clean_after();
        },

    },
    created() {
        this.$bus.$on('fm_show', this.show);
        this.$bus.$on('fm_hide', this.hide);
        this.$bus.$on('fm_add', this.add);
        // event: replace_all
        this.$bus.$on('fm_replace_all', async ({ model, cb }) => {
            const oldModel = await this.replace_all(model);
            if (typeof cb === 'function') cb(oldModel);
        });
        // event: clean_menu
        this.$bus.$on('fm_clean_menu', ({ cb }) => {
            this.clean_menu();
            this.$nextTick(() => {
                if (typeof cb === 'function') cb();
            });
        });
        this.$bus.$on('fm_reset', this.reset);
    }
};
</script>
<style lang="less">
.fixed-menu-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 40px;
    background-color: #fff;
    z-index: 998;
    transform: translate3d(0, -100%, 0);
    transition: all ease-out .3s;
    opacity: 0;
    &.show {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    .menu-list {
        display: flex;
        font-size: 15px;
        .menu-item {
            position: relative;
            display: flex;
            flex: 1;
            height: 40px;
            &.active {
                color: #ffb244;
                font-weight: bold;
                &:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 3px;
                    border-radius: 1.5px;
                    background-color: #ffb244;
                }
            }
            .link {
                flex: 1;
                line-height: 40px;
                text-align: center;
            }
        }
    }
    // 动态插件区域 目前需要手动枚举，待优化 start
    // 首页子频道-section
    .section-menu {
        display: flex;
        align-items: flex-end;
        padding-top: 15px;
        padding-bottom: 6.5px;
        height: 20px;
        .label {
            position: relative;
            font-size: 20px;
            padding-left: 15px;
            color: #121212;
            &:before {
                position: absolute;
                left: 0;
                top: 4px;
                content: '';
                width: 10px;
                height: 12px;
                background-color: #fdd000;
            }
        }
        .links {
            display: flex;
            flex: 1;
            padding-right: 15px;
            justify-content: flex-end;
            .link {
                color: #121212;
                padding-left: 15px;
            }
        }
    }
    // 动态插件区域 end
}
</style>


