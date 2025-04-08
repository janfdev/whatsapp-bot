import { spawn } from "child_process";

(function start() {
  const bot = spawn(process.argv0, ["bot.js", ...process.argv.slice(2)], {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });

  //   console.log("Spawned child process");

  bot.on("message", (msg) => {
    console.log("Received message from bot:", msg);
    if (msg === "restart") {
      bot.kill();
      bot.once("close", start);
    }
  });

  bot.on("exit", (code) => {
    console.log("Child exited with code", code);
    if (code) start();
  });

  bot.on("error", (err) => {
    console.error("Failed to start bot:", err);
  });
})();
