function gsPagination(el,paramPages) {
    let _current = 1;
    const _paging = el;
    const _page = n => {
        let d;        
        if(n === _current){
            d = document.createElement('div');
            d.classList.add('active');
        }
        else{
            d = document.createElement('a');
            let loc = location.href;
            if(loc[loc.length-1] === '/'){
                loc = loc.substring(0, loc.length - 1);
            }
            let _and = '?';
            if(loc.match(/[\?\&]page=\d+/g) != null){
                loc = loc.replace(/page=\d+/g,`page=${n}`);
            }
            else{
                if(loc.match(/[\?\=]/g) != null){
                    if(loc.match(/[\?=]/g).length > 1){
                        _and = '&'
                    }
                }
                loc+=`${_and}page=${n}`
            }
            d.setAttribute('href', loc);        
        }
        d.classList.add('gs-page');
        d.innerText = n;
        return d;
    }
    const _row_pages = (from, to) => {

        let pages = [];
        for (let i = from; i <= to; i++) {
            pages.push(_page(i))
        }
        return pages;
    }
    const _etc = clas => {
        const _p = document.createElement('div');
        _p.classList.add('gs-page');
        _p.classList.add(clas);
        _p.innerText = '...';
        return _p
    }

    function expand(e){
        const _t = e.target;
        if(_t.classList.contains('before')){
            let _next = _t.nextElementSibling;
            let edge = parseInt(_next.innerText,10);
            
            
            for(let i=edge-1; i>1;i--){
                const _el = _page(i);
                _paging.insertBefore(_el,_next);
                _next = _el;            
            }
            _t.remove();
        }else{
            let _next = _t.nextElementSibling;
            let edge = parseInt(_t.previousElementSibling.innerText,10);
            for(let i=paramPages-1; i>edge;i--){
                const _el = _page(i);
                _paging.insertBefore(_el,_next);
                _next = _el;
            }
            _t.remove();
        }
    }

    const _s = location.search;
    if (_s !== '') {
        const _se = _s.substr(1).split('&');
        for (let i of _se) {
            const _p = i.split('=');
            if (_p[0] === 'page') {
                _current = parseInt(_p[1], 10);
                break;
            }
        }
    }

    let _before = false;
    let _after = false;
    if (paramPages < 8) {
        for (let i of _row_pages(1, paramPages)) {
            _paging.append(i);
        }
    } else {
        if (_current - 1 >= 5) {
            _before = true;
        }
        if (paramPages - _current >= 5) {
            _after = true
        }
        _paging.append(_page(1));
        if (_before && _after) {
            _paging.append(_etc('before'));
            for (let i of _row_pages(_current - 2, _current + 2)) {
                _paging.append(i);
            }
            _paging.append(_etc('after'));
        } else if (!_before && !_after) {
            for (let i of _row_pages(2, paramPages - 1)) {
                _paging.append(i);
            }
        } else if (_before || _after) {
            if (_before) {
                _paging.append(_etc('before'));

                for (let i of _row_pages(_current - (5 - (paramPages - _current)), paramPages - 1)) {
                    _paging.append(i);
                }
            } else if (_after) {
                for (let i of _row_pages(2, _current + (6 - _current))) {
                    _paging.append(i);
                }
                _paging.append(_etc('after'));
            }
        }
        _paging.append(_page(paramPages));
        let _afterEl,_beforeEl;
        
        for(let i of _paging.children){
            if(i.classList.contains('after')){
                _afterEl = i
            }
            else if(i.classList.contains('before')){
                _beforeEl = i
            }
        }
        if(_afterEl !== undefined){
            _afterEl.addEventListener('click',expand)
        }
        if(_beforeEl !== undefined){
            _beforeEl.addEventListener('click',expand)
        }
    }
}