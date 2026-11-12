// 前端逻辑：调用 Vercel Serverless 接口 + 显示本地时间

const btn = document.getElementById('pingBtn');
const output = document.getElementById('output');
const clock = document.getElementById('clock');

function tick() {
  clock.textContent = new Date().toLocaleString('zh-CN', { hour12: false });
}
tick();
setInterval(tick, 1000);

btn.addEventListener('click', async () => {
  btn.disabled = true;
  output.className = 'output';
  output.textContent = '请求中...';

  try {
    const res = await fetch('/api/hello');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    output.className = 'output ok';
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.className = 'output err';
    output.textContent =
      `接口调用失败：${err.message}\n` +
      '（本地请用 `npm run dev` 或 `vercel dev` 启动，直接双击 html 文件无法访问 /api）';
  } finally {
    btn.disabled = false;
  }
});
