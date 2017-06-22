/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};

export function urlStitching(cid, id, page, size, spell) {
    if( typeof (page) == 'object'){
        page = 1;
        spell = '';
    }
    let url = httpConfig + 'contents/index?column_id=' + cid + '&category_id=' + id + '&size=' + size + '&page=' + (page || 1) + '&pinyin_index=' + (spell || '') + '&_client=screen';
    return url;
};