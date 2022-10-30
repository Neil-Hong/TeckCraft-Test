import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-uitils";

import List from "../components/List";
import { rootReducer } from "../redux/store";
import { LIST_ACTION_TYPES } from "../redux/list.type";
import { fetchData } from "../redux/list.saga";
import userEvent from "@testing-library/user-event";

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

const payload = [{ fact: "abcd" }];

describe("List", () => {
    test("Get A Random Fact Button Disabled After Click", async () => {
        renderWithProviders(<List />);
        userEvent.click(screen.getByText("Get A Random Fact"));
        await screen.findByRole("heading");
        expect(screen.getByRole("button", { name: "Get A Random Fact" })).toHaveAttribute("disabled");
    });
});

describe("api test", () => {
    test("Handle fetch success", async () => {
        const data = await fetchData();
        expect(data).toEqual({ fact: "asdfsad" });
    });
    test("Handle fetch failed", async () => {
        server.use(
            rest.get("https://catfact.ninja/fact", (req, res, ctx) => {
                return res(ctx.status(404));
            })
        );
        await expect(fetchData()).rejects.toThrow("404");
    });
});

describe("reducer test", () => {
    test("should return the initial state", () => {
        expect(rootReducer(undefined, { type: undefined })).toEqual({
            list: { counts: 0, error: null, isLoading: false, listContent: [] },
        });
    });
    test("Fetch Start", () => {
        expect(rootReducer(undefined, { type: LIST_ACTION_TYPES.FETCH_LIST_START })).toEqual({
            list: { counts: 0, error: null, isLoading: true, listContent: [] },
        });
    });

    test("Fetch Success", async () => {
        const result = rootReducer(undefined, { type: LIST_ACTION_TYPES.FETCH_LIST_SUCCESS, payload });
        expect(result).toEqual({
            list: { counts: 1, error: null, isLoading: false, listContent: payload },
        });
    });
    test("Fetch Failed", async () => {
        const result = rootReducer(undefined, { type: LIST_ACTION_TYPES.FETCH_LIST_FAILED, payload });
        expect(result).toEqual({
            list: { counts: 0, error: payload, isLoading: false, listContent: [] },
        });
    });
});
