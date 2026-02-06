import { describe, expect, it } from "vitest";

describe("sample math", () => {
  it("adds two numbers", () => {
    const add = (left: number, right: number) => left + right;

    expect(add(2, 3)).toBe(5);
  });
});
