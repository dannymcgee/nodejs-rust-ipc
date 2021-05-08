# NodeJS / Rust IPC

This repo contains experiments and POCs for inter-process communication on
Windows between a NodeJS front-end and a Rust back-end.

### But... why?

The use case is for desktop applications where the GUI is developed with a
framework like Electron, but the business logic is written in a language like
Rust or C/C++ that can make the most of the system resources available. The
basic problem statement is:

- Systems languages are universally terrible at GUIs
- JavaScript (even on a blazing-fast interpreter like V8) is slow as molasses

### What about WebAssembly?

This seems to be the go-to solution for this type of problem, and there are some
good resources on the Googles for how to supercharge an Electron app with
WebAssembly modules, but this approach has limitations:

- WebAssembly is fast, but not as fast as compiling directly to native.
- WebAssembly is limited — it's designed for running in the browser, so (unless
  I'm mistaken) it can't access system APIs, it can't handle multi-threading,
  etc.
- Building a **desktop** application that runs WebAssembly inside a browser
  instance feels like a hack on top of a hack — there must be a better way!
