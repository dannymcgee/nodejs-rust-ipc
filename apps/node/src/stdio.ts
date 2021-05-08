import Path from "path";
import cp from "child_process";
import chalk from "chalk";
import { Socket } from "dgram";
import { Server } from "http";

const EXE_PATH = "apps/rust/target/debug/rust.exe";

export default async function() {
	let exe = Path.resolve(process.cwd(), EXE_PATH);
	let proc = cp.spawn(exe, { stdio: ["pipe", process.stdout, process.stderr] });

	proc.on("message", onMessage);
	proc.on("close", onClose);
	proc.on("error", handleError);
	proc.on("exit", onExit);
	proc.on("disconnect", onDisconnect);

	const tick = () => {
		proc.stdin.write("Tick!\n", (err) => {
			if (err) handleError(err);
			else setTimeout(tick, 500);
		});
	}
	tick();
}

function handleError(err: Error) {
	console.log(chalk.bold.redBright(err.message));
	console.log(chalk.red(err.stack));
	process.exit(1);
}

function onClose(code: number) {
	console.log("onClose");
	process.exit(code);
}

function onDisconnect(code: number) {
	console.log("onDisconnect");
	process.exit(code);
}

function onExit(code: number, sig: NodeJS.Signals) {
	console.log("onExit");
	if (sig) console.log("signal:", sig);
	process.exit(code);
}

function onMessage(msg: any, handle: Socket|Server) {
	console.log("onMessage:", msg);
	console.log("handle:", handle);
}
