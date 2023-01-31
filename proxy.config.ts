const defaultTarget = "http://localhost:8000";

module.exports = [
  {
    context: ["*"],
    target: defaultTarget,
    changeOrigin: true,
  }
];
