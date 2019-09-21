import React,{Component} from 'react'
import PropTypes from 'prop-types';
class ReactInfinitScroller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
            datagroup:[]//数据数组
        }
    }
    componentDidMount(){
        this.pageLoaded = this.props.pageStart;
        if (this.props.initialLoad) {
            this.scrollListener();
        }
        this.attachScrollListener();
    }
    componentDidUpdate(){
        this.attachScrollListener();
    }
    componentWillUnmount(){
        this.detachScrollListener();
        this.detachMousewheelListener();
    }
    setDefaultLoader(loader) {
        this.defaultLoader = loader;
    }
    detachMousewheelListener=()=> {
        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener(
            'mousewheel',
            this.mousewheelListener,
            this.props.useCapture,
        );
    }
    detachScrollListener=()=> {
        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener(
            'scroll',
            this.scrollListener,
            this.props.useCapture,
        );
        scrollEl.removeEventListener(
            'resize',
            this.scrollListener,
            this.props.useCapture,
        );
    }
    attachScrollListener=()=> {
        if (!this.props.hasMore) {
            return;
        }

        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.addEventListener(
            'mousewheel',
            this.mousewheelListener,
            this.props.useCapture,
        );
        scrollEl.addEventListener(
            'scroll',
            this.scrollListener,
            this.props.useCapture,
        );
        scrollEl.addEventListener(
            'resize',
            this.scrollListener,
            this.props.useCapture,
        );

        if (this.props.initialLoad) {
            // this.scrollListener();
        }
    }
    mousewheelListener=(e)=> {
        // Prevents Chrome hangups
        // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
        if (e.deltaY === 1) {
            e.preventDefault();
        }
    }
    scrollListener=()=> {
        const el = this.scrollComponent;
        let scrollEl = window;

        let offset = 0;
        if (this.props.useWindow) {
            const doc =
                document.documentElement ||
                document.body.parentNode ||
                document.body;
            const scrollTop =
                scrollEl.pageYOffset !== undefined
                    ? scrollEl.pageYOffset
                    : doc.scrollTop;
            if (this.props.isReverse) {
                offset = scrollTop;
            } else {
                offset =
                    this.calculateTopPosition(el) +
                    (el.offsetHeight - scrollTop - window.innerHeight);
            }
        } else if (this.props.isReverse) {
            offset = el.parentNode.scrollTop;
        } else {
            offset =
                el.scrollHeight -
                el.parentNode.scrollTop -
                el.parentNode.clientHeight;
        }

        if (offset < Number(this.props.threshold)) {
            this.detachScrollListener();
            // Call loadMore after detachScrollListener to allow for non-async loadMore functions
            if (typeof this.props.loadMore === 'function') {
                this.props.loadMore((this.pageLoaded += 1));
            }
        }
    }
    calculateTopPosition=(el)=> {
        if (!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }

    render() {
        const _this2 = this;
        const _props = this.props,
            children = _props.children,
            element = _props.element,
            hasMore = _props.hasMore,
            initialLoad = _props.initialLoad,
            isReverse = _props.isReverse,
            loader = _props.loader,
            loadMore = _props.loadMore,
            pageStart = _props.pageStart,
            ref = _props.ref,
            threshold = _props.threshold,
            useCapture = _props.useCapture,
            useWindow = _props.useWindow,
            props = _objectWithoutProperties(_props, [
                'children',
                'element',
                'hasMore',
                'initialLoad',
                'isReverse',
                'loader',
                'loadMore',
                'pageStart',
                'ref',
                'threshold',
                'useCapture',
                'useWindow',
            ]);
        function _objectWithoutProperties(obj, keys) {
            let target = {};
            for (let i in obj) {
                if (keys.indexOf(i) >= 0) continue;
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                target[i] = obj[i];
            }
            return target;
        }
        props.ref = function (node) {
            _this2.scrollComponent = node;
            if (ref) {
                ref(node);
            }
        };

        const childrenArray = [children];
        if (hasMore) {
            if (loader) {
                isReverse
                    ? childrenArray.unshift(loader)
                    : childrenArray.push(loader);
            } else if (this.defaultLoader) {
                isReverse
                    ? childrenArray.unshift(this.defaultLoader)
                    : childrenArray.push(this.defaultLoader);
            }
        }
        return React.createElement(element, props, childrenArray);
        // return (
        //     <div className='realmonitor'>
        //
        //     </div>
        // );
    }
}
ReactInfinitScroller.PropTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.string,
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    isReverse: PropTypes.bool,
    loader: PropTypes.node,
    loadMore: PropTypes.func.isRequired,
    pageStart: PropTypes.number,
    ref: PropTypes.func,
    threshold: PropTypes.number,
    useCapture: PropTypes.bool,
    useWindow: PropTypes.bool,
};
ReactInfinitScroller.defaultProps = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    pageStart: 0,
    ref: null,
    threshold: 250,
    useWindow: true,
    isReverse: false,
    useCapture: false,
    loader: null,
};
export default ReactInfinitScroller