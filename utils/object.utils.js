
class ObjectUtils {
    static subArr(arr, subarr){
        if(!subarr || subarr.length===0) return arr;

        const newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (subarr.indexOf(arr[i]) > -1) {
                continue;
            }

            newArr.push(arr[i]);
        }

        return newArr;
    }

    static getKeys(obj, ...ignoreKeys){
        if(!obj || !obj instanceof Object) {
            return undefined;
        }

        const keys = Object.keys(obj);
        return this.subArr(keys, ignoreKeys);
    }

    static containsOnly(obj, key){
        if(!obj || !obj instanceof Object) {
            return false;
        }

        const keys = Object.keys(obj);
        if(keys.length!==1) {
            return false;
        }
        return (keys.indexOf(key) > -1)
    }
}

module.exports = ObjectUtils;