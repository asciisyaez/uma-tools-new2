declare module 'assert' {
    function assert(value: unknown, message?: string | Error): asserts value;
    namespace assert {
        function strict(value: unknown, message?: string | Error): asserts value;
    }
    export = assert;
}

declare var global: any;
