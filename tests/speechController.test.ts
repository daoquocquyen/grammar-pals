import { describe, expect, it } from "vitest";
import { createSpeechController } from "../lib/audio/speechController";

type DriverCalls = {
  speak: string[];
  cancel: number;
};

const createDriver = (calls: DriverCalls) => ({
  isSupported: true,
  speak: (text: string) => {
    calls.speak.push(text);
  },
  cancel: () => {
    calls.cancel += 1;
  },
});

describe("speech controller", () => {
  it("does not speak when muted", () => {
    const calls: DriverCalls = { speak: [], cancel: 0 };
    const controller = createSpeechController(createDriver(calls));

    controller.setMuted(true);
    controller.speak("Hello there");

    expect(calls.speak).toHaveLength(0);
  });

  it("repeats the last line", () => {
    const calls: DriverCalls = { speak: [], cancel: 0 };
    const controller = createSpeechController(createDriver(calls));

    controller.speak("Repeat me");
    controller.repeat();

    expect(calls.speak).toHaveLength(2);
    expect(calls.speak[1]).toBe("Repeat me");
  });

  it("cancels speech on navigation", () => {
    const calls: DriverCalls = { speak: [], cancel: 0 };
    const controller = createSpeechController(createDriver(calls));

    controller.handleNavigation();

    expect(calls.cancel).toBe(1);
  });
});
