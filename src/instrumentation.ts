export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startControlAgent } = await import("@/lib/control-agent/loop");
    startControlAgent();
  }
}
