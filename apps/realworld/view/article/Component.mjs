import {default as BaseComponent} from '../../../../node_modules/neo.mjs/src/component/Base.mjs';
import CommentComponent           from './CommentComponent.mjs';
import CreateCommentComponent     from './CreateCommentComponent.mjs';
import NeoArray                   from '../../../../node_modules/neo.mjs/src/util/Array.mjs';
import {default as VDomUtil}      from '../../../../node_modules/neo.mjs/src/util/VDom.mjs';

/**
 * @class RealWorld.view.article.Component
 * @extends Neo.component.Base
 */
class Component extends BaseComponent {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.Component'
         * @private
         */
        className: 'RealWorld.view.article.Component',
        /**
         * @member {Object|null} author_=null
         */
        author_: null,
        /**
         * @member {String|null} body_=null
         */
        body_: null,
        /**
         * @member {RealWorld.view.article.PreviewComponent[]} commentComponents=[]
         */
        commentComponents: [],
        /**
         * @member {Object[]|null} comments_=null
         */
        comments_: null,
        /**
         * @member {RealWorld.view.article.CreateCommentComponent|null} createCommentComponent=null
         */
        createCommentComponent: null,
        /**
         * @member {String|null} createdAt_=null
         */
        createdAt_: null,
        /**
         * @member {String[]} cls=['article-page']
         */
        cls: ['article-page'],
        /**
         * @member {Boolean} favorited_=false
         */
        favorited_: false,
        /**
         * @member {Number|null} favoritesCount_=null
         */
        favoritesCount_: null,
        /**
         * @member {Array|null} tagList_=null
         */
        tagList_: null,
        /**
         * @member {String|null} title_=null
         */
        title_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['banner'],
                cn : [{
                    cls: ['container'],
                    cn : [{
                        tag : 'h1',
                        flag: 'title'
                    }, {
                        cls: ['article-meta'],
                        cn : [{
                            tag : 'a',
                            flag: 'userimage',
                            cn  : [{tag: 'img'}]
                        }, {
                            cls: ['info'],
                            cn : [{
                                tag : 'a',
                                cls : ['author'],
                                flag: 'username'
                            }, {
                                tag : 'span',
                                cls : ['date'],
                                flag: 'createdAt'
                            }]
                        }, {
                            tag: 'button',
                            cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'follow-button'],
                            cn : [{
                                tag : 'i',
                                flag: 'followIcon'
                            }, {
                                vtype: 'text',
                                flag : 'followAuthor'
                            }, {
                                vtype: 'text',
                                flag : 'username'
                            }]
                        }, {
                            tag      : 'button',
                            cls      : ['btn', 'btn-sm', 'btn-outline-secondary', 'edit-button'],
                            flag     : 'edit-button',
                            removeDom: true,
                            cn: [{
                                tag: 'i',
                                cls: ['ion-edit']
                            }, {
                                vtype: 'text',
                                html : ' Edit Article'
                            }]
                        }, {
                            vtype: 'text',
                            html : '&nbsp;&nbsp;'
                        }, {
                            tag : 'button',
                            cls : ['btn', 'btn-sm', 'btn-outline-primary', 'favorite-button'],
                            flag: 'favorited',
                            cn  : [{
                                tag: 'i',
                                cls: ['ion-heart']
                            }, {
                                vtype: 'text',
                                html : '&nbsp;'
                            }, {
                                vtype: 'text'
                            }, {
                                vtype: 'text',
                                html : ' Post '
                            }, {
                                tag : 'span',
                                cls : ['counter'],
                                flag: 'favoritesCount'
                            }]
                        }, {
                            tag      : 'button',
                            cls      : ['btn', 'btn-sm', 'btn-outline-danger', 'delete-button'],
                            flag     : 'delete-button',
                            removeDom: true,
                            cn: [{
                                tag: 'i',
                                cls: ['ion-trash-a']
                            }, {
                                vtype: 'text',
                                html : ' Delete Article'
                            }]
                        }]
                    }]
                }]
            }, {
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row', 'article-content'],
                    cn : [{
                        cls : ['col-md-12'],
                        flag: 'body',
                        cn  : []
                    }]
                }, {
                    tag: 'hr'
                }, {
                    cls : ['article-actions'],
                    flag: 'article-actions',
                    cn  : [{
                        cls: ['article-meta'],
                        cn : [{
                            tag : 'a',
                            flag: 'userimage',
                            cn  : [{tag: 'img'}]
                        }, {
                            cls: ['info'],
                            cn : [{
                                tag : 'a',
                                cls : ['author'],
                                flag: 'username'
                            }, {
                                tag : 'span',
                                cls : ['date'],
                                html: 'January 20th'
                            }]
                        }, {
                            tag: 'button',
                            cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'follow-button'],
                            cn : [{
                                tag : 'i',
                                flag: 'followIcon'
                            }, {
                                vtype: 'text',
                                flag : 'followAuthor'
                            }, {
                                vtype: 'text',
                                flag : 'username'
                            }]
                        }, {
                            vtype: 'text',
                            html : '&nbsp;&nbsp;'
                        }, {
                            tag : 'button',
                            cls : ['btn', 'btn-sm', 'btn-outline-primary', 'favorite-button'],
                            flag: 'favorited',
                            cn  : [{
                                tag: 'i',
                                cls: ['ion-heart']
                            }, {
                                vtype: 'text',
                                html : '&nbsp;'
                            }, {
                                vtype: 'text'
                            }, {
                                vtype: 'text',
                                html : ' Post '
                            }, {
                                tag : 'span',
                                cls : ['counter'],
                                flag: 'favoritesCount'
                            }]
                        }]
                    }]
                }, {
                    cls: 'row',
                    cn : [{
                        cls : ['col-xs-12', 'col-md-8', 'offset-md-2'],
                        flag: 'comments-section',
                        cn  : []
                    }]
                }]
            }]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push(
            {click: {fn: me.onDeleteButtonClick,   delegate: '.delete-button',   scope: me}},
            {click: {fn: me.onEditButtonClick,     delegate: '.edit-button',     scope: me}},
            {click: {fn: me.onFavoriteButtonClick, delegate: '.favorite-button', scope: me}},
            {click: {fn: me.onFollowButtonClick,   delegate: '.follow-button',   scope: me}
        });

        me.domListeners = domListeners;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     *
     */
    onConstructed() {
        let me          = this,
            currentUser = me.getController().currentUser,
            vdom        = me.vdom;

        me.createCommentComponent = Neo.create({
            module   : CreateCommentComponent,
            parentId : me.id,
            userImage: currentUser && currentUser.image || null
        });

        VDomUtil.getByFlag(vdom, 'comments-section').cn.unshift(me.createCommentComponent.vdom);

        me.vdom = vdom;

        super.onConstructed();
    }

    /**
     * Triggered after the author config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetAuthor(value, oldValue) {
        if (value) {
            let me   = this,
                vdom = me.vdom;

            VDomUtil.getFlags(vdom, 'followAuthor').forEach(node => {
                node.html = value.following ? ' Unfollow ' : ' Follow ';
            });

            VDomUtil.getFlags(vdom, 'followIcon').forEach(node => {
                node.cls = value.following ? ['ion-minus-round'] : ['ion-plus-round'];
            });

            VDomUtil.getFlags(vdom, 'userimage').forEach(node => {
                node.href = '#/profile/' + value.username;
                node.cn[0].src = value.image;
            });

            VDomUtil.getFlags(vdom, 'username').forEach(node => {
                node.href = '#/profile/' + value.username;
                node.html = value.username;
            });

            me.vdom = vdom;

            me.onCurrentUserChange();
        }
    }

    /**
     * Triggered after the body config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetBody(value, oldValue) {
        const me = this;
        let vdom = me.vdom;

        if (value) {
            Neo.main.DomAccess.markdownToHtml(value).then(html => {
                VDomUtil.getByFlag(vdom, 'body').cn[0] = {
                    cn: [{
                        tag : 'p',
                        html: html
                    }]
                };

                me.vdom = vdom;
            });
        }
    }

    /**
     * Triggered after the comments config got changed
     * @param {Object[]|null} value
     * @param {Object[]|null} oldValue
     * @private
     */
    afterSetComments(value, oldValue) {
        if (Array.isArray(value)) {
            let me        = this,
                vdom      = me.vdom,
                container = VDomUtil.getByFlag(vdom, 'comments-section'),
                config;

            container.cn = [container.cn.shift()]; // keep the CreateCommentComponent

            value.forEach((item, index) => {
                config = {
                    author   : item.author,
                    body     : item.body,
                    commentId: item.id,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                };

                if (!me.commentComponents[index]) {
                    me.commentComponents[index] = Neo.create({
                        module  : CommentComponent,
                        parentId: me.id,
                        ...config
                    });
                } else {
                    me.commentComponents[index].bulkConfigUpdate(config, true);
                }

                container.cn.push(me.commentComponents[index].vdom);
            });

            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the createdAt config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetCreatedAt(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            VDomUtil.getByFlag(vdom, 'createdAt').html = new Intl.DateTimeFormat('en-US', {
                day  : 'numeric',
                month: 'long',
                year : 'numeric'
            }).format(new Date(value));

            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the favorited config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @private
     */
    afterSetFavorited(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        VDomUtil.getFlags(vdom, 'favorited').forEach(node => {
            node.cn[2].html = value ? 'Unfavorite' : 'Favorite';

            NeoArray.add(node.cls, value ? 'btn-primary' : 'btn-outline-primary');
            NeoArray.remove(node.cls, value ? 'btn-outline-primary' : 'btn-primary');
        });

        me.vdom = vdom;

        // ignore the initial setter call
        if (Neo.isBoolean(oldValue)) {
            me.getController().favoriteArticle(me.slug, value).then(data => {
                me.favoritesCount = data.json.article.favoritesCount;
            });
        }
    }

    /**
     * Triggered after the favoritesCount config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetFavoritesCount(value, oldValue) {
        if (Neo.isNumber(value)) {
            let vdom = this.vdom;

            VDomUtil.getFlags(vdom, 'favoritesCount').forEach(node => {
                node.html = `(${value})`;
            });

            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the tagList config got changed
     * @param {Array} value
     * @param {Array} oldValue
     * @private
     */
    afterSetTagList(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            body = VDomUtil.getByFlag(vdom, 'body'),
            tagList;

        if (Array.isArray(value) && value.length > 0) {
            tagList = {
                tag: 'ul',
                cls: ['tag-list'],
                cn : []
            };

            value.forEach(item => {
                tagList.cn.push({
                    tag : 'li',
                    cls : ['tag-default', 'tag-pill', 'tag-outline'],
                    html: item
                })
            });

            body.cn[1] = tagList;
        } else {
            if (body.cn[1]) {
                body.cn[1].removeDom = true;
            }
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the title config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetTitle(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'title').html = value;
        this.vdom = vdom;
    }

    /**
     *
     */
    onCurrentUserChange() {console.log('### onCurrentUserChange');
        let me          = this,
            currentUser = me.getController().currentUser,
            vdom        = me.vdom,
            isCurrentUser;

        if (me.author && currentUser) {
            isCurrentUser = me.author.username === currentUser.username;

            vdom.cn[0].cn[0].cn[1].cn[2].removeDom = isCurrentUser; // follow user button
            vdom.cn[0].cn[0].cn[1].cn[5].removeDom = isCurrentUser; // favorite post button

            VDomUtil.getByFlag(vdom, 'article-actions').removeDom = isCurrentUser;
            VDomUtil.getByFlag(vdom, 'delete-button')  .removeDom = !isCurrentUser;
            VDomUtil.getByFlag(vdom, 'edit-button')    .removeDom = !isCurrentUser;

            me.vdom = vdom;
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDeleteButtonClick(data) {
        this.getController().deleteArticle(this.slug);
    }

    /**
     *
     * @param {Object} data
     */
    onEditButtonClick(data) {
        Neo.Main.setRoute({
            value: '/editor/' + this.slug
        });
    }

    /**
     *
     * @param {Object} data
     */
    onFavoriteButtonClick(data) {
        this.favorited = !this.favorited;
    }

    /**
     *
     * @param {Object} data
     */
    onFollowButtonClick(data) {
        let me = this;

        me.getController().followUser(me.author.username, !me.author.following).then(data => {
            me.author = data.json.profile;
        });
    }
}

Neo.applyClassConfig(Component);

export {Component as default};
