import data from "@/data/payment_codes.json";
import Model from "@/models/PaymentType";

const createSub = (item, level = 0) => {
    ++level;
    const modeledObject = new Model(item);
    if ((item.sub || []).length === 0) {
        return modeledObject;
    }

    modeledObject.sub = item.sub.map((sub) => {
        return createSub(
            { ...sub, category: item.category, level, parent: modeledObject },
            level
        );
    });

    return modeledObject;
};

const getLeaf = (item, leaves = []) => {
    if (!item.isLeaf) {
        item.sub.forEach(function (child) {
            getLeaf(child, leaves);
        });
    } else {
        leaves.push(item);
    }
};

const getLeaves = (items = []) => {
    const leaves = [];
    items.forEach((item) => getLeaf(item, leaves));
    return leaves;
};

const getNodeByLevel = (level, item, leaves = [], category) => {
    if (item.level === level && item.category === category) {
        leaves.push(item);
    }

    if (!item.isLeaf) {
        item.sub.forEach(function (child) {
            getNodeByLevel(level, child, leaves, item.parent);
        });
    }
};

const getByLevel = (items = [], level = null, category = "") => {
    if (level === null) return getLeaves(items);

    const data = [];
    items.forEach((item) => getNodeByLevel(level, item, data, category));
    return data;
};

const getNodesByName = (item, name, data = []) => {
    if (item.name === name) {
        data.push(item);
    }

    if (!item.isLeaf) {
        item.sub.forEach(function (child) {
            getNodesByName(child, name, data);
        });
    }
};

const getParentNodes = (items = [], selectedItem) => {
    if (!selectedItem) return getLeaves(items);

    const data = [];
    items.forEach((item) => getNodesByName(item, selectedItem.name, data));
    return data.map((item) => item.parent);
};

const items = data.map(createSub);

export { items, getLeaves, getByLevel, getParentNodes };
