import TreeList       from '../../../node_modules/neo.mjs/src/tree/List.mjs';
import TutorialsStore from '../store/Tutorials.mjs';

/**
 * @class Docs.view.TutorialsTreeList
 * @extends Neo.tree.List
 */
class TutorialsTreeList extends TreeList {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.view.TutorialsTreeList'
         * @protected
         */
        className: 'Docs.view.TutorialsTreeList',
        /**
         * @member {String} ntype='tutorials-treelist'
         * @protected
         */
        ntype: 'tutorials-treelist',
        /**
         * @member {String[]} cls=['docs-tutorials-treelist', 'neo-tree-list', 'neo-list-container', 'neo-list']
         */
        cls: [
            'docs-tutorials-treelist',
            'neo-tree-list',
            'neo-list-container',
            'neo-list'
        ],
        /**
         * @member {Neo.data.Store|null} store=TutorialsStore
         * @protected
         */
        store: TutorialsStore
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: '../../docs/tutorials/tutorials.json'
        }).then(data => {
            let vdom     = me.vdom,
                itemRoot = me.getListItemsRoot();

            me.store.data = data.json;
            itemRoot = me.createItems(null, itemRoot, 0);

            me.vdom = vdom;
        });
    }
}

Neo.applyClassConfig(TutorialsTreeList);

export {TutorialsTreeList as default};
