import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fetchListFailed, fetchListSuccess } from "../list.action";
import { fetchData, fetchListAsync } from "../list.saga";

export const handlers = [
    rest.get("https://catfact.ninja/fact", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ fact: "asdfsad" }));
    }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
    server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Testing list saga", () => {
    describe("Scenario 1: fetch success", () => {
        const it = sagaHelper(fetchListAsync());

        it("Should call fetchData first", (result) => {
            expect(result).toEqual(call(fetchData));
        });

        it("Trigger the success action", (result) => {
            expect(result).toEqual(put(fetchListSuccess()));
        });
        it("and then nothing", (result) => {
            expect(result).toBeUndefined();
        });
    });
    describe("Scenario 2: fetch failed", () => {
        const it = sagaHelper(fetchListAsync());
        server.use(
            rest.get("https://catfact.ninja/fact", (req, res, ctx) => {
                return res(ctx.status(404));
            })
        );
        const payload = new Error("Something went wrong");
        it("call mockApi first", (result) => {
            expect(result).toEqual(call(fetchData));
            return new Error("Something went wrong");
        });
        it("Trigger the fail action", (result) => {
            expect(result).toEqual(put(fetchListFailed(payload)));
        });
    });
});
