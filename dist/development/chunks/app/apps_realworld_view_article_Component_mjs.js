(self["webpackChunkneo_mjs_realworld_example_app"] = self["webpackChunkneo_mjs_realworld_example_app"] || []).push([["apps_realworld_view_article_Component_mjs"],{

/***/ "./apps/realworld/view/article/Component.mjs":
/*!***************************************************!*\
  !*** ./apps/realworld/view/article/Component.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _CreateCommentComponent_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateCommentComponent.mjs */ "./apps/realworld/view/article/CreateCommentComponent.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");





/**
 * @class RealWorld.view.article.Component
 * @extends Neo.component.Base
 */
class Component extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.Component'
         * @protected
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
         * We store the lazy loaded class here
         * @member {RealWorld.view.article.CommentComponent} commentComponent=null
         * @protected
         */
        commentComponent: null,
        /**
         * @member {RealWorld.view.article.CommentComponent[]} commentComponents=[]
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
        _vdom:
        {cn: [
            {cls: ['banner'], cn: [
                {cls: ['container'], cn: [
                    {tag: 'h1', flag: 'title'},
                    {cls: ['article-meta'], cn: [
                        {tag: 'a', flag: 'userimage', cn: [
                            {tag: 'img'}
                        ]},
                        {cls: ['info'], cn: [
                            {tag: 'a', cls: ['author'], flag: 'username'},
                            {tag: 'span', cls: ['date'], flag: 'createdAt'}
                        ]},
                        {tag: 'button', cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'follow-button'], cn: [
                            {tag: 'i', flag: 'followIcon'},
                            {vtype: 'text', flag: 'followAuthor'},
                            {vtype: 'text', flag: 'username'}
                        ]},
                        {tag: 'button', cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'edit-button'], flag: 'edit-button', removeDom: true, cn: [
                            {tag: 'i', cls: ['ion-edit']},
                            {vtype: 'text', html: ' Edit Article'}
                        ]},
                        {vtype: 'text', html: '&nbsp;&nbsp;'},
                        {tag: 'button', cls: ['btn', 'btn-sm', 'btn-outline-primary', 'favorite-button'], flag: 'favorited', cn: [
                            {tag: 'i', cls: ['ion-heart']},
                            {vtype: 'text', html: '&nbsp;'},
                            {vtype: 'text'},
                            {vtype: 'text', html: ' Post '},
                            {tag: 'span', cls: ['counter'], flag: 'favoritesCount'}
                        ]},
                        {tag: 'button', cls: ['btn', 'btn-sm', 'btn-outline-danger', 'delete-button'], flag: 'delete-button', removeDom: true, cn: [
                            {tag: 'i', cls: ['ion-trash-a']},
                            {vtype: 'text', html: ' Delete Article'}
                        ]}
                    ]}
                ]}
            ]},
            {cls: ['container', 'page'], cn: [
                {cls: ['row', 'article-content'], cn: [
                    {cls: ['col-md-12'], flag: 'body', cn: []}
                ]},
                {tag: 'hr'},
                {cls: ['article-actions'], flag: 'article-actions', cn: [
                    {cls: ['article-meta'], cn: [
                        {tag: 'a', flag: 'userimage', cn: [{tag: 'img'}]},
                        {cls: ['info'], cn: [
                            {tag: 'a', cls: ['author'], flag: 'username'},
                            {tag: 'span', cls: ['date'], html: 'January 20th'}
                        ]},
                        {tag: 'button', cls: ['btn', 'btn-sm', 'btn-outline-secondary', 'follow-button'], cn: [
                            {tag: 'i', flag: 'followIcon'},
                            {vtype: 'text', flag: 'followAuthor'},
                            {vtype: 'text', flag: 'username'}
                        ]},
                        {vtype: 'text', html: '&nbsp;&nbsp;'},
                        {tag: 'button', cls: ['btn', 'btn-sm', 'btn-outline-primary', 'favorite-button'], flag: 'favorited', cn: [
                            {tag: 'i', cls: ['ion-heart']},
                            {vtype: 'text', html: '&nbsp;'},
                            {vtype: 'text'},
                            {vtype: 'text', html: ' Post '},
                            {tag: 'span', cls: ['counter'], flag: 'favoritesCount'}
                        ]}
                    ]}
                ]},
                {cls: 'row', cn: [
                    {cls: ['col-xs-12', 'col-md-8', 'offset-md-2'], flag: 'comments-section', cn: []}
                ]}
            ]}
        ]}
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
            module   : _CreateCommentComponent_mjs__WEBPACK_IMPORTED_MODULE_1__.default,
            parentId : me.id,
            userImage: currentUser && currentUser.image || null
        });

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'comments-section').cn.unshift(me.createCommentComponent.vdom);

        me.vdom = vdom;

        super.onConstructed();
    }

    /**
     * Triggered after the author config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetAuthor(value, oldValue) {
        if (value) {
            let me   = this,
                vdom = me.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getFlags(vdom, 'followAuthor').forEach(node => {
                node.html = value.following ? ' Unfollow ' : ' Follow ';
            });

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getFlags(vdom, 'followIcon').forEach(node => {
                node.cls = value.following ? ['ion-minus-round'] : ['ion-plus-round'];
            });

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getFlags(vdom, 'userimage').forEach(node => {
                node.href = '#/profile/' + value.username;
                node.cn[0].src = value.image;
            });

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getFlags(vdom, 'username').forEach(node => {
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
     * @protected
     */
    afterSetBody(value, oldValue) {
        const me = this;

        if (value) {
            Neo.main.addon.Markdown.markdownToHtml(value).then(html => {
                let vdom = me.vdom;

                _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'body').cn[0] = {
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
     * @protected
     */
    async afterSetComments(value, oldValue) {
        if (Array.isArray(value)) {
            let me        = this,
                vdom      = me.vdom,
                container = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'comments-section'),
                config, module;

            if (!me.commentComponent) {
                module = await __webpack_require__.e(/*! import() */ "apps_realworld_view_article_CommentComponent_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./CommentComponent.mjs */ "./apps/realworld/view/article/CommentComponent.mjs"));
                me.commentComponent = module.default;
            }

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
                        module  : me.commentComponent,
                        parentId: me.id,
                        ...config
                    });
                } else {
                    me.commentComponents[index].set(config, true);
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
     * @protected
     */
    afterSetCreatedAt(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'createdAt').html = new Intl.DateTimeFormat('en-US', {
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
     * @protected
     */
    afterSetFavorited(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getFlags(vdom, 'favorited').forEach(node => {
            node.cn[2].html = value ? 'Unfavorite' : 'Favorite';

            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__.default.add(node.cls, value ? 'btn-primary' : 'btn-outline-primary');
            _node_modules_neo_mjs_src_util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__.default.remove(node.cls, value ? 'btn-outline-primary' : 'btn-primary');
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
     * @protected
     */
    afterSetFavoritesCount(value, oldValue) {
        if (Neo.isNumber(value)) {
            let vdom = this.vdom;

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getFlags(vdom, 'favoritesCount').forEach(node => {
                node.html = `(${value})`;
            });

            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the tagList config got changed
     * @param {Array} value
     * @param {Array} oldValue
     * @protected
     */
    afterSetTagList(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            body = _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'body'),
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
     * @protected
     */
    afterSetTitle(value, oldValue) {
        let vdom = this.vdom;

        _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'title').html = value;
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

            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'article-actions').removeDom = isCurrentUser;
            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'delete-button')  .removeDom = !isCurrentUser;
            _node_modules_neo_mjs_src_util_VDom_mjs__WEBPACK_IMPORTED_MODULE_3__.default.getByFlag(vdom, 'edit-button')    .removeDom = !isCurrentUser;

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




/***/ }),

/***/ "./apps/realworld/view/article/CreateCommentComponent.mjs":
/*!****************************************************************!*\
  !*** ./apps/realworld/view/article/CreateCommentComponent.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateCommentComponent)
/* harmony export */ });
/* harmony import */ var _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/neo.mjs/src/component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class RealWorld.view.article.CreateCommentComponent
 * @extends Neo.component.Base
 */
class CreateCommentComponent extends _node_modules_neo_mjs_src_component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.view.article.CreateCommentComponent'
         * @protected
         */
        className: 'RealWorld.view.article.CreateCommentComponent',
        /**
         * @member {String[]} cls=['card', 'comment-form']
         */
        cls: ['card', 'comment-form'],
        /**
         * @member {String|null} userImage_=null
         */
        userImage_: null,
        /**
         * @member {String|null} userName_=null
         */
        userName_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom:
        {tag: 'form', cn: [
            {cls: ['card-block'], cn: [
                {tag: 'textarea', cls: ['form-control'], placeholder: 'Write a comment...', rows: 3}
            ]},
            {cls: ['card-footer'], cn: [
                {tag: 'img', cls: ['comment-author-img'], src: 'https://static.productionready.io/images/smiley-cyrus.jpg'},  // https://github.com/gothinkster/realworld/issues/442
                {vtype: 'text', html: '&nbsp;'},
                {tag: 'span', cls: ['comment-author']},
                {tag: 'button', cls: ['btn', 'btn-sm', 'btn-primary'], html: 'Post Comment', type: 'button'}
            ]}
        ]}
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners,
            vdom         = me.vdom;

        domListeners.push({
            click: {
                fn      : me.onSubmitButtonClick,
                delegate: '.btn-primary',
                scope   : me
            }
        });

        me.domListeners = domListeners;

        vdom.cn[0].cn[0].id = me.getInputElId();
        me.vdom = vdom;

        me.getController().on({
            afterSetCurrentUser: me.onCurrentUserChange,
            scope              : me
        });
    }

    /**
     * Triggered after the userImage config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserImage(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[1].cn[0].src = value;
            this.vdom = vdom;
        }
    }

    /**
     * Triggered after the userName config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUserName(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[1].cn[2].html = value;
            this.vdom = vdom;
        }
    }

    /**
     *
     * @returns {String}
     */
    getInputElId() {
        return this.id + '__input';
    }

    /**
     *
     * @param {Object} value
     */
    onCurrentUserChange(value) {
        this.set({
            userImage: value.image,
            userName : value.username
        });
    }

    /**
     *
     * @param {Object} data
     */
    onSubmitButtonClick(data) {
        let me = this;

        // read the input values from the main thread
        // we could register an oninput event to this view as well and store the changes
        Neo.main.DomAccess.getAttributes({
            id        : me.getInputElId(),
            attributes: 'value'
        }).then(data => {
            me.getController().postComment({
                data: JSON.stringify({
                    comment: {
                        body: data.value
                    }
                })
            }).then(data => {
                let vdom = me.vdom;

                vdom.cn[0].cn[0].value = ''; // reset the textarea value
                me.vdom = vdom;
            });
        });
    }
}

Neo.applyClassConfig(CreateCommentComponent);




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZW8ubWpzLXJlYWx3b3JsZC1leGFtcGxlLWFwcC8uL2FwcHMvcmVhbHdvcmxkL3ZpZXcvYXJ0aWNsZS9Db21wb25lbnQubWpzIiwid2VicGFjazovL25lby5tanMtcmVhbHdvcmxkLWV4YW1wbGUtYXBwLy4vYXBwcy9yZWFsd29ybGQvdmlldy9hcnRpY2xlL0NyZWF0ZUNvbW1lbnRDb21wb25lbnQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTZGO0FBQzNCO0FBQ3VCO0FBQ0Q7O0FBRXhGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlGQUFhO0FBQ3JDLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0NBQXdDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBDQUEwQztBQUM5RDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbURBQW1EO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQixxQkFBcUIseUJBQXlCO0FBQzlDLHFCQUFxQjtBQUNyQix5QkFBeUI7QUFDekIsNkJBQTZC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QTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUEsNENBQTRDO0FBQzVDO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUUyQyIsImZpbGUiOiJjaHVua3MvYXBwL2FwcHNfcmVhbHdvcmxkX3ZpZXdfYXJ0aWNsZV9Db21wb25lbnRfbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb21wb25lbnQgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgQ3JlYXRlQ29tbWVudENvbXBvbmVudCBmcm9tICcuL0NyZWF0ZUNvbW1lbnRDb21wb25lbnQubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgICAgICAgICAgICBmcm9tICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9WRG9tLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIFJlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNvbXBvbmVudCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gYXV0aG9yXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhdXRob3JfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGJvZHlfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJvZHlfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogV2Ugc3RvcmUgdGhlIGxhenkgbG9hZGVkIGNsYXNzIGhlcmVcbiAgICAgICAgICogQG1lbWJlciB7UmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5Db21tZW50Q29tcG9uZW50fSBjb21tZW50Q29tcG9uZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY29tbWVudENvbXBvbmVudDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ29tbWVudENvbXBvbmVudFtdfSBjb21tZW50Q29tcG9uZW50cz1bXVxuICAgICAgICAgKi9cbiAgICAgICAgY29tbWVudENvbXBvbmVudHM6IFtdLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W118bnVsbH0gY29tbWVudHNfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGNvbW1lbnRzXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1JlYWxXb3JsZC52aWV3LmFydGljbGUuQ3JlYXRlQ29tbWVudENvbXBvbmVudHxudWxsfSBjcmVhdGVDb21tZW50Q29tcG9uZW50PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNvbW1lbnRDb21wb25lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gY3JlYXRlZEF0Xz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVkQXRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2FydGljbGUtcGFnZSddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnYXJ0aWNsZS1wYWdlJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBmYXZvcml0ZWRfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBmYXZvcml0ZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBmYXZvcml0ZXNDb3VudF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZmF2b3JpdGVzQ291bnRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl8bnVsbH0gdGFnTGlzdF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGFnTGlzdF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gdGl0bGVfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRpdGxlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOlxuICAgICAgICB7Y246IFtcbiAgICAgICAgICAgIHtjbHM6IFsnYmFubmVyJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAge2NsczogWydjb250YWluZXInXSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2gxJywgZmxhZzogJ3RpdGxlJ30sXG4gICAgICAgICAgICAgICAgICAgIHtjbHM6IFsnYXJ0aWNsZS1tZXRhJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYScsIGZsYWc6ICd1c2VyaW1hZ2UnLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdpbWcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2xzOiBbJ2luZm8nXSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYScsIGNsczogWydhdXRob3InXSwgZmxhZzogJ3VzZXJuYW1lJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3NwYW4nLCBjbHM6IFsnZGF0ZSddLCBmbGFnOiAnY3JlYXRlZEF0J31cbiAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2J1dHRvbicsIGNsczogWydidG4nLCAnYnRuLXNtJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdmb2xsb3ctYnV0dG9uJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2knLCBmbGFnOiAnZm9sbG93SWNvbid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBmbGFnOiAnZm9sbG93QXV0aG9yJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGZsYWc6ICd1c2VybmFtZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdidXR0b24nLCBjbHM6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnZWRpdC1idXR0b24nXSwgZmxhZzogJ2VkaXQtYnV0dG9uJywgcmVtb3ZlRG9tOiB0cnVlLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdpJywgY2xzOiBbJ2lvbi1lZGl0J119LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBodG1sOiAnIEVkaXQgQXJ0aWNsZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBodG1sOiAnJm5ic3A7Jm5ic3A7J30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYnV0dG9uJywgY2xzOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtcHJpbWFyeScsICdmYXZvcml0ZS1idXR0b24nXSwgZmxhZzogJ2Zhdm9yaXRlZCcsIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2knLCBjbHM6IFsnaW9uLWhlYXJ0J119LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBodG1sOiAnJm5ic3A7J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2dHlwZTogJ3RleHQnLCBodG1sOiAnIFBvc3QgJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3NwYW4nLCBjbHM6IFsnY291bnRlciddLCBmbGFnOiAnZmF2b3JpdGVzQ291bnQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYnV0dG9uJywgY2xzOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtZGFuZ2VyJywgJ2RlbGV0ZS1idXR0b24nXSwgZmxhZzogJ2RlbGV0ZS1idXR0b24nLCByZW1vdmVEb206IHRydWUsIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2knLCBjbHM6IFsnaW9uLXRyYXNoLWEnXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGh0bWw6ICcgRGVsZXRlIEFydGljbGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICB7Y2xzOiBbJ2NvbnRhaW5lcicsICdwYWdlJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAge2NsczogWydyb3cnLCAnYXJ0aWNsZS1jb250ZW50J10sIGNuOiBbXG4gICAgICAgICAgICAgICAgICAgIHtjbHM6IFsnY29sLW1kLTEyJ10sIGZsYWc6ICdib2R5JywgY246IFtdfVxuICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgIHt0YWc6ICdocid9LFxuICAgICAgICAgICAgICAgIHtjbHM6IFsnYXJ0aWNsZS1hY3Rpb25zJ10sIGZsYWc6ICdhcnRpY2xlLWFjdGlvbnMnLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICB7Y2xzOiBbJ2FydGljbGUtbWV0YSddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ2EnLCBmbGFnOiAndXNlcmltYWdlJywgY246IFt7dGFnOiAnaW1nJ31dfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjbHM6IFsnaW5mbyddLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdhJywgY2xzOiBbJ2F1dGhvciddLCBmbGFnOiAndXNlcm5hbWUnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnc3BhbicsIGNsczogWydkYXRlJ10sIGh0bWw6ICdKYW51YXJ5IDIwdGgnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYnV0dG9uJywgY2xzOiBbJ2J0bicsICdidG4tc20nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2ZvbGxvdy1idXR0b24nXSwgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaScsIGZsYWc6ICdmb2xsb3dJY29uJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGZsYWc6ICdmb2xsb3dBdXRob3InfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dnR5cGU6ICd0ZXh0JywgZmxhZzogJ3VzZXJuYW1lJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGh0bWw6ICcmbmJzcDsmbmJzcDsnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICdidXR0b24nLCBjbHM6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tb3V0bGluZS1wcmltYXJ5JywgJ2Zhdm9yaXRlLWJ1dHRvbiddLCBmbGFnOiAnZmF2b3JpdGVkJywgY246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnaScsIGNsczogWydpb24taGVhcnQnXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGh0bWw6ICcmbmJzcDsnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dnR5cGU6ICd0ZXh0J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Z0eXBlOiAndGV4dCcsIGh0bWw6ICcgUG9zdCAnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAnc3BhbicsIGNsczogWydjb3VudGVyJ10sIGZsYWc6ICdmYXZvcml0ZXNDb3VudCd9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgIHtjbHM6ICdyb3cnLCBjbjogW1xuICAgICAgICAgICAgICAgICAgICB7Y2xzOiBbJ2NvbC14cy0xMicsICdjb2wtbWQtOCcsICdvZmZzZXQtbWQtMiddLCBmbGFnOiAnY29tbWVudHMtc2VjdGlvbicsIGNuOiBbXX1cbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgXX1cbiAgICAgICAgXX1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25EZWxldGVCdXR0b25DbGljaywgICBkZWxlZ2F0ZTogJy5kZWxldGUtYnV0dG9uJywgICBzY29wZTogbWV9fSxcbiAgICAgICAgICAgIHtjbGljazoge2ZuOiBtZS5vbkVkaXRCdXR0b25DbGljaywgICAgIGRlbGVnYXRlOiAnLmVkaXQtYnV0dG9uJywgICAgIHNjb3BlOiBtZX19LFxuICAgICAgICAgICAge2NsaWNrOiB7Zm46IG1lLm9uRmF2b3JpdGVCdXR0b25DbGljaywgZGVsZWdhdGU6ICcuZmF2b3JpdGUtYnV0dG9uJywgc2NvcGU6IG1lfX0sXG4gICAgICAgICAgICB7Y2xpY2s6IHtmbjogbWUub25Gb2xsb3dCdXR0b25DbGljaywgICBkZWxlZ2F0ZTogJy5mb2xsb3ctYnV0dG9uJywgICBzY29wZTogbWV9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkub24oe1xuICAgICAgICAgICAgYWZ0ZXJTZXRDdXJyZW50VXNlcjogbWUub25DdXJyZW50VXNlckNoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gbWUuZ2V0Q29udHJvbGxlcigpLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tO1xuXG4gICAgICAgIG1lLmNyZWF0ZUNvbW1lbnRDb21wb25lbnQgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZSAgIDogQ3JlYXRlQ29tbWVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudElkIDogbWUuaWQsXG4gICAgICAgICAgICB1c2VySW1hZ2U6IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLmltYWdlIHx8IG51bGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdjb21tZW50cy1zZWN0aW9uJykuY24udW5zaGlmdChtZS5jcmVhdGVDb21tZW50Q29tcG9uZW50LnZkb20pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGF1dGhvciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBdXRob3IodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRGbGFncyh2ZG9tLCAnZm9sbG93QXV0aG9yJykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmh0bWwgPSB2YWx1ZS5mb2xsb3dpbmcgPyAnIFVuZm9sbG93ICcgOiAnIEZvbGxvdyAnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEZsYWdzKHZkb20sICdmb2xsb3dJY29uJykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmNscyA9IHZhbHVlLmZvbGxvd2luZyA/IFsnaW9uLW1pbnVzLXJvdW5kJ10gOiBbJ2lvbi1wbHVzLXJvdW5kJ107XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ3VzZXJpbWFnZScpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5ocmVmID0gJyMvcHJvZmlsZS8nICsgdmFsdWUudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgbm9kZS5jblswXS5zcmMgPSB2YWx1ZS5pbWFnZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWRG9tVXRpbC5nZXRGbGFncyh2ZG9tLCAndXNlcm5hbWUnKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuaHJlZiA9ICcjL3Byb2ZpbGUvJyArIHZhbHVlLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgIG5vZGUuaHRtbCA9IHZhbHVlLnVzZXJuYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgICAgICBtZS5vbkN1cnJlbnRVc2VyQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGJvZHkgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Qm9keSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgTmVvLm1haW4uYWRkb24uTWFya2Rvd24ubWFya2Rvd25Ub0h0bWwodmFsdWUpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdib2R5JykuY25bMF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnIDogJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogaHRtbFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjb21tZW50cyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXXxudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhc3luYyBhZnRlclNldENvbW1lbnRzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdjb21tZW50cy1zZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgY29uZmlnLCBtb2R1bGU7XG5cbiAgICAgICAgICAgIGlmICghbWUuY29tbWVudENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IGltcG9ydCgnLi9Db21tZW50Q29tcG9uZW50Lm1qcycpO1xuICAgICAgICAgICAgICAgIG1lLmNvbW1lbnRDb21wb25lbnQgPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGFpbmVyLmNuID0gW2NvbnRhaW5lci5jbi5zaGlmdCgpXTsgLy8ga2VlcCB0aGUgQ3JlYXRlQ29tbWVudENvbXBvbmVudFxuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yICAgOiBpdGVtLmF1dGhvcixcbiAgICAgICAgICAgICAgICAgICAgYm9keSAgICAgOiBpdGVtLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRJZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBpdGVtLmNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBpdGVtLnVwZGF0ZWRBdFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1lLmNvbW1lbnRDb21wb25lbnRzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5jb21tZW50Q29tcG9uZW50c1tpbmRleF0gPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSAgOiBtZS5jb21tZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IG1lLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmNvbW1lbnRDb21wb25lbnRzW2luZGV4XS5zZXQoY29uZmlnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIuY24ucHVzaChtZS5jb21tZW50Q29tcG9uZW50c1tpbmRleF0udmRvbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGNyZWF0ZWRBdCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDcmVhdGVkQXQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnY3JlYXRlZEF0JykuaHRtbCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIHtcbiAgICAgICAgICAgICAgICBkYXkgIDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgeWVhciA6ICdudW1lcmljJ1xuICAgICAgICAgICAgfSkuZm9ybWF0KG5ldyBEYXRlKHZhbHVlKSk7XG5cbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZhdm9yaXRlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZhdm9yaXRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgVkRvbVV0aWwuZ2V0RmxhZ3ModmRvbSwgJ2Zhdm9yaXRlZCcpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBub2RlLmNuWzJdLmh0bWwgPSB2YWx1ZSA/ICdVbmZhdm9yaXRlJyA6ICdGYXZvcml0ZSc7XG5cbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChub2RlLmNscywgdmFsdWUgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1vdXRsaW5lLXByaW1hcnknKTtcbiAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShub2RlLmNscywgdmFsdWUgPyAnYnRuLW91dGxpbmUtcHJpbWFyeScgOiAnYnRuLXByaW1hcnknKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgLy8gaWdub3JlIHRoZSBpbml0aWFsIHNldHRlciBjYWxsXG4gICAgICAgIGlmIChOZW8uaXNCb29sZWFuKG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLmZhdm9yaXRlQXJ0aWNsZShtZS5zbHVnLCB2YWx1ZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBtZS5mYXZvcml0ZXNDb3VudCA9IGRhdGEuanNvbi5hcnRpY2xlLmZhdm9yaXRlc0NvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGZhdm9yaXRlc0NvdW50IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEZhdm9yaXRlc0NvdW50KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoTmVvLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIFZEb21VdGlsLmdldEZsYWdzKHZkb20sICdmYXZvcml0ZXNDb3VudCcpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5odG1sID0gYCgke3ZhbHVlfSlgO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRhZ0xpc3QgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRhZ0xpc3QodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tLFxuICAgICAgICAgICAgYm9keSA9IFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnYm9keScpLFxuICAgICAgICAgICAgdGFnTGlzdDtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGFnTGlzdCA9IHtcbiAgICAgICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ3RhZy1saXN0J10sXG4gICAgICAgICAgICAgICAgY24gOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICB0YWdMaXN0LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0YWcgOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICBjbHMgOiBbJ3RhZy1kZWZhdWx0JywgJ3RhZy1waWxsJywgJ3RhZy1vdXRsaW5lJ10sXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IGl0ZW1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJvZHkuY25bMV0gPSB0YWdMaXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJvZHkuY25bMV0pIHtcbiAgICAgICAgICAgICAgICBib2R5LmNuWzFdLnJlbW92ZURvbSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRpdGxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRpdGxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSA9IHRoaXMudmRvbTtcblxuICAgICAgICBWRG9tVXRpbC5nZXRCeUZsYWcodmRvbSwgJ3RpdGxlJykuaHRtbCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25DdXJyZW50VXNlckNoYW5nZSgpIHtjb25zb2xlLmxvZygnIyMjIG9uQ3VycmVudFVzZXJDaGFuZ2UnKTtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gbWUuZ2V0Q29udHJvbGxlcigpLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaXNDdXJyZW50VXNlcjtcblxuICAgICAgICBpZiAobWUuYXV0aG9yICYmIGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBpc0N1cnJlbnRVc2VyID0gbWUuYXV0aG9yLnVzZXJuYW1lID09PSBjdXJyZW50VXNlci51c2VybmFtZTtcblxuICAgICAgICAgICAgdmRvbS5jblswXS5jblswXS5jblsxXS5jblsyXS5yZW1vdmVEb20gPSBpc0N1cnJlbnRVc2VyOyAvLyBmb2xsb3cgdXNlciBidXR0b25cbiAgICAgICAgICAgIHZkb20uY25bMF0uY25bMF0uY25bMV0uY25bNV0ucmVtb3ZlRG9tID0gaXNDdXJyZW50VXNlcjsgLy8gZmF2b3JpdGUgcG9zdCBidXR0b25cblxuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdhcnRpY2xlLWFjdGlvbnMnKS5yZW1vdmVEb20gPSBpc0N1cnJlbnRVc2VyO1xuICAgICAgICAgICAgVkRvbVV0aWwuZ2V0QnlGbGFnKHZkb20sICdkZWxldGUtYnV0dG9uJykgIC5yZW1vdmVEb20gPSAhaXNDdXJyZW50VXNlcjtcbiAgICAgICAgICAgIFZEb21VdGlsLmdldEJ5RmxhZyh2ZG9tLCAnZWRpdC1idXR0b24nKSAgICAucmVtb3ZlRG9tID0gIWlzQ3VycmVudFVzZXI7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmdldENvbnRyb2xsZXIoKS5kZWxldGVBcnRpY2xlKHRoaXMuc2x1Zyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRWRpdEJ1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgTmVvLk1haW4uc2V0Um91dGUoe1xuICAgICAgICAgICAgdmFsdWU6ICcvZWRpdG9yLycgKyB0aGlzLnNsdWdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRmF2b3JpdGVCdXR0b25DbGljayhkYXRhKSB7XG4gICAgICAgIHRoaXMuZmF2b3JpdGVkID0gIXRoaXMuZmF2b3JpdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkZvbGxvd0J1dHRvbkNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5nZXRDb250cm9sbGVyKCkuZm9sbG93VXNlcihtZS5hdXRob3IudXNlcm5hbWUsICFtZS5hdXRob3IuZm9sbG93aW5nKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuYXV0aG9yID0gZGF0YS5qc29uLnByb2ZpbGU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQ29tcG9uZW50KTtcblxuZXhwb3J0IHtDb21wb25lbnQgYXMgZGVmYXVsdH07XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbW1lbnRDb21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBDcmVhdGVDb21tZW50Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nUmVhbFdvcmxkLnZpZXcuYXJ0aWNsZS5DcmVhdGVDb21tZW50Q29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdSZWFsV29ybGQudmlldy5hcnRpY2xlLkNyZWF0ZUNvbW1lbnRDb21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ2NhcmQnLCAnY29tbWVudC1mb3JtJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWydjYXJkJywgJ2NvbW1lbnQtZm9ybSddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVzZXJJbWFnZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlckltYWdlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB1c2VyTmFtZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdXNlck5hbWVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206XG4gICAgICAgIHt0YWc6ICdmb3JtJywgY246IFtcbiAgICAgICAgICAgIHtjbHM6IFsnY2FyZC1ibG9jayddLCBjbjogW1xuICAgICAgICAgICAgICAgIHt0YWc6ICd0ZXh0YXJlYScsIGNsczogWydmb3JtLWNvbnRyb2wnXSwgcGxhY2Vob2xkZXI6ICdXcml0ZSBhIGNvbW1lbnQuLi4nLCByb3dzOiAzfVxuICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICB7Y2xzOiBbJ2NhcmQtZm9vdGVyJ10sIGNuOiBbXG4gICAgICAgICAgICAgICAge3RhZzogJ2ltZycsIGNsczogWydjb21tZW50LWF1dGhvci1pbWcnXSwgc3JjOiAnaHR0cHM6Ly9zdGF0aWMucHJvZHVjdGlvbnJlYWR5LmlvL2ltYWdlcy9zbWlsZXktY3lydXMuanBnJ30sICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ290aGlua3N0ZXIvcmVhbHdvcmxkL2lzc3Vlcy80NDJcbiAgICAgICAgICAgICAgICB7dnR5cGU6ICd0ZXh0JywgaHRtbDogJyZuYnNwOyd9LFxuICAgICAgICAgICAgICAgIHt0YWc6ICdzcGFuJywgY2xzOiBbJ2NvbW1lbnQtYXV0aG9yJ119LFxuICAgICAgICAgICAgICAgIHt0YWc6ICdidXR0b24nLCBjbHM6IFsnYnRuJywgJ2J0bi1zbScsICdidG4tcHJpbWFyeSddLCBodG1sOiAnUG9zdCBDb21tZW50JywgdHlwZTogJ2J1dHRvbid9XG4gICAgICAgICAgICBdfVxuICAgICAgICBdfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycyxcbiAgICAgICAgICAgIHZkb20gICAgICAgICA9IG1lLnZkb207XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgICAgIDogbWUub25TdWJtaXRCdXR0b25DbGljayxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogJy5idG4tcHJpbWFyeScsXG4gICAgICAgICAgICAgICAgc2NvcGUgICA6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcblxuICAgICAgICB2ZG9tLmNuWzBdLmNuWzBdLmlkID0gbWUuZ2V0SW5wdXRFbElkKCk7XG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIG1lLmdldENvbnRyb2xsZXIoKS5vbih7XG4gICAgICAgICAgICBhZnRlclNldEN1cnJlbnRVc2VyOiBtZS5vbkN1cnJlbnRVc2VyQ2hhbmdlLFxuICAgICAgICAgICAgc2NvcGUgICAgICAgICAgICAgIDogbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VySW1hZ2UgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlckltYWdlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCB2ZG9tID0gdGhpcy52ZG9tO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzFdLmNuWzBdLnNyYyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlck5hbWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlck5hbWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG5cbiAgICAgICAgICAgIHZkb20uY25bMV0uY25bMl0uaHRtbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRJbnB1dEVsSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJ19faW5wdXQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICovXG4gICAgb25DdXJyZW50VXNlckNoYW5nZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgICB1c2VySW1hZ2U6IHZhbHVlLmltYWdlLFxuICAgICAgICAgICAgdXNlck5hbWUgOiB2YWx1ZS51c2VybmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25TdWJtaXRCdXR0b25DbGljayhkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgLy8gcmVhZCB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIG1haW4gdGhyZWFkXG4gICAgICAgIC8vIHdlIGNvdWxkIHJlZ2lzdGVyIGFuIG9uaW5wdXQgZXZlbnQgdG8gdGhpcyB2aWV3IGFzIHdlbGwgYW5kIHN0b3JlIHRoZSBjaGFuZ2VzXG4gICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGlkICAgICAgICA6IG1lLmdldElucHV0RWxJZCgpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogJ3ZhbHVlJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZ2V0Q29udHJvbGxlcigpLnBvc3RDb21tZW50KHtcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGRhdGEudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgICAgIHZkb20uY25bMF0uY25bMF0udmFsdWUgPSAnJzsgLy8gcmVzZXQgdGhlIHRleHRhcmVhIHZhbHVlXG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDcmVhdGVDb21tZW50Q29tcG9uZW50KTtcblxuZXhwb3J0IHtDcmVhdGVDb21tZW50Q29tcG9uZW50IGFzIGRlZmF1bHR9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==