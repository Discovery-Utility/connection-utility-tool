import {mount, render, shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {expect, assert} from "chai";
import sinon from "sinon";

configure({adapter: new Adapter()});

global.expect = expect;
global.assert = assert;

global.mount = mount;
global.render = render;
global.shallow = shallow;

global.sinon = sinon;

global.localStorage = {
    data: {},
    getItem(key) {
        return this.data[key];
    },
    setItem(key, value) {
        this.data[key] = value;
    },
    removeItem(key) {
        delete this.data[key];
    }
};

global.ipcRndr = {
    send(channel, args) {
        return args;
    },
    on(channel, listener) {
        return channel;
    },
    removeAllListeners(channel) {
        return channel;
    }
};
