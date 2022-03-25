export default class PaymentType {
    constructor(data = {}) {
        this._name = data.description;
        this._category = data.category || null;
        this._code = data.code || "00";
        this._sub = data.sub || [];
        this._level = data.level || 0;
        this._parent = data.parent || {};
    }

    get name() {
        return this._name;
    }

    get category() {
        return this._category;
    }

    get code() {
        return this._code;
    }

    get parent() {
        return this._parent;
    }

    get level() {
        return this._level;
    }

    get sub() {
        return this._sub;
    }

    set sub(value) {
        this._sub = value;
    }

    get isLeaf() {
        return this.sub.length === 0;
    }
}
