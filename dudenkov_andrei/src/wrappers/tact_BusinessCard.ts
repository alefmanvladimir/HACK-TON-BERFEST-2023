import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type SetInformation = {
    $$type: 'SetInformation';
    name: string;
    profesion: string;
    bio: string;
}

export function storeSetInformation(src: SetInformation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2772148550, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.profesion);
        b_0.storeStringRefTail(src.bio);
    };
}

export function loadSetInformation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2772148550) { throw Error('Invalid prefix'); }
    let _name = sc_0.loadStringRefTail();
    let _profesion = sc_0.loadStringRefTail();
    let _bio = sc_0.loadStringRefTail();
    return { $$type: 'SetInformation' as const, name: _name, profesion: _profesion, bio: _bio };
}

function loadTupleSetInformation(source: TupleReader) {
    let _name = source.readString();
    let _profesion = source.readString();
    let _bio = source.readString();
    return { $$type: 'SetInformation' as const, name: _name, profesion: _profesion, bio: _bio };
}

function storeTupleSetInformation(source: SetInformation) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.profesion);
    builder.writeString(source.bio);
    return builder.build();
}

function dictValueParserSetInformation(): DictionaryValue<SetInformation> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetInformation(src)).endCell());
        },
        parse: (src) => {
            return loadSetInformation(src.loadRef().beginParse());
        }
    }
}

export type Like = {
    $$type: 'Like';
}

export function storeLike(src: Like) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(82169173, 32);
    };
}

export function loadLike(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 82169173) { throw Error('Invalid prefix'); }
    return { $$type: 'Like' as const };
}

function loadTupleLike(source: TupleReader) {
    return { $$type: 'Like' as const };
}

function storeTupleLike(source: Like) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserLike(): DictionaryValue<Like> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLike(src)).endCell());
        },
        parse: (src) => {
            return loadLike(src.loadRef().beginParse());
        }
    }
}

export type User = {
    $$type: 'User';
    name: string;
    profesion: string;
    bio: string;
}

export function storeUser(src: User) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.profesion);
        b_0.storeStringRefTail(src.bio);
    };
}

export function loadUser(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _profesion = sc_0.loadStringRefTail();
    let _bio = sc_0.loadStringRefTail();
    return { $$type: 'User' as const, name: _name, profesion: _profesion, bio: _bio };
}

function loadTupleUser(source: TupleReader) {
    let _name = source.readString();
    let _profesion = source.readString();
    let _bio = source.readString();
    return { $$type: 'User' as const, name: _name, profesion: _profesion, bio: _bio };
}

function storeTupleUser(source: User) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.profesion);
    builder.writeString(source.bio);
    return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUser(src)).endCell());
        },
        parse: (src) => {
            return loadUser(src.loadRef().beginParse());
        }
    }
}

 type BusinessCard_init_args = {
    $$type: 'BusinessCard_init_args';
    information: User;
}

function initBusinessCard_init_args(src: BusinessCard_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        let b_1 = new Builder();
        b_1.store(storeUser(src.information));
        b_0.storeRef(b_1.endCell());
    };
}

async function BusinessCard_init(information: User) {
    const __code = Cell.fromBase64('te6ccgECGwEAA9kAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCGAQFAgEgDA0DtAGSMH/gcCHXScIflTAg1wsf3iCCEKU7oUa6jqgw0x8BghClO6FGuvLggdQB0AHUAdAB1AHQQzBsE1VS2zxsMUVAQTB/4CCCEATlzVW64wKCEJRqmLa64wIwcAYHCACuyPhDAcx/AcoAVVBQZSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhPLH8hQMwXIUAPPFslQA8zIUAPPFslYzMhYzxbJAcwByPQAyQHMyQHMye1UABL4QlJgxwXy4IQApDDTHwGCEATlzVW68uCBbTEw+EIhgQELInFBM/QKb6GUAdcAMJJbbeJ/IW6SW3+RveKOGwWkgQELUAZ/cSFulVtZ9FkwmMgBzwBBM/RB4pEw4n8BTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wALAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgDg8CASASEwIRuWCts82zxsY4GBACEbhR3bPNs8bGGBgRAAZUcyEAAiUAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcEDOdWnnFfnSULAdYW4mR7KAIBIBQVAgEgFhcCEbU8e2ebZ42MMBgZABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVBZZW1ablQ0ZmNOek1aamJwWlhTVUVTYUNyajUxTG9INFJMZmVSejdyTGd6ggAeDtRNDUAfhj0gABjkH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf1AHQ1AHQAdQB0AHUAdBDMAPUMND0BDAQRhBFQTBsFuD4KNcLCoMJuvLgidQB0NQB0AHUAdAB1AHQQzBsEwPRWNs8GgACJAAObfhCBHBENA==');
    const __system = Cell.fromBase64('te6cckECHQEAA+MAAQHAAQEFoA9/AgEU/wD0pBP0vPLICwMCAWISBAIBIA0FAgEgDAYCASAJBwIRtTx7Z5tnjYwwGwgAAiQCASALCgB1sm7jQ1aXBmczovL1FtUFllbVpuVDRmY056TVpqYnBaWFNVRVNhQ3JqNTFMb0g0UkxmZVJ6N3JMZ3qCAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgEA4CEbhR3bPNs8bGGBsPAAIlAhG5YK2zzbPGxjgbEQAGVHMhA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCGxQTAK7I+EMBzH8BygBVUFBlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8sfyFAzBchQA88WyVADzMhQA88WyVjMyFjPFskBzAHI9ADJAczJAczJ7VQDtAGSMH/gcCHXScIflTAg1wsf3iCCEKU7oUa6jqgw0x8BghClO6FGuvLggdQB0AHUAdAB1AHQQzBsE1VS2zxsMUVAQTB/4CCCEATlzVW64wKCEJRqmLa64wIwcBoZFQFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/FgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwXAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwApDDTHwGCEATlzVW68uCBbTEw+EIhgQELInFBM/QKb6GUAdcAMJJbbeJ/IW6SW3+RveKOGwWkgQELUAZ/cSFulVtZ9FkwmMgBzwBBM/RB4pEw4n8AEvhCUmDHBfLghAHg7UTQ1AH4Y9IAAY5B+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9QB0NQB0AHUAdAB1AHQQzAD1DDQ9AQwEEYQRUEwbBbg+CjXCwqDCbry4InUAdDUAdAB1AHQAdQB0EMwbBMD0VjbPBwADm34QgRwRDQp2duV');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBusinessCard_init_args({ $$type: 'BusinessCard_init_args', information })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BusinessCard_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const BusinessCard_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetInformation","header":2772148550,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"profesion","type":{"kind":"simple","type":"string","optional":false}},{"name":"bio","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Like","header":82169173,"fields":[]},
    {"name":"User","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"profesion","type":{"kind":"simple","type":"string","optional":false}},{"name":"bio","type":{"kind":"simple","type":"string","optional":false}}]},
]

const BusinessCard_getters: ABIGetter[] = [
    {"name":"info","arguments":[],"returnType":{"kind":"simple","type":"User","optional":false}},
    {"name":"likes","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const BusinessCard_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetInformation"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Like"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class BusinessCard implements Contract {
    
    static async init(information: User) {
        return await BusinessCard_init(information);
    }
    
    static async fromInit(information: User) {
        const init = await BusinessCard_init(information);
        const address = contractAddress(0, init);
        return new BusinessCard(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BusinessCard(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BusinessCard_types,
        getters: BusinessCard_getters,
        receivers: BusinessCard_receivers,
        errors: BusinessCard_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetInformation | Like | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetInformation') {
            body = beginCell().store(storeSetInformation(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Like') {
            body = beginCell().store(storeLike(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('info', builder.build())).stack;
        const result = loadTupleUser(source);
        return result;
    }
    
    async getLikes(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('likes', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}